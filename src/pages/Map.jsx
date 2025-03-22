import axios from "axios";
import React, { useEffect, useState } from "react";
import MapComponent from "../component/MapComponent.jsx";

const Map = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchDisasters = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/disaster`,
          {
            params: { lat: 19.076, lng: 72.8777, radius: 50000 }, // Adjust for your desired location
          }
        );
        if (mounted) {
          setDisasters(res.data); // Set fetched data
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError("Failed to fetch disaster data");
          setLoading(false);
        }
        console.log(err);
      }
    };

    fetchDisasters();

    return () => {
      mounted = false; // Prevent state updates after unmounting
    };
  }, []);

  if (loading) {
    return <div>Loading disaster data...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error handling
  }

  if (disasters.length === 0) {
    return <div>No disasters found within the specified area.</div>; // Empty data handling
  }

  return (
    <div>
      <MapComponent disasters={disasters} />
    </div>
  );
};

export default Map;
