import LegendSymbol from "@watergis/legend-symbol";
import MenuItem from "./MenuItem";
import createElement from "../functions/createElement";
import symbolToElement from "../functions/symbolToElement";

class LayerMenuItem extends MenuItem {
  constructor(options = {}) {
    super(options);

    const { layerId, showSymbol = true } = options;
    this.layerId = layerId;
    this.showSymbol = showSymbol;
  }

  render(map) {
    this.map = map;
    const { sprite, layers } = map.getStyle();
    const zoom = map.getZoom();
    const layer = layers.find((layer) => layer.id === this.layerId);

    if (!layer) {
      throw new Error(`Layer ${this.layerId} does not exist on map`);
    }

    this.element = createElement({
      className: "map-menu-item map-layer-menu-item",
      style: this.style
    });

    if (this.showSymbol) {
      const symbol = LegendSymbol({ sprite, zoom, layer });
      const svg = symbolToElement(symbol);
      this.element.appendChild(svg);
      this.element.style.gridTemplateColumns = "20px 1fr 20px";
    } else {
      this.element.style.gridTemplateColumns = "1fr 20px";
    }

    const labelElement = createElement({
      className: "map-layer-menu-item-label",
      properties: {
        textContent: this.label
      }
    });
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
