// landingPage.js

// Function to apply CSS styles
function applyStyles() {
    try {
        const style = document.createElement('style');
        style.textContent = `
            /* General reset */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            /* Full-page styling */
            body, html {
                height: 100%;
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f3f4f6;
            }
            /* Container styling */
            .container {
                text-align: center;
                padding: 20px;
                border-radius: 8px;
                background-color: #ffffff;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                width: 90%;
            }
            /* Title styling */
            .title {
                font-size: 24px;
                font-weight: bold;
                color: #333;
                margin-bottom: 20px;
            }
            /* Button styling */
            .button {
                display: block;
                width: 100%;
                padding: 15px;
                margin: 10px 0;
                font-size: 16px;
                font-weight: bold;
                color: #fff;
                background-color: #007bff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                text-align: center;
            }
            .button:hover {
                background-color: #0056b3;
            }
        `;
        document.head.appendChild(style);
    } catch (error) {
        console.error("Error applying styles:", error);
    }
}

// Function to create the landing page elements
function createLandingPage() {
    try {
        // Apply styles first
        applyStyles();

        // Create the landing_page div
        const landingPage = document.createElement('div');
        landingPage.className = 'container';

        // Create and append title
        const title = document.createElement('h1');
        title.className = 'title';
        title.textContent = 'Build Your Indoor Map';
        landingPage.appendChild(title);

        // Create and append buttons
        const createMapButton = document.createElement('button');
        createMapButton.className = 'button';
        createMapButton.textContent = 'Create New Map';
        createMapButton.onclick = createNewMap; // Attach function
        landingPage.appendChild(createMapButton);

        const updateMapButton = document.createElement('button');
        updateMapButton.className = 'button';
        updateMapButton.textContent = 'Update Existing Map';
        updateMapButton.onclick = updateExistingMap; // Attach function
        landingPage.appendChild(updateMapButton);

        // Return the landing_page div
        return landingPage;
    } catch (error) {
        console.error("Error creating landing page:", error);
        return null; // Return null in case of an error
    }
}

// Function for creating a new map
function createNewMap() {
    alert("Create New Map button clicked");
    // Add your functionality for creating a new map here
}

// Function for updating an existing map
function updateExistingMap() {
    alert("Update Existing Map button clicked");
    // Add your functionality for updating an existing map here
}

// Create the landing page and export it
const landingPage = createLandingPage();
module.exports = landingPage;
