const path = require("path");
const express = require("express");
const cors = require("cors");
const pollRouter = require("./routes/poll");
const app = express();

app.use(cors());
//Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set public folder
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/poll", pollRouter);
app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
