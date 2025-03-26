import { useState, useEffect, useCallback } from "react";

// https://meet.google.com/qhk-nfje-sje
// https://us.123rf.com/450wm/captainvector/captainvector2204/captainvector220468917/185265890-rain-fall-icon.jpg?ver=6
// https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcREIJPATLP8yRxohI3EAVmiEeB-MYiKjIToiHfFFsoVXl_xm2dB
//https://img.freepik.com/premium-psd/yellow-ball-black-background-with-black-background_1142283-430928.jpg?w=360


// data:image/jpeg;base64,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


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
