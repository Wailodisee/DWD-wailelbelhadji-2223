const thumbLinks = document.querySelectorAll('#model a');
const figShoe = document.querySelector('#figShoe');
const imgShoe = figShoe.querySelector('img');
const captShoe = figShoe.querySelector('figcaption span');
const frm = document.querySelector('#frmOrder');
const inpMail = frm.querySelector('#inpEmail');
const inpMaat = frm.querySelector('#selMeasure');
const msgMail = frm.querySelector('#msgEmail');
const msgMaat = frm.querySelector('#msgMeasure');


frm.setAttribute('novalidate', 'novalidate');

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
    if (numErrors == 0) {
        frm.submit();
    } 
});

thumbLinks.forEach(lnk => {
    lnk.addEventListener('click', function(e) {
       e.preventDefault ();
       imgShoe.src = lnk.href;
       captShoe.innerHTML = lnk.innerHTML;
    });
});
