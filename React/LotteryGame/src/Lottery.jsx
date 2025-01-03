import React, { useState } from 'react';
import Ticket from './Ticket';

// Generate a random ticket with 'num' digits
function genTicket(num) {
    let ticket = [];
    for (let i = 0; i < num; i++) {
        ticket.push(Math.floor(Math.random() * 10));
    }
    return ticket;
}

function sumOfTicketNums(ticket) {
    let sum = 0;
    for (let i = 0; i < ticket.length; i++) {
        sum += ticket[i];
    }
    return sum;
}

export default function Lottery() {
    // Initialize ticket state with a ticket containing 3 random numbers
    const [ticket, setTicket] = useState(genTicket(3));

    return (
        <div className="lottery-container">
            <h1>Lottery</h1>
            <Ticket ticket={ticket} />
            <h2>{sumOfTicketNums(ticket) === 15 ? "You win!" : "You lose!"}</h2>
            <button onClick={() => setTicket(genTicket(3))}>Buy New Ticket</button>
        </div>
    );
}
