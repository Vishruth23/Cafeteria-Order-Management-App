import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, set, ref, update, get, child, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
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

const myObjectString2 = localStorage.getItem('objectdata');
const myObject2 = JSON.parse(myObjectString2);

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

// Reference to past orders
const pastOrdersRef = ref(database, `cart/${myObject2.vendorname}/completed`);

// Function to display orders
function displayPastOrders(ordernumber, ordersData) {
    const orderList = document.getElementById("order-list");
    
    //console.log(ordersData);
    

    for (const orderKey in ordersData) {
        
        
        const order = ordersData[orderKey];
        

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
        // 
        
        

        // Create order details elements (e.g., order number, customer name, items, etc.)
        // Append these elements to the orderCard

        orderContainer.appendChild(orderCard);
        orderList.appendChild(orderContainer);
    }
}
}

/////////past orders needs to be changed


// onValue(pastOrdersRef, (snapshot) => {
//     if (snapshot.exists()) {
//         const ordersData = snapshot.val();
        
//         // Retrieve existing data from local storage
//         const existingDataString = localStorage.getItem("pastOrders");
//         let existingData = JSON.parse(existingDataString);
        
//         if (!Array.isArray(existingData)) {
//             existingData = [];
//         }
        
//         // Check if the new data is already present in the stored data
//         const newDataKey = Object.keys(ordersData)[0]; // Assuming each order has a unique key
//         const isDataAlreadyStored = existingData.some(data => Object.keys(data)[0] === newDataKey);
        
//         if (!isDataAlreadyStored) {
//             existingData.push(ordersData);
//             localStorage.setItem("pastOrders", JSON.stringify(existingData));
//         }
//     }
// });


onValue(pastOrdersRef, (snapshot) =>{
    if(snapshot.exists()){
        const existingData = snapshot.val();
        for(let [i,j] of Object.entries(existingData))
        //console.log(i,j);
        displayPastOrders(i,j);
        }   
})

    
        
        



