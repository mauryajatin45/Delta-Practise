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

let Sell;
let stocks = [];
let BalanceAmt = 0;
let day = elements.currentDate.getDate();
let month = elements.currentDate.getMonth() + 1;
let year = elements.currentDate.getFullYear();
let currentDate = `${day}/${month}/${year}`;

const updateText = (element, text) => (element.innerText = text);

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

const priceElement = elements.Price;
const quantityElement = elements.Quantity;

const updateTotal = () => {
  const q = parseInt(quantityElement.value, 10) || 0;
  const p = parseFloat(priceElement.value) || 0;
  updateText(elements.RequiredBalance, `Order Total: ${q * p} ₹`);
};

priceElement.addEventListener("input", updateTotal);
quantityElement.addEventListener("input", updateTotal);

elements.AddStockbtn.addEventListener("click", () => {
  const d = elements.Date.value;
  const sn = elements.StockName.value;
  const q = elements.Quantity.value;
  const p = parseFloat(elements.Price.value);

  if (!d || !sn || !q || !p) {
    showToast("Filling all fields is mandatory");
  } else if (BalanceAmt >= p * q) {
    AddHoldings(sn, q, p);
    AddToTransactionBook(d, sn, q, p);
    Sell = document.querySelector(".sell");
  } else {
    showToast(`You need ${q * p - BalanceAmt} ₹ to add this Stock`);
  }
  (Sell = document.querySelector(".sell")),
    Sell.addEventListener("click", () => {
      document.querySelector(".modal").style.display = "block";
      updateText(elements.sellPrice, p);

      if (!elements.confirmSell.dataset.listenerAdded) {
        elements.confirmSell.addEventListener("click", () => {
          const sellQuantity = parseInt(elements.sellQuantity.value);
          if (sellQuantity > 0 && sellQuantity <= q) {
            AddToTransactionBook(d, sn, sellQuantity, p, "Sell"); // Pass the correct parameters
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
  }, 2000);
}

function AddHoldings(sn, q, p) {
  const stock = {
    name: sn,
    quantity: parseInt(q),
    price: parseFloat(p),
    dateAdded: elements.Date.value,
  };
  stocks.push(stock);

  const row = createRow([
    { class: "sell", text: "Sell" },
    { text: sn },
    { text: `${q}` },
    { text: `${p.toFixed(2)} ₹` },
    { text: `${(q * p).toFixed(2)} ₹` },
  ]);

  elements.HoldingsBody.appendChild(row);
  updateText(
    elements.CurrentBalance,
    `Current Balance : ${BalanceAmt - p * q} ₹`
  );

  const updateProfitLoss = () => {
    const RandomPrice = (p * (0.95 + Math.random() * 0.1)).toFixed(2);
    row.children[3].innerText = `${RandomPrice} ₹`;
    row.children[4].innerText = `${(q * RandomPrice).toFixed(2)} ₹`;

    updateText(
      elements.Holdings,
      `Holdings : ${(q * RandomPrice).toFixed(2)} ₹`
    );

    const totalValue = (q * RandomPrice).toFixed(2);
    const initialInvestment = (p * q).toFixed(2); // Total investment based on initial price and quantity
    const profitLoss = (totalValue - initialInvestment).toFixed(2); // Profit/Loss calculation

    if (profitLoss > 0) {
      elements.IncomeStatement.innerText = `Profit = ${profitLoss} ₹`;
      elements.IncomeStatement.style.color = "green";
    } else {
      elements.IncomeStatement.innerText = `Loss = ${Math.abs(profitLoss)} ₹`;
      elements.IncomeStatement.style.color = "red";
    }
  };
  document.querySelector("#StockName").value = "";
  document.querySelector("#Date").value = "";
  document.querySelector("#Quantity").value = "";
  document.querySelector("#Price").value = "";
  setInterval(updateProfitLoss, 1000);
}

function AddToTransactionBook(
  d = currentDate,
  sn,
  q,
  p,
  IncomeStatement = "Buy"
) {
  const GivenDate = new Date(d);
  const row = createRow([
    {
      text: `${GivenDate.getDate()}/${
        GivenDate.getMonth() + 1
      }/${GivenDate.getFullYear()}`,
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
    { text: `${p}` },
    { text: `${q * p} ₹` },
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
