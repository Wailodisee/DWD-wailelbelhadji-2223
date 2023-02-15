const thumbLinks = document.querySelectorAll('#model a');
const figShoe = document.querySelector('#figShoe');
const imgShoe = figShoe.querySelector('img');
const captShoe = figShoe.querySelector('figcaption span');
const frm = document.querySelector('#frmOrder');
const inpMail = frm.querySelector('#inpEmail');
const inpMaat = frm.querySelector('#selMeasure');
const msgMail = frm.querySelector('#msgEmail');
const msgMaat = frm.querySelector('#msgMeasure');
const price = document.querySelector('#lblMessage');
const extra1 = document.querySelector('#accessoires');
const extra2 = extra1.querySelector('.accessoire');
const extra3 = extra2.querySelector('input');
const extraprijs = extra3.name;
const prijs1 = 12.29;
const prijs2 = 8.89;
const prijs3 = 18.70;


frm.setAttribute('novalidate', 'novalidate');
let basisprijs = 54.99;

frm.addEventListener('submit', function(e) {
    e.preventDefault();
    let numErrors = 0;

    // opnieuw leeg maken
    msgMail.innerHTML = '';
    msgMaat.innerHTML = '';


    // check lege email 
    if (inpMail.value == '') {
        msgMail.innerHTML = 'Vul een mail in !';
        numErrors++;
    }

    // check lege maat
    if (inpMaat.value == '') {
        msgMaat.innerHTML = 'Vul een maat in !';
        numErrors++;
    }
    if (extra1.checked == true) {
        basisprijs = basisprijs + prijs1;
    }
    if (extra2.checked == true) {
        basisprijs = basisprijs + prijs2;
    }
    if (extra3.checked == true) {
        basisprijs = basisprijs + prijs3;
    }

    if (numErrors == 0) {
        price.innerHTML = (`Je keuze: ${captShoe.innerHTML} maat ${inpMaat.value}(totaalprijs: € ${basisprijs})`);
    }
});


thumbLinks.forEach(lnk => {
    lnk.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#model .selected').classList.remove('selected');
        lnk.classList.add('selected');
        imgShoe.src = lnk.href;
        captShoe.innerHTML = lnk.textContent;
    });
});

