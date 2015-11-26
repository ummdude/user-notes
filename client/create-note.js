Template.create-notes.events({

    "submit form, click h2": function(event) {

        event.preventDefault();

        var note = $('#note').valueOf();

        Notes.insert({
            note: note
        });

        event.target.text.value = "";

        $("create h2").text("NEW");

    }


});