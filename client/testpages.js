
/*
 */

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

Template.testPage.helpers({
    // this function returns the public notes in the Notes collection.
    publicNotes: Notes.find({privacy: "public"})
});

Template.testPage.events({
    // this function displays the note that is clicked on on the same page.
    'click #noteItem': function(event) {
    console.log("entered function to display note");

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

        //## start of creation internal links and markers code:
        // finds marked text and splits note at each marked text
        // creates internal links to each marker

        /*
          ### internal link notes
          change modifyPre and modifyDiv to more meaningful names

          ## Errors:
          == Uncaught TypeError: Cannot read property 'owner' of undefined
          - error created when clicking an internal link
          == displaying html code with quotes incorrectly displays the note.

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
            $("#noteMarkers").append('<a href="#'+markerId3+'Marker">'+markerId3+'</a>');

            // #### text element segmentation
            //for the marker to be displayed in the note text
            value = "=== "+markerId3+" ==="+value;
            $("#modifyDiv").append('<pre id="'+markerId3+'Marker">'+value+'</pre>');
          } // end else if markerId3).length

        }  // end generic function
        ); // end for each note "section" in pre modifyPre
        //remove element containing original text
        $("#modifyPre").remove();
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
/*
 */
