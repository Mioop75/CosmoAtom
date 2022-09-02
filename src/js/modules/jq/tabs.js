export default class Tabs {
  constructor(selector, options) {
    let defaultOptions = {
      isChanged: () => {

      }
    }
    this.options = Object.assign(defaultOptions, options);
    this.selector = selector;
    this.tabs = $(`[data-tabs="${selector}"]`)
    if (this.tabs) {
      this.tabList = $(".tabs__list")
      this.tabsBtns = $(".tabs-list__btn")
      this.tabsPanels = $(".tabs__panel")
    } else {
      console.error("Селектор data-tabs не существует!");
      return
    }

    this.check();
    this.init();
    this.events();
  }

  check() {
    if ($(`[data-tabs="${this.selector}"]`).length > 1) {
      console.error("Количество элементов с одинаковым data-tabs больше одного!")
      return;
    }

    if (this.tabsBtns.length !== this.tabsPanels.length) {
      console.error("Количество кнопок и элементов табов не совпадают")
      return;
    }
  }

  init() {
    this.tabList.attr("role", 'tablist')
    this.tabsBtns.each((el, i) => {
      el.attr('role', 'tab')
      el.attr('tabindex', '-1')
      el.attr('id', `${this.selector}${i + 1}`)
      el.removeClass("tabs-list__btn--active")
    })
    this.tabsPanels.forEach((el, i) => {
      el.attr('role', 'tabpanel')
      el.attr('tabindex', '-1')
      el.attr("aria-labelledby", this.tabsBtns[i].id)
      el.removeClass("tabs__panel--active")
    })

    this.tabsBtns[0].addClass('tabs-list__btn--active')
    this.tabsBtns[0].removeAttr("tabindex");
    this.tabsBtns[0].attr('aria-selected', 'true')
    this.tabsPanels[0].addClass('tabs__panel--active')
  }

  events() {
    this.tabsBtns.each((el, i) => {
      el.click((e) => {
        let currentTab = $('[aria-selected]')

        if (e.currentTarget !== currentTab) {
          this.switchTabs(e.currentTarget, currentTab)
        }
      })

      el.keydown((e) => {
        let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget)

        let dir = null;

        if (e.which === 37) {
          dir = index - 1
        } else if (e.which === 39) {
          dir = index + 1
        } else if (e.which === 40) {
          dir = 'down'
        } else {
          dir = null
        }

        if (dir !== null) {
          if (dir === "down") {
            this.tabsPanels[i].focus()
          } else if (this.tabsBtns[dir]) {
            this.switchTabs(this.tabsBtns[dir], e.currentTarget)
          }
        }
      })
    })
  }

  switchTabs(newTab, oldTab = $('[aria-selected]')) {
    newTab.focus()
    newTab.removeAttr('tabindex')
    newTab.attr('aria-selected', 'true')

    oldTab.removeAttr('aria-selected')
    oldTab.attr('tabindex', '-1')

    let index = Array.prototype.indexOf.call(this.tabsBtns, newTab)
    let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);

    this.tabsPanels[oldIndex].removeClass("tabs__panel--active")
    this.tabsPanels[index].addClass("tabs__panel--active")

    this.tabsBtns[oldIndex].removeClass("tabs-list__btn--active")
    this.tabsBtns[index].addClass("tabs-list__btn--active")

    this.options.isChanged(this)
  }
}