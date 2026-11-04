import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { passesChecks } from "./checks";
import { BlockEditor } from "./components/BlockEditor";
import { ExpectedOutput, ViewTabs } from "./components/ExpectedOutput";
import {
  clamp,
  dragPointer,
  SIDE_MIN_WIDTH,
  SPLIT_MAX,
  SPLIT_MIN,
  STAGE_MIN_WIDTH,
  useSideLayout,
} from "./components/sideLayout";
import { formatHtml } from "./formatHtml";
import { run } from "./interpreter";
import CoinBadge from "./shop/CoinBadge";
import { awardTask } from "./shop/progress";
import "./App.css";
import { blockName } from "./blockNames";

/** Prešteje resnične bloke (brez senčnih privzetih vrednosti).*/
function countBlocks(json) {
  let n = 0;
  const walk = (b) => {
    if (!b) return;
    n++;
    for (const input of Object.values(b.inputs ?? {})) walk(input.block);
    walk(b.next?.block);
  };
  for (const b of json?.blocks?.blocks ?? []) walk(b);
  return n;
}

function outputsMatch(actual, expected) {
  return (
    actual.length === expected.length
    && actual.every((line, index) => line === expected[index])
  );
}

function containsRequiredBlocks(json, requiredBlocks = []) {
  if (requiredBlocks.length === 0) return true;

  const found = new Set();
  const visit = (block) => {
    if (!block) return;
    if (block.type) found.add(block.type);
    for (const input of Object.values(block.inputs ?? {})) visit(input.block);
    visit(block.next?.block);
  };

  for (const block of json?.blocks?.blocks ?? []) visit(block);
  return requiredBlocks.every((type) => found.has(type));
}

const time = () => new Date().toLocaleTimeString("sl-SI");

const workspaceKey = (task) => `workspace:${task.id}`;

function readPreviewOutput(element) {
  if (!element) return [];

  const lines = [];
  const visit = (node) => {
    const children = Array.from(node.children);
    if (children.length === 0) {
      const text = node.textContent?.trim();
      if (text) lines.push(text);
      return;
    }
    children.forEach(visit);
  };

  visit(element);
  return lines;
}

function htmlToLines(html) {
  const container = document.createElement("div");
  container.innerHTML = html;
  return readPreviewOutput(container);
}

export default function App({
  levelNumber,
  levelLabel,
  levelTasks,
  toolbox,
  nextLevel,
  completionMessage,
  showPreview = false,
  rootBlockType,
}) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [json, setJson] = useState(null);
  const [result, setResult] = useState(null);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [outputView, setOutputView] = useState("page");
  const [outputHtml, setOutputHtml] = useState("");
  const [taskIndex, setTaskIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(() => new Set());
  const [completionPopupOpen, setCompletionPopupOpen] = useState(false);
  const [finalScreenOpen, setFinalScreenOpen] = useState(false);
  const [reward, setReward] = useState(null);
  const previewRef = useRef(null);
  const mainRef = useRef(null);
  const sideRef = useRef(null);
  const [layout, updateLayout] = useSideLayout();

  const maxSideWidth = () =>
    (mainRef.current?.clientWidth ?? Number.POSITIVE_INFINITY)
    - STAGE_MIN_WIDTH;
  const setSideWidth = (width) =>
    updateLayout({
      width: Math.round(
        clamp(width, SIDE_MIN_WIDTH, Math.max(SIDE_MIN_WIDTH, maxSideWidth())),
      ),
    });
  const setSplit = (split) =>
    updateLayout({ split: clamp(split, SPLIT_MIN, SPLIT_MAX) });

  const startWidthDrag = (event) =>
    dragPointer(event, (e) => {
      const main = mainRef.current.getBoundingClientRect();
      setSideWidth(main.right - 12 - e.clientX - 6);
    });
  const startSplitDrag = (event) =>
    dragPointer(event, (e) => {
      const side = sideRef.current.getBoundingClientRect();
      setSplit((e.clientY - side.top) / side.height);
    });

  const onWidthKey = (event) => {
    const step = { ArrowLeft: 20, ArrowRight: -20 }[event.key];
    if (!step) return;
    event.preventDefault();
    setSideWidth(layout.width + step);
  };
  const onSplitKey = (event) => {
    const step = { ArrowUp: -0.05, ArrowDown: 0.05 }[event.key];
    if (!step) return;
    event.preventDefault();
    setSplit(layout.split + step);
  };

  const blockCount = countBlocks(json);
  // Sandbox nima nalog, zato je currentTask lahko undefined
  const currentTask = levelTasks[taskIndex];
  const currentCompleted = Boolean(
    currentTask && completedTasks.has(currentTask.id),
  );
  const isLastTask = taskIndex === levelTasks.length - 1;
  const hasTasks = levelTasks.length > 0;

  const handleRun = useCallback(() => {
    previewRef.current?.replaceChildren();
    const execution = run(code);
    setResult({ ...execution, at: time() });
    setOutputHtml(formatHtml(previewRef.current));
    if (!execution.error && currentTask) {
      const taskOutput = showPreview
        ? readPreviewOutput(previewRef.current)
        : execution.output;
      const passed = currentTask.checks
        ? passesChecks(previewRef.current, currentTask.checks)
        : outputsMatch(taskOutput, htmlToLines(currentTask.expectedHtml))
          && containsRequiredBlocks(json, currentTask.requiredBlocks);
      if (passed) {
        setCompletedTasks((current) => new Set(current).add(currentTask.id));

        // Kovanci: vsaka naloga se izplača samo enkrat (shranjeno v localStorage).
        const gained = awardTask(`${levelNumber}:${currentTask.id}`);
        if (gained > 0) setReward({ coins: gained, id: Date.now() });
      }
    }
    setConsoleOpen(Boolean(execution.error));
    console.log("Run at", time(), "code:", code);
  }, [code, json, currentTask, levelNumber, showPreview]);

  const handleNextTask = () => {
    if (isLastTask) {
      setCompletionPopupOpen(true);
      return;
    }
    setTaskIndex((index) => index + 1);
    setResult(null);
    setOutputHtml("");
    previewRef.current?.replaceChildren();
  };

  useEffect(() => {
    if (!reward) return;
    const timer = setTimeout(() => setReward(null), 2800);
    return () => clearTimeout(timer);
  }, [reward]);

  // Ctrl + Enter = zaženi
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
      if (e.key === "Escape") setConsoleOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleRun]);

  const failed = Boolean(result?.error);

  const collapseButton = (
    <button
      type="button"
      className="side-toggle"
      onClick={() => updateLayout({ collapsed: true })}
      aria-label="Skrči stransko ploščo"
      title="Skrči stransko ploščo"
    >
      ›
    </button>
  );

  const handleContinue = () => {
    setCompletionPopupOpen(false);
    if (nextLevel) {
      navigate(`/level/${nextLevel}`);
    } else if (completionMessage) {
      setFinalScreenOpen(true);
    }
  };

  if (finalScreenOpen) {
    return (
      <main className="completion-screen">
        <h1>{completionMessage}</h1>
      </main>
    );
  }

  return (
    <div className="app">
      <header className="topbar" style={{ justifyContent: "right" }}>
        <Link to="/" className="btn small" style={{ marginRight: "auto" }}>
          🏠 Domov
        </Link>
        {levelLabel ? (
          <span className="level-label" style={{ marginRight: "auto" }}>
            {levelLabel}
          </span>
        ) : (
          levelNumber && (
            <span className="level-label">Level {levelNumber}</span>
          )
        )}
        <div className="topbar-actions">
          <CoinBadge />
          <button type="button" className="btn primary" onClick={handleRun}>
            <span aria-hidden="true">▶</span> Zaženi
            <kbd>Ctrl ↵</kbd>
          </button>
        </div>
      </header>

      <main
        ref={mainRef}
        className={`main${layout.collapsed ? " side-collapsed" : ""}`}
        style={{ "--side-width": `${layout.width}px` }}
      >
        <section className="stage" aria-label="Bloki in naloge">
          <div className="workspace-grid">
            <section
              className="workspace-pane blocks-pane"
              aria-labelledby="blocks-heading"
            >
              <div className="workspace-pane-head">
                <h2 id="blocks-heading">Blocks</h2>
              </div>
              <div className="blocks-canvas">
                <BlockEditor
                  className="editor"
                  toolbox={toolbox}
                  onCodeChange={setCode}
                  onJsonChange={setJson}
                  rootBlockType={rootBlockType}
                  storageKey={
                    currentTask
                      ? workspaceKey(currentTask)
                      : `workspace:${levelLabel ?? levelNumber}`
                  }
                  fallbackStorageKey={
                    taskIndex > 0
                      ? workspaceKey(levelTasks[taskIndex - 1])
                      : undefined
                  }
                />
                <section
                  className={`drawer${consoleOpen ? " open" : ""}`}
                  aria-label="Konzola"
                  aria-hidden={!consoleOpen}
                >
                  <div className="drawer-head">
                    <span className="drawer-title">Konzola</span>
                    {result && (
                      <span className={`status ${failed ? "bad" : "good"}`}>
                        {failed ? "✕ Napaka" : "✓ Uspešno"} · {result.at}
                      </span>
                    )}
                    <span className="spacer" />
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => setResult(null)}
                      title="Počisti"
                    >
                      Počisti
                    </button>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => setConsoleOpen(false)}
                      aria-label="Zapri konzolo"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="drawer-body">
                    {!result && (
                      <p className="muted">
                        Pritisni »Zaženi«, da se izpis prikaže tukaj.
                      </p>
                    )}
                    {result && (
                      <>
                        {result.output.length === 0 && !failed && (
                          <p className="muted">Program ni nič izpisal.</p>
                        )}
                        {result.output.map((line, i) => (
                          <div className="line" key={i}>
                            <span className="ln">{i + 1}</span>
                            <span className="txt">{line}</span>
                          </div>
                        ))}
                        {failed && (
                          <div className="line err">
                            <span className="ln">!</span>
                            <span className="txt">{result.error}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </section>
              </div>
            </section>
          </div>
        </section>

        {/* biome-ignore lint/a11y/useSemanticElements: <hr> can't be a focusable drag handle */}
        <div
          className="side-resizer"
          role="separator"
          aria-orientation="vertical"
          aria-label="Širina stranske plošče"
          aria-valuenow={layout.width}
          tabIndex={layout.collapsed ? -1 : 0}
          onPointerDown={layout.collapsed ? undefined : startWidthDrag}
          onKeyDown={layout.collapsed ? undefined : onWidthKey}
        />

        <aside
          ref={sideRef}
          className={`side${layout.collapsed ? " collapsed" : ""}`}
        >
          <button
            type="button"
            className="side-toggle side-expand"
            onClick={() => updateLayout({ collapsed: false })}
            aria-label="Razširi stransko ploščo"
            title="Razširi stransko ploščo"
          >
            ‹
          </button>

          {hasTasks && (
            <section
              className={`side-pane side-top${showPreview ? " has-split" : ""}`}
              style={
                showPreview
                  ? { flexBasis: `${layout.split * 100}%` }
                  : undefined
              }
              aria-labelledby="tasks-heading"
            >
              <div className="pane-head">
                <h2 id="tasks-heading">Naloge</h2>
                <span className="task-progress">
                  {taskIndex + 1}/{levelTasks.length}
                </span>
                <div className="pane-head-actions">{collapseButton}</div>
              </div>

              <div className="panel">
                <div className="tasks-panel">
                  <div className="task-list">
                    <article
                      className={`task-item${currentCompleted ? " completed" : ""}`}
                      key={currentTask.id}
                    >
                      <div className="task-heading">
                        <h3>{currentTask.title}</h3>
                        {currentCompleted && (
                          <span className="task-status">✓ Opravljeno</span>
                        )}
                      </div>
                      <p>{currentTask.description}</p>
                      {currentTask.theory && (
                        <div className="task-theory">
                          <strong>Teorija:</strong> {currentTask.theory}
                        </div>
                      )}
                      {currentTask.requiredBlocks?.length > 0 && (
                        <div className="task-requirements">
                          <strong>Obvezni bloki:</strong>{" "}
                          {currentTask.requiredBlocks.map(blockName).join(", ")}
                        </div>
                      )}
                      <ExpectedOutput
                        html={currentTask.expectedHtml}
                        view={outputView}
                        onViewChange={setOutputView}
                      />
                      {currentCompleted && (
                        <button
                          type="button"
                          className="btn primary small task-next"
                          onClick={handleNextTask}
                        >
                          {isLastTask ? "Zaključi level" : "Naslednja naloga →"}
                        </button>
                      )}
                    </article>
                  </div>
                </div>
              </div>
            </section>
          )}

          {showPreview && (
            <>
              {hasTasks && (
                <>
                  {/* biome-ignore lint/a11y/useSemanticElements: <hr> can't be a focusable drag handle */}
                  <div
                    className="side-split"
                    role="separator"
                    aria-orientation="horizontal"
                    aria-label="Razmerje med nalogo in izpisom"
                    aria-valuenow={Math.round(layout.split * 100)}
                    tabIndex={0}
                    onPointerDown={startSplitDrag}
                    onKeyDown={onSplitKey}
                  />
                </>
              )}
              <section
                className="side-pane side-bottom"
                aria-labelledby="output-heading"
              >
                <div className="pane-head">
                  <h2 id="output-heading">Tvoj izpis</h2>
                  <div className="pane-head-actions">
                    <ViewTabs view={outputView} onChange={setOutputView} />
                    {!hasTasks && collapseButton}
                  </div>
                </div>
                <div className="panel">
                  <div
                    id="output"
                    ref={previewRef}
                    className="preview-output"
                    hidden={outputView !== "page"}
                  />
                  {outputView === "html" && (
                    <pre className="code">
                      {outputHtml || "<!-- Pritisni »Zaženi« -->"}
                    </pre>
                  )}
                </div>
              </section>
            </>
          )}

          <footer className="stats">
            <div>
              <strong>{blockCount}</strong>
              <span>blokov</span>
            </div>
            <div>
              <strong>{result ? result.output.length : 0}</strong>
              <span>vrstic izpisa</span>
            </div>
          </footer>
        </aside>
      </main>
      {reward && (
        <div className="reward-toast" key={reward.id} role="status">
          +{reward.coins} 🪙
        </div>
      )}
      {completionPopupOpen && (
        <div className="completion-modal-backdrop" role="presentation">
          <section
            className="completion-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="completion-title"
          >
            <div className="completion-icon" aria-hidden="true">
              ✓
            </div>
            <h2 id="completion-title">Level je bil uspešno opravljen</h2>
            <p>Odlično delo! Vse naloge na tem levelu so zaključene.</p>
            <button
              type="button"
              className="btn primary"
              onClick={handleContinue}
            >
              Nadaljuj
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
