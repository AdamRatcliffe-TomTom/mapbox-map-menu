# Map menu for Mapbox GL JS and Maplibre GL JS

Menu component for use cases such as toggling the visibility of map layers.

## Usage

Add the control resources to your webpage:

```css
<link rel="stylesheet" type="text/css" href="./map-menu.css" />
<script src="./map-menu.js"></script>
```

Example:

```javascript
const menu = new mapmenu.MenuControl({ title: "Layers" });

// Add a simple menu item
const item1 = new mapmenu.MenuItem({
  label: "Layer 1",
  onClick: () => alert("Clicked layer 1")
});
menu.addItem(item1);

// Add a menu item using an arrow function to render a custom label
const item2 = new mapmenu.MenuItem({
  label: () => {
    const el = document.createElement("div");

    // Use this class on the label to apply a flex layout to the label children
    el.classList.add("map-menu-item-flex-layout");

    const label = document.createElement("div");
    label.textContent = "Label 2";
    el.appendChild(label);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", () => alert("On layer 2 click"));
    el.appendChild(checkbox);

    return el;
  }
});
menu.addItem(item2);

// Add a section to group items under a heading
const section = new mapmenu.MenuSection({ title: "Other layers" });
const item3 = new mapmenu.MenuItem({
  label: "Layer 3"
});
section.addItem(item3);

const item4 = new mapmenu.MenuItem({
  label: "Layer 4"
});
section.addItem(item4);

menu.addItem(section);

// Add a menu item separator
const separator = new mapmenu.MenuItemSeparator();
menu.addItem(separator);

// Adds a menu item for the "Park" layer, allowing it's visibility on the map to be toggled
const item5 = new mapmenu.LayerMenuItem({
  label: "Park",
  layerId: "Park"
});
menu.addItem(item5);

map.addControl(menu);
```

## API

### mapmenu.MenuControl

A menu control that implements the [IControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol) interface.

#### Options:

| Name      | Type   | Default value | Description                              |
| --------- | ------ | ------------- | ---------------------------------------- |
| title     | string | “”            | The menu title                           |
| width     | int    | 300           | The width of the menu in pixels          |
| maxHeight | int    | auto          | The maximum height of the menu in pixels |

#### Methods:

`addItem(item: mapmenu.MenuItem)`

Adds an item to the menu. Item is appended to the menu’s items.

`insertItem(item: mapmenu.MenuItem, index: int)`

Inserts an item in the menu at the specified index.

`getItems()`

Returns all items added to the menu.


### mapmenu.MenuItem

A menu item. The display label can either be provided as a string or Function to render the label element.

#### Options:

| Name    | Type     | Default value | Description                                         |
| ------- | -------- | ------------- | --------------------------------------------------- |
| label   | string \| Function  | none          | The menu item label                                 |
| onClick | Function | none          | Function to be called when the menu item is clicked |

#### Methods:

`remove()`

Removes the menu item from the menu.

### mapmenu.LayerMenuItem

A specialized menu item that's configured with the ID of a layer in the map style and provides a checkbox to toggle its visibility on the map.

#### Options:

| Name    | Type     | Default value | Description                                         |
| ------- | -------- | ------------- | --------------------------------------------------- |
| label   | string | none          | The menu item label                                 |
| layerId | string | none          | The ID of the layer to create the menu item for |
| showSymbol | boolean | true | If true will attempt to render a symbol for the layer |

#### Methods:

`remove()`

Removes the menu item from the menu.

`setLayerVisibility(visibility: string)`

Sets the visibility of the layer associated with this menu item. The visibility argument must be one of "visible" or "none".

### mapmenu.MenuSection

#### Options:

| Name  | Type   | Default value | Description       |
| ----- | ------ | ------------- | ----------------- |
| title | string | “”            | The section title |

#### Methods:

`addItem(item: mapmenu.MenuItem)`

Adds an item to the section. Item is appended to the section's items.

`insertItem(item: mapmenu.MenuItem, index: int)`

Inserts an item in the section at the specified index.

`getItems()`

Returns all items added to the section.

`remove()`

Removes the section from the menu.

### mapmenu.MenuItemSeparator

#### Methods:

`remove()`

Removes the menu item separator from the menu.
