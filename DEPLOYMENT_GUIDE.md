# 🚀 SpoonFlow Deployment & GitHub Push Guide

This guide details how to publish SpoonFlow to GitHub and deploy it live so judges and users can access your working prototype online.

---

## 📦 Option 1: Deploy with Vercel (Fastest & 100% Free)

SpoonFlow already includes a pre-configured `vercel.json` file.

1. **Push your code to GitHub** (see instructions below).
2. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
3. Click **"Add New Project"** and select your `spoonflow` repository.
4. Keep the default settings (Framework Preset: **Other**) and click **"Deploy"**.
5. Your app will be live at `https://spoonflow-xxxx.vercel.app` in under 30 seconds!

---

## 🌐 Option 2: Deploy with GitHub Pages (Free on `github.io`)

1. In your GitHub repository, click on **Settings** -> **Pages** (under "Code and automation" in the left sidebar).
2. Under **Build and deployment** > **Source**, select **"Deploy from a branch"**.
3. Under **Branch**, select `main` and folder `/(root)`, then click **Save**.
4. In about 1 minute, your live URL will be active at:  
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 🐙 How to Push to GitHub

Run these commands in PowerShell or your terminal inside this folder:

```powershell
# 1. Create a new repository on https://github.com/new named "spoonflow" (Do NOT check initialize with README)

# 2. Add your GitHub remote URL (replace YOUR_USERNAME with your GitHub handle):
git remote add origin https://github.com/YOUR_USERNAME/spoonflow.git

# 3. Push main branch to GitHub:
git push -u origin main
```

---

## 💻 Option 3: Running Locally

To test SpoonFlow on your computer at any time:

```powershell
# Using npm
npm start

# Or directly with node (zero npm dependencies required!)
node dev.js
```

Open your browser to: [http://localhost:3000](http://localhost:3000)
