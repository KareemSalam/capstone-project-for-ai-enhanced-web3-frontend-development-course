// External JavaScript file for the global script

// Declare variables to track the total minted tokens and set a minting limit
let totalMintedTokens = 0;
const mintingLimit = 10000; // Set a limit for total tokens that can be minted

document.addEventListener('DOMContentLoaded', function() {
    const mintButton = document.querySelector('#mint_button');
    const walletInput = document.querySelector('#walletAddress');
    const tokenInput = document.querySelector('#tokenAmount');
    const mintStatus = document.querySelector('#mintStatus'); // Access the mint status element

    mintButton.addEventListener('click', function() {
        let walletAddress = walletInput.value;
        let tokenAmount = parseInt(tokenInput.value);

        // Validation for wallet address and token amount
        if(walletAddress !== '' && !isNaN(tokenAmount) && tokenAmount > 0) {
            // Call asynchronous function to simulate token minting
            simulateTokenMinting(tokenAmount)
                .then(minted => {
                    mintStatus.textContent = `Successfully minted ${minted} tokens to wallet: ${walletAddress}`;
                })
                .catch(error => {
                    mintStatus.textContent = error;
                });
        } else {
            mintStatus.textContent = 'Invalid wallet address or token amount. Please try again.';
        }
    });
});

// Asynchronous function to simulate token minting using a promise
function simulateTokenMinting(amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let successfullyMinted = 0;
            for(let i = 0; i < amount; i++) {
                if (totalMintedTokens < mintingLimit) {
                    totalMintedTokens++;
                    successfullyMinted++;
                } else {
                    reject('Minting limit reached. No more tokens can be minted.');
                    break;
                }
            }
            document.getElementById('totalMinted').textContent = `Total Minted: ${totalMintedTokens}`;
            resolve(successfullyMinted);
        }, 2000); // Simulate a network request delay
    });
}

// Function to fetch and display crypto prices
async function fetchCryptoPrices() {
    try {
        const response = await fetch('http://localhost:4000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ prices { bitcoin ethereum solana } }' }),
        });
        const { data } = await response.json();
        const { bitcoin, ethereum, solana } = data.prices;

        // Update the DOM
        document.getElementById('cryptoPrices').innerHTML = `
            <h3>Crypto Prices:</h3>
            <p>Bitcoin (BTC): $${bitcoin}</p>
            <p>Ethereum (ETH): $${ethereum}</p>
            <p>Solana (SOL): $${solana}</p>
        `;
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
    }
}

// Call the function to fetch and display crypto prices
fetchCryptoPrices();
