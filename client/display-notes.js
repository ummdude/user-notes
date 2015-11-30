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
