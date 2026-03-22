import { LightningElement } from 'lwc';
import chartjs from '@salesforce/resourceUrl/chartjs';
import { loadScript } from 'lightning/platformResourceLoader';

export default class ChartsDashboard extends LightningElement {

    chart;
    chartLoaded = false;
    chartType = 'bar';

    options = [
        { label: 'Bar', value: 'bar' },
        { label: 'Line', value: 'line' },
        { label: 'Pie', value: 'pie' },
        { label: 'Doughnut', value: 'doughnut' },
         { label: 'Scatter', value: 'scatter' },
         { label: 'Bubble', value: 'bubble' },
         { label: 'Radar', value: 'radar' },
          { label: 'PolarArea', value: 'polarArea' },
    ];

    data = {
        labels: ['A', 'B', 'C', 'D'],
        counts: [10, 20, 30, 40]
    };

    renderedCallback() {
        if (this.chartLoaded) return;

        this.chartLoaded = true;

        loadScript(this, chartjs)
            .then(() => {
                window.ResizeObserver = class {
                    observe() {}
                    unobserve() {}
                    disconnect() {}
                };
                console.log('ChartJS Loaded');
                
                this.renderChart();
            })
            .catch(error => {
                console.error(error);
            });
    }

    renderChart() {
        const canvas = this.template.querySelector('.chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new window.Chart(ctx, {
            type: this.chartType,
            data: {
                labels: this.data.labels,
                datasets: [{
                    label: 'Demo Data',
                    data: this.data.counts,
                    backgroundColor: [
                        '#FF6384','#36A2EB','#FFCE56','#4BC0C0'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    handleChange(event) {
        this.chartType = event.detail.value;
        this.renderChart();
    }
}