const fetchButtons = document.querySelectorAll('.fetch-button');
const result = document.querySelector('#result');

function getData(artworkId) {
  result.innerText = 'Loading....';
  const apiUrl = `https://api.artic.edu/api/v1/artworks?ids=${artworkId}&fields=id,artist_title,title,date_display,image_id,place_of_origin`;
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const artwork = data.data[0];
      const title = artwork.title;
      const artist = artwork.artist_title;
      const date_display = artwork.date_display;
      const place_of_origin = artwork.place_of_origin;
      const imageUrl = artwork.image_id;

      const infoHtml = `
        <h2 class='art_title'>${title}</h2>
        <p class='art_artist grow'>Artist: ${artist}</p>
        <p class='art_date'>Date: ${date_display}</p>
        <p class='art_location'>Location: ${place_of_origin}</p>
        <img class='art_image grow' src="https://www.artic.edu/iiif/2/${imageUrl}/full/843,/0/default.jpg" alt="${title}">`;
      result.innerHTML = infoHtml;
    })
    .catch(error => console.log(error));
}

fetchButtons.forEach(button => {
  button.addEventListener('click', function () {
    const artworkId = this.dataset.artworkId;
    getData(artworkId);
  });
});