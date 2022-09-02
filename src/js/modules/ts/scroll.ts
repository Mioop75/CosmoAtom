export default function scrollFunc() {
  const links = document.querySelectorAll(".header a");

  links.forEach((element: any) => {
    element.addEventListener("click", (event: any) => {
      event.preventDefault();

      const id = element.getAttribute("href").substring(1);
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      } else {

      }
    })
  })
}