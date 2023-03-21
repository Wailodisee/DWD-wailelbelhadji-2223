const images = document.querySelectorAll('img');
const spannaam = document.querySelector('#span1');
const spankcal = document.querySelector('#span2');
const spanbesch = document.querySelector('#span3');

images.forEach(el => {
  el.addEventListener('click', function(e)
   {
        e.preventDefault();
        images.forEach(uitbr => uitbr.classList.remove('active'));
        el.classList.add('active');
        spannaam.innerHTML = el.alt;
        spankcal.innerHTML = el.dataset.calorie;
        spanbesch.innerHTML = el.dataset.beschrijving;
    });
});