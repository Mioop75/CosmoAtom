export default class Modal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => { },
      isClose: () => { }
    }
    this.options = Object.assign(defaultOptions, options)
    this.modal = document.querySelector('.modal');
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
          this.modalContainer = document.querySelector(`[data-target="${target}"]`)
          this.open();
          return;
        }

        if (e.target.closest('.modal__close')) {
          this.close();
          return;
        }
      })

      window.addEventListener("keydown", (e) => {
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

      this.modal.addEventListener("click", (e) => {
        if (!e.target.classList.contains('modal__box') && !e.target.closest('.modal__box') && this.isOpen) {
          this.close();
        }
      })
    }
  }

  open() {
    this.previousActiveElement = document.activeElement
    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`)
    this.modal.classList.add("modal--active")
    this.disabledScroll();
    this.modalContainer.classList.add("modal__box--active")
    this.modalContainer.classList.add(this.animation);

    setTimeout(() => {
      this.options.isOpen(this)
      this.modalContainer.classList.add("animate--active")
      this.isOpen = true
      this.focusTrap()
    }, this.speed);
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('animate--active')
      this.modalContainer.classList.remove(this.animation)
      this.modal.classList.remove('modal--active')
      this.modalContainer.classList.remove('modal__box--active')

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
    document.body.classList.add("locked")
  }

  enableScroll() {
    document.body.classList.remove("locked")
  }
}