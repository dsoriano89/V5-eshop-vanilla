App.elements = {

  root: document.getElementById('app'),

  header: {
    container: document.createElement('div'),
    logo: document.createElement('img'),
    cartIcon: document.createElement('img'),
  },

  main: {
    container: document.createElement('div'),

    main: {
      container: document.createElement('div'),
      bg: document.createElement('img'),
      h1: document.createElement('h1'),
      p: document.createElement('p'),
      itemsContainer: document.createElement('div'),
    },
    checkout: {
      container: document.createElement('div'),
      title: document.createElement('h1'),
      confirmBtnContainer: document.createElement('div'),
      confirmBtn: document.createElement('button'),
    },

  },

  footer: {
    container: document.createElement('div'),
    logo: document.createElement('img'),
  },

};
