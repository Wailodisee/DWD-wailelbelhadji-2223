const tasks = document.querySelector('#tasks');
const mijnbutton = document.querySelector('#btnSubmit');


mijnbutton.addEventListener('click', function() {
    const textarea = mijnbutton.querySelector('#txtTask').value;
    const datePicker = document.querySelector('#datDeadline').value;
    const prio = document.querySelector('#selPriority').value;
    const task = document.querySelector('#txtTask textarea').value;

    let klasse = '';

    if (prio == 'low') {
        klasse = 'green';
    }
    else if (prio == 'normal') {
        klasse = 'orange';
    }
    else if (prio == 'high') {
        klasse = 'red';
    }

    if (datePicker != '') {
        const htmlString = `<div$ class="task"><span class="priority material-icons">assignment</span><p class="tasktext">${textarea}<span class="deadline">(deadline: ${datePicker})</span></p><span class="complete material-icons">more_horiz</span></div${klasse}>;`;
        tasks.innerHTML += htmlString;
    }
    if (datePicker === '') {
        const htmlString = `<div class="task"><span class="priority material-icons">assignment</span><p class="tasktext">${textarea}</p><span class="complete material-icons">more_horiz</span></div>`;
        tasks.innerHTML += htmlString;
    }
    if (prio != '') {
        const htmlString = `<div$ class="task"><span class="priority material-icons">assignment</span><p class="tasktext">${textarea}<span class="deadline">(deadline: ${prio})</span></p><span class="complete material-icons">more_horiz</span></div${klasse}>;`;
        tasks.innerHTML += htmlString;
    }
    if (prio === '') {
        const htmlString = `<div class="task"><span class="priority material-icons">assignment</span><p class="tasktext">${textarea}</p><span class="complete material-icons">more_horiz</span></div>`;
        tasks.innerHTML += htmlString;
    }
    if (task != '') {
        const htmlString = `<div$ class="task"><span class="priority material-icons">assignment</span><p class="tasktext">${textarea}<span class="deadline">(deadline: ${task})</span></p><span class="complete material-icons">more_horiz</span></div${klasse}>;`;
        tasks.innerHTML += htmlString;
    }
    if (task === '') {
        const htmlString = `<div class="task"><span class="priority material-icons">assignment</span><p class="tasktext">${textarea}</p><span class="complete material-icons">more_horiz</span></div>`;
        tasks.innerHTML += htmlString;
    }
});