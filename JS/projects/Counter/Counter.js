let def = document.querySelector("#pointer");
let original = def.innerText = 0; 

let inc = document.querySelector("#Increment");
let reset = document.querySelector("#Reset");
let dec = document.querySelector("#Decrement");

inc.addEventListener("click", () =>{
    original = original + 1;
    original = def.innerText = original; 
})

reset.addEventListener("click", () =>{
    original = 0; 
    original = def.innerText = original; 
})


dec.addEventListener("click", () =>{
    if(original > 0){
        original = original - 1;
        original = def.innerText = original; 
    }
})
