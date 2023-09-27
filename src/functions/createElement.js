export default function createElement({
  tagName = "div",
  attributes,
  properties,
  style,
  className
} = {}) {
  const element = document.createElement(tagName);

  if (attributes) {
    for (const [attrName, attrValue] of Object.entries(attributes)) {
      element.setAttribute(attrName, attrValue);
    }
  }

  if (properties) {
    Object.assign(element, properties);
  }

  if (style) {
    Object.assign(element.style, style);
  }

  if (className) {
    element.className = className;
  }

  return element;
}
