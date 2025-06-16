# 🎬 CineSearch

A modern and responsive movie browsing web application built with **React**, **Tailwind CSS**, **Appwrite**, and the **TMDB (The Movie Database) API**. Users can search for movies, view trending movies based on searches, and fetch detailed movie data.

## ✨ Features

- 🔍 **Search Movies** – Find any movie using the TMDB API.
- 📈 **Trending Based on Search** – Displays trending movies based on user searches.
- 🎥 **Movie Details** – Fetch and display title, poster, rating, overview, and more.
- 🌐 **Responsive Design** – Clean UI optimized for all devices using Tailwind CSS.
- 🔐 **Authentication (Optional)** – User login/signup via Appwrite.
- 📊 **Trending Tracker** – Save and count search data via Appwrite Database.

## 🚀 Tech Stack

| Technology   | Purpose                                |
|--------------|----------------------------------------|
| React        | Frontend framework                     |
| Tailwind CSS | Styling and layout                     |
| Appwrite     | Auth, Database for search analytics    |
| TMDB API     | Movie data source                      |

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/movie-app.git
cd movie-app
npm install

📄 Environment Variables
Create a .env file in the root folder and add:
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT=your_appwrite_project_id

▶️ Run the App
bash
Copy
Edit
npm run dev

🗂️ Project Structure
bash
Copy
Edit

src/
├── assets/         # Images and icons
├── components/     # Reusable components (e.g., MovieCard, SearchBar)
├── pages/          # Main pages (Home, SearchResults)
├── services/       # TMDB API & Appwrite service functions
├── App.jsx         # Main app layout
└── main.jsx        # Entry point

🔑 API & Backend Setup
TMDB API
Go to TMDB.

Create an account and get your API key from your profile settings.

Appwrite Setup
Go to Appwrite Cloud and create a project.

Enable Authentication (Email/Password).

Create a Database to store search terms and counts.

Add your Appwrite credentials to the .env file.
