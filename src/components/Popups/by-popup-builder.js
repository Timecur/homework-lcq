import Vue from 'vue'
import { PopupManager } from 'element-ui/lib/utils/popup'

import router from '@/plugins/router'
import store from '@/plugins/store'

const mixin = {
  data() {
    return {
      visible: false,
      escapeKey: true,
      onClose: () => {},
      resolve: null,
      reject: null,
    }
  },
  methods: {
    popupReturn() {
      return new Promise((resolve, reject) => {
        this.resolve = (...value) => { resolve(...value) }
        this.reject = (...value) => { reject(new Error(...value)) }
      })
    },
    close(action) {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
      if (this.resolve) {
        if (action === 'confirm') {
          this.resolve(action)
        } else if (this.reject && (action === 'cancel' || action === 'close')) {
          this.reject(action)
        }
      }
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    keydown(e) {
      if (e.keyCode === 27) this.close()
    },
  },
  mounted() {
    if (!this.escapeKey) return
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    if (!this.escapeKey) return
    document.removeEventListener('keydown', this.keydown)
  },
}

let instance
const instances = []
let seed = 1

const builder = (VueInstance) => {
  const CustomInstance = Vue.extend(VueInstance)

  const { popupConfig = { modal: true } } = VueInstance

  const CustomDialog = (options = {}) => {
    if (Vue.prototype.$isServer) return false

    const userOnClose = options.onClose

    const id = `by-dialog_${seed++}`
    const popupZIndex = PopupManager.nextZIndex()

    options.onClose = () => {
      CustomDialog.close(id, userOnClose)
      if (popupConfig.modal) PopupManager.closeModal(id)
    }

    instance = new CustomInstance({ data: options, router, store })
    instance.id = id

    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
    instance.dom = instance.vm.$el
    instance.dom.style.zIndex = PopupManager.nextZIndex()
    instances.push(instance)
    if (popupConfig.modal) PopupManager.openModal(id, popupZIndex, instance.dom)
    return instance.popupReturn ? instance.popupReturn() : instance.vm
  }

  CustomDialog.close = (id, userOnClose) => {
    for (let i = 0, len = instances.length; i < len; i++) {
      if (id === instances[i].id) {
        if (typeof userOnClose === 'function') {
          userOnClose(instances[i])
        }
        instances.splice(i, 1)
        break
      }
    }
  }

  CustomDialog.closeAll = () => {
    for (let i = instances.length - 1; i >= 0; i--) {
      instances[i].close()
    }
  }

  return CustomDialog
}

export { builder, mixin }
