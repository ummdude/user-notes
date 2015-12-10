
/*
 */

Template.testPage.helpers({

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

/*
  does not work as a marker name:
  ####(A)User Notes####
 */

Template.testPage.events({
    /*
     this function displays the note that is clicked on on the same page.
     */
    'click .list-group-item': function(event) {
      // console.log("entered function to display note");
      event.preventDefault();
      Session.set("currentPublicNote", Notes.findOne(event.target.name));

      //using older note text retrieval code to obtain note text on correct load time
      var search = event.target.name;
      var searchResult = Notes.findOne(search);

      // reset marker elements
      $("#noteMarkers").empty();
      $("#textDiv").empty();
      if ($("#textElement2").length == 0) {
        $("#textDiv").append('<pre id="textElement2">Note</pre>');
        // older display code
        $("#textElement2").text(searchResult.text);
        // newer display code
        //$("#textElement2").text($("#textElement").text());
      }

      //used to replace code text as string text
      var quoteRE = new RegExp('"', 'g'); // &#34;
      var lsThRE = new RegExp('<', 'g'); // &#62;
      var grThRE = new RegExp('>', 'g'); // &#60;
      //var lfPaRE = new RegExp(/\(/, 'g'); // &#40; (
      //var rtPaRE = new RegExp(/\)/, 'g'); // &#41; )
      var spaceRE = new RegExp(' ', 'g'); //

      // creates marker section element and link
      var markerId = "baseID";
      var markerName = "base marker name"; //test special characters
        $.each($("#textElement2").text().split("####"), function( index, value ) {
          if (index == 0) { //creates element of first text section
            if ($("#noteTop").length == 0) {
              $("#textDiv").append('<pre id="noteTop">'+value+'</pre>'); //only element if no markers created
            }
          } else if ((index % 2) == 1) { //all odd indexes is a marker
            markerId = value; //store marker name to use in id and display in element text
            // http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
            markerName = markerId;
            // http://stackoverflow.com/questions/9115392/javascript-replace-all-and-in-s-string
            // markerId = markerId.replace(/["'()<> ]/g,"");
            markerId = markerId.replace(/ /g, '');
            markerId = markerId.replace(/"/g, 'Qu');
            markerId = markerId.replace(/</g, 'LsTh');
            markerId = markerId.replace(/>/g, 'GrTh');
            markerId = markerId.replace(/\(/g, 'LfPa');
            markerId = markerId.replace(/\)/g, 'RtPa');
            markerId = markerId.replace(/\\/g, 'BkSl');
            // http://stackoverflow.com/questions/4566771/how-to-globally-replace-a-forward-slash-in-a-javascript-string
            markerId = markerId.replace(/[/]/g, 'FwSl');
            // console.log("replaced special characters");

            //replace special chars in name
            //replace reserved chars in text
            /*
            markerName = markerName.replace(/ /g, '');
            markerName = markerName.replace(/"/g, 'Qu');
            markerName = markerName.replace(/</g, 'LsTh');
            markerName = markerName.replace(/>/g, 'GrTh');
            markerName = markerName.replace(/\(/g, 'LfPa');
            markerName = markerName.replace(/\)/g, 'RtPa');
            markerName = markerName.replace(/\\/g, 'BkSl');
            markerName = markerName.replace(/[/]/g, 'FwSl');
            */

          } else if ($('#'+markerId+'Marker').length == 0) { //only if the element does not exist
            // reading that &nbsp; should not be used but it's too easier to use.
            $("#noteMarkers").append('<a href="#'+markerId+'Marker">'+markerName+'</a>&nbsp;');
            $("#textDiv").append('<a href="#displayTitle">^Back to Note Title</a>');

            value = "=== "+markerName+" ==="+value;
            value = value.replace(/</g, 'LsTh');
            $("#textDiv").append('<pre id="'+markerId+'Marker">'+value+'</pre>');
          } // end else if markerId3).length
        }); // end for each note "section" in pre modifyPre
        //remove element containing original text
        $("#textElement2").remove();
        // console.log("function display note executed to end");
    },

    'click button.delete': function(event) {
        event.preventDefault();
        // Remove note from collection
        Notes.remove(Session.get("currentPublicNote")._id);
        Session.set("currentPublicNote", null);
    }
});

/*
replace reserved characters in text and ids
deal with markers with the same names
replace function:
  var re = new RegExp(' ', 'g');
  markerId = markerId.replace(re, '');

*/

Template.testPageA.helpers({
    // this function returns the public notes in the Notes collection.
    publicNotes: Notes.find({privacy: "public"})
});

Template.testPageA.events({
  // this function displays the note that is clicked on on the same page.
  'click #noteItem': function(event) {
  console.log("entered function to display note");

    event.preventDefault();

    // retrieve note document based on id
    var search = event.target.name;
    var searchResult = Notes.findOne(search);
    var owner = (searchResult.owner == null) ? "Anonymous" : Meteor.users.findOne(searchResult.owner).username;

    //reset marker elements
    $("#noteMarkers").empty();
    $("#textDiv").empty();
    if ($("#textElement").length == 0) {
      $("#textDiv").append('<pre id="textElement">Note</pre>');
    }

    $("#displayTitle").text(searchResult.title);
    $("#displayOwner").text(owner);
    $("#displayDate").text(searchResult.createdAt);
    //$("#displayNote").text(searchResult.text);
    var search = event.target.name;
    var searchResult = Notes.findOne(search);
    $("#textElement").text(searchResult.text);
    //after note is displayed

    //## start of creation internal links and markers code:
    // finds marked text and splits note at each marked text
    // creates internal links to each marker
    var markerId = "should not be seen";
    $.each($("#textElement").text().split("####"), function( index, value ) {
      if (index == 0) { //creates element of first text section
        if ($("#noteTop").length == 0) {
          $("#textDiv").append('<pre id="noteTop">'+value+'</pre>'); //only element if no markers created
        }
      } else if ((index % 2) == 1) { //all odd indexes is a marker
        markerId = value; //store marker name to use in id and display in element text
      } else if ($('#'+markerId).length == 0) { //only if the element does not exist
        $("#noteMarkers").append('<a href="#'+markerId+'Marker">'+markerId+'</a>');
        $("#textDiv").append('<a href="#noteTop">^Link List^</a>');
        value = "=== "+markerId+" ==="+value;
        $("#textDiv").append('<pre id="'+markerId+'Marker">'+value+'</pre>');
      } // end else if markerId3).length
    }); // end for each note "section" in pre modifyPre
    //remove element containing original text
    $("#textElement").remove();
    console.log("function display note executed to end"); // to test html notes if they reach this line

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

Template.testPage2.events({
 // creates new marker at click of the button
 'click .createMarkerElement': function() {
   console.log("entered function to create element");
   if ($("#newMarker").length == 0) {
     $("#elementDiv").append('<h2 id="newMarker">newMarker</h2>');
     console.log("created newMarker");
   }
 },
 // creates new marker and internal link at click of the button
 'click .createMarkerAndLink': function() {
   console.log("entered function2 to create element");

   if ($("#newMarker2").length == 0) {
     $("#elementDiv").append('<h2 id="newMarker2">newMarker2</h2>');
     $("#intLinksDiv").append('<a href="#newMarker2">newMarker2</a>');
     console.log("created newMarker2");
   }

 }
});
