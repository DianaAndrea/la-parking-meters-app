let currentFilter = 'all';
let parkingData = [];

async function fetchData() {
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');
  const list = document.getElementById('spot-list');

  loading.style.display = 'block';
  error.style.display = 'none';
  list.innerHTML = '';

  const endpoint = currentFilter === 'available'
    ? '/api/parking/available?limit=50'
    : '/api/parking/occupancy?limit=100';

  try {
    const response = await fetch(endpoint);
    const result = await response.json();

    if (result.success) {
      parkingData = result.data;
      renderSpots();
      updateCounts();
    } else {
      throw new Error(result.error || 'Failed to load data');
    }
  } catch (err) {
    console.error('Error fetching parking data:', err);
    error.style.display = 'block';
  } finally {
    loading.style.display = 'none';
  }
}

function setFilter(filter) {
  currentFilter = filter;

  document.getElementById('btn-all').classList.toggle('active', filter === 'all');
  document.getElementById('btn-available').classList.toggle('active', filter === 'available');
  document.getElementById('subtitle').textContent = filter === 'available' ? 'Available Spots' : 'All Spots';

  fetchData();
}

function updateCounts() {
  if (currentFilter === 'all') {
    document.getElementById('count-all').textContent = `(${parkingData.length})`;
  } else {
    document.getElementById('count-available').textContent = `(${parkingData.length})`;
  }
}

function renderSpots() {
  const list = document.getElementById('spot-list');
  list.innerHTML = '';

  if (parkingData.length === 0) {
    list.innerHTML = '<div class="empty-message"><p>No parking data available</p></div>';
    return;
  }

  parkingData.forEach(item => {
    const isVacant = item.occupancystate === 'VACANT';
    const location = item.location || {};

    const card = document.createElement('div');
    card.className = `card ${isVacant ? 'available' : 'occupied'}`;

    let html = `
      <div class="card-header">
        <span class="meter-id">Meter: ${item.meterid || 'N/A'}</span>
        <span class="status-badge ${isVacant ? 'badge-available' : 'badge-occupied'}">
          ${isVacant ? 'AVAILABLE' : 'OCCUPIED'}
        </span>
      </div>
    `;

    if (item.spaceid) {
      html += `<div class="space-id">Space: ${item.spaceid}</div>`;
    }

    if (location.latitude && location.longitude) {
      html += `<div class="coordinates">${parseFloat(location.latitude).toFixed(4)}, ${parseFloat(location.longitude).toFixed(4)}</div>`;
    }

    if (item.eventtime) {
      html += `<div class="timestamp">Updated: ${new Date(item.eventtime).toLocaleTimeString()}</div>`;
    }

    card.innerHTML = html;
    list.appendChild(card);
  });
}

fetchData();
