import MenuControl from "./MenuControl";
import LayerMenuItem from "./LayerMenuItem";
import createElement from "../functions/createElement";

class LegendControl extends MenuControl {
  constructor(options = {}) {
    super({ title: "Legend", style: { height: "350px" }, ...options });
  }

  render(map) {
    super.render(map);

    this.el.classList.add("map-menu-legend");

    this.titleEl.after(this.renderFilter());
  }

  onStyleReady = () => {
    super.onStyleReady();

    const map = this.context.map;
    const style = map.getStyle();
    const numLayers = style.layers.length;

    createElement({
      className: "map-menu-subtitle",
      properties: {
        textContent: `${numLayers} layers`
      },
      parent: this.titleEl
    });

    // For each layer in the style add a legend item
    style.layers.forEach(({ id }) => {
      const item = new LayerMenuItem({
        label: id,
        layerId: id
      });
      this.addItem(item);
    });
  };

  renderFilter() {
    const filterEl = createElement({
      className: "map-menu-legend-filter"
    });
    const inputEl = createElement({
      tagName: "input",
      properties: {
        type: "text",
        placeholder: "Filter"
      }
    });
    inputEl.addEventListener("input", this.filterItems);
    filterEl.appendChild(inputEl);

    return filterEl;
  }

  filterItems = (event) => {
    const { value } = event.target;
    this.setFilter(value);
  };

  getDefaultPosition() {
    return "bottom-left";
  }
}

export default LegendControl;
