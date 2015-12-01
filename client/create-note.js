// catches events on the create-note template
Template.createNote.events({

    // function to create new note from form on submittal
    'submit form': function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        var notetitle = (event.target.notetitle.value == "") ? "Untitled" : event.target.notetitle.value;
        var notetext = event.target.notetext.value;
        console.log(notetitle);
        console.log(notetext);

        // Insert a task into the collection
        Notes.insert({
            title: notetitle,
            text: notetext,
            createdAt: new Date(),
            owner: Meteor.userId()
        });
        // Clear form
        event.target.notetitle.value = "";
        event.target.notetext.value = "";
    }
});
