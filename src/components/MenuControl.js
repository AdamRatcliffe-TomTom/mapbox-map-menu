import Menu from "./Menu";

class MenuControl extends Menu {
  onAdd(map) {
    this.render(map);
    this.element.classList.add("mapboxgl-ctrl");

    return this.element;
  }

  onRemove() {
    this.element.parentNode.removeChild(this.element);
    this.map = undefined;
  }

  getDefaultPosition() {
    return "top-right";
  }
}

export default MenuControl;
