export default class Accordion {
  constructor(selector, options) {
    let defaultOptions = {
      isOpen: () => { },
      isClose: () => { },
      speed: 300
    }

    this.options = Object.assign(defaultOptions, options)
    this.accordion = $(`[data-accordion="${selector}"]`)
    this.control = this.accordion.querySelector(".accordion__control")
    this.content = this.accordion.querySelector(".accordion__content")
    this.event()
  }

  event() {
    if (this.accordion) {
      this.accordion.click((e) => {
        this.accordion.toggleClass('accordion--active')

        if (this.accordion.hasClass('accordion--active')) {
          this.open()
        } else {
          this.close()
        }
      })
    }
  }

  open() {
    this.accordion.style.setProperty('--accordion-time', `${this.options.speed / 1000}s`)
    this.control.attr('aria-expanded', true)
    this.content.attr('aria-hidden', false)
    this.content.style.maxHeight = this.content.scrollHeight + 'px'
    this.options.isOpen(this)
  }

  close() {
    this.control.attr("aria-expanded", false)
    this.content.attr("aria-hidden", true)
    this.content.style.maxHeight = null
    this.options.isClose(this)
  }
}