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

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  render(map) {
    this.context.map = map;

    this.el = createElement({
      className: "map-menu",
      style: {
        width: `${this.width}px`,
        ...this.style
      }
    });

    if (this.title) {
      this.el.appendChild(this.renderTitle());
    }

    map.on("idle", this.onMapReady);

    return this.el;
  }

  onMapReady = () => {
    const { map } = this.context;

    if (map.getStyle().layers.length > 0) {
      this.onStyleReady();
    }
  };

  onStyleReady() {
    map.off("idle", this.onMapReady);
    this.el.appendChild(this.renderItems());

    if (this.visible && !this.el.classList.contains("map-context-menu")) {
      this.show();
    }
  }

  renderTitle() {
    this.titleEl = createElement({
      className: "map-menu-title",
      properties: {
        textContent:
          typeof this.title === "function" ? this.title() : this.title
      }
    });

    return this.titleEl;
  }

  show() {
    this.el.style.display = "flex";
    this.visible = true;
  }

  hide() {
    this.el.style.display = "none";
    this.visible = false;
  }

  remove() {
    this.context.map.off("idle", this.onMapReady);
    this.context.map = undefined;
  }
}

export default Menu;
