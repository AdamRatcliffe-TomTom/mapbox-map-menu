export default function symbolToElement(symbol) {
  const element = document.createElement("div");
  element.classList.add("map-menu-layer-item-symbol");

  if (symbol) {
    switch (symbol.element) {
      case "div":
        if (
          symbol.attributes.style.backgroundImage &&
          !["url(undefined)", "url(null)"].includes(
            symbol.attributes.style.backgroundImage
          )
        ) {
          const img = document.createElement("img");
          img.src = symbol.attributes.style.backgroundImage
            .replace("url(", "")
            .replace(")", "");
          img.style.height = "20px";
          element.appendChild(img);
        }
        element.style.backgroundColor = symbol.attributes.style.backgroundColor;
        element.style.backgroundPosition =
          symbol.attributes.style.backgroundPosition;
        element.style.backgroundSize = symbol.attributes.style.backgroundSize;
        element.style.backgroundRepeat =
          symbol.attributes.style.backgroundRepeat;
        element.style.opacity = symbol.attributes.style.opacity;

        break;
      case "svg":
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.style.cssText = "height: 18px;";
        svg.setAttributeNS(null, "version", "1.1");
        Object.keys(symbol.attributes).forEach((k) => {
          svg.setAttribute(k, symbol.attributes[k]);
          let group = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
          );
          symbol.children.forEach((child) => {
            var c = document.createElementNS(
              "http://www.w3.org/2000/svg",
              child.element
            );
            Object.keys(child.attributes).forEach((k2) => {
              c.setAttributeNS(null, k2, child.attributes[k2]);
            });
            group.appendChild(c);
          });
          svg.appendChild(group);
        });
        element.appendChild(svg);
        break;
      default:
        console.log(symbol.element);
        return;
    }
  }
  return element;
}
