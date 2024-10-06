async function cc() {
   await ChangeColor("green", 1000),
   await ChangeColor("red", 1000),
   await ChangeColor("yellow", 1000),
   await ChangeColor("Orange", 1000);

    return "Hello";
}

ChangeColor = (data, time) => {
    setTimeout(() => {
        console.log(data);
    }, time)
}