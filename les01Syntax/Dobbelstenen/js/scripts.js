// declarations
// let rnd = Math.floor(Math.random() * (6 + 1));
const Players = ['Magnus', 'Eline', 'Ding', 'Judith', 'Praggna'];
const scores = [Players.length];
const NUM_DICE = 3;

// show header

console.log(`
DOBBELSTENEN
============

aantal deelnemers: 
${Players.length}`);

// throw dice

for (let i = 0; i < Players.length; i++) {
    console.log(`${Players[i]} gooit: `);

    const dice = [];

    for (let j = 0; j < NUM_DICE; j++) {
        dice[j] = Math.ceil(Math.random() * 6);
    }

    scores[i] = getTotal(dice);

    console.log(`${diceToString(dice)} (${scores[i]} punten)`);
}

// show winner

console.log('\n WINNAAR: ');
console.log(`%c ${getWinner(scores, Players)}`, 'background: yellow; color: black; padding: 10px; font-style: italic; font-size: 14px; text-transform: uppercase');


/* -------------------- */

function diceToString(dice) {
    let retval = ' ';
    for (const d of dice) {
        switch (d) {
            case 1: retval += ' ⚀ '; 
                break;
            case 2: retval += ' ⚁ ';
                break;
            case 3: retval += ' ⚂ ';
                break;
            case 4: retval += ' ⚃ ';
                break;
            case 5: retval += ' ⚄ ';
                break;
            case 6: retval += ' ⚅ ';
                break;
            default:
                break;
        }
    }
    return retval;
}

function getTotal(dice) {
    let total = 0;
    for (const d of dice) {
        total = total + d;
    }
    return total;
}

function getWinner(totals, names) {
    let winnerIndex = 0;
    let draw = false;
    for (let i = 1; i < totals.length; i++) {
        if (totals[i] == totals[winnerIndex]) draw = true;
        else if (totals[i] > totals[winnerIndex]) {
            winnerIndex = i;
            draw = false;
        }
    }
    return draw ? 'gelijkspel' : names[winnerIndex];
}
