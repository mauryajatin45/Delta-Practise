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
  close: document.querySelector("#closeModal"),
  sellPrice: document.querySelector("#sellPrice"),
  sellQuantity: document.querySelector("#sellQuantity"),
  confirmSell: document.querySelector("#confirmSell"),
  currentDate: new Date(),
  RequiredBalance: document.querySelector(".requiredbalance"),
};

// let StockArrCounter = 0;
// co StockSaver = {};
let stocks = [];
let BalanceAmt = 0;

const updateText = (element, text) => (element.innerText = text);

updateText(elements.CurrentBalance, `Current Balance: ${BalanceAmt} ₹`);
updateText(elements.Holdings, `Holdings: ${BalanceAmt} ₹`);
updateText(elements.IncomeStatement, `Profit / Loss: ${BalanceAmt} ₹`);

elements.AddBalance.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const inputValue = parseInt(elements.AddBalance.value);
    if (inputValue) {
      BalanceAmt += inputValue;
      updateText(elements.CurrentBalance, `Current Balance: ${BalanceAmt} ₹`);
      elements.AddBalance.value = "";
    } else {
      showToast("Input is mandatory");
    }
  }
});

const priceElement = elements.Price;
const quantityElement = elements.Quantity;

const updateTotal = () => {
  const q = parseInt(quantityElement.value) || 0;
  const p = parseFloat(priceElement.value) || 0;
  if((q && p) == 0){
    elements.RequiredBalance.style.display = 'none';
  }else{
    elements.RequiredBalance.style.display = 'block';
    updateText(elements.RequiredBalance, `Order Total: ${q * p} ₹`);
  }
};

priceElement.addEventListener("input", updateTotal);
quantityElement.addEventListener("input", updateTotal);

elements.AddStockbtn.addEventListener("click", () => {
  const d = elements.Date.value;
  const sn = elements.StockName.value;
  const q = parseInt(elements.Quantity.value);
  const p = parseFloat(elements.Price.value);

  if (!d || !sn || !q || !p) {
    showToast("Filling all fields is mandatory");
  } else if (BalanceAmt >= p * q) {
    AddHoldings(sn, q, p); 
    AddToTransactionBook(d, sn, q, p);
  } else {
    showToast(`You need ${q * p - BalanceAmt} ₹ to add this Stock`);
  }

  const sellButton = document.querySelector(".sell");
  sellButton.addEventListener("click", () => {
    document.querySelector(".modal").style.display = "block";
    updateText(elements.sellPrice, p);

    if (!elements.confirmSell.dataset.listenerAdded) {
      elements.confirmSell.addEventListener("click", () => {
        const sellQuantity = parseInt(elements.sellQuantity.value);
        if (sellQuantity > 0 && sellQuantity <= q) {
          const RandomPrice = (p * (0.95 + Math.random() * 0.1)).toFixed(2); 
          AddToTransactionBook(d, sn, sellQuantity, RandomPrice, "Sell");
          document.querySelector(".modal").style.display = "none";
        } else {
          showToast(`Enter a number between 1 and ${q}`);
        }
      });

      elements.confirmSell.dataset.listenerAdded = true;
    }
  });

  elements.close.addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
  });
});

function showToast(message) {
  elements.Toast.classList.add("show");
  elements.ToastText.innerText = message;

  setTimeout(() => {
    elements.Toast.classList.remove("show");
  }, 5000);
}function AddHoldings(sn, q, p) {
  const initialRandomPrice = (p * (0.95 + Math.random() * 0.1)).toFixed(2);
  
  const stock = {
    name: sn,
    quantity: q,
    initialPrice: initialRandomPrice, 
    currentPrice: initialRandomPrice, 
    dateAdded: elements.Date.value,
  };
  
  stocks.push(stock);
  updateHoldingsDisplay(); 
  updateText(elements.CurrentBalance, `Current Balance: ${BalanceAmt - p * q} ₹`);

  // Reset input fields
  document.querySelector("#StockName").value = "";
  document.querySelector("#Date").value = "";
  document.querySelector("#Quantity").value = "";
  document.querySelector("#Price").value = "";

  setInterval(() => {
    updateProfitLoss(stock);
  }, 1000);
}

function updateHoldingsDisplay() {
  elements.HoldingsBody.innerHTML = '';
  let totalHoldingsValue = 0; 

  stocks.forEach(stock => {
    const row = createRow([
      { class: "sell", text: "Sell" },
      { text: stock.name },
      { text: `${stock.quantity}` },
      { text: `${stock.currentPrice} ₹` }, 
      { text: `${(stock.quantity * stock.currentPrice).toFixed(2)} ₹` }, 
    ]);
    elements.HoldingsBody.appendChild(row);

    totalHoldingsValue += stock.quantity * stock.currentPrice;
  });

  updateText(elements.Holdings, `Holdings: ${totalHoldingsValue.toFixed(2)} ₹`);
  
  updateTotalProfitLoss(); 
}

function updateProfitLoss(stock) {
  const newRandomPrice = (stock.initialPrice * (0.95 + Math.random() * 0.1)).toFixed(2);
  stock.currentPrice = newRandomPrice; 
  updateHoldingsDisplay(); 
}

function updateTotalProfitLoss() {
  let totalInitialInvestment = 0;
  let totalCurrentValue = 0;

  stocks.forEach(stock => {
    const initialInvestment = stock.initialPrice * stock.quantity;
    const currentValue = stock.currentPrice * stock.quantity;

    totalInitialInvestment += parseFloat(initialInvestment);
    totalCurrentValue += parseFloat(currentValue);
  });

  const profitLoss = (totalCurrentValue - totalInitialInvestment).toFixed(2);

  if (profitLoss > 0) {
    elements.IncomeStatement.innerText = `Profit = ${profitLoss} ₹`;
    elements.IncomeStatement.style.color = "green";
  } else {
    elements.IncomeStatement.innerText = `Loss = ${Math.abs(profitLoss)} ₹`;
    elements.IncomeStatement.style.color = "red";
  }
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


function AddToTransactionBook(d = currentDate, sn, q, p, IncomeStatement = "Buy") {
  const priceToUse = p || (Math.random() * (1000 - 10) + 10).toFixed(2);

  const GivenDate = new Date(d);
  const row = createRow([
    {
      text: `${GivenDate.getDate()}/${GivenDate.getMonth() + 1}/${GivenDate.getFullYear()}`,
    },
    { text: sn },
    {
      text: IncomeStatement,
      style: {
        color: IncomeStatement === "Buy" ? "green" : "red",
        fontWeight: "bold",
      },
    },
    { text: `${q}` },
    { text: `${priceToUse} ₹` },
    { text: `${(q * priceToUse).toFixed(2)} ₹` },
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
