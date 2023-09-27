import createElement from "../functions/createElement";

class MenuItemSeparator {
  constructor({ style = {} } = {}) {
    this.style = style;
  }

  render() {
    this.element = createElement({
      className: "map-menu-item-separator",
      style: this.style
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
