import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { BlockEditor } from "./components/BlockEditor";
import { run } from "./interpreter";
import { TOOLBOX as defaultToolbox } from "./toolbox";
import "./App.css";
import { blocks as defaultBlocks } from "./blocks.js";
import { forBlock as defaultGenerators } from "./generator";
import { outputsMatch, tasks as defaultTasks } from "./tasks";

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

const time = () => new Date().toLocaleTimeString("sl-SI");

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

export default function App({ levelNumber, levelTasks = defaultTasks, toolbox = defaultToolbox, blockDefinitions = defaultBlocks, generators = defaultGenerators, nextLevel, showPreview = false }) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [json, setJson] = useState(null);
  const [result, setResult] = useState(null);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [tab, setTab] = useState("js");
  const [copied, setCopied] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(() => new Set());
  const previewRef = useRef(null);

  const blockCount = countBlocks(json);

  const handleRun = useCallback(() => {
    previewRef.current?.replaceChildren();
    const execution = run(code);
    setResult({ ...execution, at: time() });
    if (!execution.error) {
      const taskOutput = showPreview ? readPreviewOutput(previewRef.current) : execution.output;
      setCompletedTasks((current) => {
        const next = new Set(current);
        levelTasks.forEach((task) => {
          if (outputsMatch(taskOutput, task.expectedOutput)) next.add(task.id);
        });
        return next;
      });
    }
    if (showPreview) setTab("preview");
    setConsoleOpen(true);
    console.log("Run at", time(), "code:", code);
  }, [code, levelTasks, showPreview]);

  useEffect(() => {
    if (nextLevel && completedTasks.size === levelTasks.length) {
      navigate(`/level/${nextLevel}`);
    }
  }, [completedTasks, levelTasks.length, navigate, nextLevel]);

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
    } catch {

    }
  };

  const failed = Boolean(result?.error);

  return (
    <div className="app">
      <header className="topbar" style={{ "justifyContent": "right" }}>
        {levelNumber && <span className="level-label">Level {levelNumber}</span>}
        <div className="topbar-actions">
          <button type="button" className="btn" onClick={() => setConsoleOpen((o) => !o)} aria-pressed={consoleOpen}>
            Konzola
          </button>
          <button type="button" className="btn primary" onClick={handleRun}>
            <span aria-hidden="true">▶</span> Zaženi
            <kbd>Ctrl ↵</kbd>
          </button>
        </div>
      </header>

      <main className="main">
        <section className="stage" aria-label="Blocks and Tasks workspace">
          <div className="workspace-grid">
            <section className="workspace-pane blocks-pane" aria-labelledby="blocks-heading">
              <div className="workspace-pane-head">
                <h2 id="blocks-heading">Blocks</h2>
              </div>
              <div className="blocks-canvas">
                <BlockEditor className="editor" toolbox={toolbox} blocks={blockDefinitions} forBlock={generators} onCodeChange={setCode} onJsonChange={setJson} />

                {blockCount === 0 && (
                  <div className="empty" aria-hidden="true">
                    <div className="empty-emoji">🧩</div>
                    <p>Povleci bloke iz menija na levi in jih zloži sem</p>
                  </div>
                )}
                <div className={`drawer${consoleOpen ? " open" : ""}`} role="region" aria-label="Konzola" aria-hidden={!consoleOpen}>
                  <div className="drawer-head">
                    <span className="drawer-title">Konzola</span>
                    {result && (
                      <span className={`status ${failed ? "bad" : "good"}`}>
                        {failed ? "✕ Napaka" : "✓ Uspešno"} · {result.at}
                      </span>
                    )}
                    <span className="spacer" />
                    <button type="button" className="icon-btn" onClick={() => setResult(null)} title="Počisti">
                      Počisti
                    </button>
                    <button type="button" className="icon-btn" onClick={() => setConsoleOpen(false)} aria-label="Zapri konzolo">
                      ✕
                    </button>
                  </div>

                  <div className="drawer-body">
                    {!result && <p className="muted">Pritisni »Zaženi«, da se izpis prikaže tukaj.</p>}
                    {result && (
                      <>
                        {result.output.length === 0 && !failed && <p className="muted">Program ni nič izpisal.</p>}
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
                </div>
              </div>
            </section>

            <section className="workspace-pane tasks-pane" aria-labelledby="tasks-heading">
              <div className="workspace-pane-head">
                <h2 id="tasks-heading">Tasks</h2>
                <span className="task-progress">{completedTasks.size}/{levelTasks.length}</span>
              </div>
              <div className="task-list">
                {levelTasks.map((task) => {
                  const completed = completedTasks.has(task.id);

                  return (
                    <article className={`task-item${completed ? " completed" : ""}`} key={task.id}>
                      <div className="task-heading">
                        <h3>{task.title}</h3>
                        {completed && <span className="task-status">✓ Completed</span>}
                      </div>
                      <p>{task.description}</p>
                      <div className="expected-output">
                        <span>Expected output</span>
                        <code>{task.expectedOutput.join("\n")}</code>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </section>

        <aside className="side">
          <div className="tabs" role="tablist">
            {showPreview && (
              <button type="button" role="tab" aria-selected={tab === "preview"} className={tab === "preview" ? "on" : ""} onClick={() => setTab("preview")}>
                Prikaz
              </button>
            )}
            <button type="button" role="tab" aria-selected={tab === "js"} className={tab === "js" ? "on" : ""} onClick={() => setTab("js")}>
              JavaScript
            </button>
            <button type="button" role="tab" aria-selected={tab === "json"} className={tab === "json" ? "on" : ""} onClick={() => setTab("json")}>
              JSON
            </button>
          </div>

          <div className="panel">
            {showPreview && (
              <div className={`preview-panel${tab === "preview" ? " active" : ""}`} aria-hidden={tab !== "preview"}>
                <p className="hint">Prikaz zgrajene spletne strani.</p>
                <div id="output" ref={previewRef} className="preview-output" />
              </div>
            )}
            {tab === "js" ? (
              <>
                <p className="hint">Tako bi bili tvoji bloki videti kot prava koda!</p>
                <pre className="code">{code.trim() || "// Povleci bloke v delovni prostor …"}</pre>
                <button type="button" className="btn small" onClick={copy} disabled={!code.trim()}>
                  {copied ? "Kopirano ✓" : "Kopiraj kodo"}
                </button>
              </>
            ) : tab === "json" ? (
              <>
                <p className="hint">Serializirana oblika blokov, iz katere interpreter izvede program.</p>
                <pre className="code">{json ? JSON.stringify(json, null, 2) : "—"}</pre>
              </>
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
    </div>
  );
}