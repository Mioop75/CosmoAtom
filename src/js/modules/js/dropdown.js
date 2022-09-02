export default function dropdown() {
  const menuBtns = document.querySelectorAll('.menu__btn')
  const drops = document.querySelectorAll('.menu__sublist')

  menuBtns.forEach(el => {
    el.addEventListener("click", (e) => {
      let currentBtn = e.currentTarget;
      let drop = currentBtn.closest('.menu__item').querySelector(".menu__sublist");

      menuBtns.forEach(el => {
        el.classList.remove('menu__btn--active')
      })

      drops.forEach(el => {
        if (el !== drop) {
          el.classList.remove('menu__sublist--active')
        }
      })

      drop.classList.toggle('menu__sublist--active')
      currentBtn.classList.toggle("menu__btn--active");
    })
  })

  document.addEventListener("click", (e) => {
    if (!e.target.closest('.menu__item')) {
      menuBtns.forEach(el => {
        el.classList.remove('menu__btn--active')
      })

      drops.forEach(el => {
        el.classList.remove('menu__sublist--active')
      })
    }
  })
}
