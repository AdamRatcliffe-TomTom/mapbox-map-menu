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

    const labelContent =
      typeof this.label === "function" ? this.label() : this.label;
    this.el.append(labelContent);

    if (typeof this.onClick === "function") {
      this.el.addEventListener("click", this.handleItemClick);
    }

    return this.el;
  }

  handleItemClick = () => {
    this.onClick(this.context.lastContextMenuEvent);
  };

  remove() {
    if (this.el) {
      this.el.removeEventListener("click", this.handleItemClick);

      if (this.el.parentElement) {
        this.el.parentElement.removeChild(this.el);
      }
    }
  }
}

export default MenuItem;
