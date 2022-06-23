class Carousel {
    config = {}

    imageEls = []

    container = null

    leftContainer = null

    imageContainer = null

    rightContainer = null

    index = 0

    /**
     * Configure the carousel
     * @param {Object} config
     * @param {HTMLElement} config.container where the images are render
     * @param {Array} config.imgs list of images to be displayed
     */
    constructor(config) {
      console.log('carousel start', this);
      this.config = config;
      this.container = config.container;
      this.setContainerStyle();
      this.preLoadImages();
      this.createElements();
      this.renderImage();
      console.log('carousel end');
    }

    renderImage() {
      console.log(this.index);
      this.imageContainer.innerHTML = '';
      this.imageContainer.appendChild(this.imageEls[this.index]);
    }

    createElements() {
      this.leftContainer = document.createElement('div');
      this.imageContainer = document.createElement('div');
      this.rightContainer = document.createElement('div');

      const caretL = document.createElement('img');
      caretL.src = './assets/caret.svg';
      caretL.style.transform = 'rotate(90deg)';
      caretL.style.width = '32px';

      this.leftContainer.style.cursor = 'pointer';
      this.leftContainer.onclick = () => {
        console.log('[left]');
        this.index--;
        if (this.index < 0) {
          this.index = this.imageEls.length - 1;
        }
        this.renderImage();
      };

      const caretR = document.createElement('img');
      caretR.src = './assets/caret.svg';
      caretR.style.transform = 'rotate(270deg)';
      caretR.style.width = '32px';

      this.rightContainer.style.cursor = 'pointer';
      this.rightContainer.onclick = () => {
        console.log('[right]');
        this.index++;
        if (this.index > this.imageEls.length - 1) {
          this.index = 0;
        }
        this.renderImage();
      };

      this.imageContainer.style.margin = '3px';

      this.leftContainer.appendChild(caretL);

      this.rightContainer.appendChild(caretR);

      this.container.appendChild(this.leftContainer);

      this.container.appendChild(this.imageContainer);

      this.container.appendChild(this.rightContainer);
    }

    setContainerStyle() {
      this.container.style.display = 'flex';
      this.container.style.alignItems = 'center';
      this.container.style.width = 'fit-content';
      this.container.style.height = '300px';
    }

    preLoadImages() {
      this.config.imgs.forEach((img, i) => {
        const el = document.createElement('img');
        el.src = this.config.imgs[i];
        el.style.maxWidth = '300px';
        el.style.maxHeight = '300px';
        el.style.borderRadius = '50%';

        this.imageEls.push(el);
      });
    }
}
