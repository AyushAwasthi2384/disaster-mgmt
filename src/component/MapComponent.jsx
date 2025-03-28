// Import necessary libraries and styles
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import "leaflet.heat";

// Configuration constants for map settings
const MAP_CONFIG = {
  SEVERITY_COLORS: {
    low: "#4caf50", // Green for low severity
    medium: "#ff9800", // Orange for medium severity
    high: "#f44336", // Red for high severity
    critical: "#9c27b0", // Purple for critical severity
  },
  BASE_LAYERS: {
    STREET: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    SATELLITE: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    },
  },
};

const MapComponent = ({
  disasters = [], // Array of disaster data
  onMarkerClick = () => {}, // Callback for marker click
  allowUserMarkers = true, // Allow user to add markers
  mapCenter = "28.5937,78.9629", // Default map center (India)
  initialZoom = 5, // Default zoom level
}) => {
  // Refs for managing map and layers
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const heatmapLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const satelliteLayerRef = useRef(null);
  const userMarkersLayerRef = useRef(null);

  // State for managing controls and user markers
  const [activeControl, setActiveControl] = useState(null);
  const [userMarkers, setUserMarkers] = useState([]);
  const [mapControls, setMapControls] = useState({
    satellite: false,
    measurement: false,
  });

  // Parse map center coordinates
  const [initialLat, initialLng] = useMemo(
    () => mapCenter.split(",").map(parseFloat),
    [mapCenter]
  );

  // Utility function to calculate distance between two points (Haversine formula)
  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  // Initialize the map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    try {
      // Create map instance
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [initialLat, initialLng],
        zoom: initialZoom,
        zoomControl: true,
        attributionControl: true,
      });

      // Add street base layer
      L.tileLayer(MAP_CONFIG.BASE_LAYERS.STREET.url, {
        attribution: MAP_CONFIG.BASE_LAYERS.STREET.attribution,
      }).addTo(mapInstanceRef.current);

      // Initialize layer groups
      markersLayerRef.current = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
      });
      userMarkersLayerRef.current = L.layerGroup();

      // Add layers to the map
      mapInstanceRef.current.addLayer(markersLayerRef.current);
      mapInstanceRef.current.addLayer(userMarkersLayerRef.current);

      // Add scale control
      L.control
        .scale({
          position: "bottomleft",
          imperial: false,
        })
        .addTo(mapInstanceRef.current);
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    // Cleanup on component unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [initialLat, initialLng, initialZoom]);

  // Update disaster markers and heatmap
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    // // Clear existing markers
    // markersLayerRef.current.clearLayers();

    // Filter valid disasters with coordinates
    const validDisasters = disasters.filter(
      (disaster) =>
        disaster.location?.coordinates &&
        !isNaN(disaster.location.coordinates[0]) &&
        !isNaN(disaster.location.coordinates[1])
    );
    console.log("Valid Disasters:", disasters);

    // Prepare heatmap data
    const heatmapData = validDisasters.map((disaster) => {
      const {lng, lat} = disaster.location.coordinates;
      return [lat, lng, 3]; // [latitude, longitude, intensity]
    });

    // Add markers for each disaster
    disasters.forEach((disaster) => {
      const {lng, lat} = disaster.location.coordinates;
      const severityLevel = (disaster.severity || "medium").toLowerCase();
      const markerColor =
        MAP_CONFIG.SEVERITY_COLORS[severityLevel] ||
        MAP_CONFIG.SEVERITY_COLORS.medium;

      const customIcon = L.divIcon({
        className: "custom-disaster-icon",
        html: `<div style="background-color:${markerColor}; width:12px; height:12px; border-radius:50%; border:2px solid white;"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).bindPopup(`
        <div style="min-width:250px;">
          <h3 style="margin:0 0 8px 0; color:${markerColor};">${
        disaster.title || "Unnamed Disaster"
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

    // Manage heatmap layer
    // if (heatmapLayerRef.current) {
    //   // mapInstanceRef.current.removeLayer(heatmapLayerRef.current);
    //   heatmapLayerRef.current = null;
    // }

    if (heatmapData.length > 0) {
      heatmapLayerRef.current = L.heatLayer(heatmapData, {
        radius: 35,         // Increased radius for wider coverage
        blur: 20,          // Increased blur for smoother transitions
        maxZoom: 20,       // Higher maxZoom to show heatmap at all zoom levels
        max: 1.0,          // Maximum point intensity
        minOpacity: 0.3,   // Minimum opacity for better visibility
        gradient: {        // Custom color gradient
          0.0: '#87CEEB',  // Light blue
          0.3: '#FFD700',  // Yellow
          0.6: '#FFA500',  // Orange
          0.8: '#FF4500',  // Red-Orange
          1.0: '#FF0000'   // Red
        }
      }).addTo(mapInstanceRef.current);
    }

    // Cleanup heatmap layer on unmount
    // return () => {
    //   if (heatmapLayerRef.current) {
    //     mapInstanceRef.current.removeLayer(heatmapLayerRef.current);
    //     heatmapLayerRef.current = null;
    //   }
    // };
  }, [disasters, onMarkerClick]);

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

        console.log(polyline, marker);

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
      }
    };

    if (mapInstanceRef.current) {
      if (mapControls.measurement) {
        mapInstanceRef.current.on("click", handleMapClick);
      } else {
        mapInstanceRef.current.off("click", handleMapClick);
        userMarkersLayerRef.current.clearLayers();
        // setUserMarkers([]);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off("click", handleMapClick);
      }
    };
  }, [
    mapControls.measurement,
    userMarkers,
    allowUserMarkers,
    calculateDistance,
  ]);

  // Toggle map controls
  const toggleMapControl = useCallback((controlName) => {
    setMapControls((prev) => ({
      ...prev,
      [controlName]: !prev[controlName],
    }));
    setActiveControl((prev) => (prev === controlName ? null : controlName));
  }, []);

  // Reset map view to initial state
  const resetMapView = useCallback(() => {
    mapInstanceRef.current?.setView([initialLat, initialLng], initialZoom);
  }, [initialLat, initialLng, initialZoom]);

  // Manage satellite layer toggle
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (!satelliteLayerRef.current) {
      satelliteLayerRef.current = L.tileLayer(
        MAP_CONFIG.BASE_LAYERS.SATELLITE.url,
        {
          attribution: MAP_CONFIG.BASE_LAYERS.SATELLITE.attribution,
        }
      );
    }

    if (mapControls.satellite) {
      satelliteLayerRef.current.addTo(mapInstanceRef.current);
    } else {
      mapInstanceRef.current.removeLayer(satelliteLayerRef.current);
    }
  }, [mapControls.satellite]);

  return (
    <div
      className="map-container"
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        ref={mapRef}
        id="map"
        style={{
          height: "100%",
          width: "100%",
        }}
      />

      {/* Map Controls */}
      <div
        className="map-controls"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          zIndex: 1000,
        }}
      >
        {[
          { name: "satellite", icon: "🛰️" },
          { name: "measurement", icon: "📏" },
        ].map((control) => (
          <button
            key={control.name}
            onClick={() => toggleMapControl(control.name)}
            className={activeControl === control.name ? "active" : ""}
            style={{
              fontSize: "16px",
              padding: "8px",
              borderRadius: "50%",
              border:
                activeControl === control.name
                  ? "2px solid #3388ff"
                  : "1px solid rgba(0,0,0,0.2)",
              background:
                activeControl === control.name
                  ? "rgba(51,136,255,0.1)"
                  : "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {control.icon}
          </button>
        ))}
        <button
          onClick={resetMapView}
          style={{
            fontSize: "16px",
            padding: "8px",
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.2)",
            background: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          🏠
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
