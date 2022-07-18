
import React, { useRef, useEffect, useState, useContext } from 'react';
import Discretization from "./discretization";
import MainContext from './../Context';
import Box from "@mui/material/Box";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default () => {
  const {
    lightMode
  } = useContext(MainContext);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-79.9640597);
  const [lat, setLat] = useState(-2.1494366);
  const [zoom, setZoom] = useState(15);
  const mag1 = ['<', ['get', 'mag'], 2];
  const mag2 = ['all', ['>=', ['get', 'mag'], 2], ['<', ['get', 'mag'], 3]];
  const mag3 = ['all', ['>=', ['get', 'mag'], 3], ['<', ['get', 'mag'], 4]];
  const mag4 = ['all', ['>=', ['get', 'mag'], 4], ['<', ['get', 'mag'], 5]];
  const mag5 = ['>=', ['get', 'mag'], 5];
  const colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];
  // dark-v10
  // light-v10
  // streets-v11

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${lightMode ? 'streets-v11' : 'dark-v10'}`,
      center: [lng, lat],
      zoom: zoom
    });
  });
  useEffect(() => {
    if (!map.current.loaded()) return; // return if its not loaded
    map.current.addSource('my-data', {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-79.9640597, -2.1494366]
        },
        "properties": {
          "title": "Mapbox DC",
          "marker-symbol": "monument"
        }
      }
    });
    map.current.addLayer({
      id: 'points-of-interest',
      source: {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-streets-v8'
      },
      'source-layer': 'poi_label',
      type: 'circle',
      paint: {
        // Mapbox Style Specification paint properties
      },
      layout: {
        // Mapbox Style Specification layout properties
      }
    });
  });
  
  return (
    <Box sx={{ height: "calc(100vh - 64px)" }}>
      <Box ref={mapContainer} sx={{ height: "100%" }} />
      <Discretization />
    </Box>
  );
}
