const swiper = new Swiper('.slider', {
  slideClass: 'slider__slide',
  wrapperClass: 'slider__wrapper',

  pagination: {
    el: '.slider__pagination',
  },

  navigation: {
    nextEl: '.slider__button--next',
    prevEl: '.slider__button--prev',
  },

  scrollbar: {
    el: '.slider__scrollbar',
  },
});