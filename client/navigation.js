Template.navigation.helpers({

    pages: [{ route: "home", label: "Home"},
        { route: "create-note", label:"Create Note" },
        { route: "public-notes", label: "Public Notes"},
        { route: "private-notes", label: "Private Notes"},
        { route: "about", label: "About"},
        { route: "testPage", label: "Marker View"} //,
        //{ route: "testPage2", label: "Test Page 2"}
    ]

});

Template.navigation.events({

    'click .logout': function (event) {
        event.preventDefault();
        Meteor.logout();
        Session.set({
            currentPublicNote: null,
            currentPrivateNote: null
        });
        Router.go('home');
    }

});
