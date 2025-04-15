// Configuration
const CONFIG = {
  // Replace this with your actual published CSV link
  csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjGphnFsxCgXFwogEsmvZKgVxKCjM0zLmw7-O0P2mfOFHrMhSc6al9DUHN_KP0Amww1ffnmZ91vo-V/pub?gid=1096410782&single=true&output=csv',
  // Chart configuration - specify which column to use for each chart
  charts: {
    donutChart: { columnIndex: 1, title: "Column B Analysis" },  // Column B
    barChart: { columnIndex: 2, title: "Column C Analysis" },    // Column C
    lineChart: { columnIndex: 3, title: "Column D Analysis" },   // Column D
    pieChart: { columnIndex: 4, title: "Column E Analysis" },    // Column E
    areaChart: { columnIndex: 5, title: "Column F Analysis" },   // Column F
    columnChart: { columnIndex: 0, title: "Column A Analysis" }  // Column A
  },
  // Chart colors
  colors: ['#d4af37', '#1a1a1a', '#7e6b2f', '#c8c8c8', '#625B52', '#A67C00']
};

// Initialize Google Charts
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(fetchData);

// Main function to fetch and process data
async function fetchData() {
  try {
    const response = await fetch(CONFIG.csvUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const dataText = await response.text();
    const rows = dataText.trim().split('\n');
    const headers = rows[0].split(',');
    const dataRows = rows.slice(1); // remove header
    
    // Display total rows
    const totalRows = dataRows.length;
    document.getElementById('data-summary').innerHTML = 
      `Total Records: <strong>${totalRows}</strong> | Showing analysis across multiple columns`;
    
    // Process each chart with its own column data
    Object.entries(CONFIG.charts).forEach(([chartId, chartConfig]) => {
      const columnIndex = chartConfig.columnIndex;
      const columnLetter = String.fromCharCode(65 + columnIndex);
      const columnName = headers[columnIndex]?.trim() || `Column ${columnLetter}`;
      
      // Update chart title with column info
      const titleElement = document.querySelector(`#${chartId}-title`);
      if (titleElement) {
        titleElement.innerHTML = `${chartConfig.title}<br><span class="column-info">(${columnName} - ${columnLetter})</span>`;
      }
      
      // Process data for this column - count occurrences of each value
      const valueCounts = processColumnData(dataRows, columnIndex);
      
      // Create data array for this chart
      const chartDataArray = [['Value', 'Count']];
      for (const [value, count] of Object.entries(valueCounts)) {
        chartDataArray.push([value, count]);
      }
      
      // Draw this specific chart
      drawChart(chartId, chartDataArray);
    });
    
  } catch (error) {
    console.error('Error fetching or processing data:', error);
    document.querySelectorAll('.chart-container').forEach(container => {
      container.innerHTML = `<p style="color: red; text-align: center;">
        Error loading chart data: ${error.message}</p>`;
    });
    document.getElementById('data-summary').innerHTML = 
      `<span style="color: red;">Data loading error: ${error.message}</span>`;
  }
}

// Process data for a specific column
function processColumnData(dataRows, columnIndex) {
  const valueCounts = {};
  
  dataRows.forEach(row => {
    const cols = row.split(',');
    if (cols.length > columnIndex) {
      const value = cols[columnIndex]?.trim();
      if (value) {
        valueCounts[value] = (valueCounts[value] || 0) + 1;
      }
    }
  });
  
  return valueCounts;
}

// Function to draw a specific chart
function drawChart(chartId, chartDataArray) {
  switch(chartId) {
    case 'donutChart':
      drawDonutChart(chartDataArray);
      break;
    case 'barChart':
      drawBarChart(chartDataArray);
      break;
    case 'lineChart':
      drawLineChart(chartDataArray);
      break;
    case 'pieChart':
      drawPieChart(chartDataArray);
      break;
    case 'areaChart':
      drawAreaChart(chartDataArray);
      break;
    case 'columnChart':
      drawColumnChart(chartDataArray);
      break;
  }
}

// Individual chart drawing functions
function drawDonutChart(chartDataArray) {
  const data = google.visualization.arrayToDataTable(chartDataArray);
  const options = {
    title: '',
    pieHole: 0.5,
    colors: CONFIG.colors,
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
    colors: [CONFIG.colors[0]],
    chartArea: { width: '80%', height: '70%' },
    hAxis: { title: 'Count' },
    vAxis: { title: 'Value' },
    legend: { position: 'none' }
  };
  const chart = new google.visualization.BarChart(document.getElementById('barChart'));
  chart.draw(data, options);
}

function drawLineChart(chartDataArray) {
  const data = google.visualization.arrayToDataTable(chartDataArray);
  const options = {
    title: '',
    colors: [CONFIG.colors[0]],
    chartArea: { width: '80%', height: '70%' },
    hAxis: { title: 'Value' },
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
    colors: CONFIG.colors,
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
    colors: [CONFIG.colors[0]],
    chartArea: { width: '80%', height: '70%' },
    hAxis: { title: 'Value' },
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
    colors: [CONFIG.colors[0]],
    chartArea: { width: '80%', height: '70%' },
    hAxis: { title: 'Value' },
    vAxis: { title: 'Count' },
    legend: { position: 'none' }
  };
  const chart = new google.visualization.ColumnChart(document.getElementById('columnChart'));
  chart.draw(data, options);
}

// Make charts responsive
window.addEventListener('resize', function() {
  // Redraw all charts on window resize
  fetchData();
});
