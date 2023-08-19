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

const myObjectString = localStorage.getItem('objectGreeting');

// Parse the JSON string to get the user object
const myObject = JSON.parse(myObjectString);

// Extract the user's name from the object
const userName = myObject.customername;
console.log(userName);

let total_price = 0;

function atc1(cartStatus){
const cartRef = ref(database, `cart/${cartStatus}/${userName}`);
update(cartRef, {
})
}
atc1("active");



const menuContainer = document.querySelector('.menu');

function createInventoryItem(name, category, quantity, price) {
     // Select the menu container

    const inventoryItem = document.createElement('div');
    inventoryItem.className = 'menu-item';

    const itemNameHeading = document.createElement('h3');
    itemNameHeading.textContent = name;

    const itemPriceText = document.createElement('p');
    itemPriceText.textContent = `Price: Rs.${price}`;
    

    const addtocartbtn = document.createElement('button');
    addtocartbtn.className = 'btn btn-primary';
    addtocartbtn.textContent = 'Add to Cart';
    addtocartbtn.id = `atc-${name}`

/////////
    const quantityControls = document.createElement('div');
    quantityControls.className = 'quantity-controls';

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    minusBtn.className = 'quantity-btn';

    const quantityDisplay = document.createElement('span');
    quantityDisplay.textContent = '1';
    quantityDisplay.className = 'quantity-display';

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.className = 'quantity-btn';

    const removeBtn = document.createElement('button'); // Create the Remove from Cart button
    removeBtn.textContent = 'Remove from Cart';
    removeBtn.className = 'btn btn-danger remove-btn';

    quantityControls.appendChild(minusBtn);
    quantityControls.appendChild(quantityDisplay);
    quantityControls.appendChild(plusBtn);
    quantityControls.appendChild(removeBtn);


/////////


    inventoryItem.appendChild(itemNameHeading);
    inventoryItem.appendChild(itemPriceText);
    inventoryItem.appendChild(addtocartbtn);
    inventoryItem.appendChild(quantityControls);
    

    menuContainer.appendChild(inventoryItem); // Append to the menu container


    addtocartbtn.addEventListener('click', function addToCartClicked() {
        console.log(`Add to cart clicked - name: ${name}`);
        addtocartbtn.textContent = 'Added to Cart';
        total_price = Number(price);
        addtocartbtn.removeEventListener('click', addToCartClicked);

        // Show quantity controls after adding to cart
        quantityControls.style.display = 'flex';

        // Initialize quantity value
        let quantityValue = 1;
        quantityDisplay.textContent = quantityValue;

        minusBtn.addEventListener('click', function () {
            if (quantityValue > 1) {
                quantityValue--;
                quantityDisplay.textContent = quantityValue;
                total_price = total_price-Number(price);
                updateUserCart("active", name, quantityValue, total_price);
                console.log(name,quantityValue);
            }
        });

        plusBtn.addEventListener('click', async function () {
            const inventoryRef = ref(database, `vendors/aryabhatta/inventory/${category}/${name}/quantity`);
            const inventorySnapshot = await get(inventoryRef);
            const availableQuantity = inventorySnapshot.val();
        
            if(category!="beverage"){
            if (quantityValue < availableQuantity) {
                console.log(category);
                quantityValue++;
                total_price = total_price+Number(price);
                quantityDisplay.textContent = quantityValue;
                updateUserCart("active", name, quantityValue, total_price);
                console.log(name, quantityValue);
            } else {
                console.log("Reached maximum available quantity.");
            }
        }
        else{
                quantityValue++;
                total_price = total_price+Number(price);
                quantityDisplay.textContent = quantityValue;
                console.log(name, quantityValue);
                updateUserCart("active", name, quantityValue, total_price);
        }
        });


        updateUserCart("active", name, quantityValue, total_price);
    });

    
    return inventoryItem;
}



onValue(ref(database, `vendors/aryabhatta/inventory`), function(snapshot){
    if(snapshot.exists()){
        menuContainer.innerHTML="";
        let item = Object.entries(snapshot.val())
        for(let i=0; i<item.length; i++){
            //console.log(item[i][0], Object.entries(item[i][1]));
            const categoryHeading = document.createElement('h2');
            categoryHeading.textContent = item[i][0].charAt(0).toUpperCase() + item[i][0].slice(1)+"s"; // Capitalize the category name
            menuContainer.appendChild(categoryHeading);
            for(let j=0; j<Object.entries(item[i][1]).length; j++){
                //console.log(item[i][0], Object.entries(item[i][1])[j]);


                menuContainer.appendChild(createInventoryItem(
                    Object.entries(item[i][1])[j][0], 
                    item[i][0], 
                    Object.entries(item[i][1])[j][1].quantity, 
                    Object.entries(item[i][1])[j][1].price
                ));

                // const addToCart = document.getElementById(`atc-${Object.entries(item[i][1])[j][0]}`);
                // addToCart.addEventListener("click", function addToCartClicked(){
                //     console.log(`Add to cart clicked - name : ${Object.entries(item[i][1])[j][0]}`);
                //     addToCart.textContent = 'Added to Cart';
                //     addToCart.removeEventListener('click', addToCartClicked);
                // })
            }
        }
    }
})

function updateUserCart(cartStatus, itemName, quantity, totalPrice) {
    const cartRef = ref(database, `cart/${cartStatus}/${userName}`);

    // Update the cart with the item details
    update(cartRef, {
        [itemName]: {
            quantity: quantity,
            totalPrice: totalPrice
        }
    })
}


