import React from 'react';
import TicketNum from './TicketNum';

export default function Ticket({ ticket }) {
  return (
    <div className="ticket">
      {ticket.map((num, index) => (
        <TicketNum key={index} num={num} />
      ))}
    </div>
  );
}
