import MenuItemGroup from "./MenuItemGroup";

class Menu extends MenuItemGroup {
  constructor({ title = "", width = 240, maxHeight = "auto" } = {}) {
    super();

    this.title = title;
    this.width = width;
    this.maxHeight = maxHeight;
    this.items = [];
  }

  render() {
    this.element = document.createElement("div");
    this.element.style.width = `${this.width}px`;
    this.element.style.maxHeight = `${this.maxHeight}px`;
    this.element.className = "mapboxgl-ctrl map-menu";

    if (this.title) {
      this.element.appendChild(this.renderTitle());
    }

    this.element.appendChild(this.renderItems());

    return this.element;
  }

  renderTitle() {
    const titleElement = document.createElement("div");
    titleElement.textContent = this.title;
    titleElement.classList.add("map-menu-title");
    return titleElement;
  }

  onAdd(map) {
    this.map = map;

    this.render();

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

export default Menu;
