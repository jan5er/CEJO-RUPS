const query = (root, selector) =>
  Array.from(root.querySelectorAll(`:scope ${selector}`));

const textMatchers = {
  "not-empty": (text) => text !== "",
  empty: (text) => text === "",
  exact: (text, value) => text === String(value).trim(),
  contains: (text, value) => text.includes(String(value).trim()),
  regex: (text, value) =>
    (value instanceof RegExp ? value : new RegExp(value)).test(text),
};

const checkTypes = {
  exists: (root, { selector }) => query(root, selector).length > 0,
  text: (root, { selector, match, value }) => {
    const matches = textMatchers[match];
    if (!matches) throw new Error(`Neznan način primerjave besedila: ${match}`);
    return query(root, selector).some((element) =>
      matches(element.textContent.trim(), value),
    );
  },
  within: (root, { selector, checks }) =>
    query(root, selector).some((element) => passesChecks(element, checks)),
};

export function passesChecks(root, checks) {
  if (!root) return false;
  return checks.every((check) => {
    const run = checkTypes[check.type];
    if (!run) throw new Error(`Neznana vrsta preverjanja: ${check.type}`);
    return run(root, check);
  });
}
