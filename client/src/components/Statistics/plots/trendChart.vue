<script>
import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
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
                    backgroundColor: '#e27c7c',
                    pointBorderColor: '#2554FF',
                    data: [this.trData[7]["Hateful"], this.trData[6]["Hateful"], this.trData[5]["Hateful"], this.trData[4]["Hateful"], this.trData[3]["Hateful"], this.trData[2]["Hateful"], this.trData[1]["Hateful"]]
                },
                {
                    label: 'Abusive',
                    backgroundColor: '#d7658b',
                    pointBorderColor: '#2554FF',
                    data: [this.trData[7]["Abusive"], this.trData[6]["Abusive"], this.trData[5]["Abusive"], this.trData[4]["Abusive"], this.trData[3]["Abusive"], this.trData[2]["Abusive"], this.trData[1]["Abusive"]]
                },
                {
                    label: 'Neutral',
                    backgroundColor: '#e4bcad',
                    pointBorderColor: '#2554FF',
                    data: [this.trData[7]["Neutral"], this.trData[6]["Neutral"], this.trData[5]["Neutral"], this.trData[4]["Neutral"], this.trData[3]["Neutral"], this.trData[2]["Neutral"], this.trData[1]["Neutral"]]
                },
                {
                    label: 'Threat',
                    backgroundColor: '#df979e',
                    pointBorderColor: '#2554FF',
                    data: [this.trData[7]["Threat"], this.trData[6]["Threat"], this.trData[5]["Threat"], this.trData[4]["Threat"], this.trData[3]["Threat"], this.trData[2]["Threat"], this.trData[1]["Threat"]]
                },
                {
                    label: 'Spam',
                    backgroundColor: '#dedad2',
                    pointBorderColor: '#2554FF',
                    data: [this.trData[7]["Spam"], this.trData[6]["Spam"], this.trData[5]["Spam"], this.trData[4]["Spam"], this.trData[3]["Spam"], this.trData[2]["Spam"], this.trData[1]["Spam"]]
                },]
            },
            options: {
                title: {
                    display: true,
                    text: ' Recent Trends',
                    fontSize: 16,
                    fontColor: "#000000"
                },
                scales: {
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false
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