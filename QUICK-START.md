# ⚡ QUICK START GUIDE

## 🚀 Cara Tambah Project (3 Langkah!)

### 1️⃣ Jalankan Development Server
```bash
npm run dev
```
Buka: http://localhost:5173

### 2️⃣ Login ke Admin
Buka: http://localhost:5173/admin
Password: `admin123` (⚠️ Ganti nanti!)

### 3️⃣ Tambah Project
1. Klik **"+ Add New Project"**
2. Isi form → Klik **"Save Item"**  
3. **✨ SELESAI!** Project muncul di homepage!

---

## 📝 Field Wajib Diisi

### Projects:
- ✅ **Name** - Nama project
- ✅ **Tagline** - Subtitle singkat
- ✅ **Description** - Penjelasan project
- ✅ **Tags** - Teknologi (pisahkan dengan koma)
- ✅ **Images** - Minimal 1 foto

### Social Impact:
- ✅ **Title** - Judul kegiatan
- ✅ **Headline** - Tagline
- ✅ **Description** - Cerita singkat
- ✅ **Images** - Foto kegiatan

---

## ❓ FAQ

**Q: Project sudah di-save tapi tidak muncul?**
A: Refresh homepage (Ctrl + F5)

**Q: Data hilang setelah restart?**
A: Normal! Data di localStorage. Untuk production, deploy ke Vercel.

**Q: Mau ganti password admin?**
A: Edit `src/app/components/admin/AdminLogin.tsx` line 10

**Q: Bisa tambah project dari HP?**
A: Bisa! Asal buka /admin dari browser yang sama

**Q: Deploy ke Vercel gimana?**
A: 
```bash
npm run build
vercel --prod
```

---

## 🎯 URL Penting

| URL | Fungsi |
|-----|--------|
| `http://localhost:5173` | Homepage (Portfolio) |
| `http://localhost:5173/admin` | Admin Panel |

---

## 🔧 Perintah Penting

```bash
# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview

# Deploy ke Vercel
vercel --prod
```

---

## 💡 Tips Cepat

1. **Sebelum deploy:** Ganti password admin!
2. **Backup data:** Klik "Save Changes" di admin → Download JSON
3. **Foto bagus:** Gunakan foto min 800x600px
4. **Test browser:** Chrome, Firefox, Safari

---

## 📚 Dokumentasi Lengkap

- **Admin System:** Baca `CARA-KERJA-ADMIN.md`
- **Ganti Foto:** Baca `PANDUAN-FOTO.md`
- **Next Steps:** Baca `NEXT-STEPS.md`

---

**Need help? Check console (F12) untuk error messages!**

Happy coding! 🎉
