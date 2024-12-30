import React, { useState, useEffect } from "react";

export default function FirstDiv() {
  const [searchTerm, setSearchTerm] = useState("");  // The city name entered by the user
  const [weatherData, setWeatherData] = useState(null);  // Weather data to display
  const [error, setError] = useState("");  // Error state to handle failed API requests

  // Fetch weather data for a specific city
  const fetchWeatherData = (city) => {
    const apiKey = "3317313606ab5736298267e25a39b357"; // Replace with your API key

    // Ensure the city name is valid
    if (!city) {
      setError("Please enter a city.");
      return;
    }

    // Reset error message before fetching
    setError("");

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found.");
        }
        return response.json();
      })
      .then((data) => {
        const { name, main, weather } = data;
        console.log(data);
        setWeatherData({
          name,
          temperature: main.temp,
          weatherDescription: weather[0].description,
          lowTemp: main.temp_min,
          highTemp: main.temp_max,
          feelsLike: main.feels_like,
        });
      })
      .catch((error) => {
        setWeatherData(null);  // Clear the previous data
        setError(error.message); // Show error message if fetch fails
      });
  };

  // Handle search button click or pressing Enter
  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchWeatherData(searchTerm);
    } else {
      setError("Please enter a city.");
    }
  };

  // Render loading state, error state, or the fetched data
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!weatherData) {
    return (
      <div>
        <div className="flex items-center justify-center p-5">
          <div className="rounded-lg bg-gray-200 p-5">
            <div className="flex">
              <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="pointer-events-none absolute w-5 fill-gray-500 transition"
                >
                  <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter city"
              />
              <input
                type="button"
                value="Search"
                className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
                onClick={handleSearch}
              />
            </div>
          </div>
        </div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center p-5">
        <div className="rounded-lg p-5">
          <div className="flex">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="pointer-events-none absolute w-5 fill-gray-500 transition"
              >
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter city"
            />
            <input
              type="button"
              value="Search"
              className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="firstDiv">
        <h1 className="firstDivCity">City : {weatherData.name}</h1>
        <h1 className="firstDivTemp"> Temperature : {weatherData.temperature}°C</h1>
        <h1 className="firstDivDesc"> {weatherData.weatherDescription}</h1>
        <div className="firstDivFeelsLike">Feels like: {weatherData.feelsLike}°C</div>
        <div className="firstDivAtmos">
          <div className="firstDivLow">Low: {weatherData.lowTemp}°C</div>
          <div className="firstDivHigh">High: {weatherData.highTemp}°C</div>
        </div>
      </div>
    </div>
  );
}
