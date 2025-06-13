//for mongoose database required
const mongoose = require("mongoose");

//for create Module or table
const Listing = require("../models/listing.js");

//for get the data from other file(./data.js) to index main file

const initData = require("./data.js");

const MONGO_URL = "mongodb+srv://anshmahajan345:grr20QFLPXJqtua2@cluster0.ybos7el.mongodb.net/test?retryWrites=true&w=majority";

main()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}


//store the data into the database 
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj=>({
    ...obj,
    owner:"65faaae8d351653782e5a739",
  })));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();



