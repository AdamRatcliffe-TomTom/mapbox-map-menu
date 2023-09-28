import MenuItemGroup from "./MenuItemGroup";
import MenuContext from "./MenuContext";
import createElement from "../functions/createElement";

class Menu extends MenuItemGroup {
  constructor({ title = "", width = 240, visible = true, style = {} } = {}) {
    super();

    this.title = title;
    this.width = width;
    this.style = style;
    this.visible = visible;
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

    if (this.title) {
      this.element.appendChild(this.renderTitle());
    }

    map.on("idle", this.onMapReady);

    return this.element;
  }

  onMapReady = () => {
    const { map } = this.context;

    if (map.getStyle().layers.length > 0) {
      this.onStyleReady();
    }
  };

  onStyleReady() {
    map.off("idle", this.onMapReady);
    this.element.appendChild(this.renderItems());

    if (this.visible && !this.element.classList.contains("map-context-menu")) {
      this.show();
    }
  }

  renderTitle() {
    this.titleElement = createElement({
      className: "map-menu-title",
      properties: {
        textContent:
          typeof this.title === "function" ? this.title() : this.title
      }
    });

    return this.titleElement;
  }

  show() {
    this.element.style.display = "flex";
    this.visible = true;
  }

  hide() {
    this.element.style.display = "none";
    this.visible = false;
  }

  remove() {
    this.context.map.off("idle", this.onMapReady);
    this.context.map = undefined;
  }
}

export default Menu;
