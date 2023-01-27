import './App.css';
import React, { useState, useEffect } from "react";

const CreditCardValidation = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Step 1: Starting from the rightmost digit (which is the check digit) and moving left, double the value of every second digit.
        let doubledDigits = [];
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            if (i % 2 === 0) {
                doubledDigits.push(parseInt(cardNumber[i]) * 2);
            } else {
                doubledDigits.push(parseInt(cardNumber[i]));
            }
        }

        // Step 2: Sum the digits of the products (e.g., 10: 1 + 0 = 1, 14: 1 + 4 = 5) together with the sum of the unaffected digits from the original number.
        let checkSum = 0;
        for (let i = 0; i < doubledDigits.length; i++) {
            checkSum += doubledDigits[i] > 9 ? parseInt(doubledDigits[i].toString()[0]) + parseInt(doubledDigits[i].toString()[1]) : doubledDigits[i];
        }

        // Step 3: The check digit (the rightmost digit of the card number) is the amount that needs to be added to get a multiple of 10 (Modulo 10).
        if (checkSum % 10 === 0) {
            setIsValid(true);
            setMessage("Valid Card");
        } else {
            setIsValid(false);
            setMessage("Invalid Card");
}
}, [cardNumber]);
const handleChange = (event) => {
    setCardNumber(event.target.value);
}

return (
    <div>
        <form>
            <label>
                Credit Card Number:
                <input type="text" value={cardNumber} onChange={handleChange} />
            </label>
        </form>
        <p>{message}</p>
    </div>
);
}

export default CreditCardValidation;
