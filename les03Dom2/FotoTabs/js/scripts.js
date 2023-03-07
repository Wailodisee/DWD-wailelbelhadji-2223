/* variabelen van grid*/
const selectedFoto = document.querySelectorAll('#grid figure');
const Mygrid = document.querySelector('#grid');

/* rest van de variabelen*/
const iconUitzicht = document.querySelectorAll('.header__view a');
const aantalFotos = document.querySelector('#numFound');
const filters = document.querySelectorAll('.nav__filters a');

/* functie tonen afbeeldingen*/

iconUitzicht.forEach(el => {
    el.addEventListener('click', function (Event) {
        Event.preventDefault();
        document.querySelector('.active').classList.remove('active');
        if (el.id == 'lnkViewList')
        {
            Mygrid.classList.remove('viewGrid');
            Mygrid.classList.add('viewList');
        }
        else if (el.id == 'lnkViewGrid') 
        {
            Mygrid.classList.remove('viewList');
            Mygrid.classList.add('viewGrid');
        }
        el.classList.add('active');
    });
});

/* functie voor navigatie*/

filters.forEach(lnks => {
    lnks.addEventListener('click', function () {
        document.querySelector('.nav__filters .active').classList.remove('active');
        
        let tellerft = 0;
        const datafilter = lnks.getAttribute('data-filter');
        selectedFoto.forEach(data => {
            const FiltersOfData = data.getAttribute('data-filters').split(' ');

            if (datafilter.includes('alle') || FiltersOfData.includes(datafilter)) 
            {
                data.classList.remove('hidden');
                tellerft++;
            }

            else 
            {
                data.classList.add('hidden');
            }
        });
        aantalFotos.innerHTML = tellerft;
        lnks.classList.add('active');
    });
});

