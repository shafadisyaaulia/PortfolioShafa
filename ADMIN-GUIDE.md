# 🎯 Admin Panel Guide

## 🔐 Login ke Admin Panel

1. Buka browser ke: `https://your-domain.com/admin` atau `http://localhost:5173/admin` (development)
2. Password default: **admin123**
3. ⚠️ **PENTING:** Ganti password di `src/app/components/admin/AdminLogin.tsx` line 9

```tsx
const ADMIN_PASSWORD = 'admin123'; // ⚠️ Change this!
```

---

## ✏️ Edit Projects & Social Impact

### **1. Login ke Admin Dashboard**
- Masukkan password
- Pilih tab: **Projects** atau **Social Impact**

### **2. Edit/Add/Delete**
- **➕ Add New:** Klik tombol "Add New Project/Story"
- **✏️ Edit:** Klik tombol "Edit" pada item yang ingin diubah
- **🗑️ Delete:** Klik tombol "Delete" (hati-hati, tidak bisa undo!)

### **3. Upload Images**
Form edit punya 2 bagian untuk gambar:

#### **Card Images (3 photos)**
- Foto-foto ini akan muncul di carousel kartu di homepage
- Klik "Upload Image" untuk upload
- Format: `/images/projects/folder-name/1.jpg`

#### **Gallery Images (5 photos)**
- Foto-foto ini untuk gallery lengkap di detail modal
- Muncul saat user klik "View Project"
- Format: `/images/projects/folder-name/1.jpg` sampai `5.jpg`

---

## 💾 Save Changes (Git-Based Workflow)

Karena Vercel deployment read-only, ada 2 cara save:

### **A. Development Mode (Local)**
1. Edit data di admin panel
2. Klik "**Save Changes**"
3. Download JSON file yang muncul
4. Replace file di `src/data/projects.json` atau `src/data/social-impact.json`
5. Refresh browser - changes langsung terlihat!

### **B. Production Mode (Vercel)**
1. Edit data di admin panel (bisa lewat https://your-domain.com/admin)
2. Klik "**Save Changes**" - akan download JSON
3. **Commit ke Git:**
   ```bash
   # Copy downloaded JSON ke folder src/data/
   # Lalu commit:
   git add src/data/projects.json
   git add src/data/social-impact.json
   git commit -m "Update projects and social impact data"
   git push
   ```
4. Vercel akan **auto-deploy** dalam 1-2 menit
5. Website langsung update! ✅

---

## 📁 Folder Structure untuk Images

Setiap project/story punya folder sendiri:

```
public/
  images/
    projects/
      level-up/
        1.jpg      ← Card image 1
        2.jpg      ← Card image 2  
        3.jpg      ← Card image 3
        4.jpg      ← Gallery only
        5.jpg      ← Gallery only
      sabangkarsa/
        1.jpg
        2.jpg
        ...
    social-impact/
      pulo-aceh/
        1.jpg
        2.jpg
        ...
      bireuen/
        1.jpg
        ...
```

### **Upload Images:**
1. Buat folder baru di `public/images/projects/` atau `public/images/social-impact/`
2. Kasih nama folder sesuai project (lowercase, pakai dash: `my-project`)
3. Upload 5 foto dengan nama `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`
4. Di admin panel, set image path: `/images/projects/my-project/1.jpg`

---

## 🎨 Accent Colors

Tiap project/story bisa punya warna sendiri:

- **Level-Up:** `#00CFFD` (Cyan)
- **SabangKarsa:** `#A855F7` (Purple)
- **YOLO:** `#EC4899` (Pink)

Di admin panel, klik color picker untuk ganti warna!

---

## ⚡ Quick Tips

- ✅ **Save often:** Download JSON setiap kali selesai edit
- 🔄 **Git commit:** Push changes ke Git untuk trigger Vercel deploy
- 📸 **Image naming:** Pakai angka 1-5 untuk mudah manage
- 🎨 **Colors:** Gunakan hex colors (#XXXXXX)
- 🔒 **Logout:** Klik "Logout" di kanan atas setelah selesai

---

## 🚀 Deployment Workflow

```
Edit di Admin Panel
    ↓
Download JSON
    ↓
Replace local files
    ↓
Git commit & push
    ↓
Vercel auto-deploy (1-2 min)
    ↓
✅ Website LIVE with new data!
```

---

## ❓ Troubleshooting

**Q: Gambar tidak muncul setelah upload?**  
A: Pastikan path benar dan file ada di `public/images/`. Vercel perlu commit dulu sebelum file terlihat.

**Q: Changes tidak save?**  
A: Harus download JSON → replace file → commit to Git → push. Vercel production tidak support file write.

**Q: Lupa password admin?**  
A: Edit `src/app/components/admin/AdminLogin.tsx` line 9, ganti password, commit, push.

**Q: Data hilang setelah reload?**  
A: Pastikan sudah replace JSON file di `src/data/` setelah download. Kalau cuma edit tanpa save, data temporary.

---

## 🔮 Future Enhancements (Optional)

Untuk auto-save tanpa Git workflow, bisa pakai:
- **Supabase** (free database)
- **TinaCMS** (Git-based CMS)
- **Contentful** (headless CMS)
- **GitHub API** (auto-commit via API)

---

Made with ❤️ untuk portfolio yang mudah di-maintain!
