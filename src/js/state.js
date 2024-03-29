App.state = {
  keys: {
    cart: 'cart',
  },
  userData: {
    user: 'Bruno',
    password: '12345',
    cupon: '20,00',
  },
  products: [
    {
      id: 1,
      name: 'Croissant',
      desc: 'Butter croissant',
      price: 8.50,
      images: ['https://www.selecoes.com.br/wp-content/uploads/2022/05/mini-croissant-id921299628.jpg'],
    },
    {
      id: 2,
      name: 'Focaccia',
      desc: 'Italian bread with tomatos, onions and olive oil',
      price: 6.80,
      images: ['https://s2.glbimg.com/bjXnj9bK9HJ86dvltouLEFiUUqk=/smart/e.glbimg.com/og/ed/f/original/2018/08/03/receita-foccacia-abobrinha-st-chico.jpg'],
    },
    {
      id: 3,
      name: 'Bagel',
      desc: 'Bagel bread with cream cheese',
      price: 6.50,
      images: ['https://www.eatthis.com/wp-content/uploads/sites/4//media/images/ext/792825960/bagel-cream-cheese.jpg?quality=82&strip=1'],
    },
    {
      id: 4,
      name: 'Cinnamon roll',
      desc: 'Cinnamon bread with sugar syrup',
      price: 8.30,
      images: ['https://ancestralpadaria.com.br/wp-content/uploads/2018/03/Cinnamon-roll-4.jpg'],
    },
  ],
  cart: [],
  routes: {
    home: `${window.location.origin}${window.location.pathname}`,
    cart: '?p=cart',
    login: '?p=login',
  },
  // modalOpen: false,
  routeRendered: false,
  mutation: {
    addToCart(product) {
      if (App.state.cart.find((p) => p.id === product.id)) {
        return false;
      }
      App.state.cart.push(product);
      return true;
    },
    removeFromCart(product) {
      console.log(App.state.cart, product);
      App.state.cart = App.state.cart.filter((p) => p.id !== product.id);
    },
    setCart(newCart) {
      App.state.cart = newCart
    }
  },
  getters: {},
};
