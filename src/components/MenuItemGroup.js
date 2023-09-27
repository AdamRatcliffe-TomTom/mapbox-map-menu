import createElement from "../functions/createElement";
import insertChildAtIndex from "../functions/insertChildAtIndex";

class MenuItemGroup {
  constructor() {
    if (new.target === MenuItemGroup) {
      throw new Error("Cannot directly instantiate MenuItemGroup");
    }

    this.items = [];
  }

  renderItems() {
    this.itemContainer = createElement({
      className: "map-menu-items"
    });

    this.items.forEach((item) => {
      this.itemContainer.appendChild(item.render(this.map));
    });

    return this.itemContainer;
  }

  addItem(item) {
    this.items.push(item);

    if (this.map && this.itemContainer) {
      this.itemContainer.appendChild(item.render(this.map));
    }
  }

  insertItem(item, index) {
    this.items.splice(index, 0, item);

    if (this.map && this.itemContainer) {
      insertChildAtIndex(this.itemContainer, item.render(this.map), index);
    }
  }

  getItems() {
    return this.items;
  }
}

export default MenuItemGroup;
