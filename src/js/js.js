const App = {
  init() {
    console.log('Start');
    this.controllers.loadData();
    this.controllers.createLayout();
    this.controllers.router();
    console.log('End');
  },
};
