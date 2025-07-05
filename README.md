
# 🚀 Workshop: สอนใช้ ExpressJS + NodeJS + Prisma + MySQL + React + Electron

## ✅ สิ่งที่เราจะทำ
- สร้าง REST API ด้วย **ExpressJS + NodeJS**
- ใช้ **Prisma** จัดการฐานข้อมูล MySQL
- ทำระบบ **CRUD** (Create, Read, Update, Delete)
- สร้างเว็บด้วย **React** (ผ่าน Vite)
- แปลงระบบให้เป็น Desktop App ด้วย **Electron**
- ทดสอบ API ด้วย **Postman**

---

## 🔧 ส่วนของ Server (Backend)

### 1. ติดตั้งโปรเจกต์
```bash
npm init -y
npm install express morgan body-parser cors nodemon
```

### 2. ติดตั้ง Prisma
```bash
npm install prisma
npx prisma init
npm install @prisma/client
```

### 3. สร้างและอัปเดตฐานข้อมูล
```bash
npx prisma migrate dev --name workshop1_init
```

### 4. ถ้าอัปเดต Prisma schema ให้รัน
```bash
npx prisma migrate dev
```

---

## 💻 ส่วนของ Client (Frontend)

### 1. สร้างโปรเจกต์ด้วย Vite
```bash
npm create vite@latest client .
# เลือก JavaScript และ React
```

### 2. ติดตั้ง Dependencies
```bash
cd client
npm install
npm install axios
npm run dev
```

---

## 🛠️ สรุปสิ่งที่จะเรียนรู้

### 🔨 CRUD คืออะไร?
- **Create:** สร้างข้อมูลใหม่
- **Read:** อ่าน/ดึงข้อมูล
- **Update:** อัปเดตข้อมูล
- **Delete:** ลบข้อมูล

---

## 📦 เครื่องมือ (Tools) ที่ใช้
- ✅ NodeJS + ExpressJS (Backend)
- ✅ Prisma ORM (จัดการฐานข้อมูล)
- ✅ MySQL (ฐานข้อมูล)
- ✅ Postman (ทดสอบ API)
- ✅ Vite + React (Frontend)
- ✅ Axios (เชื่อมต่อ API)
- ✅ Electron (แปลงระบบเป็น Desktop App)

---

## ⚡ เพิ่มเติม: แปลงระบบเป็น Desktop App ด้วย Electron

### 1. ติดตั้ง Electron
```bash
npm install --save-dev electron
```

### 2. โครงสร้างโปรเจกต์
```
project_pos/
├── client/         # React Frontend (สร้างด้วย Vite)
├── server/         # Backend
├── main.js         # ไฟล์หลักของ Electron
├── package.json    # ตั้งค่า Script สำหรับ Electron
└── README.md
```

### 3. ตัวอย่างโค้ด main.js
```js
const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = false; // ✅ บังคับให้ Electron โหลดจาก build

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    const filePath = path.join(__dirname, 'client', 'dist', 'index.html');
    console.log('Loading file from:', filePath);
    win.loadFile(filePath);
    win.webContents.openDevTools(); // ดู error ถ้ายังหน้าขาว
  }
}

app.whenReady().then(createWindow);

```

### 3.1 ตัวอย่างโค้ด ไฟล์ vite.config.js
```js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', 
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})

```
### 3.2 เพิ่มคำสั่งที่ package.jsonของงานหลัก
  "start-prod": "set NODE_ENV=production && electron ."
  `

### 4. ตัวอย่างคำสั่งที่ใช้
```bash
# ติดตั้งทุกอย่างครั้งแรก
cd client
npm install       # ติดตั้ง React

cd ..
npm install       # ติดตั้ง Electron ที่โฟลเดอร์หลัก

# เปิดระบบตอนพัฒนา (Dev Mode)
cd client
npm run dev       # เปิด React Dev Server

# เปิด Terminal อีกหน้าต่าง
npm run dev       # เปิด Electron
```

```bash
npm run build ต้อง build หน้าบ้านก่อน
# เปิดระบบตอน Production
npm run start-prod
```

---

⚠️ **หมายเหตุ:** อย่าลืมติดตั้งและตั้งค่าฐานข้อมูล **MySQL** ให้พร้อมก่อนเริ่มใช้งาน  
💡 **Electron** ช่วยให้ระบบ POS ของคุณรันเป็น Desktop App ได้จริง บน Windows, macOS หรือ Linux
