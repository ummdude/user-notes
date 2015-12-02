Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.register.events({

    'submit form': function (event) {

        event.preventDefault();

        var name = event.target.username.value;
        var email = event.target.email.value;
        var password = event.target.password.value;

        Accounts.createUser({
            username: name,
            email: email,
            password: password
        });

        Router.go('home');

    }

});

Template.login.events({

    'submit form': function (event) {

        event.preventDefault();

        var user = event.target.user.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(user, password);

        Router.go('home');

    }

});
