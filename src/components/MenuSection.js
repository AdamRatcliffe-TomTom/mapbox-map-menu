import MenuItemGroup from "./MenuItemGroup";
import createElement from "../functions/createElement";

class MenuSection extends MenuItemGroup {
  constructor({ title = "", style = {} } = {}) {
    super();

    this.title = title;
    this.style = style;
  }

  render(map) {
    this.map = map;
    this.element = createElement({
      className: "map-menu-section",
      style: this.style
    });

    if (this.title) {
      this.element.appendChild(this.renderTitle());
    }

    this.element.appendChild(this.renderItems());

    return this.element;
  }

  renderTitle() {
    const titleElement = createElement({
      className: "map-menu-section-title",
      properties: {
        textContent: this.title
      }
    });

    return titleElement;
  }

  remove() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
  }
}

export default MenuSection;
