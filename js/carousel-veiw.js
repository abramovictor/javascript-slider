window.$ = createElement;

class CarouselView {
    static classNames = {
        IS_ACTIVE: 'is-active'
    };

    constructor(rootElement = Node.prototype, carousel = Object.prototype) {
        this.carousel = carousel;
        this._rootElement = rootElement;
        this._rootElementChildren = [...this._rootElement.children];
        this.length = this._rootElementChildren.length;
        this.startSlide = 0;
        this.amountSlide = 1;
        this.activeIndex = this.startSlide;


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
    }

    init() {
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
        console.log(curretPoint);

        this.move(slide);
    }

    render() {
        this.carouselItems = this._rootElementChildren.map((child, index) =>
            $('div', { className: `carousel-item${index === this.activeIndex ? ` ${CarouselView.classNames.IS_ACTIVE}` : ''}` },
                child
            )
        );

        let width = `${this.carousel.getInnerWidth(this._rootElement, this.length, this.amountSlide)}px`;
        this.carouselInner = $('div', {
            className: 'carousel-inner', style: {
                width,
                transition: 'transform 0.5s'
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
                        className: `carousel-indicator--point${index === this.startSlide ? ` ${CarouselView.classNames.IS_ACTIVE}` : ''}`,
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
            this._rootElement.appendChild(child)
        );
    }

    move(currentSlide = Node.prototype) {
        this.activeSlide.classList.remove(CarouselView.classNames.IS_ACTIVE);
        this.activePoint.classList.remove(CarouselView.classNames.IS_ACTIVE);

        let currentIndex = this.carousel.getIndex(this.carouselItems, currentSlide).current;
        let currentPoint = this.carousel.getElement(this.carouselIndicatorPoints, currentIndex).active;

        let offset = this.carousel.getOffset(this.carouselItems, currentSlide);
        this.carouselInner.style.transform = `translateX(-${offset}px)`;

        currentSlide.classList.add(CarouselView.classNames.IS_ACTIVE);
        currentPoint.classList.add(CarouselView.classNames.IS_ACTIVE);

        this.activeIndex = currentIndex;
        this.activeSlide = currentSlide;
        this.activePoint = currentPoint;
    }
}
