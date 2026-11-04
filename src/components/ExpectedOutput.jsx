import { useEffect, useMemo, useRef } from "react";
import { formatHtmlString } from "../formatHtml";

/**
 * @param {object} props
 * @param {"page" | "html"} props.view
 * @param {(view: "page" | "html") => void} props.onChange
 */
export function ViewTabs({ view, onChange }) {
  return (
    <div className="expected-output-tabs" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={view === "page"}
        className={view === "page" ? "on" : ""}
        onClick={() => onChange("page")}
      >
        Prikaz
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={view === "html"}
        className={view === "html" ? "on" : ""}
        onClick={() => onChange("html")}
      >
        HTML
      </button>
    </div>
  );
}

/**
 * @param {object} props
 * @param {string} props.html
 * @param {"page" | "html"} props.view
 * @param {(view: "page" | "html") => void} props.onViewChange
 */
export function ExpectedOutput({ html, view, onViewChange }) {
  const pageRef = useRef(null);
  const formatted = useMemo(() => formatHtmlString(html), [html]);

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
        <ViewTabs view={view} onChange={onViewChange} />
      </div>
      {view === "page" ? (
        <div ref={pageRef} className="expected-page" />
      ) : (
        <code>{formatted}</code>
      )}
    </div>
  );
}
