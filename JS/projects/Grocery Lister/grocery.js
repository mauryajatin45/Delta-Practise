let AddItem = document.querySelector("#AddItem");
let Table = document.querySelector("table");
let ItmLst = document.querySelector("#itm-lst");
let allitem = {}

AddItem.addEventListener("click",()=>{
    let groceryName = document.querySelector("#grocery-Name");
    let quantity = document.querySelector("#quantity");
    groceryName = groceryName.value;
    quantity = quantity.value;
    // allitem.push({groceryName: quantity});
    allitem[groceryName] = quantity;
    console.log(allitem)


    let row = document.createElement('tr');
    
    let td1 = document.createElement('td');
    td1.innerText = groceryName
    row.appendChild(td1);
    
    let td2 = document.createElement('td');
    td2.innerText = quantity;
    row.appendChild(td2);
    
    ItmLst.append(row);

    document.querySelector("#grocery-Name").value = '';
    document.querySelector("#quantity").value = '';
})

