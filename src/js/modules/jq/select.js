export default function selectFunc() {
  $(".select").each(selectWrapper => {
    const btn = $(".select__btn")
    const list = $(".select__list")
    const items = $(".select__item")

    btn.click(() => {
      list.toggleClass("select__list--active")
      btn.addClass("select__btn--active")
    })

    items.each(listItem => {
      listItem.click((e) => {
        e.stopPropagation()
        btn.textContent = listItem.textContent
        btn.focus()
        list.removeClass('select__list--active')
      })
    });

    document.click((e) => {
      if (list.hasClass('select__list--active')) {
        if (e.target !== btn) {
          list.removeClass('select__list--active')
          btn.removeClass("select__btn--active")
        }
      }
    })

    document.keydown((e) => {
      if (list.hasClass('select__list--active')) {
        if (e.key === 'Tab' || e.key === 'Escape') {
          list.removeClass('select__list--active')
          btn.removeClass("select__btn--active")
        }
      }
    })
  })
}

selectFunc()