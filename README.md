# BookingApp

<div id="top"></div>

<p align="center">
  <img width="40%"  src="https://github.com/bachar78/Booking-App/blob/e299383ed7386f28135d9fc0acd9d477426fc98e/Frontend/src/assets/images/desc1.png">
  <img width="40%"  src="https://github.com/bachar78/Booking-App/blob/e299383ed7386f28135d9fc0acd9d477426fc98e/Frontend/src/assets/images/desc2.png">
  <img width="40%"  src="https://github.com/bachar78/Booking-App/blob/e299383ed7386f28135d9fc0acd9d477426fc98e/Frontend/src/assets/images/desc3.png">
  <img width="40%"  src="https://github.com/bachar78/Booking-App/blob/e299383ed7386f28135d9fc0acd9d477426fc98e/Frontend/src/assets/images/desc5.png">
</p>

<p align="center">
  <img width="20%" src="https://github.com/bachar78/Booking-App/blob/e299383ed7386f28135d9fc0acd9d477426fc98e/Frontend/src/assets/images/mob1.png">
  <img width="20%" src="https://github.com/bachar78/Booking-App/blob/e299383ed7386f28135d9fc0acd9d477426fc98e/Frontend/src/assets/images/mob2.png">
  <img width="20%"  src="https://github.com/bachar78/Booking-App/blob/e299383ed7386f28135d9fc0acd9d477426fc98e/Frontend/src/assets/images/mob3.png">
</p>
<p align="center">
  <img width="35%" src="https://github.com/bachar78/Booking-App/blob/e299383ed7386f28135d9fc0acd9d477426fc98e/Frontend/src/assets/images/tap1.png">
</p>

# BookingApp

- BookingApp is an application built with the MERN stack.
- It is for booking in different hotels in the Netherland
- The user can book the room he wants according to the dates that he speciefies

## 1.Setup

### Set Environment Variables

Rename the .envexample to .env and add your [MongoDB](https://www.mongodb.com/) database URI, your JWT secret and your [Nodemailer](https://nodemailer.com/about/) keys

### Install backend dependencies

```bash
npm install
```

### Install client (frontend) dependencies

```bash
cd Frontend
npm install
```

### Run app in development (frontend & backend)

```bash
npm run dev
```

## 2. Code structure

```
backend
|   └── connectDb(seeding data and connect with MongoDB)
|   └── controllers
|   └── Middlewares
|   └── models
|   └── routes
|   └── server.js
|    
frontend
├── public
└── src
|   └── app
|   └── assets
|   └── components
|   |   └── confirmation
|   |   └── featured
|   |   └── featuredProperties
|   |   └── footer
|   |   └── header
|   |   └── navbar
|   |   └── propertyList
|   |   └── reserve
|   |   └── searchItem
|   └── context
|   |   └── AuthContext
|   |   └── OrderContext
|   |   └── SearchContext
|   └── hooks
|   └── pages
|   |   └── home
|   |   └── list
|   |   └── login
|   |   └── register
|   |   └── single hotel
|   └── App
|   └── index
```

<p align="right">(<a href="#top">back to top</a>)</p>

## 3. Further Improvements

- Create Admin profile to be able to have access to the hotels, to be able to edit them and create a new hotels
- Add payment methods (credit card or paypal)
