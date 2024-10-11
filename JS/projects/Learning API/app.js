let h1 = document.querySelector('#h1');

// let url = 'https://catfact.ninja/fact';

// fetch(url)
//     .then((data)=>{
//         console.log(data)
//         return data.json()
//     })
//     .then((data)=>{
//         console.log(data.fact)
//         h1.innerText = data.fact
//     })


async function getFact(){
    let url = 'https://catfact.ninja/fact';

    let res = await fetch(url);
    let data = await res.json();
    console.log(data.fact);
    h1.innerText = data.fact
}

getFact();