import MenuItem from "./MenuItem";

class Menu {
  constructor({ title = "", width = 240 } = {}) {
    this.width = width;
    this.title = title;
    this.items = [];

    this.render();
  }

  render() {
    this.container = document.createElement("div");
    this.container.style.width = `${this.width}px`;
    this.container.className = "mapboxgl-ctrl map-menu";

    if (this.title) {
      this.renderTitle();
    }

    this.itemContainer = document.createElement("div");
    this.itemContainer.className = "mapbox-map-menu-items";
    this.container.appendChild(this.itemContainer);
  }

  renderTitle() {
    const titleElement = document.createElement("div");
    titleElement.textContent = this.title;
    titleElement.classList.add("map-menu-title");
    this.container.appendChild(titleElement);
  }

  addItem(item) {
    if (item instanceof MenuItem) {
      this.items.push(item);
      this.itemContainer.appendChild(item.element);
    }
  }

  getItems() {
    return this.items;
  }

  onAdd(map) {
    this.map = map;
    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }

  getDefaultPosition() {
    return "top-right";
  }
}

export default Menu;
