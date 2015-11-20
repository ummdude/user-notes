Tasks = new Mongo.Collection("tasks");

Router.route('/', {
  template: 'home'
});

Router.route('/create-note',{
  template: 'create-note'
});

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({

  });

  Template.body.events({

  });

  Template.task.events({

  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}