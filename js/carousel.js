class Carousel {
    constructor(root = Node.prototype, props = Object.prototype) {
        this.root = root;
        this.props = props;
        console.log(this.props.loop);
    }

    getInnerWidth(length = Number.prototype) {
        return this.root.offsetWidth * length;
    }

    getIndex(carouselItems = Array.prototype, carouselItem = Node.prototype) {
        const FIRST_INDEX = 0;
        const LAST_INDEX = carouselItems.length - 1;

        const self = this;

        return {
            get current() {
                return carouselItems.indexOf(carouselItem);
            },
            get prev() {
                let current = carouselItems.indexOf(carouselItem);
                let prev = current - 1;

                if (prev < FIRST_INDEX && self.props.loop === true) {
                    prev = LAST_INDEX;
                } else if (prev < FIRST_INDEX) {
                    prev = FIRST_INDEX;
                }

                return prev;
            },
            get next() {
                let current = carouselItems.indexOf(carouselItem);
                let next = current + 1;

                if (next > LAST_INDEX && self.props.loop === true) {
                    next = FIRST_INDEX;
                }
                else if (next > LAST_INDEX) {
                    next = LAST_INDEX;
                }

                return next;
            }
        }
    }

    getOffset(carouselItems = Array.prototype, carouselItem = Node.prototype) {
        let index = this.getIndex(carouselItems, carouselItem).current;

        return carouselItem.clientWidth * index;
    }

    getElement(elements = Array.prototype, activeIndex = Number.prototype, loop = Boolean.prototype) {
        const self = this;
        
        return {
            get active() {
                return elements[activeIndex];
            },
            get prev() {
                const activeSlide = elements[activeIndex];
                return elements[self.getIndex(elements, activeSlide, loop).prev];
            },
            get next() {
                const activeSlide = elements[activeIndex];
                return elements[self.getIndex(elements, activeSlide, loop).next];
            }
        }
    }
}