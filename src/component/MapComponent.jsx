import React, { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";

const SEVERITY_COLORS = {
  low: "#4caf50", // Green
  medium: "#ff9800", // Orange
  high: "#f44336", // Red
  critical: "#9c27b0", // Purple
};

const MapComponent = ({
  disasters = [],
  onMarkerClick = () => {},
  allowUserMarkers = true,
  mapCenter = "21.5937,78.9629",
  initialZoom = 4,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const userMarkersLayerRef = useRef(null);

  const [userMarkers, setUserMarkers] = useState([]);
  const [mapControls, setMapControls] = useState({
    satellite: false,
    measurement: false,
  });

  const [activeControl, setActiveControl] = useState(null);

  const [initialLat, initialLng] = mapCenter.split(",").map(parseFloat);

  // Initialize map
  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [initialLat, initialLng],
        initialZoom
      );

      // Add base OpenStreetMap layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // Add satellite layer (initially disabled)
      const satelliteLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }
      );

      markersLayerRef.current = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
      });

      userMarkersLayerRef.current = L.layerGroup();

      mapInstanceRef.current.addLayer(markersLayerRef.current);
      mapInstanceRef.current.addLayer(userMarkersLayerRef.current);

      L.control
        .scale({ position: "bottomleft", imperial: false })
        .addTo(mapInstanceRef.current);

      window.mapLayers = { satellite: satelliteLayer };
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [initialLat, initialLng, initialZoom]);

  // Handle satellite toggle
  useEffect(() => {
    if (mapInstanceRef.current && window.mapLayers) {
      const satelliteLayer = window.mapLayers.satellite;
      if (mapControls.satellite) {
        satelliteLayer.addTo(mapInstanceRef.current);
      } else {
        mapInstanceRef.current.removeLayer(satelliteLayer);
      }
    }
  }, [mapControls.satellite]);

  // Handle measurement mode
  useEffect(() => {
    const handleMapClick = (e) => {
      if (!mapControls.measurement || !allowUserMarkers) return;

      const { lat, lng } = e.latlng;
      const markers = [...userMarkers, { lat, lng }];

      setUserMarkers(markers);

      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: "custom-div-icon",
          html: `<div style="background-color:#3388ff; width:10px; height:10px; border-radius:50%; border:2px solid white;"></div>`,
          iconSize: [15, 15],
          iconAnchor: [7, 7],
        }),
      })
        .bindPopup(
          `Point ${markers.length}<br>Lat: ${lat.toFixed(
            4
          )}, Lng: ${lng.toFixed(4)}`
        )
        .addTo(userMarkersLayerRef.current);

      if (markers.length === 2) {
        const [marker1, marker2] = markers;
        const polyline = L.polyline(
          [
            [marker1.lat, marker1.lng],
            [marker2.lat, marker2.lng],
          ],
          {
            color: "#3388ff",
            weight: 3,
            opacity: 0.7,
            dashArray: "5, 5",
          }
        ).addTo(userMarkersLayerRef.current);

        const distance = calculateDistance(
          marker1.lat,
          marker1.lng,
          marker2.lat,
          marker2.lng
        );

        const travelTimeByCar = (distance / 60).toFixed(2);
        const travelTimeByWalk = (distance / 5).toFixed(2);

        L.popup()
          .setLatLng([
            (marker1.lat + marker2.lat) / 2,
            (marker1.lng + marker2.lng) / 2,
          ])
          .setContent(
            `<div style="text-align:center; font-weight:bold;">Distance Measurement</div>
            <div><b>Distance:</b> ${distance.toFixed(2)} km</div>
            <div><b>Travel Time:</b></div>
            <div>By Car: ${travelTimeByCar} hours</div>
            <div>By Walk: ${travelTimeByWalk} hours</div>
            <div style="margin-top:8px; text-align:center;">
              <button id="reset-measurement" style="padding:4px 8px; cursor:pointer;">Reset Measurement</button>
            </div>`
          )
          .openOn(mapInstanceRef.current);

        setTimeout(() => {
          const resetButton = document.getElementById("reset-measurement");
          if (resetButton) {
            resetButton.addEventListener("click", () => {
              userMarkersLayerRef.current.clearLayers();
              setUserMarkers([]);
              mapInstanceRef.current.closePopup();
            });
          }
        }, 100);
        console.log(marker, polyline);
      }
    };

    if (mapInstanceRef.current) {
      if (mapControls.measurement) {
        mapInstanceRef.current.on("click", handleMapClick);
      } else {
        mapInstanceRef.current.off("click", handleMapClick);
        userMarkersLayerRef.current.clearLayers();
        setUserMarkers([]);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off("click", handleMapClick);
      }
    };
  }, [mapControls.measurement, userMarkers, allowUserMarkers]);

  // Update disaster markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    disasters.forEach((disaster) => {
      if (!disaster.location?.coordinates) return;

      const [lng, lat] = disaster.location.coordinates;
      if (isNaN(lat) || isNaN(lng)) return;

      const severityLevel = (disaster.severity || "medium").toLowerCase();
      const markerColor =
        SEVERITY_COLORS[severityLevel] || SEVERITY_COLORS.medium;

      const customIcon = L.divIcon({
        className: "custom-disaster-icon",
        html: `<div style="background-color:${markerColor}; width:12px; height:12px; border-radius:50%; border:2px solid white;"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).bindPopup(` 
        <div style="min-width:200px;">
          <h3 style="margin:0 0 8px 0; color:${markerColor};">${
        disaster.name || "Unnamed Disaster"
      }</h3>
          <div><b>Severity:</b> ${disaster.severity || "Unknown"}</div>
          <div><b>Date:</b> ${new Date(
            disaster.date
          ).toLocaleDateString()}</div>
          <div><b>Description:</b> ${
            disaster.description || "No description available"
          }</div>
        </div>
      `);

      marker.on("click", () => onMarkerClick(disaster));
      markersLayerRef.current.addLayer(marker);
    });
  }, [disasters, onMarkerClick]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toggleMapControl = useCallback((controlName) => {
    setMapControls((prev) => ({
      ...prev,
      [controlName]: !prev[controlName],
    }));
    setActiveControl((prev) => (prev === controlName ? null : controlName)); // Toggle active control
  }, []);

  const resetMapView = useCallback(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([initialLat, initialLng], initialZoom);
    }
  }, [initialLat, initialLng, initialZoom]);

  return (
    <div
      className="map-container"
      style={{ position: "relative", height: "100%", width: "100%" }}
    >
      <div
        ref={mapRef}
        id="map"
        style={{ borderRadius: "12px", height: "100%", width: "100%" }}
      />

      <div
        className="map-controls"
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => toggleMapControl("satellite")}
          className={activeControl === "satellite" ? "active" : ""}
          style={{
            fontSize: "14px",
            padding: "5px",
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          🛰️
        </button>
        <button
          onClick={() => toggleMapControl("measurement")}
          className={activeControl === "measurement" ? "active" : ""}
          style={{
            fontSize: "14px",
            padding: "5px",
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          📏
        </button>
        <button
          onClick={resetMapView}
          style={{
            fontSize: "14px",
            padding: "5px",
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          🏠
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
