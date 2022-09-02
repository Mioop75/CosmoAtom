export default class Accordion {
  public options: {isOpen: Function, isClose: Function, speed: number}
  public accordion: HTMLElement
  public control: any
  public content: any
  constructor(selector, options) {
    let defaultOptions: Object = {
      isOpen: () => { },
      isClose: () => { },
      speed: 300
    }

    this.options = Object.assign(defaultOptions, options)
    this.accordion = document.querySelector(`[data-accordion="${selector}"]`) as HTMLElement
    this.control = this.accordion.querySelector(".accordion__control") as HTMLElement
    this.content = this.accordion.querySelector(".accordion__content") as HTMLElement
    this.event()
  }

  event(): void {
    if (this.accordion) {
      this.accordion.addEventListener("click", (e) => {
        this.accordion.classList.toggle('accordion--active')

        if (this.accordion.classList.contains('accordion--active')) {
          this.open()
        } else {
          this.close()
        }
      })
    }
  }

  open(): void {
    this.accordion.style.setProperty('--accordion-time', `${this.options.speed / 1000}s`)
    this.control.setAttribute('aria-expanded', true)
    this.content.setAttribute('aria-hidden', false)
    this.content.style.maxHeight = this.content.scrollHeight + 'px'
    this.options.isOpen(this)
  }

  close(): void {
    this.control.setAttribute("aria-expanded", 'false')
    this.content.setAttribute("aria-hidden", 'true')
    this.content.style.maxHeight = null
    this.options.isClose(this)
  }
}
