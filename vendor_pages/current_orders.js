const logoutButton = document.getElementById('logout-btn');
        logoutButton.addEventListener('click', () => {
            //const auth = getAuth();
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
            // Add logout functionality here
            
        });

        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
        import { getDatabase, set, ref, update, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
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
        console.log(myObject2);

const orderlistref = ref(database, `cart/${myObject2.vendorname}/inprogress`);
const usersData = ref(database, `users`);

// get(orderlistref).then(function(snapshot) {
//     if(snapshot.exists()){

//         const ordersData = snapshot.val();
//         for (let orders in ordersData){
            

//             get(customerDetails).then(function(snapshot){
//                 if(snapshot.exists()){
//                     const usersData = snapshot.val();
//                     let userName = usersData[orders].name;

//                     const orderCard = document.createElement('div');
//                     orderCard.className = 'card mb-3';

//                     const cardBody = document.createElement('div');
//                     cardBody.className = 'card-body';

//                     for(let itemsEach in ordersData[orders]){

//                     const itemName = document.createElement('h3');
//                     if(itemsEach!="orderNumber"){
//                         itemName.textContent = itemsEach;
//                     }

//                     const itemQty = document.createElement('h3');
//                     itemQty.textContent = itemsEach.quantity;


//                     }
//                 }
//             })

            
//         }

//     }
// })

get(orderlistref).then(function(snapshot) {
    if (snapshot.exists()) {
        const ordersData = snapshot.val();
        
        for (let orderKey in ordersData) {
            const order = ordersData[orderKey];
            
            
            const orderCard = document.createElement('div');
            orderCard.className = 'card mb-3';
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            
            
            
            get(usersData).then(function(snapshot){
                if(snapshot.exists()){
                    const usersData = snapshot.val();
                    let userName = usersData[orderKey].name;
            
            const orderNumber = document.createElement('h3');
            orderNumber.textContent = `Order Number: ${order.orderNumber}`;
            cardBody.appendChild(orderNumber);
            
            const customerName = document.createElement('h3');
            customerName.textContent = `Customer: ${userName}`;
            cardBody.appendChild(customerName);

            for (let itemKey in order) {
                if (itemKey !== 'orderNumber') {
                    const itemName = document.createElement('h6');
                    itemName.textContent = itemKey;
                    cardBody.appendChild(itemName);
                    
                    const itemQty = document.createElement('h6');
                    itemQty.textContent = `Quantity: ${order[itemKey].quantity}`;
                    cardBody.appendChild(itemQty);
                }
            }
            
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Completed';
            completeBtn.className = 'btn btn-primary';
            completeBtn.addEventListener('click', function() {
                // Handle completion logic here
            });
            cardBody.appendChild(completeBtn);
            
            orderCard.appendChild(cardBody);
            // Assuming you have an element with the ID "order-container" in your HTML
            document.getElementById('order-container').appendChild(orderCard);
        }})
    }
    }
});
