/*
 */

/*
  this function returns the elements in the Notes collection.
 */
Template.publicNotes.helpers({
    publicNotes: Notes.find({})
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
    /*
      this function displays the note that is clicked on on the same page.
     */
    'click a': function(event) {

        event.preventDefault();

        var search = event.target.name;
        var searchResult = Notes.findOne(search);

        $("#displayTitle").text(searchResult.title);
        $("#displayNote").text(searchResult.text);

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
