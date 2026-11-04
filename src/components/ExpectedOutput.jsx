import { useEffect, useRef, useState } from "react";

/**
 * @param {object} props
 * @param {string} props.html
 */
export function ExpectedOutput({ html }) {
  const [view, setView] = useState("page");
  const pageRef = useRef(null);

  useEffect(() => {
    const host = pageRef.current;
    if (!host) return;
    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    root.innerHTML = html;
  }, [html, view]);

  return (
    <div className="expected-output">
      <div className="expected-output-head">
        <span>Pričakovan izpis</span>
        <div className="expected-output-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={view === "page"}
            className={view === "page" ? "on" : ""}
            onClick={() => setView("page")}
          >
            Prikaz
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "html"}
            className={view === "html" ? "on" : ""}
            onClick={() => setView("html")}
          >
            HTML
          </button>
        </div>
      </div>
      {view === "page" ? (
        <div ref={pageRef} className="expected-page" />
      ) : (
        <code>{html.trim()}</code>
      )}
    </div>
  );
}
