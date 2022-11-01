<script>
import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props: {
        trData: {
            type: Object,
            required: true
        },
        labels:
        {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            chartData: {
                labels: this.labels,
                datasets: [{
                    label: 'Hateful',
                    tension: 0.3,
                    fill: false,
                    backgroundColor: '#e27c7c',
                    borderColor: '#e27c7c',
                    data: [this.trData[7]["Hateful"], this.trData[6]["Hateful"], this.trData[5]["Hateful"], this.trData[4]["Hateful"], this.trData[3]["Hateful"], this.trData[2]["Hateful"], this.trData[1]["Hateful"]],

                },
                {
                    label: 'Abusive',
                    tension: 0.3,
                    fill: false,
                    backgroundColor: '#d7658b',
                    borderColor: '#d7658b',
                    data: [this.trData[7]["Abusive"], this.trData[6]["Abusive"], this.trData[5]["Abusive"], this.trData[4]["Abusive"], this.trData[3]["Abusive"], this.trData[2]["Abusive"], this.trData[1]["Abusive"]],

                },
                {
                    label: 'Neutral',
                    tension: 0.3,
                    fill: false,
                    backgroundColor: '#e4bcad',
                    borderColor: '#e4bcad',
                    data: [this.trData[7]["Neutral"], this.trData[6]["Neutral"], this.trData[5]["Neutral"], this.trData[4]["Neutral"], this.trData[3]["Neutral"], this.trData[2]["Neutral"], this.trData[1]["Neutral"]],

                },
                {
                    label: 'Threat',
                    tension: 0.3,
                    fill: false,
                    backgroundColor: '#df979e',
                    borderColor: '#df979e',
                    data: [this.trData[7]["Threat"], this.trData[6]["Threat"], this.trData[5]["Threat"], this.trData[4]["Threat"], this.trData[3]["Threat"], this.trData[2]["Threat"], this.trData[1]["Threat"]],

                },
                {
                    label: 'Spam',
                    tension: 0.3,
                    fill: false,
                    backgroundColor: '#dedad2',
                    borderColor: '#dedad2',
                    data: [this.trData[7]["Spam"], this.trData[6]["Spam"], this.trData[5]["Spam"], this.trData[4]["Spam"], this.trData[3]["Spam"], this.trData[2]["Spam"], this.trData[1]["Spam"]],

                },]
            },
            options: {
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                title: {
                    display: true,
                    text: ' Recent Trends',
                    fontSize: 16,
                    fontColor: "#000000"
                },
                stacked: false,
                scales: {
                    yAxes: [{
                        display: true,
                        position: 'left',
                        ticks: {
                            beginAtZero: true,
                            userCallback: function (label, index, labels) {
                                // when the floored value is the same as the value we have a whole number
                                if (Math.floor(label) === label) {
                                    return label;
                                }

                            },
                        },
                        labels: {
                            show: true
                        }
                    }]
                },
                legend: {
                    display: true
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