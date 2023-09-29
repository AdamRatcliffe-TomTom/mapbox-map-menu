import MenuItemGroup from "./MenuItemGroup";
import createElement from "../functions/createElement";

class MenuSection extends MenuItemGroup {
  constructor({ title = "", style = {} } = {}) {
    super();

    this.title = title;
    this.style = style;
  }

  render(context) {
    this.context = context;

    this.el = createElement({
      className: "map-menu-section",
      style: this.style
    });

    if (this.title) {
      this.el.appendChild(this.renderTitle());
    }

    this.el.appendChild(this.renderItems());

    return this.el;
  }

  renderTitle() {
    const titleEl = createElement({
      className: "map-menu-section-title",
      properties: {
        textContent:
          typeof this.title === "function" ? this.title() : this.title
      }
    });

    return titleEl;
  }

  remove() {
    if (this.el && this.el.parentElement) {
      this.el.parentElement.removeChild(this.el);
    }
  }
}

export default MenuSection;
