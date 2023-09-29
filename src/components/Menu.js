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

    map.on("idle", this.onMapIdle);

    return this.el;
  }

  onMapIdle = () => {
    const { map } = this.context;

    if (map.getStyle().layers.length > 0) {
      this.onStyleReady();
    }
  };

  onStyleReady() {
    this.context.styleReady = true;

    map.off("idle", this.onMapIdle);

    this.el.appendChild(this.renderItems());

    if (this.visible && !this.el.classList.contains("map-context-menu")) {
      this.show();
    }
  }

  renderTitle() {
    const titleText =
      typeof this.title === "function" ? this.title() : this.title;
    this.titleEl = createElement({
      className: "map-menu-title",
      properties: {
        textContent: titleText
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
    const { map } = this.context;
    map.off("idle", this.onMapIdle);
    map = undefined;
  }
}

export default Menu;
