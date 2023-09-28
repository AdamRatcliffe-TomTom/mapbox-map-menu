import Menu from "./Menu";
import createElement from "../functions/createElement";

class MenuControl extends Menu {
  constructor(options) {
    super(options);

    this.container = createElement({
      className: "mapboxgl-ctrl"
    });
  }

  onAdd(map) {
    this.render(map);

    this.container.appendChild(this.element);
    this.legendButtonElement = this.renderLegendButton();
    this.container.appendChild(this.legendButtonElement);

    this.element.classList.add("map-menu-control");
    this.element.appendChild(this.renderMinimizeButton());

    return this.container;
  }

  renderMinimizeButton() {
    const buttonElement = createElement({
      tagName: "button",
      className: "map-menu-control-minimize-button",
      properties: {
        title: "Minimize"
      }
    });
    buttonElement.addEventListener("click", this.hide);
    return buttonElement;
  }

  renderLegendButton() {
    const wrapper = createElement({
      className: "mapboxgl-ctrl-group"
    });

    const buttonElement = createElement({
      tagName: "button",
      className: "mapboxgl-ctrl-menu"
    });
    buttonElement.addEventListener("click", this.show);

    const iconElement = createElement({
      tagName: "span",
      className: "mapboxgl-ctrl-icon"
    });
    buttonElement.appendChild(iconElement);

    wrapper.appendChild(buttonElement);

    return wrapper;
  }

  show = () => {
    super.show();
    this.legendButtonElement.style.display = "none";
  };

  hide = () => {
    super.hide();
    this.legendButtonElement.style.display = "block";
  };

  onRemove() {
    this.remove();
    this.context.map = undefined;
  }

  getDefaultPosition() {
    return "top-right";
  }
}

export default MenuControl;
