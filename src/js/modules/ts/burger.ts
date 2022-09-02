export default function burgerFunc() {
  const burger: HTMLElement = <HTMLElement> document.querySelector(".header__burger");
  const menu: HTMLElement = <HTMLElement> document.querySelector(".header__menu")

  if (burger) {
    burger.addEventListener("click", () => {
      if (!menu.classList.contains("menu--active")) {
        menu.classList.add("menu--active");
        burger.classList.add("header__burger--active");
        document.body.classList.add('locked');
      } else {
        menu.classList.remove("menu--active");
        burger.classList.remove("header__burger--active")
        document.body.classList.remove('locked');
      }
    })
  }
}