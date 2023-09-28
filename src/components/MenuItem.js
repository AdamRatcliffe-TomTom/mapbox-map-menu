import createElement from "../functions/createElement";

class MenuItem {
  constructor({ label, onClick = () => {}, style = {} } = {}) {
    this.label = label;
    this.onClick = onClick;
    this.style = style;
  }

  render(context) {
    this.context = context;

    this.el = createElement({
      className: "map-menu-item",
      style: this.style
    });

    if (typeof this.label === "function") {
      this.el.appendChild(this.label());
    } else {
      this.el.textContent = this.label;
    }

    if (typeof this.onClick === "function") {
      this.el.addEventListener("click", () =>
        this.onClick(this.context.lastContextMenuEvent)
      );
    }

    return this.el;
  }

  remove() {
    if (this.el && this.el.parentElement) {
      this.el.parentElement.removeChild(this.el);
    }
  }
}

export default MenuItem;
