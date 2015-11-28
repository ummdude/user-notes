Notes = new Mongo.Collection("notes");

Notes.insert({
    title: "Test Note",
    text: "This is a test note."
});
