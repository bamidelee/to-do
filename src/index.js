import "./style.css";
import { isToday } from 'date-fns';
import { isTomorrow } from 'date-fns';
import { isFuture } from 'date-fns';
import { parseISO } from 'date-fns';
import { format } from 'date-fns';


const add = document.querySelector('.add-icon');
const content = document.querySelector('.content');
const taskForm = document.querySelector('.add');
const closeTaskForm = document.querySelector('.close-add');
const projectButton = document.querySelector('.project-form');
const projectForm = document.querySelector('.addproject');
const projectTask = document.querySelector('.form-task');
const taskButton = document.querySelector('.addtask');
const taskTitle = document.querySelector('.task-title');
const taskDescription = document.querySelector('.task-description');
const taskDate = document.querySelector('.task-date');
const taskSubmitButton = document.querySelector('.task-submit');
const taskHolder = document.querySelector('.task-bar'); 
const projectTitle = document.querySelector('.project-title');
const makeProjectButton = document.querySelector('.project-button');
const projectItem = document.querySelector('.project-item');
let projectName = '';
let todayCount = document.querySelector('.today-count');
let inboxCount = document.querySelector('.inbox-count');
let tomorrowCount = document.querySelector('.tomorrow-count');
let upcomingCount = document.querySelector('.upcoming-count');
let todayNum = 0;
let tomorrowNum = 0;
let upcomingNum = 0;
let inboxNum = 1;


const toDo = [
      {title : 'Make soup',
    date : '2022-01-10',
    description : 'making banga soup for the party',
    _project() {return '';},
    period() {return '';},    
    color (){return `purple`;},
    priority(){return 'high';},
}];


  inbox();
taskNav();

class tasks
{
    constructor( project, title, date, description)
    {
        this.title = title;
        this.date = date;
        this.description = description;
        this.project = project;
    };
    period()
    {
        if (isToday(parseISO(this.date)))
        {
            return 'today';
        }
        else if(isTomorrow(parseISO(this.date)))
        {
            return 'tomorrow';
        }
        else if(isFuture(parseISO(this.date)))
        {
            return 'upcoming'
        }
        else
        {
            return '';
        }
    }
    priority()
    {
        if (document.querySelector('.radio1').checked)
        {
            return document.querySelector('.radio1').value;
        }
        else if (document.querySelector('.radio2').checked)
        {
            return document.querySelector('.radio2').value;
        }
        else if (document.querySelector('.radio3').checked)
        {
            return document.querySelector('.radio3').value;
        }
        else{
            return '';
        }


    }
     _project ()
    {
        if (this.project == '')
        {
            return this.period();
        }
        else
        {
            return this.project;
        }
    }
    color ()
    {
        let r = Math.round(Math.random()*255);
        let g = Math.round(Math.random()*255);
        let b = Math.round(Math.random()*255);
        return `rgb(${r}, ${g}, ${b})`;
    }

}

    
function NewTask()
{
    
    return new tasks( projectName, taskTitle.value, taskDate.value, taskDescription.value);
};


function makeTask (task)
{
   const taskBar = document.createElement('div');
   const taskLeft = document.createElement('div');
   const taskRight = document.createElement('div');
   const done = document. createElement('input');
   const edit = document.createElement('span');
   const details = document.createElement('span');
   const taskDelete = document.createElement('span');
   const taskName = document.createElement('span');
    const date = document.createElement('span');
    const info = document.createElement('div');
    const detailsClose = document.createElement('div');

        edit.addEventListener('click', (e)=>
        {
            content.style.filter = 'blur(10px)';
            taskForm.style.display = 'block';
            projectButton.style.display = 'none'
            projectTask.style.display = 'block';
            projectForm.style.display = 'none';
            taskTitle.value = task.title;
            taskDescription.value = task.description;
            taskDate.value = task.date;
        })
    taskDelete.addEventListener('click', (e) =>
    {
        taskBar.remove();
        inboxNum--;
        if(task.period() === 'today')
        {
            todayNum--;
        }
        else if (task.period() === 'tomorrow')
        {
            tomorrowNum--;
        }
        else if (task.period() === 'upcoming')
        {
            upcomingNum--;
            console.log(upcomingNum);
        }
        tomorrowCount.textContent = tomorrowNum;
        todayCount.textContent = todayNum;
        upcomingCount.textContent = upcomingNum;
        inboxCount.textContent = inboxNum;
    })

    detailsClose.style.margin = '1rem';
    detailsClose.addEventListener('click', (e) =>
    {
        
        content.style.filter = 'none';
        info.style.display = 'none';
    })
    detailsClose.classList.add('material-symbols-outlined');
    detailsClose.classList.add('detailsClose');
    detailsClose.textContent = 'close';
    detailsClose.style.position = 'absolute';
    detailsClose.style.right = '1rem';
    detailsClose.style.cursor = 'pointer';

    const infoHead = document.createElement('div');
    const infoBody = document.createElement('div');
    
    infoHead.appendChild(detailsClose);
    infoBody.innerHTML = `<h2>  ${task.title}</h2><div>Date:  ${task.date}</div><div>Description:  ${task.description}</div><div>Priority:  ${task.priority()}</div>`;

    info.appendChild(infoHead);
    info.appendChild(infoBody)
    info.classList.add('info');

   
   
   

   done.addEventListener('change', (e) =>
   {
    if( done.checked)
    {
        inboxNum--;
        if(task.period() === 'today')
        {
            todayNum--;
        }
        else if (task.period() === 'tomorrow')
        {
            tomorrowNum--;
        }
        else if (task.period() === 'upcoming')
        {
            upcomingNum--;
            console.log(upcomingNum);
        }
        taskName.style.textDecoration = 'line-through';
        taskRight.style.opacity = .5;
    }
    else
    {
        inboxNum ++;
        if(task.period() === 'today')
        {
            todayNum++;
        }
        else if (task.period() === 'tomorrow')
        {
            tomorrowNum++;
        }
        else if (task.period() === 'upcoming')
        {
            upcomingNum ++;
        }
        taskName.style.textDecoration = 'none';
        taskRight.style.opacity = 1
    }
    tomorrowCount.textContent = tomorrowNum;
   todayCount.textContent = todayNum;
   upcomingCount.textContent = upcomingNum;
   inboxCount.textContent = inboxNum;
   })
   
   
   done.setAttribute('type', 'checkbox');

   date.textContent = format(parseISO(task.date), "  MMM do")
   edit.classList.add('material-symbols-outlined');
   edit.textContent = 'edit';

   details.textContent ='details';
   details.style.border = '1px solid purple';
   details.style.borderRadius = '3px';
   details.style.padding = '2px';
   details.classList.add('details');
   details.addEventListener('click', (e) =>
   {
    
    info.style.display = 'block';
    const body = document.querySelector('body');
    body.appendChild(info);
    content.style.filter = 'blur(10px)';
   })

   taskDelete.classList.add('material-symbols-outlined');
   taskDelete.textContent = 'delete';

   taskName.textContent = task.title;

   
    taskLeft.appendChild(done);
    taskLeft.appendChild(taskName);
    taskLeft.classList.add('taskLeft');

    taskRight.classList.add('taskRight');
    taskRight.appendChild(details);
    taskRight.appendChild(date);
    taskRight.appendChild(edit);
    taskRight.appendChild(taskDelete);

    taskBar.classList.add('taskBar');
    taskBar.style.borderLeft = `4px solid ${task.color()}`;
    taskBar.appendChild(taskLeft);
    taskBar.appendChild(taskRight);

    taskHolder.appendChild(taskBar);

};

function count (task)
{
    inboxNum ++;
    if(task.period() == 'today')
    {
        todayNum++;
    }
    else if (task.period() == 'tomorrow')
    {
        tomorrowNum++;
    }
    else if (task.period() == 'upcoming')
    {
        upcomingNum ++;
    }
    tomorrowCount.textContent = tomorrowNum;
   todayCount.textContent = todayNum;
   upcomingCount.textContent = upcomingNum;
   inboxCount.textContent = inboxNum;
}

function inbox ()
{
    const taskHolder = document.querySelector('.task-bar');
    while (taskHolder.hasChildNodes())
    {
     taskHolder.removeChild(taskHolder.firstElementChild);
    }
    toDo.forEach(makeTask);
};

function today()
{
    const taskHolder = document.querySelector('.task-bar');
    while (taskHolder.hasChildNodes())
    {
     taskHolder.removeChild(taskHolder.firstElementChild);
    }
    for (let i = 1; i < toDo.length; i++)
    {
        if (toDo[i].period() == 'today')
        {
            makeTask(toDo[i]);
        }
    }
};

function tomorrow()
{
    const taskHolder = document.querySelector('.task-bar');
    while (taskHolder.hasChildNodes())
    {
     taskHolder.removeChild(taskHolder.firstElementChild);
    }
    for (let i = 1; i < toDo.length; i++)
    {
        if (toDo[i].period() == 'tomorrow')
        {
            makeTask(toDo[i]);
        }
    }
};
function upcoming()
{
    const taskHolder = document.querySelector('.task-bar');
    while (taskHolder.hasChildNodes())
    {
     taskHolder.removeChild(taskHolder.firstElementChild);
    }
    for (let i = 1; i < toDo.length; i++)
    {
        if (toDo[i].period() == 'upcoming')
        {
            makeTask(toDo[i]);
        }
    }
};

function taskNav ()
{
    const inboxButton = document.querySelector('.inbox-button');
    const todayButton = document.querySelector('.today-button');
    const tomorrowButton = document.querySelector('.tomorrow-button');
    const upcomingButton = document.querySelector('.upcoming-button');

    inboxButton.addEventListener('click', (e)=>
    {
        inbox();
    });

    todayButton.addEventListener('click', (e)=>
    {
        today();
    });

    tomorrowButton.addEventListener('click', (e)=>
    {
        tomorrow();
    });

    upcomingButton.addEventListener('click', (e)=>
    {
        upcoming();
    })
}

function makeProject ()
{
    const project = document.createElement('a');
    const projectHeader = document.createElement('h3');
    const projectAdd = document.createElement('a');
    projectAdd.innerHTML = '<span class="material-symbols-outlined"> add</span>Add task';
    projectAdd.style.display = 'flex';
    projectAdd.style.fontSize = '1rem';
    projectAdd.style.alignItems = 'flex-end';
    project.textContent = projectTitle.value;

    projectHeader.textContent = projectTitle.value;

    projectItem.appendChild(project);

    project.classList.add('projectItem');
    project.addEventListener('click', (e) =>
    {
        
        projectName = project.textContent;
        const taskHolder = document.querySelector('.task-bar');
    while (taskHolder.hasChildNodes())
    {
     taskHolder.removeChild(taskHolder.firstElementChild);
    }
    taskHolder.appendChild(projectHeader);
    taskHolder.appendChild(projectAdd);
    for (let i = 1; i < toDo.length; i++)
    {
        if (toDo[i]._project() == project.textContent)
        {
            makeTask(toDo[i]);
        }
    }
    });

    projectAdd.addEventListener('click', (e) =>
    {
        content.style.filter = 'blur(10px)';
    taskForm.style.display = 'block';
    projectButton.style.display = 'none'
    projectTask.style.display = 'block';
    projectForm.style.display = 'none';
    })

    

};


//dom manipulation
//icon button 
add.addEventListener('click', (e)=>
{
    projectName = '';
    projectButton.style.display = 'block'
    content.style.filter = 'blur(10px)';
    taskForm.style.display = 'block';
});
closeTaskForm.addEventListener('click', (e)=>
{
    content.style.filter = 'none';
    taskForm.style.display = 'none';
});
projectButton.addEventListener('click', (e) =>
{
    projectTask.style.display = 'none';
    projectForm.style.display = 'block';
});
taskButton.addEventListener('click', (e) =>
{
    projectTask.style.display = 'block';
    projectForm.style.display = 'none';
});
taskSubmitButton.addEventListener('click', (e) =>
{
    if(taskTitle.checkValidity() && taskDescription.checkValidity() && taskDate.checkValidity())
    {
        for (let i = 0; i < toDo.length; i++)
        {
            if (taskTitle.value == toDo[i].title)
            {
                toDo.splice(i, 1, NewTask() );
                inbox();
                content.style.filter = 'none';
                taskForm.style.display = 'none';
                return
            }
        }
        toDo.push(NewTask());
        inbox();
        count(NewTask());
        content.style.filter = 'none';
        taskForm.style.display = 'none';
    }
});

makeProjectButton.addEventListener('click', (e) =>
{
    content.style.filter = 'none';
    taskForm.style.display = 'none';
    makeProject();
});

function projectTransition()
{
    const projectOpen = document.querySelector('.project-open');
    const projectClose = document.querySelector('.project-close');
    const projectBar  = document.querySelector('.project-item');

    projectOpen.style.cursor = 'pointer';
    projectClose.style.cursor = 'pointer';
    projectClose.addEventListener('click', (e)=>
    {
        projectBar.classList.remove('height-out');
        projectBar.classList.add('height-in');
        projectClose.style.display = 'none';
        projectOpen.style.display = 'block';
    });

    projectOpen.addEventListener('click', (e)=>
    {
        projectBar.classList.remove('height-in');
        projectBar.classList.add('height-out');
        projectOpen.style.display = 'none';
        projectClose.style.display = 'block';
    });
}
projectTransition();

function sidebarTransition ()
{
    const menuOpen = document.querySelector('.menu-open');
    const menuClose = document.querySelector('.menu-close');
    const sideBar = document.querySelector('.sidebar');

    menuOpen.style.cursor = 'pointer';
    menuClose.style.cursor ='pointer';

    menuOpen.addEventListener('click', (e)=>
    {
        menuClose.style.display = 'block';
        sideBar.classList.remove('width-in');
        sideBar.classList.add('width-out');
        menuOpen.style.display = 'none';
    });
    menuClose.addEventListener('click', (e)=>
    {
        menuClose.style.display = 'none';
        sideBar.classList.remove('width-out');
        sideBar.classList.add('width-in');
        menuOpen.style.display = 'block';
    })
}
sidebarTransition();

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
};

  function setToDo()
  {
    const ToDo = localStorage.getItem('ToDo');
    for (let i = 0; i < ToDo.length; i++)
    {
        toDo.push(ToDo[i]);
    }
  }
  function populateStorage()
  {
    localStorage.setItem("ToDo", toDo)
  }

  