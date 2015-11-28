Notes = new Mongo.Collection("notes");

Meteor.startup(function(){
    if (Notes.find().count() === 0) {
        Notes.insert({
            title: "Test Note",
            text: "This is a test note."
        });
    }
})
