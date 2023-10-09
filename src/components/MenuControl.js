import Menu from "./Menu";
import createElement from "../functions/createElement";

class MenuControl extends Menu {
  constructor(options) {
    super(options);

    this.type = "MenuControl";

    this.container = createElement({
      className: "mapboxgl-ctrl maplibregl-ctrl"
    });
  }

  onAdd(map) {
    this.render(map);

    this.el.classList.add("map-menu-control");
    this.el.appendChild(this.renderMinimizeButton());

    this.legendButtonEl = this.renderMaximizeButton();
    this.container.appendChild(this.legendButtonEl);
    this.container.appendChild(this.el);

    this.visible ? this.show() : this.hide();

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

  renderMaximizeButton() {
    const wrapperEl = createElement({
      className: "mapboxgl-ctrl-group maplibregl-ctrl-group"
    });

    const buttonEL = createElement({
      tagName: "button",
      className: "mapboxgl-ctrl-menu mapblibregl-ctrl-menu"
    });
    buttonEL.addEventListener("click", this.show);

    createElement({
      tagName: "span",
      className: "mapboxgl-ctrl-icon maplibregl-ctrl-icon",
      parent: buttonEL
    });

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
