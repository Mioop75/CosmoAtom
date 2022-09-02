export default function scrollFunc() {
  const links = $(".header a");

  links.each((element) => {
    element.click((event) => {
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