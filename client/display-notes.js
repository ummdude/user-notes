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

// /* start test js
Template.testPage.helpers({
    // this function returns the public notes in the Notes collection.
    publicNotes: Notes.find({privacy: "public"})
});

Template.testPage.events({
    // this function displays the note that is clicked on on the same page.
    'click a': function(event) {

        event.preventDefault();

        // retrieve note document based on id
        var search = event.target.name;
        var searchResult = Notes.findOne(search);
        var owner = (searchResult.owner == null) ? "Anonymous" : Meteor.users.findOne(searchResult.owner).username;
        // receiving an error at this location, likely because of my own code

        //resets marker elements
        $("#noteMarkers").empty();
        $("#modifyDiv").empty();
        if ($("#modifyPre").length == 0) {
          $("#modifyDiv").append('<pre id="modifyPre">Note</pre>');
        }

        // display note information (probably needs to be changed)
        $("#displayTitle").text(searchResult.title);
        $("#displayOwner").text(owner);
        $("#displayDate").text(searchResult.createdAt);
        //$("#displayNote").text(searchResult.text);
        $("#modifyPre").text(searchResult.text);
        //after note is displayed

        //## start of internal links to markers code:
        //finds marked text and splits note at each marked text

        /*
          ### internal link notes
          change modifyPre and modifyDiv to more meaningful names

          ## Errors:
          == Uncaught TypeError: Cannot read property 'owner' of undefined
          - error created when clicking an internal link
          == displaying html code with quotes incorrectly displays the note.

          ## internal link example:
          var note1 = $("#modifyPre").text(); //searchResult.text;
          $("#noteMarkers").append(<a href="#notes1">notes 1</a>);

         */

        // for each note element, append text element into modifyDiv element
        var markerId3 = "should not be seen";
        //# of makers + 1 == # of note sections
        // + 1 is the top section
        // expected test note split: note1,marker1,note2,marker2,note3
        $.each($("#modifyPre").text().split("####"), function( index, value ) {
          // if marker exists, don't create link and element

          // if index == 0, id = noteTop
          if (index == 0) { //creates element of first text section
            if ($("#noteTop").length == 0) {
              $("#modifyDiv").append('<pre id="noteTop">'+value+'</pre>'); //only element if no markers created
            }
          } else if ((index % 2) == 1) { //all odd indexes is a marker
            markerId3 = value; //store marker name to use in id and display in element text
          } else if ($('#'+markerId3).length == 0) { //only if the element does not exist

            // #### internal link creation
            /*
              <a href="#notes1">notes 1</a> internal link
              <h2 id="notes1">User Notes</h2> position to change view to
             */
            //error started when I added this line of code
            //error because html loads internal links at load time?
            $("#noteMarkers").append('<a href="#'+markerId3+'">'+markerId3+'</a>');

            // #### element segementation
            //for the marker to be displayed in the note text
            value = "=== "+markerId3+" ==="+value;
            $("#modifyDiv").append('<pre id="'+markerId3+'Marker">'+value+'</pre>');
          } // end else if markerId3).length

        }  // end generic function
        ); // end for each note "section" in pre modifyPre
        //remove element containing original text
        $("#modifyPre").remove();
        console.log("executed to end"); // to test html notes if they reach this line

        /*
          #### section notes:
          ### create internal links to markers notes:
          new line in string \n
          jquery .each function
          variable jquery selector
          ## .append
          = adds element to the bottom of inside the selected element
         */
    } // end function click a
}); // end testPage.events

/*
 */
