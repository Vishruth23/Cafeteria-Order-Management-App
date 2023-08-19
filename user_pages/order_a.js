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

    inventoryItem.appendChild(itemNameHeading);
    inventoryItem.appendChild(itemPriceText);
    inventoryItem.appendChild(addtocartbtn);

    

    menuContainer.appendChild(inventoryItem); // Append to the menu container

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


                menuContainer.appendChild(createInventoryItem(Object.entries(
                    item[i][1])[j][0], 
                    item[i][0], 
                    Object.entries(item[i][1])[j][1].quantity, 
                    Object.entries(item[i][1])[j][1].price
                ));

                const addToCart = document.getElementById(`atc-${Object.entries(item[i][1])[j][0]}`);
                addToCart.addEventListener("click", function addToCartClicked(){
                    console.log(`Add to cart clicked - name : ${Object.entries(item[i][1])[j][0]}`);
                    addToCart.textContent = 'Added to Cart';
                    addToCart.removeEventListener('click', addToCartClicked);
                })
            }
        }
    }
})


