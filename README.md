# 🛍️ E-commerce Clothes Website

Welcome to the **E-commerce Clothes Website**, a modern and stylish platform designed for users to browse, shop, and purchase clothes with ease. This project is built to deliver a smooth shopping experience, responsive design, and secure checkout flow.

## 🚀 Features

✨ **User-friendly interface** — Minimalist design with focus on product visibility  
✨ **Responsive layout** — Perfectly fits desktop, tablet, and mobile devices  
✨ **Product catalog** — Browse a collection of clothes with images, descriptions, and prices  
✨ **Shopping cart** — Add, update, or remove items from your cart  
✨ **Secure checkout** — Designed for safe transactions (payment gateway integration ready)  
✨ **Search & filter** — Easily find shirts by size, category, or price  
✨ **Admin dashboard** — Manage products, and orders 

## ⚙️ Tech Stack

- **Frontend:** React.js / Vite / Tailwind CSS
- **Backend:** Node.js / Express.js / MongoDB
- **Authentication & Security:** JWT for authentication / Helmet for security headers
- **Integrations:** Cloudinary / Midtrans 

## 📦 Getting Started

1️⃣ **Clone this repo**
1. git clone https://github.com/Ferico5/e-commerce.git
2. cd e-commerce

2️⃣ **Setup your .env file**
1. Go to folder api
2. create new file '.env'
3. Copy this code:
<pre> 
  PORT='...' 
  MONGODB_URL='...' 
  CLOUDINARY_API_KEY='...' 
  CLOUDINARY_SECRET_KEY='...' 
  CLOUDINARY_NAME='...' 
  CLIENT_URL='...' #change this with url deployed URL website, if you haven't deploy it just use http://localhost:5173
  NODE_ENV=production
</pre>

NOTE: REPLACE '...' with your own!

3️⃣ **Install dependencies and Run the app (Backend)**
1. open terminal
2. cd api
3. npm i
4. nodemon index

4️⃣ **Install dependencies and Run the app (Frontend)**
1. open terminal
2. cd client
3. npm i
4. npm run dev

5️⃣ **Visit Website Development**

http://localhost:5173


**We have deployed the website, you can check it at https://foreverclothes.vercel.app/**


## 💡 Future Enhancements
1. Add user reviews
2. Implement order tracking
3. Add wishlists and favorites
4. Add stock


## ✨ Contributing
Wanna contribute? Pull requests are welcome! Make sure to open an issue first to discuss your idea. Let’s build something awesome together 🤝
