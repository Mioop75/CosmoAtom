export default function burgerFunc() {
  const burger = $(".header__burger");
  const menu = $(".header__menu")

  if (burger) {
    burger.click(() => {
      if (!menu.hasClass("menu--active")) {
        menu.addClass("menu--active");
        burger.addClass("header__burger--active");
        document.body.addClass('locked');
      } else {
        menu.removeClass("menu--active");
        burger.removeClass("header__burger--active")
        document.body.removeClass('locked');
      }
    })
  }
}