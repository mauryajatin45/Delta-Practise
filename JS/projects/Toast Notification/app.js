let toast = document.querySelector(".toast");
let click = document.querySelector("#click");

click.addEventListener("click", ()=>{
    toast.style.display = "flex";
    setTimeout(()=>{
        toast.style.display = "none";
    },2000)
})