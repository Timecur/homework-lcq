<script>
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'
import TabBar from './tab-bar'

function noop() {}
const firstUpperCase = str => str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())

export default {
  name: 'TabNav',

  components: {
    TabBar,
  },

  inject: ['rootTabs'],

  props: {
    panes: Array,
    title: String,
    titleImportant: {
      type: Boolean,
      default: false,
    },
    currentName: String,
    editable: Boolean,
    onTabClick: {
      type: Function,
      default: noop,
    },
    onTabRemove: {
      type: Function,
      default: noop,
    },
    type: String,
    stretch: Boolean,
  },

  data() {
    return {
      scrollable: false,
      navOffset: 0,
      isFocus: false,
      focusable: true,
    }
  },

  computed: {
    navStyle() {
      const dir = ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'X' : 'Y'
      return {
        transform: `translate${dir}(-${this.navOffset}px)`,
      }
    },
    sizeName() {
      return ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'width' : 'height'
    },
  },

  methods: {
    scrollPrev() {
      const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`]
      const currentOffset = this.navOffset

      if (!currentOffset) return

      const newOffset = currentOffset > containerSize
        ? currentOffset - containerSize
        : 0

      this.navOffset = newOffset
    },
    scrollNext() {
      const navSize = this.$refs.nav[`offset${firstUpperCase(this.sizeName)}`]
      const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`]
      const currentOffset = this.navOffset

      if (navSize - currentOffset <= containerSize) return

      const newOffset = navSize - currentOffset > containerSize * 2
        ? currentOffset + containerSize
        : (navSize - containerSize)

      this.navOffset = newOffset
    },
    scrollToActiveTab() {
      if (!this.scrollable) return
      const { nav } = this.$refs
      const activeTab = this.$el.querySelector('.is-active')
      if (!activeTab) return
      const { navScroll } = this.$refs
      const activeTabBounding = activeTab.getBoundingClientRect()
      const navScrollBounding = navScroll.getBoundingClientRect()
      const maxOffset = nav.offsetWidth - navScrollBounding.width
      const currentOffset = this.navOffset
      let newOffset = currentOffset

      if (activeTabBounding.left < navScrollBounding.left) {
        newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left)
      }
      if (activeTabBounding.right > navScrollBounding.right) {
        newOffset = (currentOffset + activeTabBounding.right) - navScrollBounding.right
      }

      newOffset = Math.max(newOffset, 0)
      this.navOffset = Math.min(newOffset, maxOffset)
    },
    update() {
      if (!this.$refs.nav) return
      const { sizeName } = this
      const navSize = this.$refs.nav[`offset${firstUpperCase(sizeName)}`]
      const containerSize = this.$refs.navScroll[`offset${firstUpperCase(sizeName)}`]
      const currentOffset = this.navOffset

      if (containerSize < navSize) {
        this.scrollable = this.scrollable || {}
        this.scrollable.prev = currentOffset
        this.scrollable.next = currentOffset + containerSize < navSize
        if (navSize - currentOffset < containerSize) {
          this.navOffset = navSize - containerSize
        }
      } else {
        this.scrollable = false
        if (currentOffset > 0) {
          this.navOffset = 0
        }
      }
    },
    changeTab(e) {
      const { keyCode } = e
      let nextIndex
      let currentIndex
      let tabList
      if ([37, 38, 39, 40].indexOf(keyCode) !== -1) {
        tabList = e.currentTarget.querySelectorAll('[role=tab]')
        currentIndex = Array.prototype.indexOf.call(tabList, e.target)
      } else {
        return
      }
      if (keyCode === 37 || keyCode === 38) {
        if (currentIndex === 0) {
          nextIndex = tabList.length - 1
        } else {
          nextIndex = currentIndex - 1
        }
      } else if (currentIndex < tabList.length - 1) {
        nextIndex = currentIndex + 1
      } else {
        nextIndex = 0
      }
      tabList[nextIndex].focus()
      tabList[nextIndex].click()
      this.setFocus()
    },
    setFocus() {
      if (this.focusable) {
        this.isFocus = true
      }
    },
    removeFocus() {
      this.isFocus = false
    },
    visibilityChangeHandler() {
      const visibility = document.visibilityState
      if (visibility === 'hidden') {
        this.focusable = false
      } else if (visibility === 'visible') {
        setTimeout(() => {
          this.focusable = true
        }, 50)
      }
    },
    windowBlurHandler() {
      this.focusable = false
    },
    windowFocusHandler() {
      setTimeout(() => {
        this.focusable = true
      }, 50)
    },
  },

  updated() {
    this.update()
  },

  // render(h) {
  render() {
    const {
      type,
      panes,
      title,
      titleImportant,
      editable,
      stretch,
      onTabClick,
      onTabRemove,
      navStyle,
      scrollable,
      scrollNext,
      scrollPrev,
      changeTab,
      setFocus,
      removeFocus,
    } = this
    const scrollBtn = scrollable
      ? [
        <span class={['by-tabs__nav-prev', scrollable.prev ? '' : 'is-disabled']} on-click={scrollPrev}><i class="fa fa-angle-left"></i></span>,
        <span class={['by-tabs__nav-next', scrollable.next ? '' : 'is-disabled']} on-click={scrollNext}><i class="fa fa-angle-right"></i></span>,
      ] : null
    const navTitle = title
      ? <div class="by-tabs__nav-title">{ titleImportant ? <span>*</span> : '' }{title}</div>
      : null

    const tabs = this._l(panes, (pane, index) => {
      const tabName = pane.name || pane.index || index
      const closable = pane.isClosable || editable

      pane.index = `${index}`

      const btnClose = closable
        ? <span class="fa fa-times" on-click={(ev) => { onTabRemove(pane, ev) }}></span>
        : null

      const tabLableContent = pane.$slots.label || pane.label
      const tabTitleClassName = pane.tabClassName || ''
      const tabindex = pane.active ? 0 : -1
      const classContent = {
        'by-tabs__item': true,
        [`is-${this.rootTabs.tabPosition}`]: true,
        'is-active': pane.active,
        'is-disabled': pane.disabled,
        'os-closable': closable,
        'is-focus': this.isFocus,
      }
      classContent[tabTitleClassName] = true
      return (
        <div
          class={classContent}
          id={`tab-${tabName}`}
          key={`tab-${tabName}`}
          aria-controls={`pane-${tabName}`}
          role="tab"
          aria-selected={pane.active}
          ref="tab"
          tabindex={tabindex}
          refInFor
          on-focus={() => { setFocus() }}
          on-blur={() => { removeFocus() }}
          on-click={(ev) => { removeFocus(); onTabClick(pane, tabName, ev) }}
          on-keydown={
            (ev) => {
              if (closable && (ev.keyCode === 46 || ev.keyCode === 8)) { onTabRemove(pane, ev) }
            }
          }
        >
          <i class="by-tabs__icon-arrow fa fa-angle-right"></i>
          {tabLableContent}
          {btnClose}
        </div>
      )
    })

    return (
      <div class={['by-tabs__nav-wrap', scrollable ? 'is-scrollable' : '', `os-${this.rootTabs.tabPosition}`]}>
        {scrollBtn}
        <div class={['by-tabs__nav-scroll']} ref="navScroll">
          <div
            class={['by-tabs__nav', `is-${this.rootTabs.tabPosition}`, stretch && ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'is-stretch' : '']}
            ref="nav"
            style={navStyle}
            role="tablist"
            on-keydown={changeTab}
          >
            {navTitle}
            {!type ? <tab-bar tabs={panes}></tab-bar> : null}
            {tabs}
          </div>
        </div>
      </div>
    )
  },

  mounted() {
    addResizeListener(this.$el, this.update)
    document.addEventListener('visibilitychange', this.visibilityChangeHandler)
    window.addEventListener('blur', this.windowBlurHandler)
    window.addEventListener('focus', this.windowFocusHandler)
  },

  beforeDestroy() {
    if (this.$el && this.update) removeResizeListener(this.$el, this.update)
    document.removeEventListener('visibilitychange', this.visibilityChangeHandler)
    window.removeEventListener('blur', this.windowBlurHandler)
    window.removeEventListener('focus', this.windowFocusHandler)
  },
}
</script>
