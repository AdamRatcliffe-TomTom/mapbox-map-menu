import MenuItemGroup from "./MenuItemGroup";
import MenuContext from "./MenuContext";
import createElement from "../functions/createElement";

class Menu extends MenuItemGroup {
  constructor({ title = "", width = 240, style = {} } = {}) {
    super();

    this.title = title;
    this.width = width;
    this.style = style;
    this.items = [];
    this.context = new MenuContext();
  }

  render(map) {
    this.context.map = map;

    this.element = createElement({
      className: "map-menu",
      style: {
        width: `${this.width}px`,
        ...this.style
      }
    });

    map.on("idle", this.onMapReady);

    return this.element;
  }

  onMapReady = () => {
    const { map } = this.context;

    if (map.getStyle().layers.length > 0) {
      map.off("idle", this.onMapReady);

      if (this.title) {
        this.element.appendChild(this.renderTitle());
      }

      this.element.appendChild(this.renderItems());

      if (!this.element.classList.contains("map-context-menu")) {
        this.show();
      }
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

  show = () => {
    this.element.style.opacity = 1;
    this.element.style.pointerEvents = "all";
  };

  hide = () => {
    this.element.style.opacity = 0;
    this.element.style.pointerEvents = "none";
  };

  remove() {
    this.context.map.off("idle", this.onMapReady);
  }
}

export default Menu;
