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
                        '#dedad2',
                        '#df979e',
                    ],
                    pointBorderColor: '#2554FF',
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