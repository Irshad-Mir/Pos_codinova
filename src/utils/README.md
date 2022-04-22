### problem Statement

## There is a Point of Sales (POS system). We need the following features:
1. User needs to sign-in into the system to be able to access it.
2. If the signed-in user is an admin, they can add products into the system which will
have the following details: Name, Category, description,, unit price of product,
available quantity.
3. Any user can login and see the entire product list available.
a. The product list should be grouped on the basis of their category. The
product list will have the following details: category, product name, price,
description.
4. The POS user should be able to save a sale / order in the DB with the following
details:
• invoice number
• employee ID of the employee who made the sale,
• date of sale,
• list of products sold along with their price,
• any discount
• VAT applied
• invoice total
5. The system updates the available quantity of the products, once a sale is
successful and order is saved in the DB.
Create APIs to:
i. Authenticate and authorize users based on their login credentials
ii. Add a product to a store.
iii. Update product details - like quantity, price etc..
iv. Fetch product list for a store.
v. Save sales / order data into DB.

## Own Approach
This project consists of 8 APIs, 3 for Users, 3 for products and 2 for orders.
First of all,We need to register/Sign up the user, then verify them via successfull
 login and then perform a two-step verification by sending them an OTP in their email Id.

## Middleware

# 1 Authentication
# 2 Authorisation

- Create an order for the user
- Make sure the userId in params and in JWT token match.
- Make sure the user exist
- Get products details in the request body

## validaion
i handle all apis and exception handling try and catch with utild and validator files


## Testing 
- To test these apis create a new collection in Postman
- Each api should have a new request in this collection
- Each request in the collection should be rightly named. Eg Create user, Create product, Get products and create orders and update orders etc

