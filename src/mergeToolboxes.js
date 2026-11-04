export function mergeToolboxes(...toolboxes) {
  const categories = new Map();
  for (const toolbox of toolboxes) {
    for (const item of toolbox.contents) {
      if (item.kind !== "category") continue;
      const current = categories.get(item.name);
      if (!current) {
        categories.set(item.name, {
          ...item,
          contents: [...(item.contents ?? [])],
        });
        continue;
      }
      for (const entry of item.contents ?? []) {
        const duplicate = current.contents.some(
          (existing) => existing.type && existing.type === entry.type,
        );
        if (!duplicate) current.contents.push(entry);
      }
    }
  }
  return { kind: "categoryToolbox", contents: [...categories.values()] };
}
