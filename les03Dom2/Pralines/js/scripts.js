const images = document.querySelectorAll('img');

images.forEach(function(e) {
  e.addEventListener('click', function() {
    const alt = this.getAttribute('alt');
    const calorie = this.getAttribute('data-calorie');
    const beschrijving = this.getAttribute('data-beschrijving');
    document.querySelector('#span1').innerHTML = alt;
    document.querySelector('#span2').innerHTML = calorie;
    document.querySelector('#span3').innerHTML = beschrijving;
  });
});