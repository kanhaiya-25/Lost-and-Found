document.addEventListener("DOMContentLoaded", () => {
    const reportForm = document.getElementById("reportForm");
    const searchBox = document.getElementById("searchBox");
    const itemsContainer = document.getElementById("itemsContainer");
    const darkModeToggle = document.getElementById("darkModeToggle");

    let items = [];

    // Handle Form Submission
    reportForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("itemName").value;
        const type = document.getElementById("itemType").value;
        const description = document.getElementById("itemDescription").value;
        const imageInput = document.getElementById("itemImage");

        if (!name || !description) return;

        let imageURL = "";
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            imageURL = URL.createObjectURL(file);
        }

        const newItem = { name, type, description, imageURL };
        items.push(newItem);
        displayItems(items);

        reportForm.reset();
    });

    // Display Items
    function displayItems(itemsToDisplay) {
        itemsContainer.innerHTML = "";
        itemsToDisplay.forEach((item, index) => {
            const itemCard = document.createElement("div");
            itemCard.classList.add("item-card");
            itemCard.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Type:</strong> ${item.type}</p>
                <p>${item.description}</p>
                ${item.imageURL ? `<img src="${item.imageURL}" width="100">` : ""}
            `;
            itemsContainer.appendChild(itemCard);
        });
    }

    // Search Functionality
    searchBox.addEventListener("input", () => {
        const searchTerm = searchBox.value.toLowerCase();
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm));
        displayItems(filteredItems);
    });

    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
