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

  Template.body.events({

  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}