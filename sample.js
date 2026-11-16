// ------------------------------------------------------------
// Lab 01 - From the terminal to Node.js
// ------------------------------------------------------------
// In session 1 you typed MongoDB commands directly in mongosh:
//
//   db.books.insertOne({ title: "Dune", author: "Frank Herbert" })
//   db.books.find()
//
// Here you will write the exact same operations, but as a Node.js
// script. The MongoDB driver translates your JavaScript calls into
// the same commands mongosh sends to the database.
// ------------------------------------------------------------

const { MongoClient } = require("mongodb");

// The connection string tells the driver where MongoDB is running.
// "mongodb://localhost:27017" is the default for a local installation.
const URI = "mongodb://localhost:27017";

// MongoClient is the entry point to the driver.
// You create one client per application.
const client = new MongoClient(URI);

// ------------------------------------------------------------
// Everything that talks to the database must happen inside an
// async function, because network calls take time.
// "await" pauses execution until the operation completes.
// ------------------------------------------------------------
async function main() {
  // Open the connection to MongoDB.
  await client.connect();

  // Select the database and collection to work with.
  // If they do not exist yet, MongoDB creates them on first write.
  const books = client.db("book_db").collection("books");

  // Start fresh on every run.
  await books.deleteMany({});

  // ----------------------------------------------------------
  // TODO 1 - insertOne with an embedded object
  // ----------------------------------------------------------
  // In mongosh you would write:
  //   db.books.insertOne({ title: "...", publisher: { name: "...", country: "..." } })
  //
  await books.insertOne({ title: "Dune", publisher: { name: "Frank Herbert", country: "France" } });

  // Do the same here. Insert one book that has a publisher field
  // containing an embedded object with at least a name and a country.
  // ----------------------------------------------------------
  // TODO 2 - insertOne with an array
  // ----------------------------------------------------------
  await books.insertOne({ title: "The Hobbit", tags: ["fantasy", "adventure", "classic"] });
  // Insert one book that has a tags field containing
  // an array of at least 3 strings.

  // ----------------------------------------------------------
  // TODO 3 - insertMany
  // ----------------------------------------------------------
  await books.insertMany([
    { title: "Book 1", publisher: { name: "Publisher 1", country: "USA" }, tags: ["fiction", "adventure"] },
    { title: "Book 2", publisher: { name: "Publisher 2", country: "France" } },
    { title: "Book 3", tags: ["non-fiction", "history"] },
    { title: "Book 4", publisher: { name: "Publisher 4", country: "Germany" }, tags: ["science", "technology"] },
    { title: "Book 5", publisher: { name: "Publisher 5", country: "France" }, tags: ["mystery"] },
    { title: "Book 6", publisher: { name: "Publisher 6", country: "USA" }, tags: ["romance", "drama"] },
    { title: "Book 7", publisher: { name: "Publisher 7", country: "UK" }, tags: ["fantasy"] }
  ]);
  // Insert at least 5 books in a single call using insertMany.
  // Include a mix: some with a publisher object, some with tags, some with both.

  // ----------------------------------------------------------
  // TODO 4 - find all documents
  // ----------------------------------------------------------
  const allBooks = await books.find().toArray();
  // Retrieve every document in the collection and log each title.
  // Hint: find() returns a cursor - call .toArray() to get an array.

  // ----------------------------------------------------------
  // TODO 5 - findOne with dot notation
  // ----------------------------------------------------------
  const firstFrenchBook = await books.findOne({ "publisher.country": "France" });
  // Find the first book whose publisher.country is "France".
  // Dot notation lets you filter on a field inside an embedded object:
  //   { "publisher.country": "France" }
  // Log the title of the result.

  // ----------------------------------------------------------
  // TODO 6 - find with a filter
  // ----------------------------------------------------------
  const frenchBooks = await books.find({ "publisher.country": "France" }).toArray();
  // Find all books whose publisher.country is "France".
  // Log how many there are and list their titles.

  // ----------------------------------------------------------
  // TODO 7 - find with $exists
  // ----------------------------------------------------------
  const booksWithTags = await books.find({ tags: { $exists: true } }).toArray();
  // Find all books that have a tags field, regardless of its value.
  //   { tags: { $exists: true } }
  // Log each title and its tags array.

  // Always close the connection when you are done.
  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
