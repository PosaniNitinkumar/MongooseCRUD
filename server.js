const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Userlist = require("./model");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

app.post("/adduser", async (req, res) => {
  const { name } = req.body;
  try {
    const newDate = new Userlist({ name });
    await newDate.save();
    return res.send(await Userlist.find());
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/getallusers", async (req, res) => {
  try {
    const allDate = await Userlist.find();
    return res.json(allDate);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/delete/:name", async (req, res) => {
  try {
    await Userlist.findOneAndDelete(req.params.name);
    return res.json(await Userlist.find());
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running at 3000");
});
