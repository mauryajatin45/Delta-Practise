// let txt = document.querySelector('#colouredText');
// // txt.style.color = 'green';



// ChangeColor = (data, time) => {
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             console.log(data);
//             txt.style.color = data;
//             resolve('Color changed');
//         }, time)
//     }) 
// }


// async function cc() {
//     await ChangeColor("green", 1000);
//     await ChangeColor("red", 1000);
//     await ChangeColor("yellow", 1000);
//     await ChangeColor("Orange", 1000);
//      // return "Hello";
// }

let dhiruTxt = document.querySelector('#dhirumon');

dhirendra = (data, time) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            dhiruTxt.innerHTML = data
            resolve('Dhirubhai Status Updated!!!');
        },time)
    });
}

async function DM(){
    await dhirendra('Ma aap ka apna DhiruMon', 2000);
    await dhirendra('dhirubhai ki Pinal', 2000);
    await dhirendra('Dhirubhai ki wife with velan', 2000);
    await dhirendra('Credit:- Jatin Maurya 😎', 2000);
}