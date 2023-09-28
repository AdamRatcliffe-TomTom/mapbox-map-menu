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

    this.container.appendChild(this.el);
    this.legendButtonEl = this.renderLegendButton();
    this.container.appendChild(this.legendButtonEl);

    this.el.classList.add("map-menu-control");
    this.el.appendChild(this.renderMinimizeButton());

    return this.container;
  }

  renderMinimizeButton() {
    const buttonEL = createElement({
      tagName: "button",
      className: "map-menu-control-minimize-button",
      properties: {
        title: "Minimize"
      }
    });
    buttonEL.addEventListener("click", this.hide);
    return buttonEL;
  }

  renderLegendButton() {
    const wrapperEl = createElement({
      className: "mapboxgl-ctrl-group"
    });

    const buttonEL = createElement({
      tagName: "button",
      className: "mapboxgl-ctrl-menu"
    });
    buttonEL.addEventListener("click", this.show);

    const iconEl = createElement({
      tagName: "span",
      className: "mapboxgl-ctrl-icon"
    });
    buttonEL.appendChild(iconEl);

    wrapperEl.appendChild(buttonEL);

    return wrapperEl;
  }

  show = () => {
    super.show();
    this.legendButtonEl.style.display = "none";
  };

  hide = () => {
    super.hide();
    this.legendButtonEl.style.display = "block";
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
