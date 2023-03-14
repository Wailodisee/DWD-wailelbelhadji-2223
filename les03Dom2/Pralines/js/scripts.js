const images = document.querySelectorAll('img');

images.forEach((img) => {
  img.addEventListener('click', () => {
    const alt = img.getAttribute('alt');
    const calorie = img.getAttribute('data-calorie');
    const beschrijving = img.getAttribute('data-beschrijving');
    document.querySelector('#span1').innerHTML = alt;
    document.querySelector('#span2').innerHTML = calorie;
    document.querySelector('#span3').innerHTML = beschrijving;
  });
});