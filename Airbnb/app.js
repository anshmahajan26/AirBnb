const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const methodOverride = require("method-override");

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

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

app.get("/listings", async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index", { allListings });
});

//new route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new");

});
//post request of form
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body); // req.body has the form fields
  await newListing.save();
  res.redirect(`/listings`);
});

// Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});
// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});
// Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
});

//DELETE ROUTE
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListings = await Listing.findByIdAndDelete(id);
    console.log(deletedListings);
    res.redirect("/listings");
});

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goaa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });


app.listen(8080, () => {
  console.log(" Server is listening on port 8080");
});
