const App = {
  init() {
    console.log('Start');

    // this.controllers.createLayout();
    // this.controllers.router();

    // const el = this.controllers.createModal('hello')
    // const btn = this.controllers.createBtn('click', 'primary', () => {
    // console.log('clicked')
    // this.controllers.openModal(el)
    // })

    // this.elements.root.appendChild(el)
    // this.elements.root.appendChild(btn)

    const imgs = [
      'https://www.selecoes.com.br/wp-content/uploads/2022/05/mini-croissant-id921299628.jpg',
      'https://media-cdn.tripadvisor.com/media/photo-s/10/02/a6/b5/caption.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTPPkY00Ar7omcpDVUpnZYGPcHi34Nbf3ZTQ&usqp=CAU',
    ];

    const el = this.controllers.createCard('Bread', '1,99', 'Honey', imgs);
    this.elements.root.appendChild(el);

    console.log('End');
  },
};
