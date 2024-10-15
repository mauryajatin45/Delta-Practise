let CurrentBalance = document.querySelector("#CurrentBalance");
let AddBalance = document.querySelector("#addbalance");
let Holdings = document.querySelector("#Holdings");
let IncomeStatement = document.querySelector("#IncomeStatement");
let Date = document.querySelector("#Date");
let StockName = document.querySelector("#StockName");
let Quantity = document.querySelector("#Quantity");
let Price = document.querySelector("#Price");
let AddStockbtn = document.querySelector("#AddStockbtn");
let ToastText = document.querySelector(".toasttext");
let HoldingsBody = document.querySelector("#holdingsbody");


let BalanceAmt = 0;
let HoldingsAmt = 0;
let IncomeStatementAmt = 0;


CurrentBalance.innerText = `Current Balance : ${BalanceAmt} ₹`;
Holdings.innerText = `Holdings : ${BalanceAmt} ₹`;
IncomeStatement.innerText = `Profit / Loss : ${BalanceAmt} ₹`;



AddBalance.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        let inputvalue = parseInt(AddBalance.value);
        BalanceAmt += inputvalue;
        CurrentBalance.innerText = `Current Balance: ${BalanceAmt} ₹`;
        AddBalance.value = "";
    }
});

AddStockbtn.addEventListener("click", () => {
    let d = Date.value;
    let sn = StockName.value;
    let q = Quantity.value;
    let p = Price.value;
    if (d == "" || sn == "" || q == "" || p == "") {
        showToast();
    }
});

function showToast() {
    const toast = document.querySelector(".toastnotification");
    toast.classList.add("show");
    ToastText.innerText = "Filling all field is mandatory";

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
