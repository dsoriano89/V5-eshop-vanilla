const App = {
  init() {
    console.log('Start');
    // this.controllers.createLayout();
    // this.controllers.router();
    const el = this.controllers.createBtn('test');
    App.elements.root.appendChild(el);
    console.log('End');
  },
};
