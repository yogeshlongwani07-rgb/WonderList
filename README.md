# WonderList

WonderList is a **full-stack stay booking and listing platform inspired by Airbnb**.  
Users can browse stays, view listing details, create listings, leave reviews, and manage their own properties after logging in.

---

# Preview

An Airbnb-style stay listing platform with authentication, reviews, and listing management.

---

# Features

## Authentication & Authorization

- User **signup, login, and logout** using Passport Local Strategy.
- Protected routes for **creating, editing, and deleting listings and reviews**.
- Session-based authentication.

---

## Listings Management (CRUD)

Users can manage property listings:

- Create new listings
- Edit existing listings
- Delete listings
- View detailed listing pages

Each listing includes:

- Title
- Description
- Price
- Location
- Country
- Image URL
- Owner information

---

## Reviews System

Users can interact with listings through reviews:

- Add **rating and comment**
- Delete their own reviews
- **Automatic cleanup of reviews** when a listing is deleted

---

## UI / UX Highlights

- Sticky **navbar with Airbnb-style search bar**
- Destination input with **city suggestions**
- Responsive suggestion dropdown
- Limited suggestion width on large screens for better UX
- Custom **SVG favicon**
- Clean Bootstrap-based interface

---

## Session & Flash Messaging

- Persistent login sessions using **MongoDB-backed session store**
- **Flash messages** for success and error notifications

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js (`passport-local`, `passport-local-mongoose`)
- Joi (request validation)
- express-session
- connect-mongo
- connect-flash
- method-override

---

## Frontend

- EJS
- ejs-mate layouts
- Bootstrap 5
- Custom CSS
- Vanilla JavaScript
- Font Awesome

---

## Database

- MongoDB Atlas

# Important Routes

| Route                            | Description                        |
| -------------------------------- | ---------------------------------- |
| `/start`                         | Landing page                       |
| `/listings`                      | View all listings                  |
| `/listings/new`                  | Create new listing (auth required) |
| `/post`                          | Create listing                     |
| `/listings/:id`                  | Listing details                    |
| `/listings/:id/edit`             | Edit listing (auth required)       |
| `/post/:id/edit`                 | Update listing                     |
| `/listings/:id/delete`           | Delete listing                     |
| `/listings/:id/review`           | Add review                         |
| `/listings/:id/review/:reviewId` | Delete review                      |
| `/signup`                        | User signup                        |
| `/login`                         | User login                         |
| `/logout`                        | User logout                        |

---

# Author

**Yogesh Longwani**
