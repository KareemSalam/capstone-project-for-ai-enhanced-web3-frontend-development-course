"use strict";
// External TypeScript file for the global script
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Declare variables to track the total minted tokens and set a minting limit
let totalMintedTokens = 0; // Explicitly typed as number
const mintingLimit = 10000; // Set a limit for total tokens that can be minted, typed as number
document.addEventListener('DOMContentLoaded', function () {
    // Type cast to the appropriate element types using querySelector
    const mintButton = document.querySelector('#mint_button');
    const walletInput = document.querySelector('#walletAddress');
    const tokenInput = document.querySelector('#tokenAmount');
    const mintStatus = document.querySelector('#mintStatus'); // Cast as an HTMLDivElement
    // Check if the elements exist before adding event listeners
    if (mintButton && walletInput && tokenInput && mintStatus) {
        mintButton.addEventListener('click', function () {
            // Assigning value of input fields and performing validation
            const walletAddress = walletInput.value; // Explicitly typed as string
            const tokenAmount = parseInt(tokenInput.value); // Explicitly typed as number
            // Validation for wallet address and token amount
            if (walletAddress !== '' && !isNaN(tokenAmount) && tokenAmount > 0) {
                // Call asynchronous function to simulate token minting
                simulateTokenMinting(tokenAmount)
                    .then((minted) => {
                    mintStatus.textContent = `Successfully minted ${minted} tokens to wallet: ${walletAddress}`;
                })
                    .catch((error) => {
                    mintStatus.textContent = error;
                });
            }
            else {
                mintStatus.textContent = 'Invalid wallet address or token amount. Please try again.';
            }
        });
    }
});
// Asynchronous function to simulate token minting using a promise
function simulateTokenMinting(amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let successfullyMinted = 0; // Track the number of minted tokens
            for (let i = 0; i < amount; i++) {
                if (totalMintedTokens < mintingLimit) {
                    totalMintedTokens++; // Increment total minted tokens
                    successfullyMinted++; // Increment successfully minted tokens
                }
                else {
                    reject('Minting limit reached. No more tokens can be minted.'); // Reject if the minting limit is reached
                    break;
                }
            }
            // Update the DOM to show the total minted tokens
            const totalMintedElem = document.getElementById('totalMinted');
            if (totalMintedElem) {
                totalMintedElem.textContent = `Total Minted: ${totalMintedTokens}`;
            }
            resolve(successfullyMinted); // Resolve with the number of successfully minted tokens
        }, 2000); // Simulate a network request delay
    });
}
// Function to fetch and display crypto prices using a GraphQL query
function fetchCryptoPrices() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:4000/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: '{ prices { bitcoin ethereum solana } }' }), // GraphQL query for crypto prices
            });
            const { data } = yield response.json();
            const { bitcoin, ethereum, solana } = data.prices; // Explicitly typed data structure
            // Update the DOM to display fetched prices
            const cryptoPricesElem = document.getElementById('cryptoPrices');
            if (cryptoPricesElem) {
                cryptoPricesElem.innerHTML = `
                <h3>Crypto Prices:</h3>
                <p>Bitcoin (BTC): $${bitcoin}</p>
                <p>Ethereum (ETH): $${ethereum}</p>
                <p>Solana (SOL): $${solana}</p>
            `;
            }
        }
        catch (error) {
            console.error('Error fetching crypto prices:', error); // Catch and log errors
        }
    });
}
// Call the function to fetch and display crypto prices
fetchCryptoPrices();
