// catches events on the create-note template
Template.createNote.events({

    // function to create new note from form on submittal
    'submit form': function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        // can't use "-"
        var notetitle = event.target.notetitle.value;
        var notetext = event.target.notetext.value;
        console.log(notetitle);
        console.log(notetext);

        // Insert a task into the collection
        Notes.insert({
            title: notetitle,
            text: notetext,
        });
        // Clear form
        event.target.notetitle.value = "";
        event.target.notetext.value = "";
    }
});
