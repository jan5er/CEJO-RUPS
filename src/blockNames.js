const BLOCK_NAMES = new Map([
  ["text", "Besedilo"],
  ["math_number", "Število"],
  ["logic_compare", "Primerjava"],
  ["logic_boolean", "Logična vrednost"],
]);

export function namedBlock(name, definition) {
  BLOCK_NAMES.set(definition.type, name);
  return { ...definition, message0: `${name} ${definition.message0}` };
}

export const blockName = (type) => BLOCK_NAMES.get(type) ?? type;
