import React, { useRef, useContext, useCallback, useEffect } from 'react';
import { Map, Source, Layer } from 'react-map-gl';
import MainContext from '../Context';
import { Box } from "@mui/material";
import Discretization from "./discretization";

const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'nodes',
  filter: ['has', 'point_count'],
  paint: {
    'circle-stroke-color': '#787878',
    'circle-stroke-width': ['step', ['get', 'point_count'], 30, 2, 2],
    'circle-color': '#ffffff',
    'circle-radius': ['step', ['get', 'point_count'], 30, 100, 60, 750, 60]
  }
};

const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'nodes',
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
  source: 'nodes',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': ['get', 'color'],
    'circle-radius': 8,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


export default function Content() {
  const {
    theme,
    dashboard: {
      nodesAsFeatures = []
    } = {},
    setDashboard
  } = useContext(MainContext);
  const mapRef = useRef(null);
  
  // useEffect(() => {
  //   if(selectedNode && 
  //     selectedNode.id &&
  //      mapRef.current){
  //       mapRef.current.easeTo({
  //         center: selectedNode.location.coordinates.reverse(),
  //         zoom: 3,
  //         speed: 0.2,
  //         curve: 1,
  //         duration: 2000,
  //       })
  //   }
  // }, [selectedNode]);

  // useEffect(() => {
  //   if (nodesAsFeatures?.features?.length) {
  //     if (nodesAsFeatures?.features?.[0]?.geometry?.coordinates?.length) {
  //       mapRef.current.easeTo({
  //         center: nodesAsFeatures?.features?.[10]?.geometry?.coordinates.reverse(),
  //         zoom: 3,
  //         speed: 0.2,
  //         curve: 1,
  //         duration: 5000,
  //       })
  //     }
  //   }
  // }, [nodesAsFeatures]);

  const onClick = useCallback(event => {
    if (event?.features?.length) {
      const [feature] = event.features;
      const {
        layer: {
          id: layerId
        } = {},
        properties
      } = feature;
      if (layerId == "unclustered-point") {
        setDashboard({
          selectedNode: properties
        })
      } else if (layerId == "clusters") {
        const clusterId = properties.cluster_id;
        const mapboxSource = mapRef.current.getSource('nodes');
        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) {
            return;
          }
          mapRef.current.easeTo({
            center: feature.geometry.coordinates,
            zoom,
            duration: 1000
          });
        });
      }
    }
  }, []);

  return (
    <Box sx={{ height: "calc(100vh - 64px)" }}>
      <Box sx={{ height: "100%" }}>
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: -2.205671,
            longitude: -79.906641,
            zoom: 10
          }}
          mapStyle={`mapbox://styles/mapbox/${theme == "default" ? 'streets-v11' : 'dark-v10'}`}
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
          onClick={onClick}
          onError={(error) => {console.log("MAPBOX ERROR: ", error)}}
        >
          <Source
            id="nodes"
            type="geojson"
            data={nodesAsFeatures || []}
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
