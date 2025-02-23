# Matrimony Platform (MERN Stack)

## Objective
Welcome to your next exciting challenge! This project is a Matrimony platform built using the MERN stack (MongoDB, Express, React, and Node.js). The platform provides a seamless experience for users looking for potential life partners.

## 🚀 Live Demo
- **Front-end Live Site Link:** [Insert Link Here]
- **Client Repository:** [Insert Link Here]
- **Server Repository:** [Insert Link Here]

## 🛠 Admin Credentials
- **Admin Email:** [Insert Email Here]
- **Admin Password:** [Insert Password Here]

## 📌 Features
1. **Fully Responsive:** The homepage, dashboard, and all other pages are optimized for mobile, tablet, and desktop.
2. **Authentication System:** Secure user login and registration with Firebase authentication (Google & Email/Password login supported).
3. **Premium Membership System:** Users can upgrade to premium for additional benefits like viewing contact details.
4. **Biodata Management:** Users can create, edit, and view biodata profiles.
5. **Filtering & Sorting:** Users can filter biodata by age, gender, and location. Sorting is available by ascending/descending age.
6. **Private Routes:** Certain pages, like biodata details and dashboards, require authentication.
7. **Admin Dashboard:** Admins can manage users, approve premium requests, and monitor revenue.
8. **Contact Request System:** Users can request contact information by paying via Stripe.
9. **Favorites & Contact Requests:** Users can favorite profiles and track contact requests.
10. **Success Stories:** Users can submit marriage success stories, which are displayed on the homepage.

## 🏗 Tech Stack
- **Front-end:** React, React Router, Tailwind CSS (No Daisy UI)
- **State Management:** React Context API
- **Data Fetching:** Tanstack Query (React Query) for optimized performance
- **Back-end:** Node.js, Express.js
- **Database:** MongoDB (Mongoose for ORM)
- **Authentication:** Firebase Authentication
- **Payment System:** Stripe
- **Security:** JWT (JSON Web Token) for user authentication

## 🔥 Key Functionalities
### Home Page
- Dynamic navbar with navigation links.
- Eye-catching banner and slider.
- Premium member profile section displaying key biodata information.
- "How It Works" section explaining the platform process.
- Success Counter displaying total profiles, marriages, etc.
- Success Stories section featuring real user experiences.
- Beautiful and responsive footer.

### Biodata Page
- Filters for gender, age range, and division.
- Displays all created biodata with key details.
- Clicking "View Profile" redirects to a private details page.

### User Dashboard (Private Route)
- **Edit Biodata:** Users can create/edit their profiles.
- **View Biodata:** See detailed biodata info.
- **My Contact Requests:** Track requested contact details and approval status.
- **Favorites:** Users can save biodata to their favorites list.
- **Logout Button.**

### Admin Dashboard (Private Route)
- **Manage Users:** Admin can make users admins or premium members.
- **Approve Premium Requests:** Admins can approve user premium requests.
- **Approve Contact Requests:** Admins review and approve contact requests.
- **Analytics:** View statistics via a pie chart for total users, biodata, revenue, etc.
- **Manage Success Stories:** Admins can review and approve user-submitted success stories.

## 🏆 Additional Features
- **JWT Authentication:** Secures private routes.
- **Toast Notifications:** Provides feedback on actions (e.g., login success, CRUD operations).
- **Server-Side Sorting & Pagination:** Biodata profiles are paginated and sorted dynamically.
- **Environment Variables:** Firebase and MongoDB credentials are securely stored.

## 📌 Challenges & Learning Outcomes
- Implemented a fully responsive design from scratch without using Daisy UI.
- Integrated Stripe for payments and admin approval workflows.
- Developed a real-world authentication system with Firebase and JWT.
- Optimized performance using Tanstack Query for efficient data fetching.

## 🎯 How to Run Locally
1. Clone the repository:
   ```sh
   git clone [Client Repo URL]
   git clone [Server Repo URL]
   ```
2. Install dependencies:
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```
3. Create a `.env` file in the server and add the required environment variables:
   ```sh
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET=your_stripe_secret_key
   ```
4. Start the server:
   ```sh
   cd server && npm run dev
   ```
5. Start the client:
   ```sh
   cd client && npm run dev
   ```

## 📜 License
This project is licensed under the MIT License.

---

Feel free to customize this README based on your actual implementation! 🚀

