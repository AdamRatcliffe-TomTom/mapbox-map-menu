export default function createElement({
  tagName = "div",
  attributes,
  properties,
  styles,
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

  if (styles) {
    Object.assign(element.style, styles);
  }

  if (className) {
    element.className = className;
  }

  return element;
}
