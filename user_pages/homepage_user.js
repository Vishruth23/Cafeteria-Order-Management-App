// user_home.js

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

// Logout functionality
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
        

const aryabhattaButton = document.getElementById('aryabhatta-button');
const ramanujanButton = document.getElementById('ramanujan-button');

// Add click event listeners to the buttons
aryabhattaButton.addEventListener('click', () => {
    // Redirect to Aryabhatta Ground Floor page
    get(ref(database, `vendors/aryabhatta`))
        .then((snapshot) => {
            const vendorDetails = snapshot.val();
            //console.log(vendorDetails);
            const vendorName = vendorDetails.name;
            const inv = vendorDetails.inventory;
            //console.log(vendorName, inv);
            const myObject = {vendorname: `${vendorName}`, inventory: inv}
            const myObjectString = JSON.stringify(myObject);
            localStorage.setItem('inv-data-aryabhatta', myObjectString);
            window.location.assign('order_a.html');
    })
    
});

ramanujanButton.addEventListener('click', () => {
    // Redirect to Aryabhatta Ground Floor page
    get(ref(database, `vendors/ramanujan`))
        .then((snapshot) => {
            const vendorDetails = snapshot.val();
            //console.log(vendorDetails);
            const vendorName = vendorDetails.name;
            const inv = vendorDetails.inventory;
            //console.log(vendorName, inv);
            const myObject = {vendorname: `${vendorName}`, inventory: inv}
            const myObjectString = JSON.stringify(myObject);
            localStorage.setItem('inv-data-ramanujan', myObjectString);
            window.location.assign('order_r.html');
    })
    
});


// Initial content of the page (no past orders)
// const content = document.getElementById('content');
// content.innerHTML = "<p>You have no past orders.</p>";

// Listen to changes in past orders and update content


// onValue(ref(database, `users/${auth.currentUser.uid}/pastOrders`), (snapshot) => {
//     if (snapshot.exists()) {
//         // Update content with past order details
//         // Iterate through orders and create HTML elements as needed
//     } else {
//         // No past orders, display a message
//         content.innerHTML = "<p>You have no past orders.</p>";
//     }
// });


// Add code to handle placing orders and managing the cart
// ...

// Add more JavaScript code as needed
