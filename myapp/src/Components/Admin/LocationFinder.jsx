import React, { useState } from "react";

function LocationFinder() {
  const [location, setLocation] = useState({
    city: "",
    state: "",
  });
  const [error, setError] = useState("");

  // Function to fetch city and state using latitude and longitude
  const fetchCityAndState = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      if (data && data.address) {
        setLocation({
          city: data.address.city || data.address.town || data.address.village || "N/A",
          state: data.address.state || "N/A",
        });
      } else {
        setError("Unable to fetch city and state.");
      }
    } catch (err) {
      setError("An error occurred while fetching city and state.");
      console.error(err);
    }
  };

  // Function to get the user's location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityAndState(latitude, longitude); // Fetch city and state
          setError(""); // Clear any previous errors
        },
        (err) => {
          setError("Failed to fetch location. Please enable location services.");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-5">
      <button
        onClick={fetchLocation}
        className="bg-orange-500 text-white px-8 py-2 rounded hover:bg-blue-600"
      >
        Get Your Location
      </button>
      {location.city || location.state ? (
        <div className="mt-4 text-center">
          <p className="text-lg">City: {location.city}</p>
          <p className="text-lg">State: {location.state}</p>
        </div>
      ) : (
        <p className="mt-4 text-red-500">{error}</p>
      )}
    </div>
  );
}

export default LocationFinder;
