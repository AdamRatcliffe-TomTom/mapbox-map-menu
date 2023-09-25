class MenuItemSeparator {
  constructor() {
    this.render();
  }

  render() {
    this.element = document.createElement("div");
    this.element.classList.add("map-menu-item-separator");
  }

  remove() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
  }
}

export default MenuItemSeparator;
