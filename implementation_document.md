# Implementation and my experience during development (Steps)

1.  ### Designing responsive mobile friendly web pages:

<li>HTML Structure: Created the basic structure of web pages using HTML, including elements for headers, navigation bars, content sections, and footers.
<br><br>

<li> CSS Styling: Applied CSS styling to the created HTML elements to control the layout, colors, typography, and overall visual design of the web-pages.
<br><br>

<li> Bootstrap Integration: Integrated Bootstrap framework to utilize its responsive grid system, pre-designed components, and styling classes for a consistent and mobile-friendly UI.
<<br><br>
    
This particular section itself was challenging initially and time consuming as I was a beginner to HTML, CSS and bootstrap. However it got easier as time passed by and while nearing the end of the project, I could create web-pages without much difficulty.
<br><br>

2. ### Firebase Integration and Authentication:

<li> Firebase Setup: Signed-up for Firebase and created a new project in the Firebase Console. Configured my app with the provided configuration keys.
<br><br>
    
<li> Authentication Setup: Implemented user authentication using Firebase Authentication. This involved setting up sign-up and login.
<br><br>
    
<li> Email Verification: Utilized Firebase's email verification feature to ensure that users with iiitb.ac.in domain email addresses can verify their accounts.
<br><br>


Firebase seemed to provide additional features like email verification, security and authentication features, hence my decision to choose firebase realtime database for this project.
<br><br>

3. ### Fetching Real-Time Data and Webpage Updates:

<li>Firebase Realtime Database: Created a Firebase Realtime Database to store data related to menus, inventory, orders, users, and notifications.
<br><br>
    
<li> Reading Data: Used Firebase's database functions (such as ref(), get(), and onValue()) to retrieve data from the database in real-time.
<br><br>
    
<li> Updating Webpages: Dynamically updating the web pages using JavaScript when new data is fetched. For example, when a new order is placed, use JavaScript to add the order details to the relevant section of the webpage.<br><br>
    
<li> Handling Real-Time Updates: Set up event listeners (onValue()) to listen for changes in the database. Whenever new data is added, updated, or removed, the JavaScript code will be triggered to update the web pages accordingly.
<br><br>


As someone exploring new languages and domains within the tech sphere, I found javascript very interesting and fun to work with. In combination with firebase, I had lots of fun in managing the fetching of realtime data and page updations.
