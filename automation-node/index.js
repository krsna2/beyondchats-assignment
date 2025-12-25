const axios = require("axios");
const { searchGoogle } = require("./googleSearch");
const { scrapeContent } = require("./scraper");
const { enhanceArticle } = require("./llmService");
const config = require("./config");

async function runAutomation() {
  console.log("Fetching latest article from Laravel...");

  const response = await axios.get(config.LARAVEL_API);
  const article = response.data[0]; // latest article

  if (!article) {
    console.log("No articles found.");
    return;
  }

  console.log("Searching Google for:", article.title);

  const links = await searchGoogle(article.title);

  const contents = [];
  for (let link of links) {
    const text = await scrapeContent(link);
    contents.push(text);
  }

  console.log("Enhancing article using LLM (partial)...");
  const updatedContent = enhanceArticle(article.content, contents);

  console.log("Publishing updated article back to Laravel...");
  await axios.post(config.LARAVEL_API, {
    title: article.title,
    content: updatedContent,
    is_updated: true,
    references: links
  });

  console.log("Automation completed.");
}

runAutomation();
