import { h, app } from 'hyperapp';
import { loadCss, loadModules } from 'esri-loader';

const state = {
  zoom: 4,
  rotation: 90
};

const actions = {
  zoomChange: (value) => (state) => {
    return { zoom: value };
  },
  rotateChange: (value) => (state) => {
    return { rotation: value };
  }
};

const EsriMapView = ({
  style,
  basemap,
  center,
  zoom,
  rotation,
  zoomChange,
  rotationChange
}) => {
  return h('div', {
    style,
    // oncreate is fired after the element is created and attached to the DOM
    oncreate: (element) => {
      // use esri-loader to load required css
      loadCss('https://js.arcgis.com/4.6/esri/css/view.css');

      // use esri-loader to load ArcGIS API modules to create an instance of a MapView
      loadModules(['esri/Map', 'esri/views/MapView'])
        .then(([Map, MapView]) => {
          const mapView = new MapView({
            container: element,
            map: new Map({
              basemap: basemap || 'streets'
            }),
            center: center || [0, 0],
            zoom: zoom || 1,
            rotation: rotation || 0,
            ui: {
              components: ['attribution', 'zoom', 'compass']
            }
          });

          mapView.when(() => {
            // The mapView is loaded and ready here in the ArcGIS API "world".

            // You could potentially communicate the entire mapView instance "out" to Hyperapp's state,
            // but that may open the door to coding patterns that go against Hyperapp's paradigms regarding actions and state.

            // Why is this a concern? The mapView instance has its own properties, methods, and events.
            // What we have here is really a unique ArcGIS API "state" inside of a Hyperapp component.
            // This Hyperapp component in turn has its own mechanisms for communicating changes to the Hyperapp state.

            // here's an example of communicating a specific mapView zoom property change "out" to Hyperapp
            mapView.watch('zoom', (newValue) => zoomChange(newValue));
            // and another example with the rotation property
            mapView.watch('rotation', (newValue) => rotationChange(newValue));
          });
        });
    }
  });
};

const view = (state, actions) => {
  return h('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, [
    // h1 element with children elements  
    h('h1', {}, [
      h('span', {}, 'made with '),
      h('a', {
        href: 'https://hyperapp.js.org/',
        style: {
          fontStyle: 'italic',
          color: '#fff',
          padding: '0.2rem',
          border: '1px solid #fff',
        }
      }, 'Hyperapp'),
      h('span', {}, ' and '),
      h('a', {
        href: 'https://github.com/Esri/esri-loader',
        style: {
          fontFamily: 'monospace',
          fontSize: '1.25em',
          color: '#fff',
          padding: '0.2rem',
          border: '1px solid #fff',
        }
      }, 'esri-loader'),
    ]),

    h('p', {}, 'This is an example Hyperapp application that shows how to use esri-loader to make a custom mapping component.'),

    h('a', {
      style: {
        color: '#fff'
      },
      href: 'https://github.com/jwasilgeo/esri-hyperapp-example'
    }, 'Take a look at the source code for more information.'),

    // p element that displays some of the Hyperapp's current state
    h('p', {
      style: {
        fontFamily: 'monospace',
        fontSize: '1.25em'
      }
    }, `state: zoom ${state.zoom.toFixed(2)} | rotation ${state.rotation.toFixed(2)}`),

    // EsriMapView component:
    //  - its own HTML markup template begins with a div element
    //  - this shows some contrived examples of setting initial ArcGIS "mapView" constructor values
    h(EsriMapView, {
      style: {
        height: '50vh',
        width: '80%',
        border: '3px solid #fff'
      },
      // these are initial state values to create an ArcGIS API MapView instance
      basemap: 'satellite',
      center: [15, 65],
      zoom: state.zoom,
      rotation: state.rotation,

      // these are actions to be communicated from the ArcGIS API "out" to Hyperapp's state
      // every time the zoom and rotation properties change they will be communicated "out" to Hyperapp's state
      zoomChange: actions.zoomChange,
      rotationChange: actions.rotateChange
    })
  ]);
};
// Hyperapp entry point
app(state, actions, view, document.body);
