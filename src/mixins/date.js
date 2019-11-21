import moment from 'moment'

export default {
  methods: {
    getDate(beginDate, curType) {
      const curDate = new Date()
      let copiedDate = new Date()
      const result = {
        start: null,
        end: null,
      }
      if (!curType) return result
      switch (curType) {
        case 'month':
          copiedDate = new Date(beginDate.getTime())
          result.start = moment(copiedDate).unix()
          if (result.start === moment(curDate).startOf('month').unix()) {
            result.end = moment(new Date()).endOf('day').unix()
          } else {
            result.end = moment(copiedDate).endOf('month').unix()
          }
          break
        case 'daterange':
          copiedDate = beginDate.map(time => new Date(time.getTime()))
          copiedDate[0] = moment(copiedDate[0]).unix()
          copiedDate[1] = moment(copiedDate[1]).endOf('day').unix();
          [result.start, result.end] = copiedDate

          break
        default:
          return result
      }
      return result
    },
    restDate(curType) {
      const today = new Date()
      let start = moment(today).startOf('day')
      const end = moment(today).endOf('day')
      switch (curType) {
        case 'month':
          this.cur.curMonth = start.unix() * 1000
          start = moment(today).startOf('month')
          return start.toDate()
        case 'daterange':
          this.$nextTick(() => {
            this.$set(this.cur, 'date', [start.unix() * 1000, end.unix() * 1000])
          })
          return [start.toDate(), end.toDate()]
        default:
          this.cur.date = start.unix() * 1000
          return start.toDate()
      }
    },
  },
}
