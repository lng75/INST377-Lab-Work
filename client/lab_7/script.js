async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const pgcounty = await request.json();
  const mymap = L.map('mapid').setView([38.990, -76.93], 12);
  const ACCESSTOKEN = 'pk.eyJ1IjoibHVjYXNuZzc1IiwiYSI6ImNrdXZkZzIxcDFrcGQybnE5eWc1ZjBnczkifQ.Ezajbr4gV6WgMSJKPY8gzg';
  const markers = [];

  function mapInit() {
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESSTOKEN}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: ACCESSTOKEN
    }).addTo(mymap);
  }

  // filter by zip
  function findMatches(zipcode, pgcounty) {
    return pgcounty.filter((establishment) => {
      if (establishment.geocoded_column_1 != null) {
        return establishment.zip === zipcode;
      }
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, pgcounty).slice(0, 5);

    const html = matchArray.map((place) => {
      const regex = new RegExp(this.value, 'gi');
      return `
        <ul>
        <div class="item wrapper">
          <li><div class="name">${place.name}</div></li>
          <div class="category">${place.category}</div>
          <div class="address">${place.address_line_1}</div>
          <div class="city">${place.city}</div>
          <div class="zip">${place.zip}</div>
        </div>
        </ul>
        <br>`;
    }).join('');
    if (event.target.value === '') {
      suggestions.innerHTML = '';
    } else {
      suggestions.innerHTML = html;
      markers.forEach((marker) => {
        marker.remove();
      });
      matchArray.forEach((item) => {
        const point = item.geocoded_column_1;
        const latLong = point.coordinates;
        const marker = latLong.reverse();
        markers.push(L.marker(marker).addTo(mymap));
        // console.log(point)
      });
    }
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('input', (evt) => {
    displayMatches(evt);
  });
  mapInit();
}
window.onload = windowActions;