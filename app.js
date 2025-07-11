const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
// const errorhandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.use(
  cors({
    origin: ["?"],
    credentials: true,
  })
);

const routesPath = path.join(__dirname, "routes");
if (fs.existsSync(routesPath)) {
  fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith(".js")) {
      try {
        app.use("/api", require(path.join(routesPath, file)));
        console.log(`✅ Loaded route: ${file}`);
      } catch (err) {
        console.error(`❌ Error loading route ${file}:`, err.message);
      }
    }
  });
} else {
  console.warn("⚠️ No 'routes' folder found. No API routes will be loaded.");
}

// app.use(errorhandler);

module.exports = app;
