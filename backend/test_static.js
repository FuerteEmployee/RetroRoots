const http = require("http");

http.get("http://localhost:5000/uploads/RR-844.jpg", (res) => {
  console.log("Status:", res.statusCode);
  console.log("Content-Type:", res.headers["content-type"]);
  if (res.statusCode === 200) {
    console.log("✅ Static file serving WORKS! Images will load.");
  } else {
    console.log("❌ Static file serving FAILED. Images will NOT load.");
  }
  res.destroy();
}).on("error", (e) => {
  console.log("❌ ERROR:", e.message);
  console.log("Is the backend running on port 5000?");
});
