import Header from "./Header";
import MenuItemGroup from "./MenuItemGroup";
import MenuContext from "./MenuContext";
import Loader from "./Loader";
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
      this.header = new Header({ parent: this.el, title: this.title });
    }

    this.loader = new Loader();
    this.el.appendChild(this.loader.render());

    // Don't render the menu items and show the menu until the map's style
    // is available
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

    this.loader.remove();

    this.el.appendChild(this.renderItems());

    if (this.visible && !this.el.classList.contains("map-context-menu")) {
      this.show();
    }
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
    super.remove();

    if (this.el.parentElement) {
      this.el.parentElement.removeChild(this.el);
    }

    const { map } = this.context;
    map.off("idle", this.onMapIdle);
    map = undefined;
  }
}

export default Menu;
