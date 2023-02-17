const laagstetrekking = 1000;
const hoogstetrekking = 9999;
const spelers = 10000;
const juistvier = [];
const juistdrie = [];
const juisttwee = [];
const juisteen = [];
const juistnul = [];


function randomGetal(laagstetrekking, hoogstetrekking) {
    return laagstetrekking + Math.ceil(Math.random() * (hoogstetrekking - laagstetrekking));
}

function iteraties(laagstetrekking, hoogstetrekking, spelers) {
    const resultaten = [];
    for (let teller = 0; teller < spelers; teller++) {
        resultaten[teller] = randomGetal(laagstetrekking, hoogstetrekking);
    }
    return resultaten;
}
function berekeningresultaten(resultaten, randomGetal) {
    resultaten.forEach(el => {
        if (randomGetal == el) {
            juistvier.push(el);
        }
        else if (el.toString().endsWith((randomGetal % 1000).toString())) {
            juistdrie.push(el);
        }
        else if (el.toString().endsWith((randomGetal % 100).toString())) {
            juisttwee.push(el);
        }
        else if (el.toString().endsWith((randomGetal % 10).toString())) {
            juisteen.push(el);
        }
        else {
            juistnul.push(el);
        }
    });
}
berekeningresultaten(iteraties(laagstetrekking, hoogstetrekking, spelers), randomGetal(laagstetrekking, hoogstetrekking));


function gemiddeldeberekening(spelers) {
    let winst = juistvier.length * 500;
    winst += juistdrie.length * 100;
    winst += juisttwee.length * 10;
    // eslint-disable-next-line no-magic-numbers
    winst += juisteen.length * 2.5;
    winst /= spelers;
    return winst;
}
const trekkingGetal = randomGetal(laagstetrekking, hoogstetrekking);
console.log('%c// trekking', 'font-size: 18px; color: magenta;');
console.log(`%cgetrokken getal: ${trekkingGetal}`, 'color: yellow;');
console.log('');
console.log('%c// gokken', 'font-size: 18px; color: magenta;');
console.log(`aantal iteraties: ${spelers}`);
console.log('');
console.log('%c// resultaten', 'font-size: 18px; color: magenta;');
console.log(`0 juist: ${juistnul.length}`);
console.log(`1 juist: ${juisteen.length}`);
console.log(`2 juist: ${juisttwee.length}`);
console.log(`3 juist: ${juistdrie.length}`);
console.log(`4 juist: ${juistvier.length}`);
const winst = gemiddeldeberekening(spelers);
console.log(`%cgemiddelde winst: €${winst}`, 'padding :15px; color: green; background-color: grey;');
