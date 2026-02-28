# 🚀 Deployment Guide - Vercel

## ✅ GitHub Setup (SELESAI!)
Kode sudah di-push ke: https://github.com/shafadisyaaulia/PortfolioShafa.git

---

## 🌐 Deploy ke Vercel

### Step 1: Login ke Vercel
1. Buka https://vercel.com
2. Login dengan GitHub account kamu
3. Authorize Vercel untuk akses GitHub

### Step 2: Import Project
1. Klik **"Add New Project"** atau **"Import Project"**
2. Pilih repository: **PortfolioShafa**
3. Klik **"Import"**

### Step 3: Configure Project
**Framework Preset:** Vite
**Root Directory:** `./` (default)
**Build Command:** `npm run build`
**Output Directory:** `dist`

### Step 4: Environment Variables (PENTING!)
Tambahkan environment variables ini di Vercel:

```env
MONGODB_URI=mongodb+srv://disyaauliashafa_db_user:shafadisya24%3B@portoshafa.ilwfolw.mongodb.net/portfolio

CLOUDINARY_CLOUD_NAME=ddmtevdyv
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

VITE_ADMIN_PASSWORD=admin123
```

**⚠️ CATATAN:** 
- Ganti `CLOUDINARY_API_KEY` dan `CLOUDINARY_API_SECRET` dengan nilai asli dari Cloudinary dashboard kamu
- Ganti `VITE_ADMIN_PASSWORD` dengan password yang lebih kuat untuk production

### Step 5: Deploy!
1. Klik **"Deploy"**
2. Tunggu build selesai (2-3 menit)
3. Kamu akan dapat URL seperti: `https://portfolio-shafa.vercel.app`

---

## 🔧 Cara Dapat Cloudinary API Credentials

1. Login ke https://cloudinary.com
2. Buka **Dashboard**
3. Copy nilai:
   - **Cloud Name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

---

## 📝 Setelah Deploy

### Test Website:
1. Buka URL production kamu
2. Test homepage - apakah projects dan social impact muncul?
3. Buka `/admin` - login dan coba add project baru
4. Upload foto - pastikan Cloudinary working

### Update Environment Variables:
Kalau perlu update env vars:
1. Buka project di Vercel dashboard
2. Pilih **Settings** → **Environment Variables**
3. Edit/add variables
4. **Redeploy** (klik "Redeploy" di Deployments tab)

---

## 🔄 Update Website (Future)

Setiap kali kamu update kode:

```bash
git add .
git commit -m "Update: describe your changes"
git push
```

Vercel akan **otomatis redeploy** setiap kali kamu push ke GitHub! 🎉

---

## ⚙️ API Routes di Vercel

Vercel akan otomatis handle API routes kamu:
- Frontend: `https://your-site.vercel.app/`
- API: `https://your-site.vercel.app/api/projects`

File `vercel.json` sudah dikonfigurasi untuk routing yang benar.

---

## 🆘 Troubleshooting

### 1. Build Error
- Check build logs di Vercel dashboard
- Pastikan semua dependencies di `package.json`
- Try build locally: `npm run build`

### 2. API Not Working
- Check environment variables sudah benar
- Check MongoDB connection string (pastikan tidak ada typo)
- Check Cloudinary credentials

### 3. Admin Login Failed
- Check `VITE_ADMIN_PASSWORD` di environment variables
- Default password: `admin123`

---

## 🔐 Security Checklist (PENTING!)

- [ ] Ganti admin password dari `admin123`
- [ ] Environment variables tidak di-commit ke GitHub (.env.local di .gitignore)
- [ ] MongoDB user permissions sesuai (read/write pada database portfolio saja)
- [ ] Cloudinary upload preset sudah dibuat (unsigned mode)

---

## 📱 Custom Domain (Optional)

Kalau mau pakai domain sendiri:
1. Vercel dashboard → Project → **Settings** → **Domains**
2. Add custom domain kamu
3. Update DNS records sesuai instruksi Vercel
4. Done! ✅

---

**Support:** Kalau ada masalah deployment, check Vercel logs atau contact me!
