## Code Documentation

#### General Format: File/folder names followed by description of what functions/features are implemented in that file/folder .

## Files in Root Directory

### index.html, index.css, index.js, icon images, background images

<p> index.html is the main HTML file that is first displayed when the user enters the app/url. This page gives the user the option to select vendor side or customer side. It is a common homepage for both customers and vendors. the css and js files are for the corresponding html file.

## Sign-up, Login and Authentication

<p> Firebase provides a comprehensive authentication system that simplifies the process of implementing secure login and signup functionality. In my Coffee Cove App, Firebase handles user authentication, allowing users(both customers and vendors) to create accounts, log in, and access their respective profiles.

However, for demonstration purpose, the signup of vendors has been disabled, also keeping in mind that there is a single vendor of Coffee Cove in IIITB, for the respective 2 locations within IIITB, 2 individual accounts have been created in the backend.

1. <strong>User Signup</strong>:

When a new user wants to create an account on the Coffee Cove App, Firebase's authentication system facilitates the signup process. Here's how it works:

<ul>
<li>The user visits the signup page and provides their email address and a password.

<li>Upon form submission, the app's JavaScript code initiates a signup request to Firebase using the createUserWithEmailAndPassword method.

<li>Firebase securely stores the user's email and hashed password in its authentication system.
If the signup is successful, Firebase sends a verification email to the user's provided email address for added security.

<li>The user's account is created, and they can now use their credentials to log in.
</ul>

2. **User Login**:

For returning users who want to access their accounts, Firebase provides a seamless login process:

<ul>

<li>The user visits the login page and provides their registered email and password.

<li>The app's JavaScript code triggers a login request to Firebase using the signInWithEmailAndPassword method.

<li>Firebase verifies the provided credentials against its authentication records.

<li>If the credentials are valid, Firebase establishes a secure session for the user, allowing them to access their account.
<br><br>
</ul>

3. **Security and Verification**:

Firebase incorporates various security measures to ensure user data remains safe:

<ul>

<li>Passwords are hashed and stored securely in Firebase's authentication system.

<li>Email verification adds an extra layer of security by confirming the user's ownership of the provided email address.

<li>Firebase handles session management, automatically expiring sessions after a certain period of inactivity.
</ul>

All data collected is stored in firebase realtime database.

## Files in vendor-side

### current_orders

<p> The "current_orders" files on the vendor's side play a crucial role in providing vendors with real-time information about the orders that are currently being processed.

File Structure:

<ul>
<li><strong>current_orders.html</strong>: This HTML file serves as the structure for the "Current Orders" page. It includes placeholders for dynamically generated order cards.

<li><strong>current_orders.css</strong>: This CSS file contains styles and layout rules for styling the "Current Orders" page.

<li><strong>current_orders.js</strong>: This JavaScript file handles the dynamic creation of order cards and real-time updates using Firebase.

</ul><br>

<p>The html and css files perform basic functionalities like providing skeleton of the web-page and styling.

<strong>current_orders.js</strong>:

<ul>

<li>This JavaScript file is responsible for retrieving real-time order data from the Firebase Realtime Database and dynamically generating order cards on the page.
It listens to changes in the database and updates the page accordingly whenever there's a change in the orders.
<br><br>

<li>Using Firebase's Realtime Database listeners, it fetches the orders that are currently in progress for the vendor.
<br><br>

<li>It dynamically creates order cards for each order retrieved from the database. These cards typically include information like order number, items, quantities, price, etc.
It includes event listeners to handle user interactions, such as marking an order as complete.

</ul>
When an order is marked as <i>"ready"</i>, a pop-up notification is sent to the user notifying the user that their order is now ready to be collected.
<br><br>

<strong>Key Features</strong>:

<strong>Real-Time Updates</strong>: The JavaScript code uses Firebase's real-time data synchronization to ensure that any changes to the orders (such as new orders or updates) are reflected immediately on the "Current Orders" page.

<strong>Dynamic Card Generation</strong>: The script dynamically generates order cards for each order fetched from the database. These cards provide a clear overview of order details.

<strong>User Interaction</strong>: If a vendor marks an order as complete, the JavaScript code can trigger actions such as moving the order from "in progress" to "completed" and notifying the user.

<strong>Responsive Design</strong>: The CSS ensures that the "Current Orders" page is responsive and adapts to different screen sizes and devices.

### Past_orders

Fetches the past orders that users will have placed and displays them to the vendor. Used functions like get() and onValue() to fetch the realtime data from the database, due to data being dynamic data.

### Inventory page

<strong>inventory.js</strong>:

This JavaScript file manages the dynamic display and management of inventory items using Firebase's Realtime Database.

It retrieves inventory data from the database and populates the page with the current inventory items.

It handles vendor interactions such as adding new items, updating existing items, and deleting items from the inventory.

## Files in Customer-side

<strong>homepage_user.html</strong>:

The "homepage_user.html" file serves as the entry point for users of the Coffee Cove App. This file is the home page that users see when they log in. It provides a user-friendly interface and options tailored to the needs of customers. Below are the key components and features of this HTML file:

<strong>Navigation</strong>: The navigation bar at the top of the page provides easy access to different sections of the app, such as viewing current orders, past orders, and the inventory.

<strong>Responsive Design</strong>: The layout is designed to be responsive, adapting to different screen sizes and devices for a consistent user experience.

<strong>fetch_curr_orders.js</strong>:

The "fetch_curr_orders.js" file is responsible for fetching and displaying the current orders placed by the user. It interacts with Firebase's Realtime Database to retrieve and display relevant information. Here's a breakdown of its functionalities:

<ul>
<li><strong>Fetching Orders</strong>: The JavaScript code fetches the user's current orders from the Firebase Realtime Database. It identifies the orders associated with the user's unique identifier (userid).
<br><br>
<li><strong>Dynamically Generating Cards</strong>: For each order, the script dynamically generates a card element. This card contains details such as order number, and items.
<br><br>
<li><strong>Displaying Order Details</strong>: The script populates the card with information about the items in the order, including their names and quantities.
<br><br>

<li><strong>Responsive Design</strong>: The layout and styling are designed to provide an organized and user-friendly display on various devices, making it easy for users to keep track of their current orders.
<br><br>
<li><strong>Interactive Elements</strong>: Depending on the app's features, interactive buttons might allow users to track the progress of their orders or take specific actions related to the order.
</ul>

<strong>Key Features and Benefits</strong>:

<strong>Efficient Order Tracking</strong>: "fetch_curr_orders.js" empowers users to keep track of their current orders, enhancing their overall experience by providing transparency and real-time updates.

<strong>Seamless User Experience</strong>: The combination of an intuitive homepage and dynamic order tracking contributes to a seamless and user-friendly interaction with the app.

<strong>Personalized Information</strong>: By associating orders with the user's unique identifier, the app offers personalized information tailored to each individual user.

### Order Pages and Cart

#### <strong>order_a.html and order_j.html</strong>:

The "order_a.html" and "order_j.html" files represent the order placement pages tailored to different user preferences or needs. These pages allow users to customize their coffee or snack orders based on their choices.

**Order Customization**: Users can select their preferred coffee or snack options from a menu.

**Quantity Selection**: Users can specify the quantity of each item they want to order, allowing them to order multiple items of the same type.

**Interactive Elements**: Buttons or dropdown menus enable users to make selections, providing an interactive and engaging ordering process.

**Add to Cart**: Once users finalize their selections, they can add the chosen items to their cart for later checkout.

There is an icon towards the bottom-right corner to access cart without any hustle. This is to enhance user experience.

#### cart.html:

The "cart.html" file represents the shopping cart page where users can review and manage their selected items before proceeding to checkout. Here's an overview of its functionalities:

<strong> Item List</strong>: The cart displays a list of the items the user has added for ordering. It includes details such as the item name, quantity, and possibly the total cost per item.

<strong>Quantity Modification</strong>: Users can adjust the quantity of items in the cart, allowing them to easily update their orders.

<strong>Subtotal Calculation</strong>: The cart calculates and display the subtotal based on the selected items and quantities.

<strong>Proceed to Checkout</strong>: Users are presented with an option to proceed to the checkout process, where they can confirm and complete their order.

### Payment process

<p>It's a static HTML page that informs the user about the successful payment and that they will be redirected to the home page
