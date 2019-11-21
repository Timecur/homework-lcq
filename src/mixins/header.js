import { toObj } from '@/utils/tools'

export default {
  data() {
    return {
      sales: [],
      teachers: [],
      groups: [],
      typeList: [],
      levelOptions: [],
    }
  },

  methods: {
    async sizeChange(size) {
      this.pagination.size = size
      await this.getData()
    },
    async getLevels() {
      const { data: { ent } } = await this.$api['sale/level/list']({})
      const { items } = ent
      this.levelOptions = items
    },
    async getSales() {
      const { data: { ent } } = await this.$api['sale/list']({
        position: 0,
      })
      const { items } = ent
      this.sales = items
    },
    async getTeachers() {
      const { data: { ent } } = await this.$api['sale/list']({
        position: 1,
      })
      const { items } = ent
      this.teachers = items
    },
    async getGroups({ group = '', key = null } = {}) {
      const { data: { ent } } = await this.$api['group/list']({ group })
      const { items } = ent
      const result = []
      items.forEach((item) => {
        if (item.gtype === 1) result.push(item)
      })
      this.groups = result
      if (key) this[key] = result
    },
    async getTodoTypeList({ position = 0 } = {}) {
      const { data: { ent } } = await this.$api['todo/type/list']({ position })
      const { items } = ent
      this.typeList = items
      this.typeObjList = toObj(items, 'todotype')
    },
  },
}
