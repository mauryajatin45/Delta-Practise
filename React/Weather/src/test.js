const fetchWeatherData = (city) => {
    const apiKey = "3317313606ab5736298267e25a39b357"; // Replace with your API key
  
    // Ensure the city name is valid
    if (!city) {
      setError("Please enter a city.");
      return;
    }
  
    // Reset error message before fetching
    // setError("");
  
    // First, fetch the city coordinates
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found.");
        }
        return response.json();
      })
      .then((data) => {
        // Extract coordinates
        const { lat, lon } = data.coord;
  
        // Now fetch the hourly data using One Call API
        return fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch hourly data.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Check the response structure
        const { current, hourly } = data; // `current` is the current weather, `hourly` is the hourly forecast
  
        // Set the state with both current weather and hourly forecast
        setWeatherData({
          currentTemperature: current.temp,
          currentWeatherDescription: current.weather[0].description,
          currentFeelsLike: current.feels_like,
          hourlyForecast: hourly.slice(0, 12), // Get the next 12 hours (you can adjust this)
        });
      })
      .catch((error) => {
        setWeatherData(null);  // Clear the previous data
        setError(error.message); // Show error message if fetch fails
      });
  };
  

  fetchWeatherData("New York");