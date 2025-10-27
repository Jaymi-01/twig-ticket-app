# 🎟️ Afuni's Ticket App — PHP + Twig Ticket Management System

**Afuni's Ticket App** is a responsive and user-friendly ticket management system built with **PHP**, **Twig templating**, and **Tailwind CSS**.  
It allows users to **create**, **view**, **edit**, and **delete** tickets, with a simple authentication system and a clean, modern UI.

---

## 🚀 Features

- ✨ **Beautiful Landing Page** with SVG wave hero background  
- 🔐 **Authentication System** (Login & Signup with localStorage)  
- 📊 **Dashboard** showing total, open, in-progress, and resolved ticket stats  
- 🧾 **Ticket Management** (CRUD: Create, Read, Update, Delete)  
- ⚡ **Real-time Validation** and **Toast Notifications**  
- 🔄 **Real-time Dashboard Updates** — stats update automatically  
- 💻 **Responsive Design** (Desktop, Tablet & Mobile friendly)  
- 🎨 **Tailwind CSS Styling** — modern and easily customizable  
- 🐳 **Docker Support** — ready for containerized deployment  

---

## 🧠 Prerequisites

Make sure you have installed:

- **PHP** (v8.0 or newer)
- **Composer** (for PHP dependencies)
- **Node.js** (v18 or newer)
- **npm** or **yarn**

---

## 💾 How to Clone & Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/ticketing-app.git
cd ticketing-app
```

### 2️⃣ Install PHP Dependencies

```bash
composer install
```

### 3️⃣ Install Node Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 4️⃣ Build Tailwind CSS

```bash
npm run build:css
```

For development with auto-rebuild:
```bash
npm run watch:css
```

### 5️⃣ Run the Development Server

Using PHP built-in server:
```bash
php -S localhost:8000 -t src
```

Then open your browser at:
```
http://localhost:8000
```

---

## 📁 Project Structure

```
ticketing-app/
├── src/
│   ├── index.php              # Main router & entry point
│   ├── templates/             # Twig template files
│   │   ├── base.twig         # Base layout
│   │   ├── landing.twig      # Landing page
│   │   ├── login.twig        # Login page
│   │   ├── signup.twig       # Signup page
│   │   ├── dashboard.twig    # Dashboard with stats
│   │   ├── ticket.twig       # Ticket management
│   │   └── 404.twig          # Error page
│   ├── js/
│   │   └── app.js            # Core JavaScript logic
│   └── styles/
│       ├── tailwind.css      # Tailwind input
│       └── out.tailwind.css  # Generated CSS
├── cache/twig/               # Twig template cache
├── vendor/                   # Composer dependencies
├── node_modules/             # Node dependencies
├── composer.json             # PHP dependencies
├── package.json              # Node dependencies
├── postcss.config.js         # PostCSS configuration
├── Dockerfile                # Docker configuration
└── .htaccess                 # Apache rewrite rules
```

---

## 🐳 Docker Deployment

### Build the Docker Image

```bash
docker build -t ticketing-app .
```

### Run the Container

```bash
docker run -p 8080:80 ticketing-app
```

Then visit:
```
http://localhost:8080
```

---

## 🌐 Deploy to Render

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Environment**: Docker
   - **Plan**: Free or paid
6. Click **"Create Web Service"**

See the complete deployment guide in `render-deployment-guide.md`

---

## 🎯 How It Works

### Authentication Flow

1. User signs up → Data saved to `localStorage`
2. User logs in → Token saved to `localStorage`
3. Protected routes (dashboard, tickets) check for token
4. User can logout → Token removed

### Ticket Management

1. Create tickets with title, description, and status
2. View all tickets in a responsive grid
3. Edit existing tickets
4. Delete tickets with confirmation
5. Dashboard automatically updates ticket statistics

### Data Storage

All data is stored in browser `localStorage`:
- **Users**: Array of user objects
- **Token**: Authentication token
- **Tickets**: Array of ticket objects

---

## 🛠️ Available Scripts

### Development

```bash
# Watch Tailwind CSS for changes
npm run watch:css

# Run PHP development server
php -S localhost:8000 -t src
```

### Production

```bash
# Build optimized CSS
npm run build:css

# Clear Twig cache
rm -rf cache/twig/*
```

---

### Modify Templates

All templates are in `src/templates/`. Edit any `.twig` file to customize the UI.

### Update JavaScript Logic

Edit `src/js/app.js` to modify authentication, ticket management, or add new features.

---

## 🔐 Security Notes

⚠️ **Important**: This implementation uses localStorage for demonstration purposes.

**For production, you should:**
- Implement server-side authentication
- Use a database (MySQL, PostgreSQL)
- Hash passwords with bcrypt
- Use secure session management
- Implement CSRF protection
- Use HTTPS

---

## 📦 Dependencies

### PHP
- **twig/twig**: ^3.0 - Template engine

### Node.js
- **tailwindcss**: ^3.0 - Utility-first CSS framework
- **postcss**: ^8.0 - CSS processor
- **autoprefixer**: ^10.0 - Add vendor prefixes

