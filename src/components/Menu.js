import MenuItemGroup from "./MenuItemGroup";
import createElement from "../functions/createElement";

class Menu extends MenuItemGroup {
  constructor({ title = "", width = 300, style = {} } = {}) {
    super();

    this.title = title;
    this.width = width;
    this.style = style;
    this.items = [];
  }

  render(map) {
    this.map = map;
    this.map.on("idle", this.onMapReady);
    this.element = createElement({
      className: "map-menu",
      style: {
        display: "none",
        width: `${this.width}px`,
        ...this.style
      }
    });

    return this.element;
  }

  onMapReady = () => {
    if (this.map.getStyle().layers.length > 0) {
      this.map.off("idle", this.onMapReady);

      if (this.title) {
        this.element.appendChild(this.renderTitle());
      }

      this.element.appendChild(this.renderItems());

      this.element.style.display = "block";
    }
  };

  renderTitle() {
    const titleElement = createElement({
      className: "map-menu-title",
      properties: {
        textContent: this.title
      }
    });

    return titleElement;
  }

  remove() {
    this.map.off("idle", this.onMapReady);
  }
}

export default Menu;
