import createElement from "../functions/createElement";

class MenuItemSeparator {
  constructor({ style = {} } = {}) {
    this.style = style;
  }

  render() {
    this.el = createElement({
      className: "map-menu-item-separator",
      style: this.style
    });
    return this.el;
  }

  remove() {
    if (this.el && this.el.parentElement) {
      this.el.parentElement.removeChild(this.el);
    }
  }
}

export default MenuItemSeparator;
