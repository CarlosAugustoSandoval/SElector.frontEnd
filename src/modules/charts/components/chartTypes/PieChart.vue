<script>
import { mixins, Pie } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  name: 'PieChart',
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => ({
        responsive: true
      })
    },
    height: {
      type: Number,
      default: 200
    }
  },
  watch: {
    options: {
      handler () {
        this.render()
      },
      immediate: false
    },
    height: {
      handler () {
        this.render()
      },
      immediate: false
    }
  },
  mounted () {
    this.render()
  },
  methods: {
    render () {
      this.renderChart(this.chartData, this.options)
    }
  }
}
</script>