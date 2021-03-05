const mimeType = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".doc": "application/msword",
  ".eot": "application/vnd.ms-fontobject",
  ".ttf": "application/x-font-ttf"
};

//for test
const product_catalog = [
  {
    id: 1,
    catalog_name: "Smart Home"
  },

  {
    id: 2,
    catalog_name: "Smart Manufacturing"
  },

  {
    id: 3,
    catalog_name: "Smart health"
  },

  {
    id: 4,
    catalog_name: "Smart Farming - Agriculture"
  }
];

module.exports = {
  mimeType: mimeType,
  product_catalog
};
