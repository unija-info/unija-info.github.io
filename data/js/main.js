/**
 * Main Application Script
 * Initializes and coordinates dashboard functionality
 */

document.addEventListener('DOMContentLoaded', async () => {
  const loadingOverlay = document.getElementById('loadingOverlay');
  
  try {
    // Initialize Google Charts
    await dashboardCharts.initialize();
    
    // Load data
    const chartData = await dataHandler.fetchData();
    
    // Hide loading overlay with animation
    loadingOverlay.classList.add('hidden');
    
    // Draw all charts with staggered animation
    dashboardCharts.drawCharts(chartData);
    
    // Setup resize handler for responsive charts
    dashboardCharts.setupResizeHandler();
    
  } catch (error) {
    console.error('Application initialization error:', error);
    
    // Show error message in loading overlay
    loadingOverlay.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h2 style="color: #cc0000; margin-bottom: 15px;">Ralat</h2>
        <p>Gagal memuat dashboard. Sila cuba sebentar lagi atau semak sambungan internet anda.</p>
        <button style="background-color: #d4af37; color: white; border: none; padding: 10px 20px; 
                 margin-top: 20px; border-radius: 5px; cursor: pointer;"
                onclick="location.reload()">
          Cuba Semula
        </button>
      </div>
    `;
  }
});
