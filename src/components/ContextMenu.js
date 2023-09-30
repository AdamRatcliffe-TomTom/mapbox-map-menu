import Menu from "./Menu";

const defaultOptions = {
  width: 180
};

class ContextMenu extends Menu {
  constructor(options) {
    super({ ...defaultOptions, ...options });

    this.hide = this.hide.bind();
  }

  render(map) {
    super.render(map);
    this.el.classList.add("map-context-menu");
    return this.el;
  }

  addToMap(map) {
    this.render(map);
    map.getContainer().appendChild(this.el);
    this.addEventListeners();
  }

  addEventListeners() {
    const { map } = this.context;

    map.on("contextmenu", this.handleContextMenu);
    map.on("move", this.hide);

    window.addEventListener("click", this.hide);
  }

  removeEventListeners() {
    const { map } = this.context;

    map.off("contextmenu", this.handleContextMenu);
    map.off("move", this.hide);

    window.removeEventListener("click", this.hide);
  }

  handleContextMenu = (event) => {
    this.context.lastContextMenuEvent = event;

    const { point } = event;
    this.setPosition(point);
    this.show();
  };

  setPosition = (point) => {
    const mapContainer = this.context.map.getContainer();
    const { offsetWidth: menuWidth, offsetHeight: menuHeight } = this.el;
    const { offsetWidth: mapWidth, offsetHeight: mapHeight } = mapContainer;

    if (point.x + menuWidth < mapWidth) {
      Object.assign(this.el.style, {
        left: `${point.x}px`,
        right: "auto"
      });
    } else {
      Object.assign(this.el.style, {
        right: `${mapWidth - point.x}px`,
        left: "auto"
      });
    }

    if (point.y + menuHeight < mapHeight) {
      Object.assign(this.el.style, {
        top: `${point.y}px`,
        bottom: "auto"
      });
    } else {
      Object.assign(this.el.style, {
        bottom: `${mapHeight - point.y}px`,
        top: "auto"
      });
    }
  };

  remove() {
    super.remove();
    this.removeEventListeners();
  }
}

export default ContextMenu;
