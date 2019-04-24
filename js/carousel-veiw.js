window.$ = createElement;

class CarouselView {
    constructor(root = Node.prototype, carousel = Object.prototype, props = Object.prototype) {
        this.carousel = carousel;
        this.root = root;
        this.children = [...root.children];
        this.length = this.children.length;

        this.props = props;

        this.startSlide = null;
        this.activeIndex = null;
        this.activeSlide = null;
        this.activePoint = null;
        this.carouselInner = null;
        this.carouselItems = null;
        this.carouselNavigation = null;
        this.carouselNavigationPrev = null;
        this.carouselNavigationNext = null;
        this.carouselIndicator = null;
        this.carouselIndicatorPoints = null;

        this.handleCarouselNavigationPrev = this.handleCarouselNavigationPrev.bind(this);
        this.handleCarouselNavigationNext = this.handleCarouselNavigationNext.bind(this);
        this.handleCarouselIndicatorPoint = this.handleCarouselIndicatorPoint.bind(this);

        this.init();
    }

    init() {
        this.startSlide = this.props.startSlide;
        this.activeIndex = this.startSlide;

        this.render();

        this.activeSlide = this.carousel.getElement(this.carouselItems, this.activeIndex).active;
        this.activePoint = this.carousel.getElement(this.carouselIndicatorPoints, this.activeIndex).active;
    }

    handleCarouselNavigationPrev() {
        const slide = this.carousel.getElement(this.carouselItems, this.activeIndex).prev;
        this.move(slide);
    }

    handleCarouselNavigationNext() {
        const slide = this.carousel.getElement(this.carouselItems, this.activeIndex).next;
        this.move(slide);
    }

    handleCarouselIndicatorPoint({ target: curretPoint }) {
        const currentIndex = this.carousel.getIndex(this.carouselIndicatorPoints, curretPoint).current;
        const slide = this.carousel.getElement(this.carouselItems, currentIndex).active;

        this.move(slide);
    }

    render() {
        this.carouselItems = this.children.map((child, index) =>
            $('div', { className: `carousel-item${index === this.activeIndex ? ` ${this.props.classNames.active}` : ''}` },
                child
            )
        );

        let width = `${this.carousel.getInnerWidth(this.length)}px`;
        this.carouselInner = $('div', {
            className: 'carousel-inner', style: {
                width,
                transitionProperty: `transform`,
                transitionDuration: ` ${this.props.animationSpeed}ms`,
                transitionTimingFunction: this.props.animationTimingFunction
            }
        },
            ...this.carouselItems
        );

        this.carouselNavigationPrev = $('button',
            {
                className: 'carousel-navigation--prev',
                type: 'button',
                onclick: this.handleCarouselNavigationPrev
            },
            '❮'
        );

        this.carouselNavigationNext = $('button',
            {
                className: 'carousel-navigation--next',
                type: 'button',
                onclick: this.handleCarouselNavigationNext
            },
            '❯'
        );

        this.carouselNavigation = $('div', { className: 'carousel-navigation' },
            this.carouselNavigationPrev,
            this.carouselNavigationNext
        );

        this.carouselIndicatorPoints = [];
        for (let index = 0; index < this.length; index++) {
            this.carouselIndicatorPoints.push(
                $('button',
                    {
                        className: `carousel-indicator--point${index === this.startSlide ? ` ${this.props.classNames.active}` : ''}`,
                        type: 'button',
                        onclick: this.handleCarouselIndicatorPoint
                    },
                    $('span')
                )
            );
        }

        this.carouselIndicator = $('div', { className: 'carousel-indicator' },
            ...this.carouselIndicatorPoints
        );

        [this.carouselInner, this.carouselNavigation, this.carouselIndicator].forEach((child) =>
            this.root.appendChild(child)
        );
    }

    move(currentSlide = Node.prototype) {
        this.activeSlide.classList.remove(this.props.classNames.active);
        this.activePoint.classList.remove(this.props.classNames.active);

        let currentIndex = this.carousel.getIndex(this.carouselItems, currentSlide).current;
        let currentPoint = this.carousel.getElement(this.carouselIndicatorPoints, currentIndex).active;

        let offset = this.carousel.getOffset(this.carouselItems, currentSlide);
        this.carouselInner.style.transform = `translateX(-${offset}px)`;

        currentSlide.classList.add(this.props.classNames.active);
        currentPoint.classList.add(this.props.classNames.active);

        this.activeIndex = currentIndex;
        this.activeSlide = currentSlide;
        this.activePoint = currentPoint;
    }
}
