import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { passesChecks } from "./checks";
import { BlockEditor } from "./components/BlockEditor";
import { ExpectedOutput } from "./components/ExpectedOutput";
import { run } from "./interpreter";
import { TOOLBOX as defaultToolbox } from "./toolbox";
import "./App.css";
import { blockName } from "./blockNames";
import { blocks as defaultBlocks } from "./blocks.js";
import { forBlock as defaultGenerators } from "./generator";

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
  levelTasks = defaultTasks,
  toolbox = defaultToolbox,
  blockDefinitions = defaultBlocks,
  generators = defaultGenerators,
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
  const [tab, setTab] = useState("js");
  const [copied, setCopied] = useState(false);
  const [taskIndex, setTaskIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(() => new Set());
  const [completionPopupOpen, setCompletionPopupOpen] = useState(false);
  const [finalScreenOpen, setFinalScreenOpen] = useState(false);
  const previewRef = useRef(null);

  const blockCount = countBlocks(json);
  const currentTask = levelTasks[taskIndex];
  const currentCompleted = completedTasks.has(currentTask.id);
  const isLastTask = taskIndex === levelTasks.length - 1;

  const handleRun = useCallback(() => {
    previewRef.current?.replaceChildren();
    const execution = run(code);
    setResult({ ...execution, at: time() });
    if (!execution.error) {
      const taskOutput = showPreview
        ? readPreviewOutput(previewRef.current)
        : execution.output;
      const passed = currentTask.checks
        ? passesChecks(previewRef.current, currentTask.checks)
        : outputsMatch(taskOutput, htmlToLines(currentTask.expectedHtml))
          && containsRequiredBlocks(json, currentTask.requiredBlocks);
      if (passed) {
        setCompletedTasks((current) => new Set(current).add(currentTask.id));
      }
    }
    if (showPreview) setTab("preview");
    setConsoleOpen(Boolean(execution.error));
    console.log("Run at", time(), "code:", code);
  }, [code, json, currentTask, showPreview]);

  const handleNextTask = () => {
    if (isLastTask) {
      setCompletionPopupOpen(true);
      return;
    }
    setTaskIndex((index) => index + 1);
    setResult(null);
    previewRef.current?.replaceChildren();
  };

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

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const failed = Boolean(result?.error);

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
        {levelNumber && (
          <span className="level-label">Level {levelNumber}</span>
        )}
        <div className="topbar-actions">
          <button type="button" className="btn primary" onClick={handleRun}>
            <span aria-hidden="true">▶</span> Zaženi
            <kbd>Ctrl ↵</kbd>
          </button>
        </div>
      </header>

      <main className="main">
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
                  blocks={blockDefinitions}
                  forBlock={generators}
                  onCodeChange={setCode}
                  onJsonChange={setJson}
                  rootBlockType={rootBlockType}
                  storageKey={workspaceKey(currentTask)}
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

        <aside className="side">
          <div className="tabs" role="tablist">
            {showPreview && (
              <button
                type="button"
                role="tab"
                aria-selected={tab === "preview"}
                className={tab === "preview" ? "on" : ""}
                onClick={() => setTab("preview")}
              >
                Prikaz
              </button>
            )}
            <button
              type="button"
              role="tab"
              aria-selected={tab === "js"}
              className={tab === "js" ? "on" : ""}
              onClick={() => setTab("js")}
            >
              JavaScript
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "tasks"}
              className={tab === "tasks" ? "on" : ""}
              onClick={() => setTab("tasks")}
            >
              Naloge{currentCompleted && " ✓"}
            </button>
          </div>

          <div className="panel">
            {showPreview && (
              <div
                className={`preview-panel${tab === "preview" ? " active" : ""}`}
                aria-hidden={tab !== "preview"}
              >
                <p className="hint">Prikaz zgrajene spletne strani.</p>
                <div id="output" ref={previewRef} className="preview-output" />
              </div>
            )}
            {tab === "js" ? (
              <>
                <p className="hint">
                  Tako bi bili tvoji bloki videti kot prava koda!
                </p>
                <pre className="code">
                  {code.trim() || "// Povleci bloke v delovni prostor …"}
                </pre>
                <button
                  type="button"
                  className="btn small"
                  onClick={copy}
                  disabled={!code.trim()}
                >
                  {copied ? "Kopirano ✓" : "Kopiraj kodo"}
                </button>
              </>
            ) : tab === "tasks" ? (
              <div className="tasks-panel">
                <div className="tasks-panel-head">
                  <h2>Naloge</h2>
                  <span className="task-progress">
                    {taskIndex + 1}/{levelTasks.length}
                  </span>
                </div>
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
                    <ExpectedOutput html={currentTask.expectedHtml} />
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
            ) : null}
          </div>

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
