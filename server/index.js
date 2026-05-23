require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");


// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://schooltouchr.onrender.com/",      // same as above
    ],
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",                        // local dev frontend
      "https://schooltouch-server.onrender.com",      // your deployed backend (for same-origin calls)
      "https://schooltouchr.onrender.com/",      // your deployed frontend — replace this
    ],
    credentials: true,
  }),
);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("School Touch Backend Running 🚀");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/public", require("./routes/public.js"));
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/students", require("./routes/students.js"));
app.use("/api/teachers", require("./routes/teachers.js"));
app.use("/api/parents", require("./routes/parents.js"));
app.use("/api/attendance", require("./routes/attendance.js"));
app.use("/api/exams", require("./routes/exams.js"));
app.use("/api/subjects", require("./routes/subjects.js"));
app.use("/api/library", require("./routes/library.js"));
app.use("/api/notifications", require("./routes/notifications.js"));
app.use("/api/chat", require("./routes/chat.js"));
app.use("/api/classes", require("./routes/classes.js"));
app.use("/api/schedules", require("./routes/schedules.js"));
app.use("/api/timetables", require("./routes/timetables.js"));
app.use("/api/announcements", require("./routes/announcements.js"));
app.use("/api/profile", require("./routes/profile.js"));
app.use("/api/fees", require("./routes/fees.js"));
app.use("/api/results", require("./routes/results.js"));
// ✅ Homework & Study Material unified routes
app.use("/api/homework", require("./routes/homework.js"));
app.use("/api/materials", require("./routes/materials.js"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, server, io };

require("./socket.js")(io);
