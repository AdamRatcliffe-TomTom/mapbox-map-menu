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

  render(context) {
    this.context = context;

    const { map } = context;
    const { sprite, layers } = map.getStyle();
    const zoom = map.getZoom();
    const layer = layers.find((layer) => layer.id === this.layerId);

    if (!layer) {
      throw new Error(`Layer ${this.layerId} does not exist on map`);
    }

    this.el = createElement({
      className: "map-menu-item map-layer-menu-item",
      style: this.style
    });

    if (this.showSymbol) {
      this.el.appendChild(this.renderSymbol(sprite, zoom, layer));
      this.el.style.gridTemplateColumns = "20px 1fr 20px";
    } else {
      this.el.style.gridTemplateColumns = "1fr 20px";
    }

    createElement({
      className: "map-layer-menu-item-label",
      properties: {
        textContent: this.label,
        title: this.label
      },
      parent: this.el
    });

    this.checkboxEl = createElement({
      tagName: "input",
      properties: {
        type: "checkbox",
        checked: true
      },
      parent: this.el
    });
    this.checkboxEl.addEventListener("click", this.handleToggle);

    return this.el;
  }

  renderSymbol(sprite, zoom, layer) {
    const symbol = LegendSymbol({ sprite, zoom, layer });
    return symbolToElement(symbol, layer);
  }

  handleToggle = (event) => {
    const { checked } = event.target;
    const visibility = checked ? "visible" : "none";
    this.setLayerVisibility(visibility);
  };

  setLayerVisibility(visibility) {
    this.context.map.setLayoutProperty(this.layerId, "visibility", visibility);
  }

  remove() {
    super.remove();

    if (this.checkboxEl) {
      this.checkboxEl.removeEventListener("click", this.handleToggle);
    }
  }
}

export default LayerMenuItem;
