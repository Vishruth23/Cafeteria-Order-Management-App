import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
        import { getDatabase, set, ref, update, get, onValue } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
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


       



// const objstring = localStorage.getItem('inv-data');
// const objdata = JSON.parse(objstring);
// const vendorName = objdata.vendorname;
// console.log(vendorName);

const storedData = localStorage.getItem('objectGreeting');
const myObject = JSON.parse(storedData);
const emailId = myObject.customer_email;
let userid = myObject.userid;


const orderlistref = ref(database, `cart/aryabhatta/inprogress`);
const usersData = ref(database, `users`);


onValue(orderlistref, function(){
    document.getElementById('order-container').innerHTML=""

    get(orderlistref).then(function(snapshot) {
        if (snapshot.exists()) {

            const loadingContainer = document.getElementById('loading-container');
            loadingContainer.style.display = 'none';



            const ordersData = snapshot.val();
    
            for (let orderKey in ordersData) {
                let order = ordersData[orderKey][userid];
    
                const orderCard = document.createElement('div');
                orderCard.className = 'card mb-3';
    
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';
    
                get(usersData).then(function(snapshot){
                    if(snapshot.exists()){
                        const usersData = snapshot.val();
                        let userName = usersData[Object.keys(ordersData[orderKey])[0]].name;
    
                        const orderNumber = document.createElement('h3');
                        orderNumber.textContent = `Order Number: ${order.orderNumber}`;
                        orderNumber.classList.add('fw-bold'); // Adding Bootstrap class for bold text
                        cardBody.appendChild(orderNumber);
    
                        const location = document.createElement('h3');
                        location.textContent = 'Aryabhatta'; // You can change this to your actual location
                        location.classList.add('fw-bold'); // Adding Bootstrap class for bold text
                        cardBody.appendChild(location);
    
                        // Create an unordered list to hold the items
                        const itemList = document.createElement('ul');
                        for (let itemKey in order) {
                            if (itemKey !== 'orderNumber') {
                                const listItem = document.createElement('li');
                                listItem.textContent = `${itemKey}: Quantity - ${order[itemKey].quantity}`;
                                itemList.appendChild(listItem);
                            }
                        }
    
                        cardBody.appendChild(itemList);
    
                        orderCard.appendChild(cardBody);
                        // Append the order card to the order container
                        document.getElementById('order-container').appendChild(orderCard);
                    }
                });
            }
        }
    });
    

})


const orderlistref2 = ref(database, `cart/ramanujan/inprogress`);
onValue(orderlistref2, function(){


    get(orderlistref2).then(function(snapshot) {
        if (snapshot.exists()) {

            const loadingContainer = document.getElementById('loading-container');
            loadingContainer.style.display = 'none';



            const ordersData = snapshot.val();
    
            for (let orderKey in ordersData) {
                let order = ordersData[orderKey][userid];
    
                const orderCard = document.createElement('div');
                orderCard.className = 'card mb-3';
    
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';
    
                get(usersData).then(function(snapshot){
                    if(snapshot.exists()){
                        const usersData = snapshot.val();
                        let userName = usersData[Object.keys(ordersData[orderKey])[0]].name;
    
                        const orderNumber = document.createElement('h3');
                        orderNumber.textContent = `Order Number: ${order.orderNumber}`;
                        orderNumber.classList.add('fw-bold'); // Adding Bootstrap class for bold text
                        cardBody.appendChild(orderNumber);
    
                        const location = document.createElement('h3');
                        location.textContent = 'Ramanujan'; // You can change this to your actual location
                        location.classList.add('fw-bold'); // Adding Bootstrap class for bold text
                        cardBody.appendChild(location);
    
                        // Create an unordered list to hold the items
                        const itemList = document.createElement('ul');
                        for (let itemKey in order) {
                            if (itemKey !== 'orderNumber') {
                                const listItem = document.createElement('li');
                                listItem.textContent = `${itemKey}: Quantity - ${order[itemKey].quantity}`;
                                itemList.appendChild(listItem);
                            }
                        }
    
                        cardBody.appendChild(itemList);
    
                        orderCard.appendChild(cardBody);
                        // Append the order card to the order container
                        document.getElementById('order-container').appendChild(orderCard);
                    }
                });
            }
        }
    });
    

})

