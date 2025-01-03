```markdown
# Lottery App

A simple lottery application built with React where users can "buy" a ticket, view its numbers, and check if they've won.

## Features

- Generates a random 3-digit lottery ticket.
- Displays the ticket and its sum.
- Checks if the sum of the ticket numbers equals 15 to determine if the user wins.
- Allows the user to buy a new ticket with the click of a button.

## How It Works

1. **Ticket Generation**: When the app starts, a ticket containing 3 random digits between 0 and 9 is generated.
2. **Ticket Display**: The digits of the ticket are displayed on the screen.
3. **Winning Condition**: If the sum of the digits of the ticket equals 15, the user wins. Otherwise, they lose.
4. **Buy New Ticket**: A button is provided to generate and view a new random ticket.

## Folder Structure

```
/src
  /components
    /Ticket.js         # Displays the generated ticket.
    /TicketNum.js      # Displays a single ticket number.
    /Lottery.js        # The main component handling logic and rendering.
```

## Components

- **Lottery**: The main component that generates and displays the ticket. It includes logic to check if the user wins based on the sum of the ticket's digits.
- **Ticket**: Displays the 3 digits of the lottery ticket by rendering a `TicketNum` for each digit.
- **TicketNum**: Displays a single number on the ticket.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mauryajatin45/lottery-app.git
   ```

2. Install dependencies:

   ```bash
   cd lottery-app
   npm install
   ```

3. Run the app:

   ```bash
   npm start
   ```

4. Open the app in your browser at `http://localhost:3000`.

## Example Screenshot

![Lottery App Screenshot](./screenshot.png)

## Customization

- **Change Ticket Size**: Modify the `genTicket` function to generate more or fewer digits.
- **Winning Condition**: Customize the win condition by adjusting the sum target in `sumOfTicketNums`.
- **Styling**: Update the CSS classes (like `.lottery-container`, `.ticket`, etc.) for a custom look.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- React (https://reactjs.org/) for the component-based architecture.
