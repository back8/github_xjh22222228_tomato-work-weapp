import dayjs from 'dayjs'
import {
  serviceCreateReminder,
  serviceUpdateReminder,
} from '../../../../services/reminder'

const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'HH:mm'

Component({
  properties: {
    show: Boolean,
    data: {
      type: null,
      observer(value) {
        if (value) {
          this.setData({
            content: value.content,
            date: dayjs(value.createdAt).format(DATE_FORMAT),
            time: dayjs(value.date).format(TIME_FORMAT)
          })
        }
      }
    }
  },
  data: {
    date: dayjs().format(DATE_FORMAT),
    time: dayjs().format(TIME_FORMAT),
    content: '',
    confirmLoading: false
  },
  methods: {
    onClose() {
      this.triggerEvent('close')
    },
    onDateChange(e) {
      this.setData({ date: e.detail.value })
    },
    onTimeChange(e) {
      this.setData({ time: e.detail.value })
    },
    onInputChange(e) {
      const { fieldName } = e.currentTarget.dataset
      this.setData({ [fieldName]: e.detail })
    },
    handleSubmit() {
      const { content, date, time } = this.data
      const { data } = this.properties
      const params = {
        date: dayjs(date + ' ' + time).valueOf(),
        content
      }

      this.setData({ confirmLoading: true });

      (
        data
        ? serviceUpdateReminder(data.id, params)
        : serviceCreateReminder(params)
      )
      .then(() => {
        this.onClose()
        this.triggerEvent('success')
      })
      .finally(() => {
        this.setData({ confirmLoading: false })
      })
    }
  }
})
