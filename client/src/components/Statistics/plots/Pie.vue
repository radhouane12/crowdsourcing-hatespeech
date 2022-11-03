<template>
    <Pie :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
        :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>

<script>
import { Pie } from 'vue-chartjs/legacy'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
export default {
    name: 'PieChart',
    components: {
        Pie
    },
    props: {
        twData: {
            type: Object,
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
                    data: [this.twData["Hateful"], this.twData["Abusive"], this.twData["Neutral"], this.twData["Threat"], this.twData["Spam"]]
                }]
            },
            chartOptions: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Total Annotated Tweets',
                        font: {
                            size: 18,
                        },
                        color: "black"
                    },
                    legend: {
                        display: true
                    },
                },
                responsive: true,
                maintainAspectRatio: false
            },
        }
    },
}
</script>