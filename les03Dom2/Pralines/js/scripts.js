const images = document.querySelectorAll('img');
const spannaam = document.querySelector('#span1');
const spankcal = document.querySelector('#span2');
const spanbesch = document.querySelector('#span3');

images.forEach(element => {
  element.addEventListener('click', function(e)
   {
        e.preventDefault();
        images.forEach(uitbr => 
          uitbr.classList.remove('uitbrijding'));
        this.classList.add('uitbrijding');
        spannaam.innerHTML = element.alt;
        spankcal.innerHTML = element.dataset.calorie;
        spanbesch.innerHTML = element.dataset.beschrijving;
    });
});