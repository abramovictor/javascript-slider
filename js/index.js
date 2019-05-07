import Carousel from './carousel.js';
import CarouselView from './carousel-veiw.js';

class Slider {
    constructor(root = String.prototype || Node.prototype, props = Object.prototype) {
        this.root = (root instanceof Node) ? root : document.querySelector(root);
        this.props = Object.assign(Slider.defaultProps, props);

        if (this.props.init) {
            this.init();
        }
    }

    init() {
        const carousel = new Carousel(this.root, this.props);
        const view = new CarouselView(this.root, carousel, this.props);
    }
}

Slider.defaultProps = {
    init: true,
    loop: false,
    animationSpeed: 300,
    animationTimingFunction: 'linear',
    autoplay: false,
    autoplayTimeout: 5000,
    aytoplayHoverPause: false,
    startSlide: 0,
    classNames: {
        active: 'is-active'
    }
}


new Slider('#carousel', {
    // animationTimingFunction: 'cubic-bezier(0,1.3,.7,1.2)',
    animationTimingFunction: 'ease-in-out',
    animationSpeed: 1000,
});