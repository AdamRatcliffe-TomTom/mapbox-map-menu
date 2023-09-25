class MenuItem {
  constructor({ label, onClick }) {
    this.label = label;
    this.onClick = onClick;

    this.render();
  }

  render() {
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
  }

  remove() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
  }
}

export default MenuItem;
