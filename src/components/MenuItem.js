import createElement from "../functions/createElement";

class MenuItem {
  constructor({ label, onClick = () => {}, style = {} } = {}) {
    this.label = label;
    this.onClick = onClick;
    this.style = style;
  }

  render(context) {
    this.context = context;

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
      this.element.addEventListener("click", () =>
        this.onClick(this.context.lastContextMenuEvent)
      );
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
