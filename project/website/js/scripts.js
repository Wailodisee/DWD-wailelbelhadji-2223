// --BRONNEN--
// 1. https://www.w3schools.com/js/ 
// 2. Chatgpt ( errors oplossen en enkele regels bij localstorage )
// 3. https://rogiervdl.github.io/JS-course/summary.html#/
// 4. https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage


/* variabelen declareren*/
const apiKey = '6lMxs8nXKDtwI0sDNXCbLBxUPxssV6xwknSeanlg';
const url = 'https://freesound.org/apiv2';
const plaatsbuttons = document.querySelector('.plaatsbuttons');
const search = document.querySelector('#btnopzoeken');
const favoriteSounds = document.querySelector('.favorietesounds');

/* addEvent op btn zoeken*/

search.addEventListener('click', zoekGeluid);

/* Zoekfunctie*/

async function zoekGeluid(e) {
  e.preventDefault();
  const trefWoord = document.querySelector('#text').value;
  const data = await fetchData(trefWoord);// data fetchen van API
  const zoekresultaten = transformResultsinHTML(data.results);// resultaat transformeren

  /* oproepen van function*/
  opbrengResultaat(zoekresultaten);
  Togglefavbtn();
  updateCounter();

  /* geen resultaat bij het opzoeken */
  const resultaatnull = document.querySelector('.geenres');
  const soundbtn = document.querySelectorAll('.sound__button');

  if (soundbtn.length == 0) {
    resultaatnull.innerHTML = `Geen resultaten voor: "${trefWoord}"`;
  }
  else 
  {
    resultaatnull.innerHTML = 'Gevonden resultaten:';
    resultaatnull.classList.add('gevondenres');
  }
}

/* Data ophalen van het API*/

async function fetchData(trefWoord) {
  const resp = await fetch(`${url}/search/text/?query=${trefWoord}&token=${apiKey}&fields=id,name,previews,duration,images`);
  return await resp.json();
}

/* Transformeren van het data*/

function transformResultsinHTML(results) {
  return results.map(resultaat => {
    const id = resultaat.id;
    const naam = resultaat.name;
    const afbeelding = resultaat.images.waveform_m;
    const duur = resultaat.duration;
    const audioBtn = resultaat.previews['preview-hq-mp3'];
    return { id, naam, afbeelding, audioBtn, duur };
  });
}

/* Resultaat opbrengen*/

function opbrengResultaat(zoekresultaten) {
  let zoekresultatenHTML = '';
  zoekresultaten.forEach(resultaat => {
    zoekresultatenHTML += createSoundhtml(resultaat); // Maak HTML voor elke btn in string zoekresultatenHTML
  });
  plaatsbuttons.innerHTML = zoekresultatenHTML; // Plaats HTML in div plaatsbuttons 
}

/* HTML-code genereren voor elke zoekresultaat */

function createSoundhtml(resultaat) {
  const cijferKomma = resultaat.duur.toFixed(2);
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
        <span class="duurtijd">${cijferKomma}s</span>
        <audio src="${resultaat.audioBtn}" class="sound__audio"></audio>
      </div>
    </div>
  `;
}

/* AddEvent toevoegen aan knoppen */

// Zoeken van fav btn om addevent te kunnen doen: favoriet - niet favoriet
function Togglefavbtn() {
  const favorietKnoppen = document.querySelectorAll('.btnfav');
  favorietKnoppen.forEach((knop) => {
    knop.addEventListener('click', favKlik);
  });

  // Zoeken van sound__btn om play - stop  
  const playSoundButtons = document.querySelectorAll('.sound__button');
  playSoundButtons.forEach((button) => {
    button.addEventListener('click', toggleBtnPlaySound);
  });
}

/* favknop wordt geklikt*/

function favKlik() {
  const soundWrapper = this.closest('.soundwrapper'); // Zoeken van element met class soundWrapper
  const kopie = soundWrapper.cloneNode(true); // Kopie maken van soundWrapper + noden zijn inhoud
  if (soundWrapper.parentNode == favoriteSounds) {
    plaatsbuttons.appendChild(kopie);
    verwijderFromLocalStorage(soundWrapper.id); // Verwijderen het btn van localstorage
  }

  else {
    favoriteSounds.appendChild(kopie);
    voegToLocalStorage(kopie); // Toevoegen het btn bij localstorage
  }

  soundWrapper.remove(); // verwijderen van de node soundWrapper
  Togglefavbtn();
  updateCounter();
}

/* Voeg een geluid toe van localstorage van fav div*/

function voegToLocalStorage(btn) {
  const savedFavBtn = JSON.parse(localStorage.getItem('favoriteSounds')) || [];
  const soundData = { id: btn.id, innerHTML: btn.innerHTML, }; // object word gemaakt met id,innerHTML van geselect btn 
  savedFavBtn.push(soundData); // Voeg het object aan de array savedFav 
  localStorage.setItem('favoriteSounds', JSON.stringify(savedFavBtn)); // Sla de btn in een array op de localstorage (JSON-string)
}

/* Verwijder btn uit de localstorage*/

function verwijderFromLocalStorage(id) {
  const savedFavBtn = JSON.parse(localStorage.getItem('favoriteSounds')) || []; // Haal de fav btn uit localstorage || anders maak lege array 
  const updatedFavBtn = []; // definieert een lege array

  for (let i = 0; i < savedFavBtn.length; i++) {
    const soundBtn = savedFavBtn[i];

    if (soundBtn.id !== id) {
      updatedFavBtn.push(soundBtn); // soundBtn ≠ id dan wordt verwijdert van de array
    }
  }
  localStorage.setItem('favoriteSounds', JSON.stringify(updatedFavBtn));// Sla de nieuwe array op localstorage
}

/* Laad favbtn die opgeslagen zijn in localstorage, voeg ze toe bij het refesh in fav div.*/

function laadFavoriteSounds() {
  const savedFavBtn = JSON.parse(localStorage.getItem('favoriteSounds')) || []; // Haal de fav btn uit localstorage || anders maak lege array
  savedFavBtn.forEach((sound) => {
    const soundWrapper = document.createElement('div');
    soundWrapper.classList.add('soundwrapper');
    soundWrapper.id = sound.id; // id = id van opgeslagen geluid 
    soundWrapper.innerHTML = sound.innerHTML; // innerHTML = opgeslagen geluid
    favoriteSounds.appendChild(soundWrapper);
  });
}

/* Speelt het geselecteerde btn af of zet het op pauze.*/

function toggleBtnPlaySound() {
  const audioElement = this.closest('.sound').querySelector('.sound__audio'); // Zoeken van het dichts .sound 

  // conditie maken 

  if (audioElement.paused) {
    audioElement.play();
    this.classList.add('sound__button:active');
  }
  else {
    audioElement.pause();
    audioElement.currentTime = 0;
    this.classList.remove('sound__button:active');
  }
}

/* Variabelen btn leeg maken + counter */
const counterBtn = document.querySelector('.counterbtn');
const deleteBtn = document.querySelector('#deletebtn');

/* Werkt de teller bij, als nieuwe btn komen of gaanweg*/

function updateCounter() {
  const count = favoriteSounds.childElementCount;
  counterBtn.innerHTML = count.toString();
}

/* Verwijdert alle btn uit Favorieten, zet teller op nul.*/

function verwijderAllButtons() {
  const soundWrappers = favoriteSounds.querySelectorAll('.soundwrapper'); // Selecteer elk btn in de lijst favoriteSounds
  soundWrappers.forEach(soundWrapper => {
    const soundButton = soundWrapper.querySelector('.sound__button');
    plaatsbuttons.appendChild(soundWrapper); // Element soundWrapper wordt toegevoegd aan een ander element met de naam plaatsbuttons
    soundButton.classList.remove('sound__button:active'); // classlist wordt verwijderd van het element soundButton.
  });
  favoriteSounds.innerHTML = '';
  updateCounter();
}

/* addEvent om alle btn te verwijderen */

deleteBtn.addEventListener('click', verwijderAllButtons);


favoriteSounds.addEventListener('DOMNodeInserted', updateCounter); // Functie updateCounter word geroepen wanneer iets word toegevoegd bij favoriteSounds
favoriteSounds.addEventListener('DOMNodeRemoved', updateCounter); // Functie updateCounter word geroepen wanneer iets word verwijdert bij favoriteSounds


/* Laden van verschillende function*/

laadFavoriteSounds();
Togglefavbtn();
updateCounter();