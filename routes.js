Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    name: 'home',
    template: 'home'
});

Router.route('/create-note',{
    name: 'create-note',
    template: 'createNote'
});

Router.route('/public-notes', {
    name: 'public-notes',
    template: 'publicNotes'
});

Router.route('/private-notes', {
    name: 'private-notes',
    template: 'privateNotes'
});

Router.route('/about', {
    name: 'about',
    template: 'about'
});

Router.route('/register', {
    name: 'register',
    template: 'register'
});

Router.route('/login', {
    name: 'login',
    template: 'login'
});

//routes a general user should not have access to
Router.route('/testPage', {
    name: 'testPage',
    template: 'testPage'
});

Router.route('/testPage2', {
    name: 'testPage2',
    template: 'testPage2'
});
