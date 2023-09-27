class MenuItemSeparator {
  render() {
    this.element = document.createElement("div");
    this.element.classList.add("map-menu-item-separator");

    return this.element;
  }

  remove() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
  }
}

export default MenuItemSeparator;
