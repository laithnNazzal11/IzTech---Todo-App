# Vercel Deployment Commands

## Option 1: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy (Preview)
```bash
vercel
```

### Step 4: Deploy to Production
```bash
vercel --prod
```

---

## Option 2: Deploy via GitHub

### Step 1: Initialize Git (if not already done)
```bash
git init
```
### Step 2: Add all files
```bash
git add .
```

### Step 3: Commit changes
```bash
git commit -m "Prepare for Vercel deployment"
```

### Step 4: Create GitHub repository (on GitHub.com) or use existing

### Step 5: Add remote origin (replace YOUR_USERNAME and YOUR_REPO)
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

### Step 6: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

### Step 7: Go to vercel.com and import your GitHub repository

---

## Quick Deploy (All-in-One)

If you want to do everything at once:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

---

## After Deployment

Your app will be available at: `https://your-project-name.vercel.app`

