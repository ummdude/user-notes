//
/*
user-notes.html
*/

//collection of public notes
Publicnotes = new Mongo.Collection('publicnote');
/*
element attributes:
  notetitle: notetitle,
  notetext:
*/

// to be javascript console?
// later field: date
// note text to be stored differently?
/*
Publicnotes.insert({
  note-title: "Test Note"
  note-text: "test note text"
  //columns: "1" // how this should be displayed
});
*/

Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    name: 'home',
    template: 'home'
});

Router.route('/create-note',{
  template: 'create-note',
  name: 'create-note'
});

Router.route('/public-notes', {
    name: 'public-notes',
    template: 'public-notes'
});

Router.route('/about', {
    name: 'about',
    template: 'about'
});


if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({

  });

  // catches events on the create-note template
  Template.create-note.events({

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
      Publicnotes.insert({
        notetitle: notetitle,
        notetext: notetext,
      });
      // Clear form
      event.target.notetitle.value = "";
      event.target.notetext.value = "";
    }
  });

  Template.view-note.events({

  });

  // this isn't used currently
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}