# Map menu for Mapbox GL JS and Maplibre GL JS

Menu control and context menu components with support for rendering map legend entries.

## Setup

Add the control resources to your webpage:

```css
<link rel="stylesheet" type="text/css" href="./map-menu.css" />
<script src="./map-menu.js"></script>
```

## Examples

### Menu control example

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

### Legend control example

```javascript
const legend = new mapmenu.LegendControl();
map.addControl(legend);
```

### Context menu example

```javascript
const contextMenu = new mapmenu.ContextMenu();

const centerItem = new mapmenu.MenuItem({
  label: "Center map here",
  onClick: (event) => map.easeTo({ center: event.lngLat })
});
contextMenu.addItem(centerItem);

contextMenu.addToMap(map);
```

## API

### Classes

- [mapmenu.MenuControl](#mapmenumenucontrol)
- [mapmenu.MenuItem](#mapmenumenuitem)
- [mapmenu.LayerMenuItem](#mapmenulayermenuitem)
- [mapmenu.MenuSection](#mapmenumenusection)
- [mapmenu.MenuItemSeparator](#mapmenumenuitemseparator)
- [mapmenu.LegendControl](#mapmenulegendcontrol)
- [mapmenu.ContextMenu](#mapmenucontextmenu)

### mapmenu.MenuControl

A menu control that implements the [IControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol) interface.

#### Options

| Name      | Type   | Default value | Description                              |
| --------- | ------ | ------------- | ---------------------------------------- |
| title     | string \| Function | “”            | The menu title                           |
| width     | int    | 240           | The width of the menu in pixels          |
| visible   | boolean | true | Initial visibility of the menu. If true the menu will be shown when the map style is availble, if false the menu button must be clicked to show it |
| style | Object    | none          | Style properties to be applied to the menu |

#### Methods

`addItem(item: mapmenu.MenuItem)`

Adds an item to the menu. Item is appended to the menu’s items.

`insertItem(item: mapmenu.MenuItem, index: int)`

Inserts an item in the menu at the specified index.

`getItems()`

Returns all items added to the menu.

`removeAllItems()`

Removes all items added to the menu.

`show()`

Shows the menu.

`hide()`

Hides the menu.

### mapmenu.MenuItem

A menu item. The display label can either be provided as a string or Function to render the label element.

#### Options

| Name    | Type     | Default value | Description                                         |
| ------- | -------- | ------------- | --------------------------------------------------- |
| label   | string \| Function  | none          | The menu item label                                 |
| onClick | Function | none          | Function to be called when the menu item is clicked |
| style | Object    | none          | Style properties to be applied to the menu item |

#### Methods

`remove()`

Removes the menu item from the menu.

### mapmenu.LayerMenuItem

A specialized menu item that's configured with the ID of a layer in the map style and provides a checkbox to toggle its visibility on the map.

#### Options

| Name    | Type     | Default value | Description                                         |
| ------- | -------- | ------------- | --------------------------------------------------- |
| label   | string | none          | The menu item label                                 |
| layerId | string | none          | The ID of the layer to create the menu item for |
| showSymbol | boolean | true | If true will attempt to render a symbol for the layer |
| style | Object    | none          | Style properties to be applied to the menu |

#### Methods

`remove()`

Removes the menu item from the menu.

`setLayerVisibility(visibility: string)`

Sets the visibility of the layer associated with this menu item. The visibility argument must be one of "visible" or "none".

### mapmenu.MenuSection

#### Options

| Name  | Type   | Default value | Description       |
| ----- | ------ | ------------- | ----------------- |
| title | string \| Function | “”            | The section title |
| style | Object    | none          | Style properties to be applied to the menu section |

#### Methods

`addItem(item: mapmenu.MenuItem)`

Adds an item to the section. Item is appended to the section's items.

`insertItem(item: mapmenu.MenuItem, index: int)`

Inserts an item in the section at the specified index.

`getItems()`

Returns all items added to the section.

`removeAllItems()`

Removes all items added to the section.

`remove()`

Removes the section from the menu.

### mapmenu.MenuItemSeparator

#### Options

| Name  | Type   | Default value | Description       |
| ----- | ------ | ------------- | ----------------- |
| style | Object    | none          | Style properties to be applied to the menu item separator |

#### Methods

`remove()`

Removes the menu item separator from the menu.

### mapmenu.LegendControl

A menu control that displays a legend entry for each layer on the map. *A work in progress*.

#### Options

| Name      | Type   | Default value | Description                              |
| --------- | ------ | ------------- | ---------------------------------------- |
| title     | string | “”            | The legend title                           |
| width     | int    | 240           | The width of the legend in pixels          |
| visible   | boolean | true | Initial visibility of the menu. If true the legend will be shown when the map style is availble, if false the menu button must be clicked to show it |
| style | Object    | none          | Style properties to be applied to the legend |

#### Methods

`addItem(item: mapmenu.MenuItem)`

Adds an item to the legend. Item is appended to the legend’s items.

`insertItem(item: mapmenu.MenuItem, index: int)`

Inserts an item in the legend at the specified index.

`getItems()`

Returns all items added to the legend.

`removeAllItems()`

Removes all items added to the legend.

`show()`

Shows the legend.

`hide()`

Hides the legend.

### mapmenu.ContextMenu

A context menu for the map.

#### Options

| Name      | Type   | Default value | Description                              |
| --------- | ------ | ------------- | ---------------------------------------- |
| title     | string | “”            | The menu title                           |
| width     | int    | 180           | The width of the menu in pixels          |
| style | Object    | none          | Style properties to be applied to the menu |


#### Methods

`addToMap(map: Map)`

Adds the context menu to the map.

`remove()`

Removes the context menu from the map.

`addItem(item: mapmenu.MenuItem)`

Adds an item to the menu. Item is appended to the menu’s items.

`insertItem(item: mapmenu.MenuItem, index: int)`

Inserts an item in the menu at the specified index.

`getItems()`

Returns all items added to the menu.

`removeAllItems()`

Removes all items added to the menu.

`show()`

Shows the menu.

`hide()`

Hides the menu.