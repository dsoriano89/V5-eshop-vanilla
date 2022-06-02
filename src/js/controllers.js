App.controllers = {

  getPage() {
    const stringParams = window.location.search;
    const searchParams = new URLSearchParams(stringParams);
    const page = searchParams.get('p');
    return page;
  },
  router() {
    setInterval(() => {
      const page = this.getPage();
      if (page === 'cart') {
        this.createCheckout();
      } else if (!page) {
        this.createMain();
      } else {
        console.log('ERROR');
      }
    }, 100);
  },
  go(p) {
    history.pushState({ p }, '', App.state.routes[p]);
  },

  createHeader() {
    const els = App.elements;
    const { header } = els;

    els.root.appendChild(header.container);
    header.container.style.backgroundColor = 'rgba(102, 102, 102, 0.3)';
    header.container.style.display = 'flex';
    header.container.style.justifyContent = 'space-between';
    header.container.style.width = '100%';
    header.container.style.position = 'fixed';
    header.container.style.top = '0';

    header.container.appendChild(header.logo);
    header.logo.src = './assets/logo.png';
    header.logo.style.margin = '35px 0 35px 48px';
    header.logo.style.cursor = 'pointer';
    header.logo.onclick = (e) => {
      App.controllers.go('home');
    };

    header.container.appendChild(header.cartIcon);
    header.cartIcon.src = './assets/cart.png';
    header.cartIcon.style.width = '36px';
    header.cartIcon.style.height = '36px';
    header.container.style.alignItems = 'center';
    header.cartIcon.style.marginRight = '53px';
    header.cartIcon.style.cursor = 'pointer';
    header.cartIcon.onclick = (e) => {
      App.controllers.go('cart');
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
    main.p.innerText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy tincidunt ut laoreet dolore magna aliquam erat volutpat';
    main.p.style.fontSize = '24px';
    main.p.style.fontStyle = 'normal';
    main.p.style.fontWeight = '400';
    main.p.style.lineHeight = '29.05px';
    main.p.style.textAlign = 'center';
  },

  createCheckout() {
    const els = App.elements;
    const {
      container, title, items, confirmBtnContainer, confirmBtn,
    } = els.main.checkout;
    els.main.container.innerHTML = '';
    els.main.container.appendChild(container);

    container.style.backgroundColor = '#CCC';
    container.style.height = '100%';
    container.style.paddingTop = '230px';

    container.appendChild(title);
    title.innerHTML = 'My cart [ Total Amount :xx ]';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.fontStyle = 'normal';
    title.style.lineHeight = '29px';
    title.style.textAlign = 'center';
    title.style.color = '#000';

    container.appendChild(confirmBtnContainer);
    confirmBtnContainer.appendChild(confirmBtn);
    confirmBtn.classList.add('btn');
    confirmBtn.innerHTML = 'Confirm purchase';
    confirmBtnContainer.style.textAlign = 'center';
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
    footer.container.style.padding = '50px';
  },

  createLayout() {
    const els = App.elements;

    els.root.style.height = '100vh';
    els.root.style.display = 'flex';
    els.root.style.flexDirection = 'column';

    this.createHeader();
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
    // el.style.width = '84px';
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
  createCard() {
    const el = document.createElement('div');

    el.style.border = '1px solid black';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'center';

    const img = document.createElement('img');
    el.appendChild(img);
    img.src = './assets/bg.png';
    img.style.maxWidth = '300px';
    img.style.maxHeight = '300px';
    img.style.borderRadius = '50%';

    const title = document.createElement('div');
    el.appendChild(title);
    title.innerHTML = 'croissant';
    title.style.fontWeight = '700';
    title.style.fontSize = '16px';
    title.style.lineHeight = '19px';
    title.style.color = '#000';
    title.style.marginTop = '40px';

    const price = document.createElement('div');
    el.appendChild(price);
    price.innerHTML = 'USD 1,99';
    price.style.fontWeight = '400';
    price.style.fontSize = '16px';
    price.style.marginTop = '4px';
    price.style.lineHeight = '19px';

    const desc = document.createElement('div');
    el.appendChild(desc);
    desc.innerHTML = 'Description';
    desc.style.fontWeight = '400';
    desc.style.fontSize = '16px';
    desc.style.lineHeight = '19px';
    desc.style.marginTop = '4px';

    const btn = this.createBtn('Add to cart', 'primary', () => {
      console.log('click');
    });
    btn.style.marginTop = '4px';
    el.appendChild(btn);

    return el;
  },

};
