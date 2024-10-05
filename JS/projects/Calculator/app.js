let txt = document.querySelector(".ScreenBar");

let one = document.querySelector(".btn-work-1");
one.onclick = () => {
    console.log(1);
}


// Add Event Listner

let Allbtn = document.querySelector(".btn-work--");

Allbtn.addEventListener("click", () => {
    console.log('Hello')
})
