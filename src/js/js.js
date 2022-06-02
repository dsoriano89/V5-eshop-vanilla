const App = {
  init() {
    console.log('Start');

    const el = this.controllers.createCard();
    App.elements.root.appendChild(el);
    // this.controllers.createLayout();
    // this.controllers.router();
    /*const el = this.controllers.createBtn('test', 'primary', () => {
      console.log('click');
    });
    App.elements.root.appendChild(el);

    const el2 = this.controllers.createBtn('test', 'secondary', () => {
      console.log('click2');
    });
    App.elements.root.appendChild(el2);

    const el3 = this.controllers.createBtn('test', 'default', () => {
      console.log('click3');
    });
    App.elements.root.appendChild(el3);

    const el4 = this.controllers.createBtn('test', 'other', () => {
      console.log('click4');
    });
    App.elements.root.appendChild(el4);*/
    console.log('End');
  },
};
