const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// Create one document
const fruit = new Fruit({
  name: "Apple",
  rating: 10,
  review: "Peaches are so yummy!",
});

fruit.save();

// Relationships and embedding documents
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit.",
});

// pineapple.save();

const person = new Person({
  name: "John",
  age: 37,
  favouriteFruit: pineapple,
});

// person.save();

const mango = new Fruit({
  name: "Mango",
  score: 6,
  review: "Decent fruit.",
});

// mango.save();

Person.updateOne({ name: "John" }, { favouriteFruit: mango }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Succesfully updated the documents");
  }
});

// Create many documents
const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "The best fruit!",
});

const orenge = new Fruit({
  name: "orenge",
  rating: 4,
  review: "Too sour for me",
});

const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weird texture",
});

// Fruit.insertMany([kiwi, orenge, banana], (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully saved all the fruits to fruitDB");
//   }
// });

// Read all documents
Fruit.find((err, fruits) => {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    console.log(fruits);
    fruits.forEach((element) => {
      console.log(element.name);
    });
  }
});

// Update one document
Fruit.updateOne(
  { _id: "5fea43a67013833d80e9aec7" },
  { name: "Peach" },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Succesfully updated the document.");
    }
  }
);

// Delete one document
// Fruit.deleteOne({ _id: "5fea43a67013833d80e9aec7" }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully deleted the document.");
//   }
// });

// Delete all documents
// Person.deleteMany({ name: "John" }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully deleted all the document.");
//   }
// });
