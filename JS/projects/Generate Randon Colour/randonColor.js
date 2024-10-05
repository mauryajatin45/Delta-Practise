let generatedColor = document.querySelector("#generateColor");
let a
let b
let c

generatedColor.addEventListener("click", () => {
    a = Math.random()
    b = Math.random()
    c = Math.random()

    a = a * 266
    b = b * 266
    c = c * 266

    a = Math.ceil(a)
    b = Math.ceil(b)
    c = Math.ceil(c)
})




let dabba = document.querySelector(".colordiv")
generatedColor.addEventListener("click", () => {
    dabba.style.backgroundColor = (`rgb(${a}, ${b}, ${c})`);
})

let updatedtxt = document.querySelector("#colorTxt");
generatedColor.addEventListener("click", () => {
    updatedtxt.innerHTML = (`rgb(${a}, ${b}, ${c})`);
})