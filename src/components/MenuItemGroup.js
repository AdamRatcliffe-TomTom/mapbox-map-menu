import createElement from "../functions/createElement";
import insertChildAtIndex from "../functions/insertChildAtIndex";

class MenuItemGroup {
  constructor() {
    if (new.target === MenuItemGroup) {
      throw new Error("Cannot directly instantiate MenuItemGroup");
    }

    this.items = [];
    this.filteredItems = [];
    this.filterString = "";
  }

  setFilter(filterString) {
    this.filterString = filterString.toLowerCase();
    this.filteredItems = this.items.filter((item) =>
      item.label.toLowerCase().includes(this.filterString)
    );

    this.itemContainerElement.innerHTML = "";
    this.filteredItems.forEach((item) => {
      this.itemContainerElement.appendChild(item.render(this.context));
    });
  }

  renderItems() {
    this.itemContainerElement = createElement({
      className: "map-menu-items"
    });

    this.filteredItems.forEach((item) => {
      this.itemContainerElement.appendChild(item.render(this.context));
    });

    return this.itemContainerElement;
  }

  addItem(item) {
    const shouldRenderItem = this.shouldRenderItem(item);

    this.items.push(item);
    if (shouldRenderItem) {
      this.filteredItems.push(item);
    }

    if (this.context?.map && this.itemContainerElement && shouldRenderItem) {
      this.itemContainerElement.appendChild(item.render(this.context));
    }
  }

  insertItem(item, index) {
    this.items.splice(index, 0, item);

    this.items.push(item);
    if (shouldRenderItem) {
      this.filteredItems.splice(index, 0, item);
    }

    if (
      this.context?.map &&
      this.itemContainerElement &&
      this.shouldRenderItem
    ) {
      insertChildAtIndex(
        this.itemContainerElement,
        item.render(this.context),
        index
      );
    }
  }

  shouldRenderItem(item) {
    return (
      this.filterString.length === 0 ||
      item.label.toLowerCase().includes(this.filterString)
    );
  }

  removeAllItems() {
    this.items.length = 0;
    this.filteredItems.length = 0;
    this.itemContainerElement.innerHTML = "";
  }

  getItems() {
    return this.items;
  }
}

export default MenuItemGroup;
