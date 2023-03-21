const selectType = document.querySelector('#selectType');
const imgChuck = document.querySelector('#imgChuck');
const blockquotetweet = document.querySelector('#blockquotetweet');


async function fetchRandom() {
    let urlrandom = 'https://api.chucknorris.io/jokes/random';
    const parameters = new URLSearchParams();
    parameters.append('parameter1', 'value1');
    parameters.append('parameter2', 'value2');
    parameters.append('parameter3', 'value3');
    urlrandom += '?' + parameters.toString();

    const resp = await fetch(urlrandom);
    if (!resp.ok) {
        console.log('Een error werd gevonden met random quotes.' + resp.statusText);
        return;
    }
    const data = await resp.json();

    imgChuck.src = data.icon_url;
    blockquotetweet.innerHTML = data.value;
}
fetchRandom();

selectType.addEventListener('change', async function() {
    const urlcat = 'https://api.chucknorris.io/jokes/random?category=' + selectType.value;
    const resp = await fetch(urlcat);
    if (!resp.ok) {
        console.log('Een error werd gevonden met een quotes in een category.' + resp.statusText);
        return;
    }
    const data = await resp.json();
    blockquotetweet.innerHTML = data.value;
});

async function selectedCategory() {
    const urlcategory = 'https://api.chucknorris.io/jokes/categories';

    const resp = await fetch(urlcategory);
    if (!resp.ok) {
        console.log('Een error werd gevonden met random quotes.' + resp.statusText);
        return;
    }
    const data = await resp.json();
    for (const cat of data) {
        selectType.innerHTML += `<option>${cat}</option>`;
    }
}
selectedCategory();
