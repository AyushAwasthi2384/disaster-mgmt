import { useState, useEffect, useCallback } from "react";

const WeatherReport = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location] = useState("Lucknow");

  const WEATHERSTACK_API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;

  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!WEATHERSTACK_API_KEY) {
      console.error(
        "API key is missing. Please set it in your environment variables."
      );
      setError("API key is missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${location}&units=m`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.info);
      }

      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [location, WEATHERSTACK_API_KEY]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const formatDate = (localtime) => {
    if (!localtime) return {};
    const localDate = new Date(localtime);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[localDate.getDay()];
    const date = localDate.getDate();
    const month = localDate.toLocaleString("default", { month: "short" });
    const hours = localDate.getHours();
    const minutes = localDate.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHours = hours % 12 || 12;

    return { dayName, date, month, displayHours, minutes, ampm };
  };

  const getAirQuality = (index) => {
    if (!index) return { level: "N/A", color: "bg-gray-500" };
    if (index <= 1) return { level: "Good", color: "bg-green-500" };
    if (index <= 3) return { level: "Moderate", color: "bg-yellow-500" };
    if (index <= 5) return { level: "Unhealthy", color: "bg-orange-500" };
    return { level: "Hazardous", color: "bg-red-500" };
  };

  const generateForecast = (currentTemp, hours) => {
    if (!currentTemp || hours === undefined) return [];
    return [1, 3, 6, 9].map((hour) => {
      const forecastHour = (hours + hour) % 24;
      const forecastAmPm = forecastHour >= 12 ? "pm" : "am";
      const displayHour = forecastHour % 12 || 12;
      const tempVariation = Math.round(Math.sin(hour / 3) * 3);
      const temp = currentTemp + tempVariation;

      return {
        temp: `${Math.round(temp)}°c`,
        time: `${displayHour}:00 ${forecastAmPm}`,
        icon:
          weatherData?.current?.weather_icons?.[0] ||
          "https://placehold.co/100x100",
      };
    });
  };

  const generateWeeklyForecast = (currentTemp) => {
    if (!currentTemp) return [];
    const weeklyDays = ["Today", "Tomorrow", "Wed", "Thu", "Fri"];
    return weeklyDays.map((day, i) => {
      const tempVariation = Math.round(Math.sin(i) * 4);
      return {
        day,
        icon:
          weatherData?.current?.weather_icons?.[0] ||
          "https://placehold.co/100x100",
        high: `${Math.round(currentTemp + 2 - tempVariation)}°c`,
        low: `${Math.round(currentTemp - 2 - tempVariation)}°c`,
      };
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col h-fit w-1/3 justify-start bg-[#161E29] rounded-xl p-3">
        <div className="bg-[#1D2939] p-5 rounded-xl mb-2 text-center">
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-fit w-1/3 justify-start bg-[#161E29] rounded-xl p-3">
        <div className="bg-[#1D2939] p-5 rounded-xl mb-2 text-center text-red-400">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  const { dayName, date, month, displayHours, minutes, ampm } = formatDate(
    weatherData.location.localtime
  );
  const airQuality = getAirQuality(
    weatherData.current.air_quality?.["us-epa-index"]
  );
  const hourlyForecast = generateForecast(
    weatherData.current.temperature,
    new Date(weatherData.location.localtime).getHours()
  );
  const weeklyForecast = generateWeeklyForecast(
    weatherData.current.temperature
  );

  return (
    <div className="flex flex-col h-fit w-1/3 justify-start bg-[#161E29] rounded-xl p-3 hover:drop-shadow-lg">
      <div className="bg-[#1D2939] p-5 rounded-xl mb-2">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h1 className="text-6xl font-bold">
              {weatherData.current.temperature}°
              <span className="text-5xl">c</span>
            </h1>
            <p className="text-base text-gray-400">
              {dayName} {date} {month}, {displayHours}:{minutes} {ampm}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {weatherData.location.name}, {weatherData.location.region}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <img
              src={
                weatherData.current.weather_icons?.[0] ||
                "https://placehold.co/100x100"
              }
              alt={
                weatherData.current.weather_descriptions?.[0] || "Weather Icon"
              }
              className="w-20 h-20"
            />
            <p className="text-sm text-gray-400 mt-1">
              {weatherData.current.weather_descriptions?.[0]}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-7">
          {hourlyForecast.map((forecast, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={forecast.icon}
                alt="Weather icon"
                className="w-8 h-8 mb-1"
              />
              <p className="font-bold text-base">{forecast.temp}</p>
              <p className="text-[10px] text-gray-400">{forecast.time}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1D2939] p-4 rounded-xl mb-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold">Air Quality Index:</p>
            <div className="flex items-center">
              <span className="mr-2 font-bold">{airQuality.level}</span>
              <div className={`w-3 h-3 ${airQuality.color} rounded-full`}></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold">Humidity:</p>
            <div className="flex items-center">
              <span className="mr-2 font-bold">
                {weatherData.current.humidity}%
              </span>
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold">Wind:</p>
            <div className="flex items-center">
              <span className="mr-2 font-bold">
                {weatherData.current.wind_speed} km/h{" "}
                {weatherData.current.wind_dir}
              </span>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1D2939] p-4 rounded-xl">
        <div className="flex justify-between">
          {weeklyForecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="text-sm mb-1">{day.day}</p>
              <img src={day.icon} alt="Weather icon" className="w-8 h-8 mb-1" />
              <p className="text-sm font-bold">{day.high}</p>
              <p className="text-xs text-gray-400">{day.low}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherReport;
