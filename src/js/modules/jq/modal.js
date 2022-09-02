export default class Modal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => { },
      isClose: () => { }
    }
    this.options = Object.assign(defaultOptions, options)
    this.modal = $('.modal');
    this.speed = false;
    this.animation = false;
    this.isOpen = false;
    this.modalContainer = false;
    this.previousActiveElement = false;
    this.focusElements = [
      'a[href]',
      'input',
      'button',
      'select',
      'textarea',
      '[tabindex]'
    ]
    this.events();
  }

  events() {
    if (this.modal) {
      document.addEventListener("click", (e) => {
        const clickedElement = e.target.closest('[data-path]');
        if (clickedElement) {
          let target = clickedElement.dataset.path;
          let animation = clickedElement.dataset.animation;
          let speed = clickedElement.dataset.speed;
          this.animation = animation ? animation : 'fade';
          this.speed = speed ? parseInt(speed) : 300;
          this.modalContainer = $(`[data-target="${target}"]`)
          this.open();
          return;
        }

        if (e.target.closest('.modal__close')) {
          this.close();
          return;
        }
      })

      $(window).keydown((e) => {
        if (e.code == 27) {
          if (this.isOpen) {
            this.close();
          }
        }

        if (e.code == 9 && this.isOpen) {
          this.focusCatch(e)
          return
        }
      })

      this.modal.click((e) => {
        if (!e.target.hasClass('modal__box') && !e.target.closest('.modal__box') && this.isOpen) {
          this.close();
        }
      })
    }
  }

  open() {
    this.previousActiveElement = document.activeElement
    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`)
    this.modal.addClass("modal--active")
    this.disabledScroll();
    this.modalContainer.addClass("modal__box--active")
    this.modalContainer.addClass(this.animation);

    setTimeout(() => {
      this.options.isOpen(this)
      this.modalContainer.addClass("animate--active")
      this.isOpen = true
      this.focusTrap()
    }, this.speed);
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.removeClass('animate--active')
      this.modalContainer.removeClass(this.animation)
      this.modal.removeClass('modal--active')
      this.modalContainer.removeClass('modal__box--active')

      this.enableScroll();
      this.options.isClose(this)
      this.isOpen = false
      this.focusTrap();
    }
  }

  focusCatch(e) {
    const focusable = this.modalContainer.querySelectorAll(this.focusElements)
    const focusArray = Array.prototype.slice.call(focusable)
    const focusedIndex = focusArray.indexOf(document.activeElement)
    if(e.shiftKey && focusedIndex === 0) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }

    if(!e.shiftKey && focusedIndex.length - 1) {
      focusArray[0].focus();
      e.preventDefault()
    }
  }

  focusTrap() {
    const focusable = this.modalContainer.querySelectorAll(this.focusElements)
    if (this.isOpen) {
      if (focusable) focusable[0].focus();
    } else {
      this.previousActiveElement.focus()
    }
  }

  disabledScroll() {
    document.body.addClass("locked")
  }

  enableScroll() {
    document.body.removeClass("locked")
  }
}