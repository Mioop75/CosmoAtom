export default function selectFunc(select = 'select') {
  document.querySelectorAll(`.${select}`).forEach(selectWrapper => {
    const btn = selectWrapper.querySelector(`.${select}__btn`)
    const list = selectWrapper.querySelector(`.${select}__list`)
    const items = selectWrapper.querySelectorAll(`.${select}__item`)

    btn.addEventListener('click', () => {
      list.classList.toggle(`${select}__list--active`)
      btn.classList.add(`${select}__btn--active`)
    })

    items.forEach(listItem => {
      listItem.addEventListener('click', (e) => {
        e.stopPropagation()
        btn.textContent = listItem.textContent
        btn.focus()
        list.classList.remove(`${select}__list--active`)
      })
    });

    document.addEventListener('click', (e) => {
      if (list.classList.contains(`${select}__list--active`)) {
        if (e.target !== btn) {
          list.classList.remove(`${select}__list--active`)
          btn.classList.remove(`${select}__btn--active`)
        }
      }
    })

    document.addEventListener('keydown', (e) => {
      if (list.classList.contains(`${select}__list--active`)) {
        if (e.key === 'Tab' || e.key === 'Escape') {
          list.classList.remove(`${select}__list--active`)
          btn.classList.remove(`${select}__btn--active`)
        }
      }
    })
  })
}