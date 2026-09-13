# 🚀 Gid Piblikasyon OmniChurch: GitHub & Domèn Cloudflare

Dokiman sa a eksplike etap pa etap kijan pou pibliye sit OmniChurch la sou **GitHub** epi konekte li avèk **domèn ou genyen sou Cloudflare la**.

---

## 🌟 Opsyon 1 (Pi Rekòmande & Pi Fasil): Cloudflare Pages + GitHub

Kòm ou **deja gen domèn ou sou Cloudflare**, solisyon ki pi rapid, pi modèn, epi ki gen pi gwo pèfòmans se **Cloudflare Pages**. Li gratis 100%, li gen SSL otomatik, epi li lye ak domèn Cloudflare ou a an 1 sèl klik san w pa bezwen konfigire dosye DNS konplike.

### Etap 1: Pouse kòd la sou GitHub
Si kòd la poko sou GitHub:
1. Kreye yon nouvo depo (repository) sou [GitHub](https://github.com/new) (egzanp: `omnichurch-web`).
2. Nan tèminal ou a nan dosye pwojè a, tape:
   ```bash
   git init
   git add .
   git commit -m "Vèsyon final OmniChurch pare pou piblikasyon"
   git branch -M main
   git remote add origin https://github.com/jackcreations24-ux/vitrin-omnichurch.git
   git push -u origin main
   ```

### Etap 2: Konekte li sou Cloudflare Pages
1. Ale sou [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Nan meni a goch la, klike sou **Workers & Pages**.
3. Klike sou bouton **Create application** epi chwazi onglet **Pages**.
4. Klike sou **Connect to Git** epi chwazi depo GitHub ou fèk kreye a (`vitrin-omnichurch`).
5. Nan paramèt bati yo (Build settings):
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Klike sou **Save and Deploy**. Cloudflare ap konpile sit la epi ba w yon lyen `.pages.dev`.

### Etap 3: Lye Domèn Cloudflare Ou a
1. Nan pwojè Pages ou fèk deplwaye a sou Cloudflare, klike sou onglet **Custom domains**.
2. Klike sou **Set up a custom domain**.
3. Tape non domèn ou a (pa egzanp: `leglizou.com` oswa `app.leglizou.com`).
4. Piske domèn ou deja nan menm kont Cloudflare la, klike sou **Activate domain**.
   - Cloudflare ap konfigire SSL ak DNS la otomatikman! Sit ou a ap disponib dirèkteman sou domèn ou an avèk tout sekirite HTTPS.

---

## ⚡ Opsyon 2: GitHub Pages + Cloudflare DNS

Si ou pito sit la anime dirèkteman sou sèvè GitHub yo:

### Etap 1: Aktive GitHub Pages
1. Pouse kòd la sou GitHub (jan sa eksplike nan Etap 1 pi wo a).
2. Sou GitHub, ale nan **Settings** > **Pages** nan depo ou a.
3. Nan **Build and deployment** > **Source**, chwazi **GitHub Actions**.
   *(Nou deja mete fichye `.github/workflows/deploy.yml` la nan pwojè a pou w pa gen anyen pou w ekri).*
4. Chak fwa w pouse yon modifikasyon sou branch `main`, sit la ap bati epi deplwaye otomatikman.

### Etap 2: Ajoute Custom Domain nan GitHub
1. Toujou nan **Settings** > **Pages**, desann nan seksyon **Custom domain**.
2. Antre domèn ou a (egzanp: `leglizou.com`).
3. Klike sou **Save**.

### Etap 3: Konfigire DNS sou Cloudflare
1. Ale sou Cloudflare nan zòn domèn ou an > **DNS** > **Records**.
2. Pou yon sou-domèn (egz: `app.leglizou.com` oswa `www.leglizou.com`):
   - **Type**: `CNAME`
   - **Name**: `app` (oswa `www`)
   - **Target**: `VOTRE_NON_DUTILISATEUR.github.io`
   - **Proxy status**: `Proxied` (Nwaj Zoranj ON)
3. Pou domèn prensipal la (apex domain, egzanp: `leglizou.com`):
   - Ajoute 4 dosye `A` ki vize IP GitHub Pages yo:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Oswa mete yon `CNAME` plat nan Cloudflare ki vize `VOTRE_NON_DUTILISATEUR.github.io` (Cloudflare sipòte CNAME Flattening sou apex la otomatikman).

---

## 📦 Kisa ki prepare nan vèsyon final sa a?
- ✅ **Kòd Pwodiksyon Netwaye & Bati**: `npm run build` jenere fichye optimize nan `dist/`.
- ✅ **Sipò SPA Cloudflare**: Fichye `public/_redirects` la la pou rann tout wout disponib san erè 404.
- ✅ **Sipò SPA GitHub Pages**: Fichye `public/404.html` la prepare pou asire redireksyon pwòp sou GitHub Pages.
- ✅ **GitHub Actions Workflow**: `.github/workflows/deploy.yml` pare pou bati otomatikman.
- ✅ **Deteksyon Achitekti PC (64-bit / 32-bit)**: Detekte otomatikman atravè `navigator.platform` / `navigator.userAgent`, etikèt bouton telechajman dinamik, ak **Gid Enstalasyon PC Smart** entegre.
- ✅ **Sitemap Dinamik & SEO**: Fichye `public/sitemap.xml` ak `public/robots.txt` entegre, dèlko otomatik nan script `build` la (`scripts/generate-sitemap.ts`) ak gid Google Search Console nan Panel Devlopè.
- ✅ **Canonical Meta Tags**: Baliz `<link rel="canonical">` prezan nan `index.html` ak senkronizasyon otomatik sou nenpòt domèn koutim oswa deplwaman.
- ✅ **Tèm Blogger XML (`omnichurch-theme.xml`)**: Toujou disponib nan Dev Panel pou moun ki vle ekspòte l sou Blogger.
