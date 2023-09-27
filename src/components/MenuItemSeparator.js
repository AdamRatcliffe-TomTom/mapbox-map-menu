import createElement from "../functions/createElement";

class MenuItemSeparator {
  render() {
    this.element = createElement({
      className: "map-menu-item-separator"
    });
    return this.element;
  }

  remove() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
  }
}

export default MenuItemSeparator;
