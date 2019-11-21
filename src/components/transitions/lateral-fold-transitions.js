import { addClass, removeClass } from '@/utils/dom'

// lateral-fold-transition
const Transition = {
  beforeEnter(el) {
    addClass(el, 'lateral-fold-transition')
    if (!el.dataset) el.dataset = {}

    el.dataset.oldPaddingLeft = el.style.paddingLeft
    el.dataset.oldPaddingRight = el.style.paddingRight

    el.style.width = 0
    el.style.paddingLeft = 0
    el.style.paddingRight = 0
  },

  enter(el) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollWidth !== 0) {
      el.style.width = `${el.scrollWidth}px`
      el.style.paddingLeft = el.dataset.oldPaddingLeft
      el.style.paddingRight = el.dataset.oldPaddingRight
    } else {
      el.style.width = ''
      el.style.paddingLeft = el.dataset.oldPaddingLeft
      el.style.paddingRight = el.dataset.oldPaddingRight
    }

    el.style.overflow = 'hidden'
  },

  afterEnter(el) {
    removeClass(el, 'lateral-fold-transition')
    el.style.width = ''
    el.style.overflow = el.dataset.oldOverflow
  },

  beforeLeave(el) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingLeft = el.style.paddingLeft
    el.dataset.oldPaddingRight = el.style.paddingRight
    el.dataset.oldOverflow = el.style.overflow

    el.style.width = `${el.scrollWidth}px`
    el.style.overflow = 'hidden'
  },

  leave(el) {
    if (el.scrollWidth !== 0) {
      addClass(el, 'lateral-fold-transition')
      el.style.width = 0
      el.style.paddingLeft = 0
      el.style.paddingRight = 0
    }
  },

  afterLeave(el) {
    removeClass(el, 'lateral-fold-transition')
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingLeft = el.dataset.oldPaddingLeft
    el.style.paddingRight = el.dataset.oldPaddingRight
  },
}

export default {
  name: 'LateralFoldTransition',
  functional: true,
  render(h, { children }) {
    const data = {
      on: Transition,
    }

    return h('transition', data, children)
  },
}
