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

if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({

    });

    Template.view-note.events({

    });

    // this isn't used currently
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}