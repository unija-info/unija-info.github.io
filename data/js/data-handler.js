/**
 * Data Handler for Dashboard
 * Handles data fetching and processing
 */

class DataHandler {
  constructor() {
    // Replace this with your actual published CSV link
    this.csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjGphnFsxCgXFwogEsmvZKgVxKCjM0zLmw7-O0P2mfOFHrMhSc6al9DUHN_KP0Amww1ffnmZ91vo-V/pub?gid=1096410782&single=true&output=csv';
    this.chartData = null;
    this.isLoading = true;
  }

  /**
   * Fetch and process data from CSV
   */
  async fetchData() {
    try {
      const response = await fetch(this.csvUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
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
      
      this.chartData = chartDataArray;
      this.isLoading = false;
      return chartDataArray;
      
    } catch (error) {
      console.error('Error fetching or processing data:', error);
      this.isLoading = false;
      throw error;
    }
  }

  /**
   * Get chart data if already fetched, otherwise fetch it
   */
  async getChartData() {
    if (this.chartData) {
      return this.chartData;
    }
    return await this.fetchData();
  }
}

// Create global instance
const dataHandler = new DataHandler();
