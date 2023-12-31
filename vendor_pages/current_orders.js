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
            
            });
           
            
        });



        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
        import { getDatabase, set, ref, update, get, remove, onValue } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
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

        const myObjectString2 = localStorage.getItem('objectdata');
        const myObject2 = JSON.parse(myObjectString2);
        let vendorName = myObjectString2.vendorname;
        console.log(myObject2);

const orderlistref = ref(database, `cart/${myObject2.vendorname}/inprogress`);
const usersData = ref(database, `users`);


onValue(orderlistref, function(snapshot){
    if (snapshot.exists()) {

        let orderCont = document.getElementById("order-container");
        orderCont.innerHTML="";
        const ordersData = snapshot.val();
        //console.log(ordersData)
        
        for (let orderKey in ordersData) {
            
            let order = ordersData[orderKey];
            order = Object.values(order)[0];
            let orderNumber = order.orderNumber;
            //console.log("order number", orderNumber)
            
            
            
            const orderCard = document.createElement('div');
            orderCard.className = 'card mb-3';
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            
            
            
            get(usersData).then(function(snapshot){
                if(snapshot.exists()){
                    const usersData = snapshot.val();
                    //console.log(Object.keys(ordersData[orderKey])[0]);
                    let userName = usersData[Object.keys(ordersData[orderKey])[0]].name;
            
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
            completeBtn.textContent = 'Order Ready';
            completeBtn.className = 'btn btn-primary';
            completeBtn.id = `complete-btn-${order.orderNumber}`;
            completeBtn.addEventListener('click', function() {
            });
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'buttons-container';
            cardBody.appendChild(buttonsContainer);

            setTimeout(function(){


                let completeBtn = document.getElementById(`complete-btn-${order.orderNumber}`);
                console.log(order.orderNumber);
                
                completeBtn.addEventListener('click', async function(){
                try {
                    
                    const inProgressOrderRef = ref(database, `cart/${myObject2.vendorname}/inprogress/${order.orderNumber}`);
                    //console.log(order.orderNumber);
                    const completedOrderRef = ref(database, `cart/${myObject2.vendorname}/completed/${order.orderNumber}`); // New reference for ready orders
                    
                    console.log(`cart/${myObject2.vendorname}/inprogress/${order.orderNumber}`);
                    
                
                    const inProgressOrderSnapshot = await get(inProgressOrderRef);

                    console.log(inProgressOrderSnapshot.val());
                    
                    if (inProgressOrderSnapshot.exists()) {
                        const inProgressOrderData = inProgressOrderSnapshot.val();
            
                        alert("order-ready notified");
                        set(ref(database, `notifs/${order.orderNumber}`), {status:"notified"});
                        const currentDate = new Date();
                        const transactionDateTime = currentDate.toLocaleString(); 
                        inProgressOrderData.transactionDateTime = transactionDateTime;
                     
            
                        const markCompleteBtn = document.createElement('button');
                        markCompleteBtn.textContent = 'Mark Complete';
                        markCompleteBtn.className = 'btn btn-success';
                        buttonsContainer.appendChild(markCompleteBtn);
            
                        markCompleteBtn.addEventListener('click', async function() {
            
                        await set(completedOrderRef, inProgressOrderData);
                        // Remove the order from "cart/inprogress"
                        remove(inProgressOrderRef);
                        remove(ref(database, `notifs/${order.orderNumber}`))
                        })
                        
                        // Redirect to the checkout page
                        
                        
                        
                    } else {
                        console.log('No in-progress order found');
                    }
                } catch (error) {
                    console.log('An error occurred:', error.message);
                }
            });
            
            },3000);

            cardBody.appendChild(completeBtn);
            
            orderCard.appendChild(cardBody);
           
            document.getElementById('order-container').appendChild(orderCard);
        }})
    }
    }
});




