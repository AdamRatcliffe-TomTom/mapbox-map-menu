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
      style: {
        width: `${this.width}px`,
        ...this.style
      }
    });

    return this.element;
  }

  onMapReady = () => {
    if (this.map.getStyle().layers.length > 0) {
      this.map.off("idle", this.onMapReady);

      // Only add the menu class after the map is ready as don't want to show it until the child items can be rendered,
      // alternative would be to show a spinner while the map is loading
      this.element.classList.add("map-menu");

      if (this.title) {
        this.element.appendChild(this.renderTitle());
      }

      this.element.appendChild(this.renderItems());
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
}

export default Menu;
