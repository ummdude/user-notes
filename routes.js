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
