import createElement from "../functions/createElement";
import insertChildAtIndex from "../functions/insertChildAtIndex";

class MenuItemGroup {
  constructor() {
    if (new.target === MenuItemGroup) {
      throw new Error("MenuItemGroup should not be instantiated directly");
    }

    this.items = [];
    this.filteredItems = [];
    this.filterString = "";
    this.itemContainerEl = createElement({
      className: "map-menu-items"
    });
  }

  renderItems() {
    this.items.forEach((item) => item.remove());

    this.filteredItems.forEach((item) => {
      this.itemContainerEl.appendChild(item.render(this.context));
    });

    return this.itemContainerEl;
  }

  addItem(item) {
    const shouldRenderItem = this.shouldRenderItem(item);

    this.items.push(item);

    if (shouldRenderItem) {
      this.filteredItems.push(item);
    }

    if (this.context?.map && this.context.styleReady && shouldRenderItem) {
      this.itemContainerEl.appendChild(item.render(this.context));
    }
  }

  insertItem(item, index) {
    this.items.splice(index, 0, item);

    this.items.push(item);
    if (shouldRenderItem) {
      this.filteredItems.splice(index, 0, item);
    }

    if (this.context?.map && this.context.styleReady && this.shouldRenderItem) {
      insertChildAtIndex(
        this.itemContainerEl,
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
    this.items.forEach((item) => item.remove());
    this.items.length = 0;
    this.filteredItems.length = 0;
  }

  getItems() {
    return this.items;
  }

  setFilter(filterString) {
    this.filterString = filterString.toLowerCase();
    this.updateFilteredItems();
  }

  updateFilteredItems() {
    this.filteredItems = this.items.filter((item) =>
      item.label.toLowerCase().includes(this.filterString)
    );

    this.renderItems();
  }

  remove() {
    this.removeAllItems();
  }
}

export default MenuItemGroup;
