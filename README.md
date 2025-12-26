# limitless-horizon

Login page built with React + Vite + Tailwind CSS

## 🚀 Features

- Instagram-style login page
- Dashboard after login
- Tailwind CSS styling
- Responsive design
- GitHub Pages deployment ready

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📤 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages:**
   - Go to your repository → Settings → Pages
   - Source: Select **"GitHub Actions"**
   - Save

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Check deployment:**
   - Go to Actions tab in GitHub
   - Wait for the workflow to complete
   - Your site will be available at: `https://shakaibakhan-afk.github.io/react/`

### Important Notes

- The `base` path in `vite.config.js` is set to `/react/` to match the repository name
- If your repository name is different, update the `base` path accordingly
- The deployment happens automatically via GitHub Actions workflow

## 🔧 Configuration

- **Vite Config:** `vite.config.js` - Contains base path for GitHub Pages
- **Tailwind Config:** `tailwind.config.js` - Tailwind CSS configuration
- **Deployment:** `.github/workflows/deploy.yml` - GitHub Actions workflow
