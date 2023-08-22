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
const emailId = myObject.customer_email;
const userid = myObject.userid;

const objstring = localStorage.getItem('inv-data');
const objdata = JSON.parse(objstring);
const vendorName = objdata.vendorname;
console.log(vendorName);

const payNowButton = document.getElementById("payment-btn");
payNowButton.addEventListener('click', async () => {
    try {
        // Move the order from "cart/active" to "cart/inprogress" in the database
        const orderCounterRef = ref(database, 'ordernumber');
        const activeOrderRef = ref(database, `cart/${vendorName}/active/${userid}`);
        const inProgressOrderRef = ref(database, `cart/${vendorName}/inprogress/${userid}`);
        const invRef = ref(database, `vendors/${vendorName}/inventory`);

        get(activeOrderRef).then(async (snapshot) => {
            if (snapshot.exists()) {
                const ordersData = snapshot.val();
        
                // Fetch the current vendor inventory
                get(invRef).then(async (inventorySnapshot) => {
                    if (inventorySnapshot.exists()) {
                        const currentInventory = inventorySnapshot.val();
                        //console.log("current inv", currentInventory);
        
                        // Loop through orders
                        for (const orderKey in Object.entries(ordersData)) {
                            const order = Object.entries(ordersData)[orderKey];
                            //console.log("order", order);
        
                            // Loop through items in the order
                            let itemName = order[0];
                            let categoryName=order[1].category; 
                            
                            
                                
                                if (categoryName != 'beverage') {
                                    
                                    let orderedQuantity = order[1].quantity;
                                    //console.log(orderedQuantity);
                                    
                                    // Subtract ordered quantity from the current inventory
                                    if (currentInventory[categoryName]) {
                                        //console.log("item name", orderedQuantity);
                                        currentInventory[categoryName][itemName].quantity -= orderedQuantity;
                                    }
                                }
                            
                        }
        
                        // Update the vendor's inventory in the database with the new quantities
                        await set(invRef, currentInventory);
                    }
                });
            }
        });

        
        //Fetch the current order number from the order counter
        const orderCounterSnapshot = await get(orderCounterRef);
        let orderNumber = 1; // Default order number if counter doesn't exist
        
        if (orderCounterSnapshot.exists()) {
            orderNumber = orderCounterSnapshot.val().value + 1;
        }
        
        // Get the order data from "cart/active"
        const activeOrderSnapshot = await get(activeOrderRef);
        
        if (activeOrderSnapshot.exists()) {
            const activeOrderData = activeOrderSnapshot.val();
            
            // Update the order data with the new order number
            activeOrderData.orderNumber = orderNumber;
            
            // Update the order in "cart/inprogress"
            await set(inProgressOrderRef, activeOrderData);
            
            // Update the order counter with the new value
            await set(orderCounterRef, { value: orderNumber });
            
            // Remove the order from "cart/active"
            await remove(activeOrderRef);


            
            // Redirect to the checkout page
           window.location.assign('payment.html');
        } else {
            console.log('No active order found');
        }
    } catch (error) {
        console.error('An error occurred:', error);
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

