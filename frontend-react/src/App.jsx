import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>BeyondChats Articles</h1>

      <div className="grid">
        {articles.map((article) => (
          <div className="card" key={article.id}>
            <h2>{article.title}</h2>

            <span
              className={
                article.is_updated ? "badge updated" : "badge original"
              }
            >
              {article.is_updated ? "Updated Article" : "Original Article"}
            </span>

            <p className="content">
              {article.content.substring(0, 300)}...
            </p>

            {article.references && (
              <div className="references">
                <h4>References:</h4>
                <ul>
                  {article.references.map((ref, index) => (
                    <li key={index}>
                      <a href={ref} target="_blank" rel="noreferrer">
                        {ref}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
