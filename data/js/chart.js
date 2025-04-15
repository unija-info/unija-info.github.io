/**
 * Charts Module
 * Handles all chart drawing functionality
 */

class DashboardCharts {
  constructor() {
    // Chart elements
    this.chartElements = {
      donutChart: document.getElementById('donutChart'),
      barChart: document.getElementById('barChart'),
      lineChart: document.getElementById('lineChart'),
      pieChart: document.getElementById('pieChart'),
      areaChart: document.getElementById('areaChart'),
      columnChart: document.getElementById('columnChart')
    };
    
    // Common chart options
    this.commonOptions = {
      colors: ['#d4af37', '#1a1a1a', '#7e6b2f', '#c8c8c8', '#625B52', '#A67C00'],
      animation: {
        startup: true,
        duration: 1200,
        easing: 'out'
      }
    };
  }

  /**
   * Initialize Google Charts
   */
  initialize() {
    return new Promise((resolve) => {
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(() => {
        resolve();
      });
    });
  }

  /**
   * Draw all charts with data
   */
  drawCharts(chartDataArray) {
    // Staggered animations for better visual effect
    setTimeout(() => this.drawDonutChart(chartDataArray), 100);
    setTimeout(() => this.drawBarChart(chartDataArray), 300);
    setTimeout(() => this.drawLineChart(chartDataArray), 500);
    setTimeout(() => this.drawPieChart(chartDataArray), 700);
    setTimeout(() => this.drawAreaChart(chartDataArray), 900);
    setTimeout(() => this.drawColumnChart(chartDataArray), 1100);
  }

  /**
   * Show error message in chart container
   */
  showError(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
        <div style="color: #cc0000; text-align: center; width: 100%;">
          <p>Ralat memuat data. Sila muat semula halaman.</p>
        </div>
      `;
    }
  }

  /**
   * Draw Donut Chart
   */
  drawDonutChart(chartDataArray) {
    try {
      const data = google.visualization.arrayToDataTable(chartDataArray);
      const options = {
        ...this.commonOptions,
        title: '',
        pieHole: 0.5,
        chartArea: { width: '90%', height: '80%' },
        legend: { position: 'bottom' }
      };
      const chart = new google.visualization.PieChart(this.chartElements.donutChart);
      chart.draw(data, options);
    } catch (error) {
      console.error('Error drawing donut chart:', error);
      this.showError('donutChart');
    }
  }

  /**
   * Draw Bar Chart
   */
  drawBarChart(chartDataArray) {
    try {
      const data = google.visualization.arrayToDataTable(chartDataArray);
      const options = {
        ...this.commonOptions,
        title: '',
        chartArea: { width: '80%', height: '70%' },
        hAxis: { title: 'Count' },
        vAxis: { title: 'Rating' },
        legend: { position: 'none' },
        colors: ['#d4af37']
      };
      const chart = new google.visualization.BarChart(this.chartElements.barChart);
      chart.draw(data, options);
    } catch (error) {
      console.error('Error drawing bar chart:', error);
      this.showError('barChart');
    }
  }

  /**
   * Draw Line Chart
   */
  drawLineChart(chartDataArray) {
    try {
      const data = google.visualization.arrayToDataTable(chartDataArray);
      const options = {
        ...this.commonOptions,
        title: '',
        chartArea: { width: '80%', height: '70%' },
        hAxis: { title: 'Rating' },
        vAxis: { title: 'Count' },
        curveType: 'function',
        legend: { position: 'none' },
        colors: ['#d4af37']
      };
      const chart = new google.visualization.LineChart(this.chartElements.lineChart);
      chart.draw(data, options);
    } catch (error) {
      console.error('Error drawing line chart:', error);
      this.showError('lineChart');
    }
  }

  /**
   * Draw Pie Chart
   */
  drawPieChart(chartDataArray) {
    try {
      const data = google.visualization.arrayToDataTable(chartDataArray);
      const options = {
        ...this.commonOptions,
        title: '',
        chartArea: { width: '90%', height: '80%' },
        legend: { position: 'bottom' }
      };
      const chart = new google.visualization.PieChart(this.chartElements.pieChart);
      chart.draw(data, options);
    } catch (error) {
      console.error('Error drawing pie chart:', error);
      this.showError('pieChart');
    }
  }

  /**
   * Draw Area Chart
   */
  drawAreaChart(chartDataArray) {
    try {
      const data = google.visualization.arrayToDataTable(chartDataArray);
      const options = {
        ...this.commonOptions,
        title: '',
        chartArea: { width: '80%', height: '70%' },
        hAxis: { title: 'Rating' },
        vAxis: { title: 'Count' },
        legend: { position: 'none' },
        colors: ['#d4af37']
      };
      const chart = new google.visualization.AreaChart(this.chartElements.areaChart);
      chart.draw(data, options);
    } catch (error) {
      console.error('Error drawing area chart:', error);
      this.showError('areaChart');
    }
  }

  /**
   * Draw Column Chart
   */
  drawColumnChart(chartDataArray) {
    try {
      const data = google.visualization.arrayToDataTable(chartDataArray);
      const options = {
        ...this.commonOptions,
        title: '',
        chartArea: { width: '80%', height: '70%' },
        hAxis: { title: 'Rating' },
        vAxis: { title: 'Count' },
        legend: { position: 'none' },
        colors: ['#d4af37']
      };
      const chart = new google.visualization.ColumnChart(this.chartElements.columnChart);
      chart.draw(data, options);
    } catch (error) {
      console.error('Error drawing column chart:', error);
      this.showError('columnChart');
    }
  }

  /**
   * Handle window resize to make charts responsive
   */
  setupResizeHandler() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(async () => {
        try {
          const chartData = await dataHandler.getChartData();
          this.drawCharts(chartData);
        } catch (error) {
          console.error('Error redrawing charts on resize:', error);
        }
      }, 250);
    });
  }
}

// Create global instance
const dashboardCharts = new DashboardCharts();
