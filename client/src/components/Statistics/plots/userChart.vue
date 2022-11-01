<script>
import { Bar } from 'vue-chartjs'
export default {
    extends: Bar,
    props: {
        uData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chartData: {
                labels: ["Regulars", "Experts"],
                datasets: [{
                    borderWidth: 1,
                    backgroundColor: [
                        '#dedad2',
                        '#df979e',
                    ],
                    pointBorderColor: '#2554FF',
                    data: [this.uData["regulars"], this.uData["experts"]]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Users',
                    fontSize: 16,
                    fontColor: "#000000"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            userCallback: function (label, index, labels) {
                                // when the floored value is the same as the value we have a whole number
                                if (Math.floor(label) === label) {
                                    return label;
                                }

                            },
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
</script>