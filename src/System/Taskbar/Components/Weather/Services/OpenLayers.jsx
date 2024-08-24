import React, { useEffect } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import { useGeographic } from 'ol/proj.js';
import "ol/ol.css";

export const MapView = ({ latitude, longitude }) => {
  useGeographic();
  useEffect(() => {
    let center = [0, 0];
    if (latitude && longitude) {
      center = [longitude, latitude];
    }
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: center,
        zoom: 12,
      }),
    });

    return () => {
      map.setTarget(null);
    };
  }, [latitude, longitude]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
}

