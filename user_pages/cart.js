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

const objstring = localStorage.getItem('inv-data');
const objdata = JSON.parse(objstring);
const vendorName = objdata.vendorname;
console.log(vendorName);

const storedData = localStorage.getItem('objectGreeting');
const myObject = JSON.parse(storedData);
const emailId = myObject.customer_email;
let userid = myObject.userid;
//console.log(userid);

const ordernowlink = document.getElementById('order-now-link');
ordernowlink.addEventListener('click', function(){
    window.location.assign(`order_${vendorName[0]}.html`);
})

const cartItemsContainer = document.getElementById('cart-items');

// Function to fetch cart data from the Firebase Realtime Database
function fetchCartData(userid, cartStatus) {
    const cartRef = ref(database, `cart/${vendorName}/${cartStatus}/${userid}`);
    console.log("printing", vendorName, cartStatus, userid );
    
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
                    
                    
                    removeItemFromCart(userid, cartStatus, itemId);
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



// Now you can use the data in myObject
const customerName = myObject.customername;
userid = myObject.userid;

console.log('Customer Name:', customerName);

// Replace 'userId' and 'active' with the actual user's ID and cart status
fetchCartData(userid, 'active');

function removeItemFromCart(userid, cartStatus, itemId) {
    const cartRef = ref(database, `cart/${vendorName}/${cartStatus}/${userid}`);
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

function calculateTotalPrice(cartItems) {
    let totalPrice = 0;

    for (const itemName in cartItems) {
        const cartItem = cartItems[itemName];
        totalPrice += cartItem.totalPrice;
    }

    return totalPrice;
}



setTimeout(() => {
    
    const cartRef = ref(database, `cart/${vendorName}/active/${userid}`);
    get(cartRef).then((snapshot) => {
        if(snapshot.exists()){
            const cartData = snapshot.val();
            const cartTotalContainer = document.createElement('div');
    cartTotalContainer.className = 'cart-total-container';

    const totalPriceText = document.createElement('p');
    const totalAmount = calculateTotalPrice(cartData);
    totalPriceText.textContent = `Total Price: Rs.${totalAmount}`;
    cartTotalContainer.appendChild(totalPriceText);

    const checkoutButton = document.createElement('button');
    checkoutButton.className = 'btn btn-success';
    checkoutButton.textContent = 'Checkout';
    cartTotalContainer.appendChild(checkoutButton);

    const cartContainer = document.querySelector('.cart-container');
    cartContainer.appendChild(cartTotalContainer);
        
    checkoutButton.addEventListener('click', () => {
        // Redirect to checkout.html
        window.location.href = 'checkout.html';
    });
    }

    })
    

},2000)



