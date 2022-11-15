<template>
    <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
        :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        uData: {
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
                labels: ["Regulars", "Experts"],
                datasets: [{
                    borderWidth: 1,
                    backgroundColor: [
                        '#DF536B',
                        '#61D04F',
                    ],
                    data: [this.uData["regulars"], this.uData["experts"]]
                }]
            },
            chartOptions: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Users',
                        font: {
                            size: 18,
                        },
                        color: "black"
                    },
                    legend: {
                        display: false
                    },
                },
                scales: {
                    y: {
                        min: 0,
                        ticks: {
                            stepSize: 1
                        },
                        gridLines: {
                            display: true
                        }
                    },
                    x: {
                        gridLines: {
                            display: false
                        }
                    }
                },

                responsive: true,
                maintainAspectRatio: false
            }
        }
    }
}
</script>