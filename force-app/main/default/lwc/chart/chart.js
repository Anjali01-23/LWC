import { LightningElement, wire, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import CHARTJS from '@salesforce/resourceUrl/chartjs';
import getRecordsOppALL from '@salesforce/apex/getRecordsImperative.getRecordsOppHold';

export default class Chart extends LightningElement {
    @track chartData = [];
    @track chartLabels = [];

    chartjsInitialized = false;
    chart;

    // 🔥 Common method
    tryRenderChart() {
        if (this.chartjsInitialized && this.chartData.length) {
            if (this.chart) {
                this.chart.data.labels = this.chartLabels;
                this.chart.data.datasets[0].data = this.chartData;
                this.chart.update();
            } else {
                this.initializeChart();
            }
        }
    }

    @wire(getRecordsOppALL)
    wiredOpp({ data, error }) {
        if (data) {
            const stageMap = {};
            data.forEach(rec => {
                stageMap[rec.StageName] = (stageMap[rec.StageName] || 0) + 1;
            });

            this.chartLabels = Object.keys(stageMap);
            this.chartData = Object.values(stageMap);

            this.tryRenderChart();
        }
    }

    renderedCallback() {
        if (this.chartjsInitialized) return;

        this.chartjsInitialized = true;

        loadScript(this, CHARTJS)
            .then(() => {
                console.log('Chart.js loaded!');

                // 🔥 Fix ResizeObserver issue
                window.ResizeObserver = class {
                    observe() {}
                    unobserve() {}
                    disconnect() {}
                };

                this.tryRenderChart();
            })
            .catch(error => {
                console.error('Error loading Chart.js', error);
            });
    }

    initializeChart() {
        const canvas = this.template.querySelector('canvas.barChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new window.Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.chartLabels,
                datasets: [{
                    label: 'Number of Opportunities',
                    data: this.chartData,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
            stepSize: 2
        }
                    }
                }
            }
        });
    }
}