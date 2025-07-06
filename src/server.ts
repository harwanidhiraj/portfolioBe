import app from "./app";
import config, { connectDB } from "./config";
import http from "http";

http.createServer(app).listen(config.port, () => {
  console.log(
    `🚀 HTTP server running in ${config.env} mode on http://localhost:${config.port}`
  );
});

(async () => {
  await connectDB();
})();
