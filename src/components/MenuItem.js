class MenuItem {
  constructor({ label, onClick } = {}) {
    this.label = label;
    this.onClick = onClick;
  }

  render(map) {
    this.map = map;
    this.element = document.createElement("div");
    this.element.classList.add("map-menu-item");

    if (typeof this.label === "function") {
      this.element.appendChild(this.label());
    } else {
      this.element.textContent = this.label;
    }

    if (typeof this.onClick === "function") {
      this.element.addEventListener("click", this.onClick);
    }

    return this.element;
  }

  remove() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
  }
}

export default MenuItem;
