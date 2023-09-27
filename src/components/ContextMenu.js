import Menu from "./Menu";
import merge from "lodash.merge";

const defaultOptions = {
  width: 180,
  style: { position: "absolute", display: "none" }
};

class ContextMenu extends Menu {
  constructor(options) {
    super(merge(defaultOptions, options));
  }

  addToMap(map) {
    this.render(map);
    map.getContainer().appendChild(this.element);

    map.on("contextmenu", this.handleContextMenu);

    document.addEventListener("click", this.hide.bind(this));
  }

  handleContextMenu = (event) => {
    const { point } = event;
    this.setPosition(point);
    this.show();
  };

  setPosition(point) {
    this.element.style.left = `${point.x}px`;
    this.element.style.top = `${point.y}px`;
  }

  show() {
    this.element.style.display = "block";
  }

  hide() {
    this.element.style.display = "none";
  }
}

export default ContextMenu;
