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


const cartItemsContainer = document.getElementById('cart-items');

// Function to fetch cart data from the Firebase Realtime Database
function fetchCartData(userName, cartStatus) {
    const cartRef = ref(database, `cart/${cartStatus}/${userName}`);
    
    onValue(cartRef, (snapshot) => {
        cartItemsContainer.innerHTML = ''; // Clear the previous content

        if (snapshot.exists()) {
            const cartData = snapshot.val();

            localStorage.setItem('dataKey', JSON.stringify(cartData));
            console.log("cartData",cartData);

            // Loop through the cart items and display them
            for (const itemId in cartData) {
                const cartItem = cartData[itemId];
                
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');

                const itemName = document.createElement('h3');
                itemName.textContent = itemId;

                const itemDetails = document.createElement('p');
                itemDetails.textContent = `Quantity: ${cartItem.quantity} | Price: Rs.${cartItem.totalPrice}`;

                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.classList.add('remove-btn');

                removeBtn.addEventListener('click', () => {
                    
                    //fetchCartData(userName, cartStatus);
                    removeItemFromCart(userName, cartStatus, itemId);
                });




                cartItemElement.appendChild(itemName);
                cartItemElement.appendChild(itemDetails);
                cartItemElement.appendChild(removeBtn);

                cartItemsContainer.appendChild(cartItemElement);
                
            }
        } else {
            cartItemsContainer.textContent = 'No items in the cart.';
            localStorage.setItem('dataKey', null);
        }
    });
}

const storedData = localStorage.getItem('objectGreeting');
const myObject = JSON.parse(storedData);

// Now you can use the data in myObject
const customerName = myObject.customername;
console.log('Customer Name:', customerName);

// Replace 'userId' and 'active' with the actual user's ID and cart status
fetchCartData(customerName, 'active');

function removeItemFromCart(userName, cartStatus, itemId) {
    const cartRef = ref(database, `cart/${cartStatus}/${userName}`);
    update(cartRef, {
        [itemId]: null
    }).then(() => {
        console.log('Item removed from the cart in the database.');

        // Update localStorage to reflect the latest cart data
    }).catch((error) => {
        console.error('Error removing item from the cart:', error);
    });
}



const orderNowLink = document.getElementById('order-now-link');

auth.onAuthStateChanged((user) => {
    if (user) {
        // User is logged in, show the "Order Now" link
        orderNowLink.style.display = 'block';
    } else {
        // User is not logged in, hide the "Order Now" link
        orderNowLink.style.display = 'none';
    }
});

const logoutButton = document.getElementById('logout-btn');
        logoutButton.addEventListener('click', () => {
            //const auth = getAuth();
            signOut(auth).then(() => {
                alert('Logged out');
                window.location.assign('login_user.html');
            // Sign-out successful.
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            // An error happened.
            });
            // Add logout functionality here
            
        });
