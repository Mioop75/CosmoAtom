export default function fixedMenuFunc() {
  const menu = $(".header")

  $(window).scroll(scrollFixedMenu)


  function scrollFixedMenu() {
    const breakpoint = 5
    if ($(window).scrollY > breakpoint) {
      menu.addClass("header__fixed")
    } else {
      menu.removeClass("header__fixed")
    }
  }

  scrollFixedMenu()

}