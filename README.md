# Cafeteria(Coffee Cove) Order Management App

#### Coffee Cove App is a versatile web-platform (mobile compatible) fostering efficient order placement, management and communication between students and Coffee Cove vendors in IIITB.

## Problem Statement and Origin of Idea

The prevalent issue at Coffee Cove arises from overcrowding during coffee/tea and snack orders, leading to inconvenience and significant delays in service. Also from the vendor's point of view, its extremely difficult to keep track of orders, necessitating a solution to improve order management and enhance the overall customer experience.

## Project Goals/Objectives

1. To develop an application that shall simplify the coffee shop ordering process to reduce waiting times and enhance customer satisfaction.

2. To create a user-friendly interface with HTML, CSS, and Bootstrap to ensure easy navigation and smooth interactions.

3. To provide vendors with a dashboard to manage incoming orders, mark orders as ready, and notify customers efficiently.

4. Make the application scalable: To design the app architecture and database structure to accommodate future feature expansions and increased user activity.

## Using the web app

1. The web app can be accessed by clicking [here](https://coffeecove-vishruth.netlify.app/) or by typing this down in your web browser : https://coffeecove-vishruth.netlify.app
   <br>Preferred browsers: Google Chrome, Firefox

2. Kindly click on **customer** to access the customer user-end. Enter your name, IIITB domain email address and password of your choice. To complete your registration, head over to your outlook and verify your email address!

3. For the Zense recruitment team only:
<details> 
   <br> The vendors user-end can be accessed using the following credentials:
   <ol>
   <li>Email: `cc.aryabhatta.iiitb.ac.in`
   <br>Password: `ccaryabhatta`
   <br>
   <li>Email: `cc.ramanujan.iiitb.ac.in`
   <br> Password: `ccramanujan`

   Note: These credentials are for testing purpose only, it shall be reset soon after the recruitment phase.

</details>

## Features

### Some notable features of the many are listed below:

1. **Order Management**: Efficiently manage customer orders, reducing wait times and ensuring timely service.

2. **Verification**: User can only sign up/ register using official iiitb.ac.in email address, when registered - _click here to verify your email_ mail is sent to the official email address to ensure authenticity of user. On successful verification, the registration is complete.

3. **Menu Display**: Display a dynamic menu of available coffee and snacks, making it easy for users to browse and choose items.

4. **Notifications**: Send pop-up to users when their orders are ready, minimizing the need for waiting in queues.

5. **Vendor Dashboard and automatic stock updation**: Vendors can access a dashboard to manage incoming orders, streamline preparation, and optimize resources. The stock of a particular item is automatically updated when users order the item.

6. **Past Order History**: Allow users and vendors to view their past orders.

7. **Inventory Management**: Vendors can update inventory levels, ensuring accurate menu availability for customers.

8. **Location Services**: Display the available Coffee Cove outlets and let user select the most convenient one.

9. **Responsive Design**: Ensure the app is mobile-friendly, accessible on various devices, enhancing user experience.

## Implementation

This application was developed using **HTML**, **CSS**, **Bootstrap**, **Javascript**, along with **Firebase** integration. In doing so, the app streamlines user authentication, real-time menu presentation, order handling, and pop-up notifications for order readiness.

To read complete documentation on the process of implementation, please refer the document attached below:
[**LINK**](implementation_document.md)

## Challenges

<li> Implementing real-time updates for orders and menu items, this was overcome by utilizing Firebase Realtime Database's listeners (like <strong>onValue</strong>) to receive real-time updates and reflect changes instantly in the UI.
<br><br>

<li> Authentication and Security: How to ensure secure user authentication and data protection was a challenge. Overcame this by using Firebase Authentication for user login/signup, and implementing proper database security rules to restrict unauthorized access.
<br><br>

<li> Optimisation of web application for mobile interface. Did tons of changing of different styles, and trying out new ones! Took some time before getting the hang of it :)
<br><br>

<li> Push notifications: Configuring FCM (Firebase Cloud Messaging) was a herculean task and I kept running into unforseen errors. Finally enabled pop-up notifications with the help of HTML, CSS and javascript logic instead of push notifications.
<br><br>

<li> Testing out newly added features to the app: Since the web application features both the customer interface and the vendor interface, having to simultaneously test features that affected both the user-ends was a challenge to overcome.
<br><br>

<li> Keeping track of code, deployment and hosting: Used Git/GitHub to keep track of daily work since Day 1, used Netlify.app for hosting the application real time.
<br><br>

<li> <strong>Unresolved Issue</strong>: The sign up and login pages of the application requires the user (customer/vendor) to authenticate twice. This is an issue that is yet to be fixed.

## Future Scope (Features to be added)

1. **Online Payments**: Integrate online payment gateways to allow users to make secure payments for their orders directly through the app. I believe that I could've added the PAYTM payment gateway to the application but that required me to register as a business(hence skipped step and instead simulated the payment process).

2. **User Reviews and Ratings**: Implement a review and rating system for menu items and the overall ordering experience, helping users make informed choices.

3. **AI Integration**: Making use of Artificial Intelligence to suggest users popular dishes, or dishes based on previous orders / Advanced Analytics.

4. **Scheduling Orders**: Allow users to schedule orders in advance, catering to those who want to pre-order their coffee and snacks.

I shall continue to work on fixing minor bugs(if any) and try implementing the above mentioned Future Scope features. Any issues encountered will also be marked under **Issues** in the same repository.

## Important Links

1. [Github Repo](www.github.com/Vishruth23)
2. [Web App](www.coffeecove-vishruth.netlify.app)

### ~Vishruth Vijay, IMT2022507
