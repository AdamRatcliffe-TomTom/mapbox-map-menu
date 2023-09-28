import Menu from "./Menu";
import createElement from "../functions/createElement";

class MenuControl extends Menu {
  constructor(options) {
    super(options);

    this.container = createElement({
      className: "mapboxgl-ctrl"
    });
  }

  onAdd(map) {
    this.render(map);

    this.element.classList.add("map-menu-control");
    this.element.appendChild(this.renderMinimizeButton());
    this.container.appendChild(this.element);

    return this.container;
  }

  renderMinimizeButton() {
    const buttonElement = createElement({
      tagName: "button",
      className: "map-menu-control-minimize-button",
      properties: {
        title: "Minimize"
      }
    });
    return buttonElement;
  }

  onRemove() {
    this.remove();
    this.context.map = undefined;
  }

  getDefaultPosition() {
    return "top-right";
  }
}

export default MenuControl;
