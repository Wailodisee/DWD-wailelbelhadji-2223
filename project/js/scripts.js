const API_KEY = '6lMxs8nXKDtwI0sDNXCbLBxUPxssV6xwknSeanlg';
const url = 'https://freesound.org/apiv2';
const plaatsbuttons = document.querySelector('.plaatsbuttons');
const search = document.querySelector('#btnopzoeken');
const favoriteSounds = document.querySelector('.favorietesounds');

search.addEventListener('click', zoekGeluid);

async function zoekGeluid(event) {
  event.preventDefault();
  const zoekterm = document.querySelector('#text').value;
  const data = await fetchData(zoekterm);
  const zoekresultaten = transformResults(data.results);
  renderResults(zoekresultaten);
  attachEventListeners();
  updateCounter();
}

async function fetchData(zoekterm) {
  const response = await fetch(`${url}/search/text/?query=${zoekterm}&token=${API_KEY}&fields=id,name,previews,duration,images`);
  return await response.json();
}

function transformResults(results) {
  return results.map(resultaat => {
    const { id, name: naam, images: { waveform_m: afbeelding }, duration: duur, previews: { 'preview-lq-mp3': audioUrl } } = resultaat;
    return { id, naam, afbeelding, audioUrl, duur };
  });
}

function renderResults(zoekresultaten) {
  const zoekresultatenHTML = zoekresultaten.map(resultaat => createSoundCard(resultaat)).join('');
  plaatsbuttons.innerHTML = zoekresultatenHTML;
}

function createSoundCard(resultaat) {
  const duurMetEenCijferNaKomma = resultaat.duur.toFixed(2);
  return `
    <div class="soundwrapper" id="${resultaat.id}">
      <div class="sound">
        <span class="naambtn" title="${resultaat.naam}">${resultaat.naam}</span>
        <div class="sound__background" style="background-image: url(${resultaat.images});"></div>
        <button class="sound__button" type="button">&nbsp;</button>
        <div class="persoonlijk">
          <button class="btnfav" type="button"><span class="material-symbols-outlined">volunteer_activism</span></button>
          <img src="${resultaat.afbeelding}" alt="" class="imgplaats">
        </div>
        <span class="duurtijd">${duurMetEenCijferNaKomma}s</span>
        <audio src="${resultaat.audioUrl}" class="sound__audio"></audio>
      </div>
    </div>
  `;
}

function attachEventListeners() {
  const favorietKnoppen = document.querySelectorAll('.btnfav');
  favorietKnoppen.forEach((knop) => {
    knop.addEventListener('click', toggleFavorite);
  });

  const playSoundButtons = document.querySelectorAll('.sound__button');
  playSoundButtons.forEach((button) => {
    button.addEventListener('click', togglePlaySound);
  });
}

function toggleFavorite() {
  const soundWrapper = this.closest('.soundwrapper');
  const kopie = soundWrapper.cloneNode(true);
  if (soundWrapper.parentNode === favoriteSounds) {
    plaatsbuttons.appendChild(kopie);
    removeFromLocalStorage(soundWrapper.id);
  } else {
    favoriteSounds.appendChild(kopie);
    addToLocalStorage(kopie);
  }
  soundWrapper.remove();
  attachEventListeners();
  updateCounter();
}

function addToLocalStorage(element) {
const savedFavorites = JSON.parse(localStorage.getItem('favoriteSounds')) || [];
const soundData = {
id: element.id,
innerHTML: element.innerHTML,
};
savedFavorites.push(soundData);
localStorage.setItem('favoriteSounds', JSON.stringify(savedFavorites));
}

function removeFromLocalStorage(id) {
const savedFavorites = JSON.parse(localStorage.getItem('favoriteSounds')) || [];
const updatedFavorites = savedFavorites.filter((sound) => sound.id !== id);
localStorage.setItem('favoriteSounds', JSON.stringify(updatedFavorites));
}

function loadFavoriteSounds() {
const savedFavorites = JSON.parse(localStorage.getItem('favoriteSounds')) || [];
savedFavorites.forEach((sound) => {
const soundWrapper = document.createElement('div');
soundWrapper.classList.add('soundwrapper');
soundWrapper.id = sound.id;
soundWrapper.innerHTML = sound.innerHTML;
favoriteSounds.appendChild(soundWrapper);
});
}

function togglePlaySound() {
const audioElement = this.closest('.sound').querySelector('.sound__audio');
if (audioElement.paused) {
audioElement.play();
this.classList.add('sound__button:active');
} else {
audioElement.pause();
audioElement.currentTime = 0;
this.classList.remove('sound__button:active');
}
}

const counterBtn = document.querySelector('.counterbtn');
const deleteBtn = document.querySelector('#deletebtn');

function updateCounter() {
const count = favoriteSounds.childElementCount;
counterBtn.innerHTML = count.toString();
}

function removeAllButtons() {
const soundWrappers = favoriteSounds.querySelectorAll('.soundwrapper');
soundWrappers.forEach(soundWrapper => {
const soundButton = soundWrapper.querySelector('.sound__button');
plaatsbuttons.appendChild(soundWrapper);
soundButton.classList.remove('sound__button:active');
});
favoriteSounds.innerHTML = '';
updateCounter();
}
deleteBtn.addEventListener('click', removeAllButtons);

favoriteSounds.addEventListener('DOMNodeInserted', updateCounter);
favoriteSounds.addEventListener('DOMNodeRemoved', updateCounter);

loadFavoriteSounds();
attachEventListeners();
updateCounter();

