App.controllers = {

  getPage() {
    const stringParams = window.location.search;
    const searchParams = new URLSearchParams(stringParams);
    const page = searchParams.get('p');
    return page;
  },
  router() {
    setInterval(() => {
      if (App.state.routeRendered) {
        return;
      }
      const page = this.getPage();
      if (page === 'cart') {
        this.createCheckout();
      } else if (page === 'login') {
        this.createLogin();
      } else {
        this.createMain();
      }
      App.state.routeRendered = true;
    }, 100);
  },
  go(p) {
    App.state.routeRendered = false;
    history.pushState({ p }, '', App.state.routes[p]);
  },
  confirmPurchase() {
    console.log('lets confirm', App.state.cart);
    const res = confirm('Are you sure?');
    if (res) {
      App.state.cart = [];
      App.elements.header.cartCount.innerText = App.state.cart.length;
      this.go('home');
      alert('Thank you for your purchase!');
    }
  },
  createProductsElements(container) {
    App.state.products.forEach((product) => {
      const card = this.createCard(
        product.name,
        product.desc,
        product.price,
        product.images,
        'Add to cart',
        () => {
          const res = confirm('Do you want to add this product to your cart?');
          if (res && App.state.mutation.addToCart(product)) {
            App.elements.header.cartCount.innerText = App.state.cart.length;
            this.dumpData();
          }
        },
      );
      container.appendChild(card);
    });
  },
  createCartElements(container) {
    App.state.cart.forEach((product) => {
      const card = this.createCard(
        product.name,
        product.desc,
        product.price,
        product.images,
        'Remove item',
        () => {
          console.log(product);
          const res = confirm('Do you want to remove this product of your cart?');

          if (res) {
            App.state.mutation.removeFromCart(product);
            App.elements.header.cartCount.innerText = App.state.cart.length;
            App.controllers.createCheckout();
            this.dumpData();
          }
        },
      );
      container.appendChild(card);
    });
  },
  createHeader() {
    const els = App.elements;
    const { header } = els;

    els.root.appendChild(header.container);
    header.container.style.backgroundColor = '#000';
    header.container.style.display = 'flex';
    header.container.style.justifyContent = 'space-between';
    header.container.style.width = '100%';
    header.container.style.position = 'static';
    header.container.style.top = '0';

    header.container.appendChild(header.logo);
    header.logo.src = './assets/logo.png';
    header.logo.style.margin = '35px 0 35px 48px';
    header.logo.style.cursor = 'pointer';
    header.logo.onclick = (e) => {
      App.controllers.go('home');
    };

    header.container.appendChild(header.boxIcons);
    header.boxIcons.appendChild(header.cartContainer);
    header.cartContainer.appendChild(header.avatar);

    header.container.appendChild(header.cartIcon);
    header.cartIcon.src = './assets/cart.png';
    header.cartIcon.style.width = '36px';
    header.cartIcon.style.height = '36px';
    header.container.style.alignItems = 'center';
    header.cartIcon.style.cursor = 'pointer';
    header.cartIcon.onclick = (e) => {
      App.controllers.go('cart');
    };

    header.cartCount.innerText = App.state.cart.length;
    header.cartCount.style.color = '#FFF';
    header.cartCount.style.marginRight = '53px';

    header.cartContainer.appendChild(header.cartIcon);
    header.cartContainer.appendChild(header.cartCount);
    header.container.appendChild(header.cartContainer);
    header.cartContainer.style.display = 'flex';
    header.cartContainer.style.marginRight = '20px';

    header.cartContainer.appendChild(header.avatar);
    header.avatar.src = './assets/avatar.png';
    header.avatar.style.paddingTop = '2px';
    header.avatar.style.width = '36px';
    header.avatar.style.height = '38px';
    header.avatar.style.alignItems = 'center';
    header.avatar.style.cursor = 'pointer';
    header.avatar.onclick = (e) => {
      App.controllers.go('login');
    };
  },

  createMain() {
    const els = App.elements;
    const { main } = els.main;

    els.main.container.innerHTML = '';
    els.main.container.appendChild(main.container);

    main.container.appendChild(main.bg);
    main.bg.src = './assets/bg.png';
    main.bg.style.width = '100%';

    main.container.appendChild(main.h1);
    main.h1.innerText = 'Our products';
    main.h1.style.color = '#000';
    main.h1.style.fontSize = '24px';
    main.h1.style.fontStyle = 'normal';
    main.h1.style.fontWeight = '700';
    main.h1.style.lineHeight = '29px';
    main.h1.style.textAlign = 'center';

    main.container.appendChild(main.p);
    main.p.innerText = "Our breads recipes uses selected ingredients of the highest quality and they're always fresh for you.";
    main.p.style.fontSize = '24px';
    main.p.style.fontStyle = 'normal';
    main.p.style.fontWeight = '400';
    main.p.style.lineHeight = '29.05px';
    main.p.style.textAlign = 'center';

    main.container.appendChild(main.itemsContainer);
    main.itemsContainer.style.display = 'flex';
    main.itemsContainer.style.flexWrap = 'wrap';
    this.createProductsElements(main.itemsContainer);
  },

  createCheckout() {
    const els = App.elements;
    const {
      container, title, items, confirmBtnContainer, confirmBtn, itemsContainer,
    } = els.main.checkout;
    els.main.container.innerHTML = '';
    els.main.container.appendChild(container);

    container.style.backgroundColor = '#CCC';
    container.style.height = '100%';
    container.style.paddingTop = '230px';

    container.appendChild(title);

    let total = 0;

    for (let i = 0; i < App.state.cart.length; i++) {
      const item = App.state.cart[i];
      console.log(item.price);
      total += item.price;
    }
    console.log('este é o total', total);

    title.innerHTML = `My cart [ Total Amount: ${this.currencyFormat(total)}]`;
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.fontStyle = 'normal';
    title.style.lineHeight = '29px';
    title.style.textAlign = 'center';
    title.style.color = '#000';

    container.appendChild(itemsContainer);
    itemsContainer.style.display = 'flex';
    itemsContainer.style.flexWrap = 'wrap';
    itemsContainer.innerHTML = '';
    this.createCartElements(itemsContainer);

    container.appendChild(confirmBtnContainer);
    confirmBtnContainer.appendChild(confirmBtn);
    confirmBtn.classList.add('btn');
    confirmBtn.onclick = () => {
      this.confirmPurchase();
    };
    confirmBtn.innerHTML = 'Confirm purchase';
    confirmBtnContainer.style.textAlign = 'center';
  },
  createLogin() {
    const els = App.elements;
    const {
      container, infoBox, header, title, email, keyCode, saveBtn, titleBtn,
    } = els.main.login;

    els.main.container.innerHTML = '';
    els.main.container.appendChild(container);

    container.style.background = '#CCC';
    container.src = './assets/bakery.png';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.paddingTop = '130px';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.marginBottom = '100px';

    container.appendChild(infoBox);
    infoBox.style.height = 'fit-content';
    infoBox.style.width = '550px';
    infoBox.style.display = 'flex';
    infoBox.style.flexDirection = 'column';
    infoBox.style.justifyContent = 'center';
    infoBox.style.alignItems = 'center';
    infoBox.style.background = 'white';

    infoBox.appendChild(header);
    header.style.height = '100px';
    header.style.width = '550px';
    header.style.background = '#000';
    header.style.display = 'flex';
    header.style.justifyContent = 'center';
    header.style.alignItems = 'center';

    header.appendChild(title);
    title.innerHTML = 'Register at Bakery and start shopping';
    title.style.color = '#fff';
    title.style.fontSize = '24px';
    title.style.fontStyle = 'normal';
    title.style.fontWeight = '700';
    title.style.lineHeight = '29px';

    infoBox.appendChild(email);
    email.placeholder = 'username';
    email.style.marginTop = '30px';
    email.style.height = '30px';
    email.style.width = '350px';
    email.style.marginBottom = '30px';
    email.name = 'username';
    const username = localStorage.setItem('username', email);
    localStorage.getItem(username);

    infoBox.appendChild(keyCode);
    keyCode.placeholder = 'password';
    keyCode.style.height = '30px';
    keyCode.style.width = '350px';
    keyCode.style.marginBottom = '30px';
    keyCode.innerHTML = '';
    keyCode.name = 'password';
    const password = localStorage.setItem('password', keyCode);
    localStorage.getItem(password);

    infoBox.appendChild(saveBtn);
    saveBtn.style.height = '50px';
    saveBtn.style.width = '200px';
    saveBtn.style.marginBottom = '50px';
    saveBtn.style.background = '#000';
    saveBtn.style.display = 'flex';
    saveBtn.style.justifyContent = 'center';
    saveBtn.style.alignItems = 'center';
    saveBtn.onclick = (evt) => {
      App.controllers.go('home');
      console.log(evt);
    };

    saveBtn.appendChild(titleBtn);
    titleBtn.innerHTML = 'save & go!';
    titleBtn.style.color = '#fff';
    titleBtn.style.fontSize = '22px';
    titleBtn.style.fontStyle = 'normal';
    titleBtn.style.fontWeight = '700';
    titleBtn.style.lineHeight = '29px';
    titleBtn.style.padding = '5px';
    titleBtn.style.cursor = 'pointer';
  },

  createFooter() {
    const els = App.elements;
    const { footer } = els;
    els.root.appendChild(footer.container);
    footer.container.appendChild(footer.logo);
    footer.container.style.backgroundColor = '#000';
    footer.logo.src = './assets/logo.png';
    footer.container.style.display = 'flex';
    footer.container.style.justifyContent = 'center';
    footer.container.style.alignItems = 'center';
    footer.container.style.padding = '100px';
  },

  createLayout() {
    const els = App.elements;

    els.root.style.height = '100vh';
    els.root.style.display = 'flex';
    els.root.style.flexDirection = 'column';

    this.createHeader();
    this.createLogin();
    // this.createMain();
    // this.createCheckout();
    els.root.appendChild(els.main.container);
    els.main.container.style.flexGrow = '1';
    this.createFooter();
  },
  createBtn(content, type = 'primary', onclick) {
    const el = document.createElement('button');
    el.innerHTML = content;
    el.style.display = 'flex';
    el.style.border = 'none';
    el.style.height = '32px';
    el.style.left = '111px';
    el.style.top = '85px';
    el.style.borderRadius = '20px';
    el.style.padding = '5px, 16px, 5px, 16px';
    el.style.flexDirection = 'column';
    el.style.justifyContent = 'center';
    el.style.alignItems = 'center';
    el.style.padding = '5px 16px';
    el.style.flex = 'none';
    el.style.order = '3';
    el.style.flexGrow = '0';
    el.style.color = '#FFF';

    if (type === 'primary') {
      el.style.background = '#000000';
      el.style.boxShadow = '0px 2px 0px rgba(0, 0, 0, 0.043)';
    }

    if (type === 'secondary') {
      el.style.background = 'rgba(0, 0, 0, 0.6)';
      el.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
    }

    if (type === 'default') {
      el.style.background = '#FFF';
      el.style.border = '2px solid #000';
      el.style.boxShadow = '0px 2px 0px rgba(0, 0, 0, 0.043)';
      el.style.color = '#000';
    }

    if (type === 'other') {
      el.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.025)';
      el.style.background = 'rgba(0, 0, 0, 0.2)';
      el.style.color = '#000';
    }
    el.onclick = onclick;
    return el;
  },
  createCard(title, price, description, imgs, btnLabel, onclick) {
    const el = document.createElement('div');

    el.style.width = 'fit-content';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'center';
    el.style.padding = '1rem';

    const imgContainer = document.createElement('div');

    const carousel = new Carousel({ imgs, container: imgContainer });
    el.appendChild(imgContainer);

    const titleEl = document.createElement('div');
    el.appendChild(titleEl);
    titleEl.innerHTML = title;
    titleEl.style.fontWeight = '700';
    titleEl.style.fontSize = '16px';
    titleEl.style.lineHeight = '19px';
    titleEl.style.color = '#000';
    titleEl.style.marginTop = '40px';

    const priceEl = document.createElement('div');
    el.appendChild(priceEl);
    priceEl.innerHTML = price;
    priceEl.style.fontWeight = '400';
    priceEl.style.fontSize = '16px';
    priceEl.style.marginTop = '4px';
    priceEl.style.lineHeight = '19px';
    priceEl.style.innerHTML = this.currencyFormat(price);

    const desc = document.createElement('div');
    el.appendChild(desc);
    desc.innerHTML = description;
    desc.style.fontWeight = '400';
    desc.style.fontSize = '16px';
    desc.style.lineHeight = '19px';
    desc.style.marginTop = '4px';

    const btn = this.createBtn(btnLabel, 'primary', onclick);
    btn.style.marginTop = '4px';
    el.appendChild(btn);

    return el;
  },
  createModal(children) {
    const el = document.createElement('div');
    const modal = document.createElement('div');

    const closeModal = () => {
      this.closeModal(el);
    };

    el.style.display = 'flex';
    el.style.justifyContent = 'center';
    el.style.alignItems = 'center';
    el.style.position = 'fixed';
    el.style.top = '0';
    el.style.left = '0';
    el.style.height = '100%';
    el.style.width = '100%';
    el.style.background = 'rgba(0, 0, 0, 0.5)';
    el.classList.add('backdrop');
    el.onclick = (e) => {
      if (e.target.classList.contains('backdrop')) {
        closeModal();
      }
    };

    modal.style.display = 'flex';
    modal.style.background = '#FFF';
    modal.style.borderRadius = '4px';
    modal.style.width = 'fit-content';
    modal.style.flexDirection = 'column';
    modal.style.display = 'flex';
    el.appendChild(modal);

    const close = document.createElement('div');
    close.style.display = 'flex';
    close.style.justifyContent = 'center';
    close.style.alignItems = 'center';
    close.style.padding = '10px';
    close.style.width = 'fit-content';
    close.innerHTML = 'X';
    close.style.alignSelf = 'flex-end';
    close.style.background = 'rgba(0, 0, 0, 0.6)';
    close.style.color = 'white';
    close.style.borderRadius = '4px';
    close.style.cursor = 'pointer';
    close.style.marginTop = '11px';
    close.style.marginRight = '12px';
    close.onclick = closeModal;
    modal.appendChild(close);

    const body = document.createElement('div');
    body.innerHTML = children;
    modal.appendChild(body);

    const footer = document.createElement('div');
    footer.style.display = 'flex';
    footer.style.justifyContent = 'space-between';
    footer.style.margin = '45px 82px 71px 81px';
    modal.appendChild(footer);

    const cancel = this.createBtn('Cancel', 'other', closeModal);
    cancel.style.cursor = 'pointer';
    footer.appendChild(cancel);

    const ok = this.createBtn('Confirm', 'secondary');
    ok.style.cursor = 'pointer';
    ok.style.marginLeft = '24px';
    footer.appendChild(ok);

    return el;
  },
  openModal(el) {
    el.style.display = 'flex';
  },
  closeModal(el) {
    el.style.display = 'none';
  },
  currencyFormat(value) {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  },
  dumpData() {
    const data = JSON.stringify(App.state.cart);
    console.log(data);
    localStorage.setItem(App.state.keys.cart, data);
  },
  loadData() {
    const data = localStorage.getItem(App.state.keys.cart);
    if (data) {
      App.state.mutation.setCart(JSON.parse(data));
    }
  },
};
