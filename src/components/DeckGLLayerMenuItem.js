import MenuItem from "./MenuItem";
import createElement from "../functions/createElement";

class DeckGLLayerMenuItem extends MenuItem {
  constructor(options = {}) {
    super(options);

    const { layerId } = options;
    this.layerId = layerId;
  }

  render(context) {
    this.context = context;

    const { map } = context;
    const layer = map.getLayer(this.layerId);

    if (!layer) {
      throw new Error(`Layer ${this.layerId} does not exist on map`);
    }

    this.el = createElement({
      className: "map-menu-item map-layer-menu-item",
      style: { gridTemplateColumns: "1fr 20px", ...this.style }
    });

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

  handleToggle = (event) => {
    const { checked } = event.target;
    this.setLayerVisibility(checked);
  };

  setLayerVisibility(visible) {
    this.context.map.getLayer(this.layerId)?.setProps({ visible });
  }

  remove() {
    super.remove();

    if (this.checkboxEl) {
      this.checkboxEl.removeEventListener("click", this.handleToggle);
    }
  }
}

export default DeckGLLayerMenuItem;
