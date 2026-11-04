const VOID_ELEMENTS = new Set(["br", "hr", "img", "input", "meta", "link"]);

const escapeText = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeAttribute = (value) => escapeText(value).replace(/"/g, "&quot;");

const isText = (node) => node.nodeType === Node.TEXT_NODE;

function formatNode(node, depth) {
  const indent = "  ".repeat(depth);

  if (isText(node)) {
    const text = node.textContent.trim();
    return text ? indent + escapeText(text) : null;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const tag = node.tagName.toLowerCase();
  const attributes = Array.from(node.attributes)
    .map(({ name, value }) => ` ${name}="${escapeAttribute(value)}"`)
    .join("");
  const open = `${indent}<${tag}${attributes}>`;
  if (VOID_ELEMENTS.has(tag)) return open;

  const close = `</${tag}>`;
  const children = Array.from(node.childNodes);
  if (children.every(isText)) {
    return `${open}${escapeText(node.textContent.trim())}${close}`;
  }
  return [open, formatChildren(node, depth + 1), indent + close].join("\n");
}

function formatChildren(node, depth) {
  return Array.from(node.childNodes)
    .map((child) => formatNode(child, depth))
    .filter(Boolean)
    .join("\n");
}

export const formatHtml = (node) => (node ? formatChildren(node, 0) : "");

export function formatHtmlString(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return formatHtml(template.content);
}
