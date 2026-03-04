# 2137 Landing

A Next.js 15 landing page.

## Local Setup

### Prerequisites
- Node.js 18+ (recommend 20+)
- npm

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Run production build locally**
   ```bash
   npm start
   ```

### Inquiry form (email)

The contact form sends inquiries to `krzysztof@2137.dev` via [Resend](https://resend.com).

**Without domain verification:** Resend only allows sending to your own email (e.g. twentyone_37@proton.me) for testing.

**To send to krzysztof@2137.dev in production:**

1. Go to [resend.com/domains](https://resend.com/domains) and add `2137.dev`
2. Add the DNS records Resend shows (SPF, DKIM) at your domain registrar
3. Wait for verification (usually a few minutes)
4. In Vercel → Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` = your Resend API key
   - `RESEND_FROM` = `2137.dev <hello@2137.dev>` (or `inquiries@2137.dev` — any address @2137.dev)
5. Redeploy

**Local dev:** Add `RESEND_API_KEY` and optionally `RESEND_FROM` to `.env.local`

---

## Hosting at 2137.dev

### Option A: Vercel (Recommended for Next.js)

1. **Push your code to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/2137-landing.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in (GitHub recommended)
   - Click **Add New** → **Project**
   - Import your `2137-landing` repo
   - Click **Deploy** (default settings work)
   - Wait for the build to finish

3. **Add custom domain 2137.dev**
   - In your Vercel project, go to **Settings** → **Domains**
   - Click **Add** and enter `2137.dev`
   - Also add `www.2137.dev` if you want www to work
   - Vercel will show you DNS records to add

4. **Configure DNS at your domain registrar**
   - Log in where you bought 2137.dev (Namecheap, GoDaddy, Cloudflare, etc.)
   - Add these records:

   | Type | Name | Value |
   |------|------|-------|
   | A | @ | `76.76.21.21` |
   | CNAME | www | `cname.vercel-dns.com` |

   Or use Vercel nameservers for simpler setup:
   - In Vercel: **Settings** → **Domains** → **Use Vercel Nameservers**
   - Copy the nameservers (e.g. `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
   - At your registrar: change nameservers to Vercel’s

5. **Wait for DNS propagation** (usually 5–60 minutes)

6. **SSL** – Vercel provisions HTTPS automatically.

---

### Option B: Cloudflare Pages

1. **Push code to GitHub** (same as above)

2. **Deploy to Cloudflare Pages**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages**
   - **Create** → **Pages** → **Connect to Git**
   - Select your repo
   - Build settings:
     - Framework preset: **Next.js**
     - Build command: `npm run build`
     - Build output directory: `.next`
   - Click **Save and Deploy**

3. **Custom domain**
   - In the Pages project: **Custom domains** → **Set up a custom domain**
   - Enter `2137.dev`
   - If your domain is on Cloudflare, DNS is configured automatically

---

### Option C: Self-hosted (VPS)

1. **Build the app**
   ```bash
   npm run build
   ```
   This creates a `standalone` output in `.next/standalone`.

2. **On your server** (Ubuntu/Debian example):
   ```bash
   # Install Node.js 20
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Copy your app (standalone folder + .next/static + public)
   scp -r .next/standalone/* user@your-server:/var/www/2137/
   scp -r .next/static user@your-server:/var/www/2137/.next/
   scp -r public user@your-server:/var/www/2137/  # if you have one

   # On server
   cd /var/www/2137 && node server.js
   ```

3. **Use a process manager** (PM2):
   ```bash
   npm install -g pm2
   pm2 start server.js --name 2137
   pm2 save && pm2 startup
   ```

4. **Reverse proxy** (Nginx) for 2137.dev:
   ```nginx
   server {
       listen 80;
       server_name 2137.dev www.2137.dev;
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **SSL with Let's Encrypt**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d 2137.dev -d www.2137.dev
   ```

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm start` | Run production server |
