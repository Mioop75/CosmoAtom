export default function fixedMenuFunc() {
  const menu: HTMLElement = <HTMLElement> document.querySelector(".header")

  window.addEventListener("scroll", scrollFixedMenu)


  function scrollFixedMenu() {
    const breakpoint = 5
    if (window.scrollY > breakpoint) {
      menu.classList.add("header__fixed")
    } else {
      menu.classList.remove("header__fixed")
    }
  }

  scrollFixedMenu()

}