// External TypeScript file for the global script

// Declare variables to track the total minted tokens and set a minting limit
let totalMintedTokens: number = 0; // Explicitly typed as number
const mintingLimit: number = 10000; // Set a limit for total tokens that can be minted, typed as number

document.addEventListener('DOMContentLoaded', function () {
    // Type cast to the appropriate element types using querySelector
    const mintButton = document.querySelector<HTMLButtonElement>('#mint_button');
    const walletInput = document.querySelector<HTMLInputElement>('#walletAddress');
    const tokenInput = document.querySelector<HTMLInputElement>('#tokenAmount');
    const mintStatus = document.querySelector<HTMLDivElement>('#mintStatus'); // Cast as an HTMLDivElement

    // Check if the elements exist before adding event listeners
    if (mintButton && walletInput && tokenInput && mintStatus) {
        mintButton.addEventListener('click', function () {
            // Assigning value of input fields and performing validation
            const walletAddress: string = walletInput.value; // Explicitly typed as string
            const tokenAmount: number = parseInt(tokenInput.value); // Explicitly typed as number

            // Validation for wallet address and token amount
            if (walletAddress !== '' && !isNaN(tokenAmount) && tokenAmount > 0) {
                // Call asynchronous function to simulate token minting
                simulateTokenMinting(tokenAmount)
                    .then((minted: number) => { // Explicit type annotation for minted
                        mintStatus.textContent = `Successfully minted ${minted} tokens to wallet: ${walletAddress}`;
                    })
                    .catch((error: string) => { // Explicit type annotation for error
                        mintStatus.textContent = error;
                    });
            } else {
                mintStatus.textContent = 'Invalid wallet address or token amount. Please try again.';
            }
        });
    }
});

// Asynchronous function to simulate token minting using a promise
function simulateTokenMinting(amount: number): Promise<number> { // Explicit type annotations for the parameter and return type
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let successfullyMinted: number = 0; // Track the number of minted tokens
            for (let i = 0; i < amount; i++) {
                if (totalMintedTokens < mintingLimit) {
                    totalMintedTokens++; // Increment total minted tokens
                    successfullyMinted++; // Increment successfully minted tokens
                } else {
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
async function fetchCryptoPrices(): Promise<void> { // Explicit return type as Promise<void>
    try {
        const response = await fetch('http://localhost:4000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ prices { bitcoin ethereum solana } }' }), // GraphQL query for crypto prices
        });

        const { data } = await response.json();
        const { bitcoin, ethereum, solana }: { bitcoin: number; ethereum: number; solana: number } = data.prices; // Explicitly typed data structure

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
    } catch (error) {
        console.error('Error fetching crypto prices:', error); // Catch and log errors
    }
}

// Call the function to fetch and display crypto prices
fetchCryptoPrices();