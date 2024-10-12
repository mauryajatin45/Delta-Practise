let boxes = document.querySelectorAll(".box");

let a, b, c

boxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
        a = Math.ceil(Math.random() * 266)
        b = Math.ceil(Math.random() * 266)
        c = Math.ceil(Math.random() * 266)

        box.style.backgroundColor = (`rgb(${a}, ${b}, ${c})`);
    });

    box.addEventListener("mouseleave", ()=>{
        box.style.backgroundColor = "#fff";
    })
});
