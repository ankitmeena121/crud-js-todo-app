//..initilize all var above 1 by 1 for understanding
let form = document.getElementById("form");
let textinput = document.getElementById("textinput");
let msg = document.getElementById("msg");
let dateinput = document.getElementById("dateinput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let addBtn = document.getElementById("addBtn");


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    formValidation();
});

let formValidation = ()=>{
    if(textinput.value === ""){
        // console.log("failure");
        msg.innerHTML="* Task Name is Compulsory *";
    } else {
        // console.log("success");
        msg.innerHTML = "";
        acceptData();
        addBtn.setAttribute("data-bs-dismiss", "modal");
        addBtn.click();

        //this is IIFE (Immediately Invoked Function Expression)
     (() => {
        addBtn.setAttribute("data-bs-dismiss", "");
     })();
    };

};

//BLANK ARRAY FOR STORE DATA
let data = [];

//after succes we accept data and push data in local storage
let acceptData = () => {
     data.push({
     taskname: textinput.value,
     date: dateinput.value,
     description: textarea.value,
     });
     localStorage.setItem("details",JSON.stringify(data));
     createTasks();
};

// creat task and then reset page means empty
let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x,y)=>{
        return (tasks.innerHTML += `
            <div id=${y}>
                 <span class="fw-bold">${x.taskname}</span>
                 <span class="small text-secondary">${x.date}</span>
                 <p>${x.description}</p>
                 <span class="options">
                     <i onClick ="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                     <i onClick = "deleteTask(this);createTasks()" class="fa-solid fa-trash"></i>
                 </span>
             </div>`

        );
    });
    
            resetForm();
};

//delet task
let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("details",JSON.stringify(data));

};

//edit task
let editTask =(e)=>{
  let selectedTask = e.parentElement.parentElement;

    textinput.value = selectedTask.children[0].innerHTML;
    dateinput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};

let resetForm = () => {
    textinput.value = "";
    dateinput.value = "";
    textarea.value = "";
};


(()=> {
    data = JSON.parse(localStorage.getItem("details")) || [];
    createTasks();
    // console.log(data);

})();






