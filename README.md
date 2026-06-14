# 🎬 SNAFU Clip Maker

**A Progressive Web App (PWA) + Native Android App for creating short clips from SNAFU episodes with instant Facebook sharing.**

---

## ✨ Features

✅ **Video Upload** — Drag & drop or select any video file  
✅ **AI Clip Generation** — Auto-detects and extracts funny moments  
✅ **One-Click Download** — Save clips as MP4  
✅ **Facebook Sharing** — Share directly to Facebook with metadata  
✅ **Offline Support** — Works without internet (with service worker)  
✅ **Mobile-First** — Fully responsive, installable as Android app  
✅ **Cross-Platform** — Works on Web, iOS, Android  

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 16+ ([download](https://nodejs.org))
- npm or yarn
- Git

### 1. Clone & Install

```bash
git clone https://github.com/aftabbhai844123-star/Md-aftab.git
cd Md-aftab
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Test PWA Features

- Open DevTools → **Application** → **Manifest**
- Click **Install** (top-left of browser) to install as app
- Works offline! (Service worker caches assets)

---

## 🌐 Deploy to Vercel (10 minutes)

### Option 1: Auto-Deploy from GitHub

1. Go to [Vercel](https://vercel.com)
2. Click **New Project**
3. Select this repository
4. Click **Deploy**
5. Share the URL! (e.g., `https://snafu-clip-maker.vercel.app`)

### Option 2: Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 📱 Build Android APK (5 minutes)

### Step 1: Build PWA for Production

```bash
npm run build
```

### Step 2: Generate APK with PWABuilder

1. Go to [PWABuilder](https://www.pwabuilder.com)
2. Enter your Vercel URL (e.g., `https://snafu-clip-maker.vercel.app`)
3. Click **Build My PWA**
4. Select **Android** → **Options** → Generate APK
5. Download `.apk` file

### Step 3: Install on Phone

**On Android Phone:**
1. Settings → Security → Enable **"Unknown Sources"** (or "Install Unknown Apps")
2. Transfer APK via USB, Email, or Google Drive
3. Tap APK → **Install**
4. Launch app from home screen! 🎉

---

## 🎥 How to Use

### Upload Video

1. Click **"Select Video"** or drag & drop
2. Choose SNAFU episode (MP4, WebM, etc.)
3. Wait for processing...

### Generate Clips

1. Click **"Generate Clips"**
2. App analyzes video for funny moments
3. Preview clips with **Play** button

### Download & Share

1. Click **"Download"** to save as MP4
2. Click **"Share on Facebook"** to post directly
3. That's it! 🎬

---

## 📁 Project Structure

```
Md-aftab/
├── pages/
│   ├── _app.tsx              # Next.js app wrapper
│   ├── _document.tsx         # HTML document setup
│   ├── index.tsx             # Main upload UI
│   └── api/
│       └── process-clip.ts   # Backend: clip generation
├── components/
│   ├── VideoUpload.tsx       # Drag-drop upload
│   ├── ClipPreview.tsx       # Clip player & controls
│   └── ShareButton.tsx       # Facebook share button
├── lib/
│   ├── ffmpeg.ts            # Client-side video processing
│   └── facebook-share.ts    # Facebook SDK integration
├── public/
│   ├── service-worker.js    # Offline support
│   ├── manifest.json        # PWA metadata
│   └── robots.txt
├── styles/
│   └── globals.css          # Tailwind CSS
├── package.json
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
├── capacitor.config.json
└── README.md
```

---

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_FACEBOOK_APP_ID=YOUR_FACEBOOK_APP_ID
```

### PWA Settings

Edit `public/manifest.json`:
- `name`: Full app name
- `short_name`: Home screen label
- `start_url`: Entry point

---

## 🐛 Troubleshooting

### npm install fails

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Local dev won't start

```bash
npx kill-port 3000
npm run dev
```

### Vercel deployment fails

1. Test: `npm run build`
2. Fix errors
3. Push: `git push`
4. Vercel auto-redeploys

---

## 📚 Technologies

- **Framework**: Next.js 13
- **Styling**: Tailwind CSS
- **Video**: ffmpeg.wasm
- **PWA**: Service Worker, Web Manifest
- **Native**: Capacitor
- **Deployment**: Vercel

---

## 📝 License

MIT — Free to use & modify

---

## 🤝 Contributing

1. Fork repo
2. Create branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open Pull Request

---

**Happy Clip Making! 🚀**