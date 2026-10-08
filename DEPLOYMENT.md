# Deployment Guide — New Star Infosis (Flask + Netlify / Vercel)

This guide explains how to run the **New Star Infosis** website locally using Flask and how to deploy it seamlessly to **Vercel**, **Netlify**, or other cloud providers like **Render** or **Railway**.

---

## 🛠️ Local Development (Running with Flask)

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Flask server:**
   ```bash
   python app.py
   ```

3. **Open in browser:**
   ```text
   http://127.0.0.1:5000
   ```

All pages (`/`, `/about`, `/services`, `/projects`, `/contact`) and static assets (`/css`, `/js`, `/assets`) will be served cleanly, and the contact form will transmit data directly to the `/api/contact` Flask endpoint.

---

## 🚀 Deployment Option 1: Vercel (Recommended for Flask WSGI)

Vercel has native serverless Python runtime support. The repository already includes `vercel.json`, `app.py`, and `requirements.txt`.

### Method A: Deploy via GitHub (Zero Config)
1. Push your project code to **GitHub**, **GitLab**, or **Bitbucket**.
2. Log in to [Vercel Dashboard](https://vercel.com/new).
3. Click **Import Project** and select your repository.
4. Vercel automatically detects `vercel.json` and `app.py`. Click **Deploy**.

### Method B: Deploy via Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## ⚡ Deployment Option 2: Netlify

Netlify handles both native static deployment and serverless redirects via `netlify.toml`.

### Method A: Deploy via GitHub / Netlify Dashboard
1. Push your code to **GitHub**.
2. Go to [Netlify App](https://app.netlify.com/) and click **Add new site > Import an existing project**.
3. Select your repository. Netlify will read `netlify.toml` for static routing and publish directory.
4. Click **Deploy Site**.

### Method B: Deploy via Netlify CLI
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Deploy to production:
   ```bash
   netlify deploy --prod
   ```

---

## 📦 Deployment Option 3: Render / Railway / Heroku (WSGI Servers)

The project includes a `Procfile` (`web: gunicorn app:app`).

1. Create a new Web Service on **Render** (render.com) or **Railway** (railway.app).
2. Connect your GitHub repository.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `gunicorn app:app`

---

## 📁 Key Configuration Files

- `app.py` — Flask WSGI application instance and page routes.
- `requirements.txt` — Python dependencies (`Flask`, `gunicorn`).
- `vercel.json` — Vercel Python serverless route configuration.
- `netlify.toml` — Netlify deployment and route redirect rules.
- `Procfile` — WSGI Gunicorn execution script.
