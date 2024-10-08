const mongoose = require("mongoose");

const password = process.argv[2];

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const linkSchema = new mongoose.Schema({
  name: String,
  link: String,
});

linkSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// const Link = mongoose.model("Link", linkSchema);

// const link = new Link({
//   name: "haha",
//   link: "https://cashboom.io/",
// });

// link.save().then((result) => {
//   console.log("link saved!");
//   mongoose.connection.close();
// });

module.exports = mongoose.model("Link", linkSchema);
