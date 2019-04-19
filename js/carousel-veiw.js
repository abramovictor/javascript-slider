window.$ = createElement;

class CarouselView {
    constructor() {
        this.root = null;
        this._rootChilds = null;
        this._rootChildsLength = null;
        this.carouselInner = null;
        this.carouselItems = null;
        this.carouselNavigation = null;
        this.carouselNavigationPrev = null;
        this.carouselNavigationNext = null;
        this.carouselIndicator = null;
        this.carouselIndicatorPoints = null;
        this.activeSlide = null;
    }

    init(root = Node.prototype) {
        this.root = root;
        this._rootChilds = this.root.children;
        this._rootChildsLength = this._rootChilds.length;

        this.activeSlide = 0;

        this.renderInner();
        this.renderNavigation();
        this.renderIndigator();
        this.render();
    }

    renderInner() {
        this.carouselItems = [...this._rootChilds].map((child, index) =>
            $(
                'div',
                {
                    className: `carousel-item${
                        index === this.activeSlide ? ' is-active' : ''
                    }`
                },
                child
            )
        );

        this.carouselInner = $(
            'div',
            { className: 'carousel-inner' },
            ...this.carouselItems
        );
    }

    renderNavigation() {
        this.carouselNavigationPrev = $(
            'button',
            { className: 'carousel-navigation--prev', type: 'button' },
            $('span', null, '❮')
        );
        this.carouselNavigationNext = $(
            'button',
            { className: 'carousel-navigation--next', type: 'button' },
            $('span', null, '❯')
        );
        this.carouselNavigation = $(
            'div',
            { className: 'carousel-navigation' },
            this.carouselNavigationPrev,
            this.carouselNavigationNext
        );
    }

    renderIndigator() {
        this.carouselIndicatorPoints = [];
        for (let index = 0; index < this._rootChildsLength; index++) {
            this.carouselIndicatorPoints.push(
                $(
                    'button',
                    {
                        className: `carousel-indicator--point${
                            index === this.activeSlide ? ' is-active' : ''
                        }`,
                        type: 'button'
                    },
                    $('span')
                )
            );
        }

        this.carouselIndicator = $(
            'div',
            { className: 'carousel-indicator' },
            ...this.carouselIndicatorPoints
        );
    }

    render() {
        [
            this.carouselInner,
            this.carouselNavigation,
            this.carouselIndicator
        ].forEach(child => {
            this.root.appendChild(child);
        });
    }
}
