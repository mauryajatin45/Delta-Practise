// let userTask = document.

let input = document.querySelector("#task");
let submit = document.querySelector("#Submit");
let ul = document.querySelector("#ul");

let arr = [];

submit.addEventListener("click", () => {
    let taskli = document.createElement('li');
    let newtask = input.value;
    arr.push(newtask);
    taskli.innerText = input.value;
    ul.appendChild(taskli);


    let del = document.createElement('button');
    del.id = "delete"
    del.innerText = "Delete";
    taskli.appendChild(del);
})


ul.addEventListener('click', (event) => {
    let tar = event.target;
    let parent = tar.parentNode;

    if (tar.nodeName === "BUTTON") {
        console.log("Delete Pressed!!");
        parent.remove(); // Remove the button from the DOM
    } else {
        console.log("Not deleted");
    }
});
