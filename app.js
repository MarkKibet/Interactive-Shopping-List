document.addEventListener('DOMContentLoaded', () => {
    let itemInput = document.getElementById('itemInput');
    let addButton = document.getElementById('addButton');

    let clearButton = document.getElementById('clearButton');

    let shoppingList = document.getElementById('shoppingList');

    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    // Load items from local storage
    items.forEach(item => addItemToDOM(item.name, item.purchased));

    // Add item
    addButton.addEventListener('click', () => {
        let itemName = itemInput.value.trim();
        if (itemName !== '') {
            let newItem = { name: itemName, purchased: false };
            items.push(newItem);

            addItemToDOM(newItem.name, newItem.purchased);
            localStorage.setItem('shoppingList', JSON.stringify(items));
            itemInput.value = '';
        }
    });
    // Clear list
    clearButton.addEventListener('click', () => {
        items = [];
        shoppingList.innerHTML = '';

        //for local storage, the data is made persisted even after browser is closed and opened, or is reloaded
        localStorage.setItem('shoppingList', JSON.stringify([]));
    });

    // Add item to DOM
    function addItemToDOM(itemName, purchased) {
        let li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.marginBottom = '10px';

        let itemText = document.createElement('span');
        itemText.textContent = itemName;

        itemText.classList.add('item-text');
        itemText.contentEditable = true;
        itemText.style.flexGrow = '1';
        itemText.style.padding = '5px';
        itemText.style.border = '1px solid #ccc';
        itemText.style.borderRadius = '5px';

        itemText.addEventListener('blur', () => {
            // Update the item in the array when editing is finished
            let index = items.findIndex(item => item.name === itemName);
            if (index !== -1) {
                items[index].name = itemText.textContent;
                localStorage.setItem('shoppingList', JSON.stringify(items));
            }
        });

        let purchaseButton = document.createElement('button');
        purchaseButton.textContent = 'Mark Purchased';
        purchaseButton.classList.add('mark-button');

        purchaseButton.addEventListener('click', () => {
            itemText.classList.toggle('purchased');
            let index = items.findIndex(item => item.name === itemName);

            
            if (index !== -1) {
                items[index].purchased = !items[index].purchased;
                localStorage.setItem('shoppingList', JSON.stringify(items));
            }
        });

        if (purchased) {
            itemText.classList.add('purchased');
        }

        li.appendChild(itemText);
        li.appendChild(purchaseButton);
        shoppingList.appendChild(li);
    }
});
