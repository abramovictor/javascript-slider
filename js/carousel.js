class Carousel {
    static getInnerWidth(rootElement = Node.prototype, length = Number.prototype, amountSlide = Number.prototype) {
        return (rootElement.offsetWidth * length) / amountSlide;
    }

    static getIndex(carouselItems = Array.prototype, carouselItem = Node.prototype, loop = Boolean.prototype) {
        const FIRST_INDEX = 0;
        const LAST_INDEX = carouselItems.length - 1;

        return {
            get current() {
                return carouselItems.indexOf(carouselItem);
            },
            get prev() {
                let current = carouselItems.indexOf(carouselItem);
                let prev = current - 1;

                if (prev < FIRST_INDEX && loop === true) {
                    prev = LAST_INDEX;
                } else if (prev < FIRST_INDEX) {
                    prev = FIRST_INDEX;
                }

                return prev;
            },
            get next() {
                let current = carouselItems.indexOf(carouselItem);
                let next = current + 1;

                if (next > LAST_INDEX && loop === true) {
                    next = FIRST_INDEX;
                }
                else if (next > LAST_INDEX) {
                    next = LAST_INDEX;
                }

                return next;
            }
        }
    }

    static getOffset(carouselItems = Array.prototype, carouselItem = Node.prototype, amountSlide = Number.prototype) {
        let index = Carousel.getIndex(carouselItems, carouselItem).current;
        let { length } = carouselItems;
        let allWidth = carouselItem.clientWidth * length;
        let amountWidth = carouselItem.clientWidth * amountSlide;
        let offsetWidth = allWidth - amountWidth;

        let offset = carouselItem.clientWidth * index;

        return offset <= offsetWidth ? offset : offsetWidth;
    }

    static getElement(elements = Array.prototype, activeIndex = Number.prototype, loop = Boolean.prototype) {
        return {
            get active() {
                return elements[activeIndex];
            },
            get prev() {
                const activeSlide = Carousel.getElement(elements, activeIndex).active;
                return elements[Carousel.getIndex(elements, activeSlide, loop).prev];
            },
            get next() {
                const activeSlide = Carousel.getElement(elements, activeIndex).active;
                return elements[Carousel.getIndex(elements, activeSlide, loop).next];
            }
        }
    }
}