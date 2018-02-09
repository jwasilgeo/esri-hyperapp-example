# esri-hyperapp-example

An example [Hyperapp](https://hyperapp.js.org/) application that shows how to use [esri-loader](https://github.com/Esri/esri-loader) to create a custom map view and component.

This approach demonstrates how to build a Hyperapp-focused application with the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/). Using [esri-loader](https://github.com/Esri/esri-loader) makes the whole development process straightforward and enjoyable.

**PROOF:** [view demo](https://jwasilgeo.github.io/esri-hyperapp-example/)

**NOTE:** There's several code comments that will interest you about potential alternate approaches and caveats when managing both Hyperapp "state" and ArcGIS API "state". Go read about it in [`index.js`](https://github.com/jwasilgeo/esri-hyperapp-example/blob/master/index.js).

[Parcel](https://parceljs.org/) is also used here, and as it turns out, _Parcel is super awesome_. After you `npm install`, you can simply use `npm run start` and `npm run build`.

### Cobbled together with inspiration and guidance from:

- [Hyperapp + Parcel = 😎](https://blog.daftcode.pl/hyperapp-parcel-71823bd93f1c), Adam Boro 2018
- [Hyperapp docs](https://github.com/hyperapp/hyperapp/blob/master/README.md)
- [Parcel docs](https://parceljs.org/)

[![screenshot](https://raw.githubusercontent.com/jwasilgeo/esri-hyperapp-example/master/screenshot.png)](https://jwasilgeo.github.io/esri-hyperapp-example/)
