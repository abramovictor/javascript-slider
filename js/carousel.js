class Carousel {
    static getInnerWidth(rootElement = Node.prototype, length = Number.prototype, amountSlide = Number.prototype) {
        return (rootElement.offsetWidth * length) / amountSlide;
    }

    static getIndex(carouselItems = Array.prototype, carouselItem = Node.prototype) {
        return {
            get current() {
                return carouselItems.indexOf(carouselItem);
            },
            get prev() {
                let { length } = carouselItems;
                let current = carouselItems.indexOf(carouselItem);
                let prev = current - 1;

                if (prev < 0) {
                    prev = length - 1;
                }

                return prev;
            },
            get next() {
                let { length } = carouselItems;
                let current = carouselItems.indexOf(carouselItem);
                let next = current + 1;

                if (next >= length) {
                    next = 0;
                }

                return next;
            }
        }
    }

    static getOffset(carouselItems = Array.prototype, carouselItem = Node.prototype) {
        let index = Carousel.getIndex(carouselItems, carouselItem).current;

        return carouselItem.clientWidth * index;
    }

    static getElement(elements = Array.prototype, activeIndex = Number.prototype) {
        return {
            get active() {
                return elements[activeIndex];
            },
            get prev() {
                const activeSlide = Carousel.getElement(elements, activeIndex).active;
                return elements[Carousel.getIndex(elements, activeSlide).prev];
            },
            get next() {
                const activeSlide = Carousel.getElement(elements, activeIndex).active;
                return elements[Carousel.getIndex(elements, activeSlide).next];
            }
        }
    }
}