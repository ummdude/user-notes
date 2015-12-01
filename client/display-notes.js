Template.publicNotes.helpers({
    publicNotes: Notes.find({})
});

Template.publicNotes.events({
    'click a': function(event) {

        event.preventDefault();

        var search = event.target.name;
        var searchResult = Notes.findOne(search);

        $("#displayTitle").text(searchResult.title);
        $("#displayNote").text(searchResult.text);

    }
});

/*

Template.publicNotes.helpers({
  // returns the notes in the public note database
  'returnPublicNotes': function(){
    return Publicnotes.find();
  }
});

Template.viewNote.helpers({
  // returns the test note
  'returnTestNote': function(){
    return Publicnotes.find({ noteTitle: "texttt" });
  }
});
*/
