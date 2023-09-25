class MenuItem {
  constructor({ label, onClick }) {
    this.label = label;
    this.onClick = onClick;
    this.element = document.createElement("div");
    this.element.classList.add("map-menu-item");
    this.element.textContent = label;

    if (typeof this.onClick === "function") {
      this.element.addEventListener("click", onClick);
    }
  }

  remove() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
  }
}

export default MenuItem;
