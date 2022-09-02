export default function dropdown() {
  const menuBtns = $('.menu__btn')
  const drops = $('.menu__sublist')

  menuBtns.each(el => {
    el.click((e) => {
      let currentBtn = e.currentTarget;
      let drop = currentBtn.closest('.menu__item').$(".menu__sublist");

      menuBtns.each(el => {
        el.removeClass('menu__btn--active')
      })

      drops.each(el => {
        if (el !== drop) {
          el.removeClass('menu__sublist--active')
        }
      })

      drop.toggleClass('menu__sublist--active')
      currentBtn.toggleClass("menu__btn--active");
    })
  })

  document.addEventListener("click", (e) => {
    if (!e.target.closest('.menu__item')) {
      menuBtns.each(el => {
        el.removeClass('menu__btn--active')
      })

      drops.each(el => {
        el.removeClass('menu__sublist--active')
      })
    }
  })
}
