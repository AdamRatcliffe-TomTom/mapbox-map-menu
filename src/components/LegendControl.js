import MenuControl from "./MenuControl";
import LayerMenuItem from "./LayerMenuItem";
import createElement from "../functions/createElement";

class LegendControl extends MenuControl {
  constructor(options = {}) {
    super({ title: "Legend", style: { maxHeight: "350px" }, ...options });
  }

  renderItems() {
    const itemContainer = super.renderItems();

    const map = this.context.map;
    const style = map.getStyle();

    style.layers.forEach(({ id }) => {
      const item = new LayerMenuItem({
        label: id,
        layerId: id
      });
      this.addItem(item);
    });

    return itemContainer;
  }

  renderTitle() {
    const map = this.context.map;
    const style = map.getStyle();
    const numLayers = style.layers.length;

    const titleElement = super.renderTitle();
    // element.appendChild(titleElement);

    const subtitleElement = createElement({
      className: "map-menu-subtitle",
      properties: {
        textContent: `${numLayers} layers`
      }
    });
    titleElement.appendChild(subtitleElement);

    return titleElement;
  }

  getDefaultPosition() {
    return "bottom-left";
  }
}

export default LegendControl;
