const fs = require('fs');

async function readJSONFile(filename) {
    try {
      const data = await fs.readFile(filename, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filename}: ${error}`);
      return [];
    }
  }

module.exports = readJSONFile(filename);