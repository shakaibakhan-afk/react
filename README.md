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

## 🎨 Custom Variables in Tailwind CSS

This project uses Tailwind CSS v4, which supports custom variables in multiple ways:

### Method 1: CSS Custom Properties (Recommended)

Define variables in `src/index.css` using CSS custom properties:

```css
:root {
  --color-primary: #646cff;
  --spacing-md: 1rem;
}
```

Use them directly in your components:
```jsx
<div style={{ backgroundColor: 'var(--color-primary)' }}>
  Content
</div>
```

### Method 2: @theme Directive (Tailwind v4)

Define theme values using the `@theme` directive in `src/index.css`:

```css
@theme {
  --color-brand-primary: #646cff;
  --spacing-custom-md: 1rem;
}
```

Use them as Tailwind utilities:
```jsx
<div className="bg-brand-primary p-custom-md">
  Content
</div>
```

### Method 3: Extend Theme in Config

Define custom values in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'custom-primary': '#646cff',
    },
    spacing: {
      'custom-md': '1rem',
    },
  },
}
```

Use them as Tailwind utilities:
```jsx
<div className="bg-custom-primary p-custom-md">
  Content
</div>
```

### Usage Examples

- **Colors:** `bg-custom-primary`, `text-brand-primary`, `border-custom-accent`
- **Spacing:** `p-custom-md`, `m-custom-lg`, `gap-custom-sm`
- **Font Sizes:** `text-custom-lg`, `text-custom-xl`
- **Border Radius:** `rounded-custom-lg`, `rounded-custom-xl`
