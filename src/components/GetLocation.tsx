import React, { useState } from "react";

const GetLocation: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          setErrorMessage(null);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setErrorMessage("The request to get user location timed out.");
              break;
            default:
              setErrorMessage("An unknown error occurred.");
          }
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Geolocation App</h1>

      <button
        onClick={getLocation}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Get Location
      </button>

      {location && (
        <div>
          <h2>Your Location:</h2>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lon}</p>
        </div>
      )}

      {errorMessage && (
        <div style={{ color: "red", marginTop: "20px" }}>
          <p>Error: {errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default GetLocation;
