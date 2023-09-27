import MenuItemGroup from "./MenuItemGroup";

class Menu extends MenuItemGroup {
  constructor({ title = "", width = 300, maxHeight = "auto" } = {}) {
    super();

    this.title = title;
    this.width = width;
    this.maxHeight = maxHeight;
    this.items = [];
  }

  render(map) {
    this.map = map;
    this.map.on("idle", this.onMapReady);
    this.element = document.createElement("div");

    return this.element;
  }

  onMapReady = () => {
    if (this.map.getStyle().layers.length > 0) {
      this.map.off("idle", this.onMapReady);

      this.element.style.width = `${this.width}px`;
      this.element.style.maxHeight = `${this.maxHeight}px`;
      this.element.classList.add("map-menu");

      if (this.title) {
        this.element.appendChild(this.renderTitle());
      }

      this.element.appendChild(this.renderItems());
    }
  };

  renderTitle() {
    const titleElement = document.createElement("div");
    titleElement.textContent = this.title;
    titleElement.classList.add("map-menu-title");

    return titleElement;
  }
}

export default Menu;
