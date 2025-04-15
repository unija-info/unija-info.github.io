// Load Google Charts and set callback
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(fetchData);

// Constants
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjGphnFsxCgXFwogEsmvZKgVxKCjM0zLmw7-O0P2mfOFHrMhSc6al9DUHN_KP0Amww1ffnmZ91vo-V/pub?gid=1096410782&single=true&output=csv';
const CHART_COLORS = ['#d4af37', '#1a1a1a', '#7e6b2f', '#c8c8c8', '#625B52', '#A67C00'];

// Fetch and process data
async function fetchData() {
  try {
    const response = await fetch(CSV_URL);
    const dataText = await response.text();
    const rows = dataText.trim().split('\n').slice(1); // remove header
    
    // Process data
    const ratingCounts = {};
    
    rows.forEach(row => {
      const cols = row.split(',');
      const value = cols[1]?.trim(); // Get Column B safely
      if (value) {
        if (ratingCounts[value]) {
          ratingCounts[value]++;
        } else {
          ratingCounts[value] = 1;
        }
      }
    });
    
    // Create data array for charts
    const chartDataArray = [['Rating', 'Count']];
    for (const [rating, count] of Object.entries(ratingCounts)) {
      chartDataArray.push([rating, count]);
    }
    
    // Draw all charts
    drawDonutChart(chartDataArray);
    drawBarChart(chartDataArray);
    drawLineChart(chartDataArray);
    drawPieChart(chartDataArray);
    drawAreaChart(chartDataArray);
    drawColumnChart(chartDataArray);
    
  } catch (error) {
    console.error('Error fetching or processing data:', error);
    document.querySelectorAll('.chart-container').forEach(container => {
      container.innerHTML = '<p style="color: red; text-align: center;">Error loading chart data</p>';
    });
  }
}

// Chart drawing functions
function drawDonutChart(chartDataArray) {
  const data = google.visualization.arrayToDataTable(chartDataArray);
  const options = {
    title: '',
    pieHole: 0.5,
    colors: CHART_COLORS,
    chartArea: { width: '90%', height: '80%' },
    legend: { position: 'bottom' }
  };
  const chart = new google.visualization.PieChart(document.getElementById('donutChart'));
  chart.draw(data, options);
}

function drawBarChart(chartDataArray) {
  const data = google.visualization.arrayToDataTable(chartDataArray);
  const options = {
    title: '',
    colors: ['#d4af37'],
    chartArea: { width: '80%', height: '70%' },
    hAxis: { title: 'Count' },
    vAxis: { title: 'Rating' },
    legend: { position: 'none' }
  };
  const chart = new google.visualization.BarChart(document.getElementById('barChart'));
  chart.draw(data, options);
}

function drawLineChart(chartDataArray) {
  const data = google.visualization.arrayToDataTable(chartDataArray);
  const options = {
    title: '',
    colors: ['#d4af37'],
    chartArea: { width: '80%', height: '70%' },
    hAxis: { title: 'Rating' },
    vAxis: { title: 'Count' },
    curveType: 'function',
    legend: { position: 'none' }
  };
  const chart = new google.visualization.LineChart(document.getElementById('lineChart'));
  chart.draw(data, options);
}

function drawPieChart(chartDataArray) {
  const data = google.visualization.arrayToDataTable(chartDataArray);
  const options = {
    title: '',
    colors: CHART_COLORS,
    chartArea: { width: '90%', height: '80%' },
    legend: { position: 'bottom' }
  };
  const chart = new google.visualization.PieChart(document.getElementById('pieChart'));
  chart.draw(data, options);
}

function drawAreaChart(chartDataArray) {
  const data = google.visualization.arrayToDataTable(chartDataArray);
  const options = {
    title: '',
    colors: ['#d4af37'],
    chartArea: { width: '80%', height: '70%' },
    hAxis: { title: 'Rating' },
    vAxis: { title: 'Count' },
    legend: { position: 'none' }
  };
  const chart = new google.visualization.AreaChart(document.getElementById('areaChart'));
  chart.draw(data, options);
}

function drawColumnChart(chartDataArray) {
  const data = google.visualization.arrayToDataTable(chartDataArray);
  const options = {
    title: '',
    colors: ['#d4af37'],
    chartArea: { width: '80%', height: '70%' },
    hAxis: { title: 'Rating' },
    vAxis: { title: 'Count' },
    legend: { position: 'none' }
  };
  const chart = new google.visualization.ColumnChart(document.getElementById('columnChart'));
  chart.draw(data, options);
}

// Make charts responsive
window.addEventListener('resize', function() {
  fetchData();
});
