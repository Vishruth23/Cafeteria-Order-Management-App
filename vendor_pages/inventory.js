
const myObjectString2 = localStorage.getItem('objectdata');
const myObject2 = JSON.parse(myObjectString2);
//console.log(myObject2);

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, set, ref, update, get, child, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyC5m1QkX6ecuWN7svNBaHxLGortp84T0ts",
authDomain: "zense-offl.firebaseapp.com",
databaseURL: "https://zense-offl-default-rtdb.firebaseio.com",
projectId: "zense-offl",
storageBucket: "zense-offl.appspot.com",
messagingSenderId: "297061345791",
appId: "1:297061345791:web:4d53117c64b367bdcbdfca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const logoutButton = document.getElementById('logout-btn');
        logoutButton.addEventListener('click', () => {
            signOut(auth).then(() => {
                alert('Logged out');
                window.location.assign('login_vendor.html');
            // Sign-out successful.
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            // An error happened.
            });
        });

const addItemButton = document.getElementById('add-item-btn');
const itemNameInput = document.getElementById('item-name');
const itemCategorySelect = document.getElementById('item-category');
const itemQuantityInput = document.getElementById('item-quantity');
const itemPriceInput = document.getElementById('item-price');
const inventoryList = document.getElementById('inventory-list');

function createInventoryItem(name, category, quantity, price) {
    const inventoryItem = document.createElement('div');
    inventoryItem.className = 'inventory-item';

    const itemDetails = document.createElement('div');
    itemDetails.className = 'item-details';

    const itemNameHeading = document.createElement('h3');
    itemNameHeading.textContent = name;

    const itemCategoryText = document.createElement('p');
    itemCategoryText.textContent = `Category: ${category === 'snack' ? 'Snacks' : category === 'beverage' ? 'Beverages' : 'Chocolate'}`;

    const itemQuantityText = document.createElement('p');
    itemQuantityText.textContent = category === 'snack' || category === 'chocolate' ? `Quantity: ${quantity}` : '';

    const itemPriceText = document.createElement('p');
    itemPriceText.textContent = `Price: ${price}`;

    const editQuantityLink = document.createElement('span');
    editQuantityLink.className = 'edit-quantity';
    editQuantityLink.textContent = 'Edit Quantity';
    editQuantityLink.addEventListener('click', () => {
        const newQuantity = prompt('Enter new quantity:');
        if (newQuantity !== null && !isNaN(newQuantity) && newQuantity >= 0) {
            itemQuantityText.textContent = category === 'snack' || category === 'chocolate' ? `Quantity: ${newQuantity}` : '';
        }
    });

    const deleteItemLink = document.createElement('span');
    deleteItemLink.className = 'delete-item';
    deleteItemLink.textContent = 'Delete';
    deleteItemLink.addEventListener('click', () => {
        const confirmDelete = confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            inventoryList.removeChild(inventoryItem);
    
            // Remove from Firebase database
            const inventoryRef = ref(database, `vendors/${myObject2.vendorname}/inventory/${category}`);
            const itemRef = child(inventoryRef, name);
    
           
            remove(itemRef);
        }
    });

    
    itemDetails.appendChild(itemNameHeading);
    itemDetails.appendChild(itemCategoryText);
    itemDetails.appendChild(itemQuantityText);
    itemDetails.appendChild(itemPriceText);  
    //itemDetails.appendChild(editQuantityLink);
    itemDetails.appendChild(deleteItemLink);

    inventoryItem.appendChild(itemDetails);


    return inventoryItem;

    
}




addItemButton.addEventListener('click', () => {
    const itemName = itemNameInput.value;
    const itemCategory = itemCategorySelect.value;
    const itemQuantity = itemQuantityInput.value;
    const itemPrice = itemPriceInput.value;  // Get the price value

    if (!itemName || itemCategory === 'none' || isNaN(itemPrice) || itemPrice < 0) {
        alert('Please enter valid item details.');
        return;
    }


    
    console.log(myObject2.vendorname);
    const inventoryRef = ref(database, `vendors/${myObject2.vendorname}/inventory/${itemCategory}`);
    const itemRef = child(inventoryRef, itemName);

    const newItem = {
    price: itemPrice,
    quantity: itemQuantity
    };

    set(itemRef, newItem).then(alert("Item added successfully"));

   
});




onValue(ref(database, `vendors/${myObject2.vendorname}/inventory`), function(snapshot){
    if(snapshot.exists()){
        inventoryList.innerHTML="";
        let item = Object.entries(snapshot.val())
        for(let i=0; i<item.length; i++){
            //console.log(item[i][0], Object.entries(item[i][1]));
            const categoryHeading = document.createElement('h2');
            categoryHeading.textContent = item[i][0].charAt(0).toUpperCase() + item[i][0].slice(1)+"s"; // 
            inventoryList.appendChild(categoryHeading);
            for(let j=0; j<Object.entries(item[i][1]).length; j++){
                
                inventoryList.appendChild(createInventoryItem(Object.entries(item[i][1])[j][0], item[i][0], Object.entries(item[i][1])[j][1].quantity, Object.entries(item[i][1])[j][1].price));
            }
        }
    }
})