const tasks = document.querySelector('#tasks');
const mijnbutton = document.querySelector('#btnSubmit');

mijnbutton.addEventListener('click', function(e) {
    e.preventDefault();
    const textarea = document.querySelector('#txtTask').value;
    const datePicker = document.querySelector('#datDeadline').value;
    const prio = document.querySelector('#selPriority').value;


    let kleur = '';

    if (prio == 'low') {
        kleur = 'green';
    }
    else if (prio == 'normal') {
        kleur = 'orange';
    }
    else if (prio == 'high') {
        kleur = 'red';
    }
    if (datePicker == '') {
        const htmlString = `<div class="task"><span class="${kleur} priority material-icons">assignment</span><p class="tasktext">${textarea}</span></p><span class="complete material-icons">more_horiz</span></div>`;
        tasks.innerHTML += htmlString;
    }
    else if (datePicker != '') {
         const htmlString = `<div class="task"><span class="${kleur} priority material-icons">assignment</span><p class="tasktext">${textarea}<span class="deadline">(deadline: ${datePicker})</span></p><span class="complete material-icons">more_horiz</span></div>`;
    tasks.innerHTML += htmlString;  
    }
});

tasks.addEventListener('click', function(e) {
    const target = e.target;
   if (target.classList.contains('complete')) {
      const spantask = target.parentElement;
      const greenarrow = spantask.querySelector('.complete');
      greenarrow.innerHTML = 'done';
   }
});
