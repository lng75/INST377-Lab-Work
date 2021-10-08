const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const pgcounty = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => pgcounty.push(...data));

// filter by name
function findMatches(wordToMatch, pgcounty) {
  return pgcounty.filter((establishment) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return establishment.name.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, pgcounty);
  console.log(matchArray);
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);