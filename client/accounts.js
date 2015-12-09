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
        }, function(error) {
            if (error) {
                $("p.error").text(error.reason);
            } else {
                Router.go('home');
            }
        });

        Router.go('home');

    }

});

Template.login.events({

    'submit form': function (event) {

        event.preventDefault();

        var user = event.target.user.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(user, password, function(error) {
            if (error) {
                $("p.error").text(error.reason);
            } else {
                Router.go('home');
            }
        });

    }

});
