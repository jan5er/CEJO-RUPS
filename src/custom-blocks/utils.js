export const valueInput = (name, check = "String") => ({
  type: "input_value",
  name,
  check,
});

const CONTAINER_TYPE = "container_level1";

const containerDepth = (container) => {
  let depth = 0;
  for (let b = container; b; b = b.getSurroundParent()) {
    if (b.type === CONTAINER_TYPE) depth++;
  }
  return depth;
};

export const containerVariable = (container) =>
  `container${containerDepth(container)}`;

export function parentElement(block) {
  for (let b = block.getSurroundParent(); b; b = b.getSurroundParent()) {
    if (b.type === CONTAINER_TYPE) return containerVariable(b);
  }
  return `document.getElementById("output")`;
}
