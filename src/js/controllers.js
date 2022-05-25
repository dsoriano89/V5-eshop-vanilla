App.controllers = {
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

    header.container.appendChild(header.cartIcon);
    header.cartIcon.src = './assets/cart.png';
    header.cartIcon.style.width = '36px';
    header.cartIcon.style.height = '36px';
    header.container.style.alignItems = 'center';
    header.cartIcon.style.marginRight = '53px';
    header.cartIcon.style.cursor = 'pointer';
    header.cartIcon.onclick = (e) => {
      console.log('click!', e);
    };
  },
  createMain() {
    const els = App.elements;
    const { main } = els;
    els.root.appendChild(main.container);

    main.container.style.flexGrow = '1';

    main.container.appendChild(main.bg);
    main.bg.src = './assets/bg.png';

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
    this.createMain();
    this.createFooter();
  },
};
