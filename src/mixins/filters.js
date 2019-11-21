import numeral from 'numeral'
import Decimal from 'decimal.js/decimal.js'
import moment from 'moment'
import { mGetDate } from '@/utils/tools'

export default {
  data() {
    return {
      statdateBetter: false,
    }
  },

  filters: {
  },

  methods: {
    scheduleFormat(start, end) {
      const formatStart = moment(start * 1000)
      const formatEnd = moment(end * 1000)
      const timeDifference = formatEnd.diff(formatStart, 'days') + 1
      const date = new Date(start * 1000)
      const curDays = mGetDate(date)
      const result = 1 / curDays
      return numeral(result * timeDifference).format('0.0%')
    },
    toPercent(value) {
      if (!new Decimal(value).isFinite()) return '-'
      return numeral(value).format('0.0%')
    },
    oneDecimal(value) {
      if (!new Decimal(value).isFinite()) return '-'
      return numeral(value).format('0.0')
    },
    roundNumber(value) {
      if (!value) return '-'
      if (!new Decimal(value).isFinite()) return '-'
      return numeral(value).format('0')
    },
    dateFormat({ begintts = null, endtts = null }, format) {
      const formatVal = format || 'YYYY-MM-DD'
      if (!endtts) {
        return moment(begintts * 1000).format(formatVal)
      }
      const start = moment(begintts * 1000)
      const end = moment(endtts * 1000)
      if (start.isSame(end, 'day')) return start.format(formatVal)
      return `${start.format(formatVal)}-${end.format(formatVal)}`
    },
    toThousands(num) {
      const result = numeral(num / 100).format('0,0')
      return result
    },
    compareStatdate(value, row) {
      // 比较值
      const tmpA = value
      const { timeline } = row
      if (!tmpA || tmpA === '-') return true
      if (numeral(timeline).value() > numeral(tmpA).value()) return true

      return false
    },
  },
}
