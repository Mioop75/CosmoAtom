export default function lazyLoadingFunc() {
  const lazyImages = $('img[data-src], source[data-srcset]')
  const windowHeight = document.documentElement.clientHeight

  let lazyImagesPositions = []

  if (lazyImages.length > 0) {
    lazyImages.each(img => {
      if (img.dataset.src || img.dataset.srcset) {
        lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset)
      }
    })
  }

  $(window).scroll(lazyScroll)

  function lazyScroll() {
    if ($('img[data-src], source[data-srcset]').length > 0) {
      lazyScrollCheck()
    }
  }

  lazyScroll()

  function lazyScrollCheck() {
    let imgIndex = lazyImagesPositions.findIndex(item => pageYOffset > item - windowHeight)
    if (imgIndex >= 0) {
      if (lazyImages[imgIndex].dataset.src) {
        lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src
        lazyImages[imgIndex].removeAttr('data-src');
      } else if (lazyImages[imgIndex].dataset.srcset) {
        lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset
        lazyImages[imgIndex].removeAttr('data-srcset');
      }
      delete lazyImagesPositions[imgIndex]
    }
  }
}