Template.publicNotes.helpers({
    publicNotes: Notes.find({})
});

Template.publicNotes.events({
   'click a': function(event) {
       event.preventDefault();
   }
});