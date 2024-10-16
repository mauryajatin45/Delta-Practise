const elements = {
    CurrentBalance: document.querySelector("#CurrentBalance"),
    AddBalance: document.querySelector("#addbalance"),
    Holdings: document.querySelector("#Holdings"),
    IncomeStatement: document.querySelector("#IncomeStatement"),
    Date: document.querySelector("#Date"),
    StockName: document.querySelector("#StockName"),
    Quantity: document.querySelector("#Quantity"),
    Price: document.querySelector("#Price"),
    AddStockbtn: document.querySelector("#AddStockbtn"),
    ToastText: document.querySelector(".toasttext"),
    HoldingsBody: document.querySelector("#holdingsbody"),
    TransactionBody: document.querySelector("#transactionbody"),
    Toast: document.querySelector(".toastnotification"),
    Sell: document.querySelector(".sell"),
};

let arr = 0;
let BalanceAmt = 0;

const updateText = (element, text) => element.innerText = text;

updateText(elements.CurrentBalance, `Current Balance : ${BalanceAmt} ₹`);
updateText(elements.Holdings, `Holdings : ${BalanceAmt} ₹`);
updateText(elements.IncomeStatement, `Profit / Loss : ${BalanceAmt} ₹`);

elements.AddBalance.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const inputvalue = parseInt(elements.AddBalance.value);
        if (inputvalue) {
            BalanceAmt += inputvalue;
            updateText(elements.CurrentBalance, `Current Balance: ${BalanceAmt} ₹`);
            elements.AddBalance.value = "";
        } else {
            showToast("Input is mandatory");
        }
    }
});

elements.AddStockbtn.addEventListener("click", () => {
    const d = elements.Date.value;
    const sn = elements.StockName.value;
    const q = elements.Quantity.value;
    const p = parseFloat(elements.Price.value);
    

    if (!d || !sn || !q || !p) {
        showToast("Filling all fields is mandatory");
    } else if (BalanceAmt >= (p * q)) {
        AddHoldings(sn, q, p);
        AddToTransactionBook(d, sn, q, p);
    } else {
        showToast("Balance is lower than the Stock Price");
    }
});


function showToast(message) {
    elements.Toast.classList.add("show");
    elements.ToastText.innerText = message;

    setTimeout(() => {
        elements.Toast.classList.remove("show");
    }, 2000);
}

function AddHoldings(sn, q, p) {
    let TotalHoldingValue = 0;

    const row = createRow([
        { class: 'sell', text: 'Sell' },
        { text: sn },
        { text: `${q}` },
        { text: `${p.toFixed(2)} ₹` },
        { text: `${(q * p).toFixed(2)} ₹` }
    ]);

    elements.HoldingsBody.appendChild(row);
    updateText(elements.CurrentBalance, `Current Balance : ${BalanceAmt - (p * q)} ₹`);

    const updateProfitLoss = () => {
        const RandomPrice = (p * (0.95 + Math.random() * 0.1)).toFixed(2);
        row.children[3].innerText = `${RandomPrice} ₹`;
        row.children[4].innerText = `${(q * RandomPrice).toFixed(2)} ₹`;

        let variable = parseFloat(row.children[4].innerText);
        TotalHoldingValue += variable;
        console.log(TotalHoldingValue);
        updateText(elements.Holdings, `Holdings : ${(q * RandomPrice).toFixed(2)} ₹`);

        const totalValue = (q * RandomPrice).toFixed(2);
        const initialInvestment = (p * q).toFixed(2); // Total investment based on initial price and quantity
        const profitLoss = (totalValue - initialInvestment).toFixed(2); // Profit/Loss calculation

        if (profitLoss > 0) {
            elements.IncomeStatement.innerText = `Profit = ${profitLoss} ₹`;
        } else {
            elements.IncomeStatement.innerText = `Loss = ${Math.abs(profitLoss)} ₹`;
        }

    };

    setInterval(updateProfitLoss, 1000);
}

function AddToTransactionBook(d, sn, q, p) {
    const GivenDate = new Date(d);
    const row = createRow([
        { text: `${GivenDate.getDate()}/${GivenDate.getMonth() + 1}/${GivenDate.getFullYear()}` },
        { text: sn },
        { text: "Buy", style: { color: 'green', fontWeight: 900 } },
        { text: `${q}` },
        { text: `${p}` },
        { text: `${q * p} ₹` }
    ]);

    elements.TransactionBody.appendChild(row);
}

function createRow(data) {
    const row = document.createElement("tr");
    data.forEach(({ class: className, text, style }) => {
        const td = document.createElement("td");
        if (className) td.className = className;
        td.innerText = text;
        if (style) Object.assign(td.style, style);
        row.appendChild(td);
    });
    return row;
}

// elements.Sell.addEventListener('click', () => {

// });