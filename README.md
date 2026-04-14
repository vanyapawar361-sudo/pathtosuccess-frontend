- # 🎓 PathToSuccess
- A MERN-based application with REST APIs supporting dynamic resource management (add, delete, save, track)
Integrated MongoDB Atlas for persistent storage and optimized API interactions
Deployed scalable services using cloud platforms (Vercel + Render)

## 🎥 Demo Preview
### 🏠 Home Page
- Handpicked curated resources for students

### 📚 Resource Management
- Add, delete, and manage resources in real-time

### ⭐ Save & Track
- Save important resources and mark progress

### 📅 Study Planner
- Organize daily study tasks efficiently

---

## 🚀 Live Demo

🌐 Frontend: https://pathtosuccess-frontend-k56b.vercel.app/  
🔗 Backend API: https://college-resources-backend-2.onrender.com

---

## ✨ Features

- 📚 Add, view, and delete learning resources
- ⭐ Save/unsave important resources
- ✅ Mark resources as completed
- 📅 Integrated Study Planner
- 🧠 Curated handpicked resources
- 🔄 Real-time updates with database
- 🌐 Fully deployed (Frontend + Backend)

---

## 🛠 Tech Stack

### Frontend
- React.js
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure
college-resources-frontend/
├── src/
├── public/
├── package.json

college-resources-backend/
├── routes/
├── models/
├── index.js
├── package.json

---

## ⚙️ Installation & Setup

### 1. Clone the repositories

```bash
git clone https://github.com/vanyapawar361-sudo/college-resources-frontend.git
git clone https://github.com/vanyapawar361-sudo/college-resources-backend.git

2. Setup Backend
cd college-resources-backend
npm install

Create a .env file
MONGO_URI=your_mongodb_connection_string
PORT=5001

Run backend
npm start

3.Setup frontend
cd college-resources-frontend
npm install
npm start

API ENDPOINTS
Resources
GET /api/resources → Get all resources
POST /api/resources → Add new resource
DELETE /api/resources/:id → Delete resource
Goals / Planner
GET /api/goals
POST /api/goals

📌 Future Improvements
🔐 User authentication (login/signup)
📄 Saved resources page
🤖 AI-based recommendations
📊 Progress analytics dashboard
📱 Mobile responsiveness improvements

Author
Vanya Pawar
