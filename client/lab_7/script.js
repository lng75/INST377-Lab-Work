async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const pgcounty = await request.json();

  function mapInit() {
    const ACCESSTOKEN = 'pk.eyJ1IjoibHVjYXNuZzc1IiwiYSI6ImNrdXZkZzIxcDFrcGQybnE5eWc1ZjBnczkifQ.Ezajbr4gV6WgMSJKPY8gzg';
    const mymap = L.map('mapid').setView([38.990, -76.93], 12);

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESSTOKEN}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: ACCESSTOKEN
    }).addTo(mymap);
    return mymap;
  }

  // filter by zip
  function findMatches(wordToMatch, pgcounty) {
    return pgcounty.filter((establishment) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return establishment.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, pgcounty);
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
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => {
    displayMatches(evt);
  });
}
window.onload = windowActions;