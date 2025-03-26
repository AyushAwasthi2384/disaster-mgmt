import React, { useEffect, useState } from "react";

const NewsData = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;

        if (!apiKey) {
          console.error(
            "API key is missing. Please set it in your environment variables."
          );
          setError("API key is missing.");
          return;
        }

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        const formattedDate = currentDate.toISOString().split("T")[0];

        const url = `https://newsapi.org/v2/everything?q=Disasters&from=${formattedDate}&sortBy=popularity&apiKey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          throw new Error("Invalid response structure from API.");
        }
      } catch (err) {
        console.error("Error fetching news:", err.message);
        setError("Failed to fetch news. Please try again later.");
      }
    };

    fetchNews();
  }, []);

  const renderArticles = () => {
    if (error) {
      return <p className="text-red-500 text-center">{error}</p>;
    }

    if (articles.length === 0) {
      return (
        <p className="text-gray-400 text-center">
          No articles available at the moment.
        </p>
      );
    }

    return (
      <div className="flex flex-wrap justify-center gap-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg overflow-hidden bg-[#161E29] p-2 w-full"
          >
            <img
              src={article.urlToImage || "https://placehold.co/240x120"}
              alt={article.title || "News Image"}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="p-2 bg-gray-800 rounded-lg mt-2 flex flex-col">
              <div className="flex items-center mb-1">
                <div className="w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs">i</span>
                </div>
                <p className="text-xs text-white">
                  {article.source?.name || "Unknown Source"}
                </p>
                <p className="text-xs text-gray-400 ml-auto">
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Unknown Time"}
                </p>
              </div>
              <p className="text-xs text-gray-400">
                {article.description || "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#0F172A] min-h-screen p-4 flex flex-col">
      <h1 className="text-white text-2xl font-bold mb-4 self-center">
        Latest News
      </h1>
      {renderArticles()}
    </div>
  );
};

export default NewsData;
