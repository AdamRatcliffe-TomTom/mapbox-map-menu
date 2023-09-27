export default function insertChildAtIndex(parent, child, index) {
  if (index < 0 || index > parent.children.length) {
    throw new Error("Index out of range");
  }

  if (index === parent.children.length) {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, parent.children[index]);
  }
}
