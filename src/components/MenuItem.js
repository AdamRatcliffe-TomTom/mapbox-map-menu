import createElement from "../functions/createElement";

class MenuItem {
  constructor({ label, onClick, style = {} } = {}) {
    this.label = label;
    this.onClick = onClick;
    this.style = style;
  }

  render(map) {
    this.map = map;
    this.element = createElement({
      className: "map-menu-item",
      style: this.style
    });

    if (typeof this.label === "function") {
      this.element.appendChild(this.label());
    } else {
      this.element.textContent = this.label;
    }

    if (typeof this.onClick === "function") {
      this.element.addEventListener("click", this.onClick);
    }

    return this.element;
  }

  remove() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
  }
}

export default MenuItem;
