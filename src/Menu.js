import MenuItem from "./MenuItem";
import MenuItemSeparator from "./MenuItemSeparator";
import MenuSection from "./MenuSection";

class Menu {
  constructor({ title = "", width = 240, maxHeight = "auto" } = {}) {
    this.title = title;
    this.width = width;
    this.maxHeight = maxHeight;
    this.items = [];

    this.render();
  }

  render() {
    this.element = document.createElement("div");
    this.element.style.width = `${this.width}px`;
    this.element.style.maxHeight = `${this.maxHeight}px`;
    this.element.className = "mapboxgl-ctrl map-menu";

    if (this.title) {
      this.renderTitle();
    }

    this.itemContainer = document.createElement("div");
    this.itemContainer.className = "map-menu-items";
    this.element.appendChild(this.itemContainer);
  }

  renderTitle() {
    const titleElement = document.createElement("div");
    titleElement.textContent = this.title;
    titleElement.classList.add("map-menu-title");
    this.element.appendChild(titleElement);
  }

  addItem(item) {
    if (
      item instanceof MenuItem ||
      item instanceof MenuItemSeparator ||
      item instanceof MenuSection
    ) {
      this.items.push(item);
      this.itemContainer.appendChild(item.element);
    }
  }

  getItems() {
    return this.items;
  }

  onAdd(map) {
    this.map = map;
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
