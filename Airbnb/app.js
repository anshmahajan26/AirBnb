const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");


const MONGO_URL = "mongodb+srv://anshmahajan345:grr20QFLPXJqtua2@cluster0.ybos7el.mongodb.net/test?retryWrites=true&w=majority";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(" MongoDB Connected Successfully!");
  } catch (err) {
    console.error(" MongoDB Connection Failed:", err);
  }
}
main();

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});
app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title: "My New Villa",
        description: "By the beach",
        price: 1200,
        location: "Calangute, Goaa",
        country: "India",
    });

    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");
});


app.listen(8080, () => {
  console.log(" Server is listening on port 8080");
});
