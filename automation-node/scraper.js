const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeContent(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $("article").text().substring(0, 2000);
  } catch (err) {
    console.error("Scraping failed:", url);
    return "";
  }
}

module.exports = { scrapeContent };
