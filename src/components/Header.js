import createElement from "../functions/createElement";

class Header {
  constructor({ parent, title } = {}) {
    this.el = createElement({
      className: "map-menu-header"
    });

    if (title) {
      this.setTitle(title);
    }

    if (parent && parent instanceof Element) {
      parent.appendChild(this.el);
    }
  }

  setTitle(title) {
    const titleText = typeof title === "function" ? this.title() : title;

    if (!this.titleEl) {
      this.titleEl = createElement({
        className: "map-menu-title",
        properties: {
          textContent: titleText
        }
      });
      this.el.appendChild(this.titleEl);
    } else {
      this.titleEl.append = titleText;
    }
  }

  appendChild(child) {
    if (child instanceof Element) {
      this.el.appendChild(child);
    } else {
      console.error("Invalid child element");
    }
  }

  after(child) {
    if (child instanceof Element) {
      this.el.after(child);
    } else {
      console.error("Invalid child element");
    }
  }

  removeChild(child) {
    if (child instanceof Element && this.el.contains(child)) {
      this.el.removeChild(child);
    } else {
      console.error("Invalid child element or not found in header");
    }
  }
}

export default Header;
