<template>
    <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
        :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
)

export default {
    name: 'LineChart',
    components: {
        LineChartGenerator
    },
    props: {
        trData: {
            type: Object,
            required: true
        },
        labels:
        {
            type: Array,
            required: true
        },
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },
        plugins: {
            type: Array,
            default: () => []
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
                    backgroundColor: '#DF536B',
                    borderColor: '#DF536B',
                    data: [this.trData[7]["Hateful"], this.trData[6]["Hateful"], this.trData[5]["Hateful"], this.trData[4]["Hateful"], this.trData[3]["Hateful"], this.trData[2]["Hateful"], this.trData[1]["Hateful"]],

                },
                {
                    label: 'Abusive',
                    tension: 0.3,
                    fill: false,
                    backgroundColor: '#F5C710',
                    borderColor: '#F5C710',
                    data: [this.trData[7]["Abusive"], this.trData[6]["Abusive"], this.trData[5]["Abusive"], this.trData[4]["Abusive"], this.trData[3]["Abusive"], this.trData[2]["Abusive"], this.trData[1]["Abusive"]],

                },
                {
                    label: 'Neutral',
                    tension: 0.3,
                    fill: false,
                    backgroundColor: '#61D04F',
                    borderColor: '#61D04F',
                    data: [this.trData[7]["Neutral"], this.trData[6]["Neutral"], this.trData[5]["Neutral"], this.trData[4]["Neutral"], this.trData[3]["Neutral"], this.trData[2]["Neutral"], this.trData[1]["Neutral"]],

                },
                {
                    label: 'Threat',
                    tension: 0.3,
                    fill: false,
                    backgroundColor: '#CD0BBC',
                    borderColor: '#CD0BBC',
                    data: [this.trData[7]["Threat"], this.trData[6]["Threat"], this.trData[5]["Threat"], this.trData[4]["Threat"], this.trData[3]["Threat"], this.trData[2]["Threat"], this.trData[1]["Threat"]],

                },
                {
                    label: 'Spam',
                    tension: 0.3,
                    fill: false,
                    backgroundColor: 'gray',
                    borderColor: 'gray',
                    data: [this.trData[7]["Spam"], this.trData[6]["Spam"], this.trData[5]["Spam"], this.trData[4]["Spam"], this.trData[3]["Spam"], this.trData[2]["Spam"], this.trData[1]["Spam"]],

                },]
            },
            chartOptions: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Recent Trends',
                        font: {
                            size: 18,
                        },
                        color: "black"
                    },
                    legend: {
                        display: true
                    },
                },
                stacked: false,
                scales: {
                    y: {
                        display: true,
                        position: 'left',
                        min: 0,
                        ticks: {
                            stepSize: 1                       
                        },
                        labels: {
                            show: true
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
}
</script>