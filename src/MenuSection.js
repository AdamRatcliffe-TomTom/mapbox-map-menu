import MenuItem from "./MenuItem";
import MenuItemSeparator from "./MenuItemSeparator";

class MenuSection {
  constructor({ title = "" } = {}) {
    this.title = title;
    this.items = [];
  }

  render(map) {
    this.map = map;
    this.element = document.createElement("div");
    this.element.classList.add("map-menu-section");

    if (this.title) {
      this.renderTitle();
    }

    this.itemContainer = document.createElement("div");
    this.itemContainer.className = "map-menu-section-items";
    this.element.appendChild(this.itemContainer);

    this.items.forEach((item) => {
      this.itemContainer.appendChild(item.render(map));
    });

    return this.element;
  }

  renderTitle() {
    const titleElement = document.createElement("div");
    titleElement.textContent = this.title;
    titleElement.classList.add("map-menu-section-title");
    this.element.appendChild(titleElement);
  }

  addItem(item) {
    if (item instanceof MenuItem || item instanceof MenuItemSeparator) {
      this.items.push(item);
    }
  }

  getItems() {
    return this.items;
  }

  remove() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
  }
}

export default MenuSection;
