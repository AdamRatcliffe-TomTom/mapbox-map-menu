import MenuItem from "./MenuItem";

class LayerMenuItem extends MenuItem {
  constructor(options = {}) {
    super(options);
    this.layerId = options.layerId;
  }

  render(map) {
    this.map = map;

    if (this.map.getLayer(this.layerId)) {
      throw new Error(`Layer ${this.layerId} does not exist on map`);
    }

    this.element = document.createElement("div");
    this.element.classList.add("map-menu-item", "map-menu-item-flex-layout");

    const labelElement = document.createElement("div");
    labelElement.textContent = this.label;
    this.element.appendChild(labelElement);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.addEventListener("click", this.handleToggle);
    this.element.appendChild(checkbox);

    return this.element;
  }

  handleToggle = (event) => {
    const { checked } = event.target;
    const visibility = checked ? "visible" : "none";
    this.setLayerVisibility(visibility);
  };

  setLayerVisibility(visibility) {
    this.map.setLayoutProperty(this.layerId, "visibility", visibility);
  }
}

export default LayerMenuItem;
