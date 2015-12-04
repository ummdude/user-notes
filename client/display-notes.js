Template.publicNotes.helpers({

    /** returns public notes */
    publicNotes: Notes.find({privacy: "public"}),

    /** returns true if the Session has a current public note */
    hasPublicNote: function() {
        if (Session.get("currentPublicNote") == null) {
            return false;
        } else {
            return true;
        }
    },

    noteTitle: function() {
        return (Session.get("currentPublicNote") == null) ?
            "Untitled" : Session.get("currentPublicNote").title;
    },

    noteOwner: function() {
        return (Session.get("currentPublicNote") == null) ?
            "Anonymous" : ((Meteor.users.findOne(Session.get("currentPublicNote").owner) == null) ?
            "Anonymous" : Meteor.users.findOne(Session.get("currentPublicNote").owner).username);
    },

    noteDate: function() {
        return (Session.get("currentPublicNote") == null) ?
            "Date" : Session.get("currentPublicNote").createdAt;
    },

    noteContent: function() {
        return (Session.get("currentPublicNote") == null) ?
            "Content" : Session.get("currentPublicNote").text;
    },

    canDelete: function() {
        if (Meteor.user() == null) {
            return false;
        } else if (Meteor.userId() == Session.get("currentPublicNote").owner) {
            return true;
        } else {
            return false;
        }
    }

});

Template.privateNotes.helpers({

    /** returns private notes of the current user */
    privateNotes: Notes.find({privacy: "private", owner: Meteor.userId()}),

    /** returns true if the Session has a current private note */
    hasPrivateNote: function() {
        if (Session.get("currentPrivateNote") == null) {
            return false;
        } else {
            return true;
        }
    },

    noteTitle: function() {
        return (Session.get("currentPrivateNote") == null) ?
            "Untitled" : Session.get("currentPrivateNote").title;
    },

    noteOwner: function() {
        return (Session.get("currentPrivateNote") == null) ?
            "Anonymous" : ((Meteor.users.findOne(Session.get("currentPrivateNote").owner) == null) ?
            "Anonymous" : Meteor.users.findOne(Session.get("currentPrivateNote").owner).username);
    },

    noteDate: function() {
        return (Session.get("currentPrivateNote") == null) ?
            "Date" : Session.get("currentPrivateNote").createdAt;
    },

    noteContent: function() {
        return (Session.get("currentPrivateNote") == null) ?
            "Content" : Session.get("currentPrivateNote").text;
    },

    canDelete: function() {
        if (Meteor.user() == null) {
            return false;
        } else if (Meteor.userId() == Session.get("currentPrivateNote").owner) {
            return true;
        } else {
            return false;
        }
    }

});

/*
 ############## id anchor works ###########
 ##== internal linking concept:
 === before a note displays on the display-notes page
 == using jquery, transform matching text to a page element with a unique name in its "id" tag
 - matching text is text marked to be "marked" perhaps like ####marker####, an internal link would link to that
 text.
 == initially, place internal links in a list to the markers at below the noteTitle, above the noteText
 ## implementing internal links while writing a note seems to be much more difficult.
 */

Template.publicNotes.events({

    'click a': function(event) {
        event.preventDefault();
        Session.set("currentPublicNote", Notes.findOne(event.target.name));
    },

    'click button.delete': function(event) {
        event.preventDefault();
        // Remove note from collection
        Notes.remove(Session.get("currentPublicNote")._id);
        Session.set("currentPublicNote", null);
    }

});

Template.privateNotes.events({
    /*
     this function displays the note that is clicked on on the same page.
     */
    'click a': function(event) {
        event.preventDefault();
        Session.set("currentPrivateNote", Notes.findOne(event.target.name));
    },

    'click button.delete': function(event) {
        event.preventDefault();
        // Remove note from collection
        Notes.remove(Session.get("currentPrivateNote")._id);
        Session.set("currentPrivateNote", null);
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
