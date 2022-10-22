<script>
import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    props: {
        twData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chartData: {

                labels: ["Hateful", "Abusive", "Neutral", "Threat", "Spam"],
                datasets: [{
                    borderWidth: 1,
                    backgroundColor: [
                        '#e27c7c',
                        '#dedad2',
                        '#e4bcad',
                        '#df979e',
                        '#d7658b',
                    ],
                    data: [this.twData["Hateful"],this.twData["Abusive"], this.twData["Neutral"], this.twData["Threat"], this.twData["Spam"]]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Total Annotated Tweets',
                    fontSize: 16,
                    fontColor: "#000000"
                },
                legend: {
                    display: true
                },
                responsive: true,
                maintainAspectRatio: false
            },
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    },


}
</script>