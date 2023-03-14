const images = document.querySelectorAll('img');
const span1 = document.querySelector('#span1');
const span2 = document.querySelector('#span2');
const span3 = document.querySelector('#span3');

images.forEach((img) => {
  img.addEventListener('click', () => {
    const alt = img.getAttribute('alt');
    const calorie = img.getAttribute('data-calorie');
    const beschrijving = img.getAttribute('data-beschrijving');
    span1.innerHTML = alt;
    span2.innerHTML = calorie;
    span3.innerHTML = beschrijving;
  });
});