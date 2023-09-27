import Menu from "./Menu";

const defaultOptions = {
  width: 180
};

class ContextMenu extends Menu {
  constructor(options) {
    super({ ...defaultOptions, ...options });

    this.boundHide = this.hide.bind();
  }

  render(map) {
    super.render(map);
    this.element.classList.add("map-context-menu");
  }

  addToMap(map) {
    this.render(map);
    map.getContainer().appendChild(this.element);
    this.addEventListeners();
  }

  addEventListeners() {
    map.on("contextmenu", this.handleContextMenu);
    map.on("move", this.hide);

    window.addEventListener("click", this.boundHide);
  }

  removeEventListeners() {
    map.off("contextmenu", this.handleContextMenu);
    map.off("move", this.hide);

    window.removeEventListener("click", this.boundHide);
  }

  handleContextMenu = (event) => {
    const { point } = event;
    this.setPosition(point);
    this.show();
  };

  show = () => {
    this.element.style.display = "block";
  };

  hide = () => {
    this.element.style.display = "none";
  };

  setPosition = (point) => {
    this.element.style.left = `${point.x}px`;
    this.element.style.top = `${point.y}px`;
  };

  remove() {
    super.remove();

    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }

    this.removeEventListeners();
  }
}

export default ContextMenu;
