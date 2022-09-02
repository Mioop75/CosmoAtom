export default function selectFunc() {
  document.querySelectorAll(".select").forEach(selectWrapper => {
    const btn: HTMLElement = <HTMLElement>selectWrapper.querySelector(".select__btn")
    const list: HTMLElement = <HTMLElement>selectWrapper.querySelector(".select__list")
    const items = selectWrapper.querySelectorAll(".select__item")

    btn.addEventListener("click", () => {
      list.classList.toggle("select__list--active")
      btn.classList.add("select__btn--active")
    })

    items.forEach(listItem => {
      listItem.addEventListener("click", (e) => {
        e.stopPropagation()
        btn.textContent = listItem.textContent
        btn.focus()
        list.classList.remove('select__list--active')
      })
    });

    document.addEventListener("click", (e) => {
      if (list.classList.contains('select__list--active')) {
        if (e.target !== btn) {
          list.classList.remove('select__list--active')
          btn.classList.remove("select__btn--active")
        }
      }
    })

    document.addEventListener("keydown", (e) => {
      if (list.classList.contains('select__list--active')) {
        if (e.key === 'Tab' || e.key === 'Escape') {
          list.classList.remove('select__list--active')
          btn.classList.remove("select__btn--active")
        }
      }
    })
  })
}

selectFunc()