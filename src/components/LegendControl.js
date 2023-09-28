import MenuControl from "./MenuControl";
import LayerMenuItem from "./LayerMenuItem";
import createElement from "../functions/createElement";

class LegendControl extends MenuControl {
  constructor(options = {}) {
    super({ title: "Legend", style: { height: "350px" }, ...options });
  }

  render(map) {
    super.render(map);

    this.element.classList.add("map-menu-legend");

    const filterElement = this.renderFilter();
    this.titleElement.after(filterElement);
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

  onStyleReady = () => {
    super.onStyleReady();

    const map = this.context.map;
    const style = map.getStyle();
    const numLayers = style.layers.length;
    const subtitleElement = createElement({
      className: "map-menu-subtitle",
      properties: {
        textContent: `${numLayers} layers`
      }
    });
    this.titleElement.appendChild(subtitleElement);
  };

  renderFilter() {
    const filterElement = createElement({
      className: "map-menu-legend-filter"
    });
    const inputElement = createElement({
      tagName: "input",
      properties: {
        type: "text",
        placeholder: "Filter"
      }
    });
    inputElement.addEventListener("input", this.filterItems);
    filterElement.appendChild(inputElement);

    return filterElement;
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
