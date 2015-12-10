/*
 */

Template.publicNotes.helpers({

    /** returns public notes */
    publicNotes: function() {
        return Notes.find({privacy: "public"});
    },

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
    privateNotes: function() {
        return Notes.find({privacy: "private", owner: Meteor.userId()});
    },

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

Template.publicNotes.events({
    /*
     this function displays the note that is clicked on on the same page.
     */
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
 */
