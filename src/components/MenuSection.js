import MenuItemGroup from "./MenuItemGroup";

class MenuSection extends MenuItemGroup {
  constructor({ title = "" } = {}) {
    super();

    this.title = title;
  }

  render(map) {
    this.map = map;
    this.element = document.createElement("div");
    this.element.classList.add("map-menu-section");

    if (this.title) {
      this.element.appendChild(this.renderTitle());
    }

    this.element.appendChild(this.renderItems());

    return this.element;
  }

  renderTitle() {
    const titleElement = document.createElement("div");
    titleElement.textContent = this.title;
    titleElement.classList.add("map-menu-section-title");

    return titleElement;
  }

  remove() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
  }
}

export default MenuSection;
