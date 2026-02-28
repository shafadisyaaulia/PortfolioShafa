# 🌟 Shafa's Portfolio Website

A modern, full-stack portfolio website built with **React + TypeScript + Vite**, featuring MongoDB database integration, Cloudinary image hosting, and an admin panel for content management.

---

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 🗄️ **MongoDB Integration** - Dynamic content stored in cloud database
- 🖼️ **Cloudinary CDN** - Optimized image hosting and delivery
- 👨‍💼 **Admin Panel** - Easy content management at `/admin`
- 📱 **Responsive Design** - Works perfectly on all devices
- 🚀 **Fast Performance** - Built with Vite for optimal loading speed
- 🔔 **Toast Notifications** - Beautiful UI feedback using Sonner

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite 6
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
- Sonner (toast notifications)

**Backend:**
- Express.js
- MongoDB (Atlas)
- Cloudinary API
- Multer (file uploads)

**Deployment:**
- Vercel (frontend + API)
- MongoDB Atlas (database)
- Cloudinary (image CDN)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/shafadisyaaulia/PortfolioShafa.git
cd PortfolioShafa
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Password
VITE_ADMIN_PASSWORD=your_secure_password
```

4. **Run development servers**
```bash
npm run dev:all
```

This starts:
- Frontend: http://localhost:5173
- API: http://localhost:3001

---

## 📁 Project Structure

```
├── api/                    # Backend API
│   ├── lib/               # MongoDB & Cloudinary utilities
│   ├── projects.ts        # Projects CRUD routes
│   ├── social-impact.ts   # Social Impact CRUD routes
│   └── server.ts          # Express server
├── src/
│   ├── app/               # React components
│   │   ├── components/    # UI components
│   │   │   ├── admin/    # Admin panel
│   │   │   └── ui/       # shadcn/ui components
│   │   └── App.tsx       # Main app
│   ├── data/             # JSON fallback data
│   ├── lib/              # API client
│   └── styles/           # CSS files
├── public/               # Static assets
└── vercel.json          # Vercel deployment config
```

---

## 🔧 Admin Panel

Access the admin panel at `/admin` to manage:
- **Projects** - Add, edit, delete portfolio projects
- **Social Impact** - Manage community stories
- **Images** - Upload and manage photos via Cloudinary

**Default Credentials:**
- Password: Set via `VITE_ADMIN_PASSWORD` environment variable

---

## 🌐 Deployment

The project is configured for **Vercel** deployment.

See [VERCEL-DEPLOYMENT.md](VERCEL-DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

---

## 📝 Available Scripts

```bash
npm run dev          # Start Vite dev server
npm run api          # Start API server
npm run dev:all      # Start both servers concurrently
npm run build        # Build for production
```

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

---

## 📄 License

This project uses components from:
- [shadcn/ui](https://ui.shadcn.com/) - MIT License
- [Unsplash](https://unsplash.com) - Unsplash License

---

## 👤 Author

**Shafa Disya Aulia**
- GitHub: [@shafadisyaaulia](https://github.com/shafadisyaaulia)
- Portfolio: [Live Demo](https://portfolio-shafa.vercel.app)

---

⭐ Star this repo if you find it helpful!