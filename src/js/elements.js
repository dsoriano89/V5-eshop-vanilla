App.elements = {

  root: document.getElementById('app'),

  header: {
    container: document.createElement('div'),
    logo: document.createElement('img'),
    cartContainer: document.createElement('div'),
    cartIcon: document.createElement('img'),
    cartCount: document.createElement('div'),
    boxIcons: document.createElement('div'),
    avatar: document.createElement('img'),
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
      itemsContainer: document.createElement('div'),
    },
    login: {
      container: document.createElement('div'),
      infoBox: document.createElement('div'),
      header: document.createElement('div'),
      title: document.createElement('p'),
      email: document.createElement('input'),
      keyCode: document.createElement('input'),
      saveBtn: document.createElement('button'),
      titleBtn: document.createElement('p'),
    },
  },

  footer: {
    container: document.createElement('div'),
    logo: document.createElement('img'),
  },

};
