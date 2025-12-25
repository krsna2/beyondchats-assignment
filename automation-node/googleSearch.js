const googleIt = require("google-it");

async function searchGoogle(query) {
  const results = await googleIt({ query });

  return results
    .filter(r => r.link.includes("blog") || r.link.includes("article"))
    .slice(0, 2)
    .map(r => r.link);
}

module.exports = { searchGoogle };
