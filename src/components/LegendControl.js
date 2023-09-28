import MenuControl from "./MenuControl";
import LayerMenuItem from "./LayerMenuItem";

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

  getDefaultPosition() {
    return "bottom-left";
  }
}

export default LegendControl;
