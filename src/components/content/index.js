import React, { useRef, useContext } from 'react';
import { Map, Source, Layer } from 'react-map-gl';
import MainContext from '../Context';
import { Box } from "@mui/material";
import Discretization from "./discretization";

const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
  }
};

const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  }
};

const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'earthquakes',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#11b4da',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;; // Set your mapbox token here

export default function Content () {
  const {
    lightMode,
    dashboard: {
      points = []
    } = {}
  } = useContext(MainContext);
  console.log("map lightMode", lightMode)
  const mapRef = useRef(null);

  const onClick = event => {
    if(event?.features?.length){
      const feature = event.features[0];
      const clusterId = feature.properties.cluster_id;
  
      const mapboxSource = mapRef.current.getSource('earthquakes');
  
      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }
  
        mapRef.current.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500
        });
      });
    }
    
  };

  return (
    <Box sx={{ height: "calc(100vh - 64px)" }}>
      <Box sx={{ height: "100%" }}>
        <Map
          initialViewState={{
            latitude: 40.67,
            longitude: -103.59,
            zoom: 3
          }}
          mapStyle={`mapbox://styles/mapbox/${lightMode ? 'streets-v11' : 'dark-v10'}`}
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={[clusterLayer.id]}
          onClick={onClick}
          ref={mapRef}
        >
          <Source
            id="earthquakes"
            type="geojson"
            data={points}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
        </Map>
      </Box>
      <Discretization />
    </Box>

  );
}
