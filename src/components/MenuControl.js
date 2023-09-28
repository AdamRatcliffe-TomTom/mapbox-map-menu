import Menu from "./Menu";
import createElement from "../functions/createElement";

class MenuControl extends Menu {
  onAdd(map) {
    this.render(map);
    this.element.classList.add("map-menu-control", "mapboxgl-ctrl");

    this.element.appendChild(this.renderMinimizeButton());

    return this.element;
  }

  renderMinimizeButton() {
    const buttonElement = createElement({
      tagName: "button",
      className: "map-menu-control-minimize-button"
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
