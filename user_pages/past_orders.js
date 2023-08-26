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

        
});


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

const storedData = localStorage.getItem('objectGreeting');
const myObject = JSON.parse(storedData);
const emailId = myObject.customer_email;
let userid = myObject.userid;

const pastOrdersRef1 = ref(database, `cart/aryabhatta/completed`);
const pastOrdersRef2 = ref(database, `cart/ramanujan/completed`);

// Function to display orders
function displayPastOrders(cclocation,ordernumber, ordersData) {
    const orderList = document.getElementById("order-list");
    //orderList.innerHTML = ""; // Clear previous content

    const orderContainer = document.createElement("div");
    orderContainer.className = "order-container";

    const orderCard = document.createElement("div");
    orderCard.className = "order-card";

    for (const orderKey in ordersData) {
        
        if(orderKey==userid){
        const order = ordersData[orderKey];
        console.log(orderKey);

        

        const orderContainer = document.createElement("div");
        orderContainer.className = "order-container";

        const orderCard = document.createElement("div");
        orderCard.className = "order-card";
        

        const orderNumber = document.createElement('h3');
        orderNumber.textContent = `Order Number: ${ordernumber}`;
        orderCard.appendChild(orderNumber);

        const transactionTime = document.createElement('h3');
        transactionTime.textContent = `Date/Time of order: ${ordersData.transactionDateTime}`;
        orderCard.appendChild(transactionTime);

        const cc_location = document.createElement('h3');
        cc_location.textContent = `Location: ${cclocation} Coffee Cove`;
        orderCard.appendChild(cc_location);

        if(orderKey!="transactionDateTime"){
            //console.log(order);

        let total_price = 0;
        for(let orderit in order){
            console.log(orderit)
            
            
            if(orderit!="orderNumber"){
                

                const ItemName = document.createElement('p');
                ItemName.textContent = `Item name: ${orderit}`;
                orderCard.appendChild(ItemName);

                const Itemqty = document.createElement('p');
                Itemqty.textContent = `Qty: ${order[orderit].quantity}, Price: Rs.${order[orderit].totalPrice}`;
                orderCard.appendChild(Itemqty);

                total_price = total_price+order[orderit].totalPrice;
            }

        }

        const totalPricetext = document.createElement('h3');
        totalPricetext.textContent = `Total Cost: ${total_price}`;
        orderCard.appendChild(totalPricetext);
        
    
        orderContainer.appendChild(orderCard);
        orderList.appendChild(orderContainer);
    }
}
}
}

// Listen for changes in past orders
onValue(pastOrdersRef1, (snapshot) => {
    if (snapshot.exists()) {
        const ordersData = snapshot.val();
        for(let [i,j] of Object.entries(ordersData)){
            //console.log(i,j)
            displayPastOrders("Aryabhatta",i,j);
        }
    }
});

onValue(pastOrdersRef2, (snapshot) => {
    if (snapshot.exists()) {
        const ordersData = snapshot.val();
        for(let [i,j] of Object.entries(ordersData)){
            //console.log(i,j)
            displayPastOrders("Ramanujan",i,j);
        }
    }
});
