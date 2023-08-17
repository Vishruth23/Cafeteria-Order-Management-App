
const myObjectString2 = localStorage.getItem('objectdata');
const myObject2 = JSON.parse(myObjectString2);
//console.log(myObject2);


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
        inventoryList.removeChild(inventoryItem);
    });

    itemDetails.appendChild(itemNameHeading);
    itemDetails.appendChild(itemCategoryText);
    itemDetails.appendChild(itemQuantityText);
    itemDetails.appendChild(itemPriceText);  
    itemDetails.appendChild(editQuantityLink);
    itemDetails.appendChild(deleteItemLink);

    inventoryItem.appendChild(itemDetails);

    return inventoryItem;
}




import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, set, ref, update, get, child, push } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// import{_getProvider,_registerComponent as e,registerVersion as t,getApp as r,SDK_VERSION as n}from"https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

//console.log(myObject2)

get(ref(database, `vendors/${myObject2.vendorname}/inventory/snacks`))
    .then((snapshot) => {
        const productdetails = snapshot.val();
        for (const p1 in productdetails) {
            const productName = p1;           // Get the snack name ("lays")
            const productItems = productdetails[p1];
            //console.log("name:",p1,"price:",productItems[0], "qty:",productItems[1]);
        }
        //const userName = userDetails.name;
        //console.log(snackdetails);
})



addItemButton.addEventListener('click', () => {
    const itemName = itemNameInput.value;
    const itemCategory = itemCategorySelect.value;
    const itemQuantity = itemQuantityInput.value;
    const itemPrice = itemPriceInput.value;  // Get the price value

    if (!itemName || itemCategory === 'none' || isNaN(itemPrice) || itemPrice < 0) {
        alert('Please enter valid item details.');
        return;
    }


    //push(ref(database, `vendors/${myObject2.vendorname}/inventory/${itemCategory}`).child(`${itemName}`), [itemPrice,itemQuantity]);
    console.log(myObject2.vendorname);
    const inventoryRef = ref(database, `vendors/${myObject2.vendorname}/inventory/${itemCategory}`);
    const itemRef = child(inventoryRef, itemName);

    const newItem = {
    price: itemPrice,
    quantity: itemQuantity
    };

    set(itemRef, newItem).then(alert("Item added successfully"));

    //inventoryList.appendChild(createInventoryItem(itemName, itemCategory, itemQuantity, itemPrice));
});