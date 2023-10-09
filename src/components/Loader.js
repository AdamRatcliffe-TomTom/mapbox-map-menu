import createElement from "../functions/createElement";

const defaultOptions = {
  size: 24,
  color: "#3F9CD9"
};

class Loader {
  constructor(options) {
    const { size, color, style } = { ...defaultOptions, options };

    this.el = createElement({
      tagName: "span",
      className: "map-menu-loader",
      style: {
        width: `${size}px`,
        height: `${size}px`,
        borderColor: color,
        borderBottomColor: "transparent",
        ...style
      }
    });
  }

  render() {
    return this.el;
  }

  remove() {
    if (this.el.parentElement) {
      this.el.parentElement.removeChild(this.el);
    }
  }
}

export default Loader;
