let select = document.querySelector('.star');
// let star = document.querySelector('.star');
// let check = document.createElement(".checked");



select.addEventListener("click",()=>{
    let chekedstar = select.className = "checked"
    select.appendChild(chekedstar);
})