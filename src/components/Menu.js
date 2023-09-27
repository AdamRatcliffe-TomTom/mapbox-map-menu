import MenuItemGroup from "./MenuItemGroup";
import createElement from "../functions/createElement";

class Menu extends MenuItemGroup {
  constructor({ title = "", width = 300, maxHeight = "auto" } = {}) {
    super();

    this.title = title;
    this.width = width;
    this.maxHeight = maxHeight;
    this.items = [];
  }

  render(map) {
    this.map = map;
    this.map.on("idle", this.onMapReady);
    this.element = createElement({
      styles: {
        width: `${this.width}px`,
        maxHeight: `${this.maxHeight}px`
      }
    });

    return this.element;
  }

  onMapReady = () => {
    if (this.map.getStyle().layers.length > 0) {
      this.map.off("idle", this.onMapReady);

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
    // titleElement.textContent = this.title;

    return titleElement;
  }
}

export default Menu;
