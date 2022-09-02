export default function burgerFunc() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".header__menu")

  if (burger) {
    burger.addEventListener("click", () => {
      if (!menu.classList.contains("menu--active")) {
        menu.classList.add("menu--active");
        burger.classList.add("burger--active");
        document.body.classList.add('locked');
      } else {
        menu.classList.remove("menu--active");
        burger.classList.remove("burger--active")
        document.body.classList.remove('locked');
      }
    })
  }
}