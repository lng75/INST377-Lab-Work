async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const pgcounty = await request.json();

  // filter by name
  function findMatches(wordToMatch, pgcounty) {
    return pgcounty.filter((establishment) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return establishment.name.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, pgcounty);
    const html = matchArray.map((place) => {
      const regex = new RegExp(this.value, 'gi');
      return `
      <ul>
        <li><div class="name">${place.name}</div></li>
        <div class="category">${place.category}</div>
        <div class="address">${place.address_line_1}</div>
        <div class="city">${place.city}</div>
        <div class="zip">${place.zip}</div>
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