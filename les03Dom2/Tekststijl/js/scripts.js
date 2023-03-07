const lettergrootte = document.querySelector('#lettergrootte');
const slider = lettergrootte.querySelector('input[type="range"]');
const valuepx = document.querySelector('#valuepx');
const inputText = document.querySelector('#inputtext');
const sliderandp = inputText.querySelector('p');
const selectedcolor = document.querySelector('#inputkleur');
const selectedp = document.querySelector('#inputtext p');
const vetgeschreven = document.querySelector('#inputvet');
const schuingeschreven = document.querySelector('#inputschuin');
const hoofdlgeschreven = document.querySelector('#inputhoofdletter');
const buttonstijl1 = document.querySelector('#inputbutton1');
const buttonstijl2 = document.querySelector('#inputbutton2');
const buttonstijl3 = document.querySelector('#inputbutton3');

slider.addEventListener('input', function() {
    sliderandp.style.fontSize = slider.value + 'px';
    sliderandp.style.height = 'auto';
    valuepx.innerHTML = slider.value + 'px';
});

selectedcolor.addEventListener('input', () => {
    const colorValue = selectedcolor.value;
    selectedp.style.color = colorValue;
});
vetgeschreven.addEventListener('click', () => {
    if (vetgeschreven.checked) {
        selectedp.style.fontWeight = 'bold';
    } else {
        selectedp.style.fontWeight = 'normal';
    }
});
schuingeschreven.addEventListener('click', function() {
    if (schuingeschreven.checked) {
        selectedp.style.fontStyle = 'italic';
    } else {
        selectedp.style.fontStyle = 'normal';
    }
});
hoofdlgeschreven.addEventListener('click', function() {
    if (hoofdlgeschreven.checked) {
        selectedp.style.textTransform = 'uppercase';
    } else {
        selectedp.style.textTransform = 'none';
    }
});
buttonstijl1.addEventListener('click', function() {
    if (inputText.classList.contains('stijl1')) {
        inputText.classList.remove('stijl1');
    }
    else {
        inputText.classList.add('stijl1');
    }
});

buttonstijl2.addEventListener('click', function() {
    if (selectedp.classList.contains('stijl2')) {
        selectedp.classList.remove('stijl2');
    }
    else {
        selectedp.classList.add('stijl2');
    }
});
buttonstijl3.addEventListener('click', function() {
    if (inputText.classList.contains('stijl3')) {
        inputText.classList.remove('stijl3');
    }
    else {
        inputText.classList.add('stijl3');
    }
});

