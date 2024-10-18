document.addEventListener("DOMContentLoaded", () => {
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
        RequiredBalance: document.querySelector(".requiredbalance"),
    };

    let stocks = [];
    let BalanceAmt = 0;

    const updateText = (element, text) => (element.innerText = text);

    updateText(elements.CurrentBalance, `Current Balance: ${BalanceAmt.toFixed(2)} ₹`);
    updateText(elements.Holdings, `Holdings: ${BalanceAmt.toFixed(2)} ₹`);
    updateText(elements.IncomeStatement, `Profit / Loss: ${BalanceAmt.toFixed(2)} ₹`);

    elements.AddBalance.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const inputValue = parseInt(elements.AddBalance.value);
            if (inputValue) {
                BalanceAmt += inputValue;
                updateText(elements.CurrentBalance, `Current Balance: ${BalanceAmt.toFixed(2)} ₹`);
                elements.AddBalance.value = "";
            } else {
                showToast("Input is mandatory");
            }
        }
    });

    const updateTotal = () => {
        const q = parseInt(elements.Quantity.value) || 0;
        const p = parseFloat(elements.Price.value) || 0;
        elements.RequiredBalance.style.display = (q && p) ? 'block' : 'none';
        updateText(elements.RequiredBalance, `Order Total: ${q * p} ₹`);
    };

    elements.Price.addEventListener("input", updateTotal);
    elements.Quantity.addEventListener("input", updateTotal);

    elements.AddStockbtn.addEventListener("click", () => {
        const d = elements.Date.value || new Date().toISOString().split("T")[0];
        const sn = elements.StockName.value;
        const q = parseInt(elements.Quantity.value);
        const p = parseFloat(elements.Price.value);

        if (!sn || !q || !p) {
            showToast("Filling all fields is mandatory");
        } else if (BalanceAmt >= p * q) {
            AddHoldings(sn, q, p);
            AddToTransactionBook(d, sn, q, p);
        } else {
            showToast(`You need ${q * p - BalanceAmt} ₹ to add this Stock`);
        }
    });

    elements.HoldingsBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("sell")) {
            const row = e.target.closest("tr");
            const stockName = row.children[1].innerText;
            const quantity = parseInt(row.children[2].innerText);
            const price = parseFloat(row.children[3].innerText);

            elements.sellPrice.value = price;
            elements.sellQuantity.setAttribute("max", quantity);
            elements.sellQuantity.value = "";

            document.querySelector(".modal").style.display = "block";

            elements.confirmSell.onclick = (event) => {
                event.preventDefault(); // Prevent default form submission
                const sellQuantity = parseInt(elements.sellQuantity.value);
                const dateToUse = elements.Date.value || new Date().toISOString().split("T")[0];
            
                // Validate sell quantity
                if (sellQuantity > 0 && sellQuantity <= quantity) {
                    const randomSellPrice = (price * (0.95 + Math.random() * 0.1)).toFixed(2); // Calculate random sell price
                    const totalSellPrice = parseFloat(randomSellPrice) * sellQuantity; // Total price for the sold quantity
                    AddToTransactionBook(dateToUse, stockName, sellQuantity, randomSellPrice, "Sell"); // Record transaction
            
                    // Update the quantity in the row
                    const updatedQuantity = quantity - sellQuantity;
                    row.children[2].innerText = updatedQuantity;
            
                    // Find the stock index in the array
                    const stockIndex = stocks.findIndex(stock => stock.name === stockName);
                    if (updatedQuantity <= 0 && stockIndex !== -1) {
                        stocks.splice(stockIndex, 1); // Remove the stock from the array
                        row.remove(); // Remove the row from the table
                    }
            
                    // Update current balance with the sale proceeds
                    BalanceAmt += totalSellPrice; 
                    updateText(elements.CurrentBalance, `Current Balance: ${BalanceAmt.toFixed(2)} ₹`); // Update UI
                    document.querySelector(".modal").style.display = "none"; // Close modal
                } else {
                    showToast(`Enter a number between 1 and ${quantity}`); // Show error if invalid quantity
                }
            };
        }
    });

    elements.close.addEventListener("click", () => {
        document.querySelector(".modal").style.display = "none";
    });

    function showToast(message) {
        elements.Toast.classList.add("show");
        elements.ToastText.innerText = message;

        setTimeout(() => {
            elements.Toast.classList.remove("show");
        }, 5000);
    }

    function AddHoldings(sn, q, p) {
        const initialRandomPrice = (p * (0.95 + Math.random() * 0.1)).toFixed(2);
        const stock = { name: sn, quantity: q, initialPrice: initialRandomPrice, currentPrice: initialRandomPrice, dateAdded: elements.Date.value };
        stocks.push(stock);
        updateHoldingsDisplay();
        BalanceAmt -= p * q; // Deduct the investment from balance
        updateText(elements.CurrentBalance, `Current Balance: ${BalanceAmt.toFixed(2)} ₹`);

        elements.StockName.value = "";
        elements.Date.value = "";
        elements.Quantity.value = "";
        elements.Price.value = "";

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
                { text: `${stock.currentPrice} ₹`, class: "price" },
                { text: `${(stock.quantity * stock.currentPrice).toFixed(2)} ₹`, class: "total" },
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
        data.forEach(({ class: className, text }) => {
            const td = document.createElement("td");
            if (className) td.className = className;
            td.innerText = text;
            row.appendChild(td);
        });
        return row;
    }

    function AddToTransactionBook(d = new Date(), sn, q, p, IncomeStatement = "Buy") {
        const priceToUse = p || (Math.random() * (1000 - 10) + 10).toFixed(2);
        const GivenDate = new Date(d);
        const row = createRow([
            { text: `${GivenDate.getDate()}/${GivenDate.getMonth() + 1}/${GivenDate.getFullYear()}` },
            { text: sn },
            { text: IncomeStatement, style: { color: IncomeStatement === "Buy" ? "green" : "red", fontWeight: "bold" } },
            { text: `${q}` },
            { text: `${priceToUse} ₹` },
            { text: `${(q * priceToUse).toFixed(2)} ₹`},
        ]);
        elements.TransactionBody.appendChild(row);
    }
});
