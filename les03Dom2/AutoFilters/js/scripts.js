/* variabelen slider */ 
const sld = document.querySelector('#slider1');
const ValueOfSlider = document.querySelector('#slider1-val');

/* andere variabelen*/ 
const afbeelding = document.querySelector('#van');
let ImageFilters = 'filter-blur';
const btn = document.querySelectorAll('.filters button');

/* functie slider */ 

sld.addEventListener('input', function() {
  const ValueOfOpacity = Math.round(sld.value * 100);

  ValueOfSlider.innerText = `${ValueOfOpacity} %`;
  afbeelding.style.opacity = sld.value;
});

/* functie button */ 

btn.forEach(el => {
  el.addEventListener('click', function() {
    document.querySelector('.active').classList.remove('active');
    el.classList.add('active');
    
    afbeelding.classList.remove(ImageFilters);
    ImageFilters = el.id;
    afbeelding.classList.add(ImageFilters);
  });
});

