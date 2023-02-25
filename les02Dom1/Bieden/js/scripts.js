let hoogsteBod = 0;
let hoogsteBieder;
const price = document.querySelector('#lblMessage');
const namen = document.querySelector('#txtNaam');
const boden = document.querySelector('#txtBod');
const mijnbutton = document.querySelector('#mijnbutton');

mijnbutton.addEventListener('click', function() {
    const bod = parseInt(boden.value);
    const naam = namen.value;

    if (namen.value == '' || boden.value == '') {
        price.innerHTML = ('er is nog geen bod uitgebracht');
    }
    if (bod > hoogsteBod) {
        price.innerHTML = (`gefeliciteerd! ${naam.value}, je hebt momenteel het hoogste bod`);
        hoogsteBod = bod;
        hoogsteBieder = naam;
    }

    else {
        price.innerHTML = (`jammer ${hoogsteBieder.value} heeft een hoger bod`);
    }

    namen.value = '';
    boden.value = '';
});
