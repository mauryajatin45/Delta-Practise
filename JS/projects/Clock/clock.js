let time = document.querySelector("#time");



setInterval(() => {
    const t = new Date();
    const H = t.getHours();
    const M = t.getMinutes();
    const S = t.getSeconds();
    console.log(t);
    console.log(H);
    console.log(M);
    console.log(S);

    let Hour = document.querySelector("#Hour");
    let Minute = document.querySelector("#Minute");
    let Second = document.querySelector("#Second");

    Hour.innerText = H;
    Minute.innerText = M;
    Second.innerText = S;

}, 1000)