# 🌙 ดวงดาว PREMIUM — เว็บไซต์ดูดวงออนไลน์ + Firebase Admin

เว็บไซต์ภาษาไทย ธีมม่วงเข้ม–ทอง สำหรับ GitHub Pages พร้อมหน้าแอดมินจัดการข้อมูลออนไลน์ **โค้ดทั้งหมดอยู่ใน ZIP และแก้ไขได้**

> **สำคัญ:** ดาวน์โหลด ZIP → แตกไฟล์ → อัปโหลด **ไฟล์และโฟลเดอร์ภายใน** `horoscope-premium` ไปยังราก (root) ของ Repository บน GitHub **อย่าอัปโหลดไฟล์ ZIP เพียงไฟล์เดียว**

## 1) ภายในชุดโค้ดมีอะไรบ้าง

```text
horoscope-premium/
├── index.html                 หน้าเว็บไซต์หลัก
├── style.css                  สี ฟอนต์ และ Responsive
├── .nojekyll                  สำหรับ GitHub Pages
├── firestore.rules            กฎสิทธิ์ฐานข้อมูล (ต้องคัดลอกไป Firebase Console)
├── README-เริ่มต้นที่นี่.md       คู่มือฉบับละเอียด
├── assets/
│   └── favicon.svg            ไอคอนเว็บ
└── js/
    ├── app.js                 ทำงานของหน้าเว็บ / Admin
    ├── data.js                ข้อมูลตัวอย่าง ราศี ไพ่ และบทความ
    ├── firebase-config.js     ใส่ค่าที่ได้จาก Firebase
    └── firebase-service.js    เชื่อม Authentication และ Firestore
```

## 2) อัปโหลดเว็บขึ้น GitHub Pages (สำหรับมือใหม่)

1. สมัครหรือเข้าสู่ระบบ https://github.com
2. กดปุ่ม **+** มุมขวาบน → **New repository**
3. ตั้งชื่อ เช่น `duangdao-premium` เลือก **Public** → **Create repository**
4. เปิดโฟลเดอร์ที่แตก ZIP แล้ว: จะเห็น `index.html`, `style.css`, `js`, `assets` ฯลฯ
5. ที่หน้า Repository กด **Add file → Upload files** (หรือหน้า Repository ว่างกด **uploading an existing file**)
6. **ลากไฟล์ทั้งหมดรวมทั้งโฟลเดอร์ `js` และ `assets`** ลงหน้าอัปโหลด — ตรวจว่า `index.html` อยู่ชั้นบนสุด ไม่ใช่ `horoscope-premium/index.html`
7. กด **Commit changes**
8. เปิดแท็บ **Settings → Pages**
9. ตรง **Build and deployment** เลือก **Source: Deploy from a branch**, Branch: **main**, Folder: **/(root)** → **Save**
10. เมื่อ GitHub แสดงลิงก์ เช่น `https://ชื่อบัญชี.github.io/duangdao-premium/` ให้เปิดเว็บได้เลย

หากยังไม่ต่อ Firebase เว็บจะอยู่ใน **โหมดตัวอย่าง** (ดูเนื้อหาตัวอย่างได้ แต่ Admin จะยังบันทึกออนไลน์ไม่ได้)

## 3) สร้างโปรเจกต์ Firebase

1. ไปที่ https://console.firebase.google.com/ และกด **Create a project / เพิ่มโปรเจกต์**
2. ใส่ชื่อ เช่น `duangdao-premium` ตั้งค่า Google Analytics ตามต้องการ
3. ใน Firebase Project Overview กดไอคอน **Web `</>`** เพื่อ Register app
4. ตั้งชื่อ Web app แล้วกด Register app; **ไม่จำเป็นต้องเปิด Firebase Hosting** เพราะใช้ GitHub Pages อยู่แล้ว
5. Firebase จะแสดงค่า `firebaseConfig` เช่น `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`
6. เปิด `js/firebase-config.js` และแทนที่ค่า `YOUR_...` ทั้งหมดด้วย **ค่าจริงจากโปรเจกต์ของตัวเอง** ให้คงรูปแบบเครื่องหมาย quote/comma ตามเดิม
7. บันทึกไฟล์ แล้วอัปโหลดไฟล์ที่แก้ใหม่ไป GitHub (Commit changes)

**ข้อมูล firebaseConfig ใช้บนเบราว์เซอร์ได้** ไม่ใช่รหัสผ่านเซิร์ฟเวอร์ แต่ **ห้ามนำ Service Account JSON, Private Key, รหัสผ่าน หรือคีย์ลับของแอดมินใส่ใน GitHub**

## 4) เปิด Firebase Authentication

1. Firebase Console → **Build → Authentication → Get started**
2. ไปที่แท็บ **Sign-in method** → เปิด **Email/Password** (แค่ Email/Password; ไม่จำเป็นต้องเปิด Email Link)
3. ไปที่ **Users → Add user** ใส่อีเมลผู้ดูแล และตั้งรหัสผ่านที่รัดกุม → Save
4. คัดลอก **User UID** จากแถวผู้ใช้ที่เพิ่งสร้างไว้ (สำคัญมาก)
5. ใน Authentication เปิดแท็บ **Settings → Authorized domains**
6. เพิ่ม `ชื่อบัญชี.github.io` (เช่น `myname.github.io`) โดย **ไม่ต้องใส่** `https://`, `/` หรือชื่อ Repository; หากทดสอบบน localhost ก็เพิ่ม `localhost` ตามความจำเป็น

> การสร้างผู้ใช้ใน Authentication **ยังไม่พอ** ต้องกำหนดสิทธิ์ Admin ใน Firestore ตามข้อ 6 ด้วย

## 5) สร้างฐานข้อมูล Cloud Firestore และกำหนด Rules

1. Firebase Console → **Build → Firestore Database → Create database**
2. เลือกตำแหน่งฐานข้อมูลที่เหมาะสม; ใช้ฐานข้อมูล `(default)`
3. ตั้งค่าการเข้าถึงตามหน้าจอเริ่มต้นของ Firebase (อาจเลือก Production mode) และตั้ง Rules ด้านล่าง **ก่อนใช้งานจริง**
4. เข้าแท็บ **Rules** ของ Firestore
5. เปิดไฟล์ `firestore.rules` ในชุดโค้ด คัดลอก **ทั้งหมด** ไปแทนกฎเดิม
6. กด **Publish**
7. **ห้ามใช้กฎ** `allow read, write: if true;` เพราะใครก็สามารถเปลี่ยนข้อมูลได้

กฎที่ให้มานี้: ประชาชนอ่านคำทำนาย, บทความ และตั้งค่าเว็บไซต์ได้ แต่เฉพาะผู้ใช้ที่มี `admins/{uid}.active = true` เท่านั้นที่แก้ไขฐานข้อมูลได้; ผู้ใช้ทั่วไปไม่สามารถแก้ไขเอกสารสิทธิ์ Admin ด้วยหน้าเว็บ

## 6) แต่งตั้ง Admin คนแรกใน Firestore (ทำเองใน Console เท่านั้น)

1. เปิด **Firestore Database → Data**
2. กด **Start collection** → ตั้ง **Collection ID** ว่า `admins` (ตัวพิมพ์เล็กทุกตัว)
3. ในช่อง **Document ID** วาง **UID ของบัญชีที่สร้างใน Authentication ข้อ 4** (ไม่ใช่อีเมล)
4. เพิ่ม Field:
   - **Field name:** `active`
   - **Type:** `boolean`
   - **Value:** `true`
5. กด **Save**

โครงสร้างที่ได้:

```text
admins/
  UID_ของผู้ดูแล/
    active: true     (boolean ไม่ใช่ข้อความ "true")
```

**ห้ามเปิดให้ผู้ใช้เขียน `admins` เอง** แม้ต้องการเพิ่มผู้ดูแลภายหลัง ให้สร้าง Authentication user แล้วเพิ่ม `admins/UID` ผ่าน Firebase Console เท่านั้น

## 7) ทดลองใช้งาน Admin จริง

1. เปิดเว็บไซต์ GitHub Pages ของคุณแล้วรีเฟรช
2. กดปุ่ม **⚙ แอดมิน** บนแถบเมนู
3. กรอกอีเมลและรหัสผ่านตามข้อ 4 แล้วกด **เข้าสู่ระบบ**
4. ถ้าสิทธิ์ถูกต้อง จะแสดงเมนู 3 ส่วน:
   - **คำทำนาย** — เปลี่ยนราศี ช่วงเวลา และแก้ไขภาพรวม/การงาน/การเงิน/ความรัก/สุขภาพ/จำนวนดาว
   - **ตั้งค่าเว็บไซต์** — เปลี่ยนชื่อเว็บ หัวข้อ คำโปรย เลขมงคล สีมงคล
   - **บทความ** — เพิ่ม แก้ไข และลบบทความ
5. กด **บันทึก** แล้วลองเปิดเว็บไซต์ในเบราว์เซอร์อื่น ข้อมูลจะถูกอ่านจาก Firestore แบบเรียลไทม์
6. หากยังไม่มีคำทำนายที่บันทึก เว็บไซต์จะแสดงข้อมูลตัวอย่างจาก `js/data.js` เมื่อบันทึกแล้วข้อมูล Firebase จะมาแทน

## 8) แก้ธีม สี และโลโก้

- สีม่วง–ทอง: เปิด `style.css` แก้ตัวแปร `:root` เช่น `--gold`, `--violet`, `--panel`
- ชื่อเว็บ/คำโปรย: เปลี่ยนผ่าน Admin → ตั้งค่าเว็บไซต์
- รายการ 12 ราศี ข้อความตัวอย่าง และความหมายไพ่: แก้ `js/data.js`
- จำนวนเมนูและโครงสร้าง: แก้ `index.html` และการเรนเดอร์ใน `js/app.js`
- ไอคอนเว็บ: แก้ `assets/favicon.svg`

เว็บไซต์นี้ใช้ SVG/CSS สร้างภาพจักรราศีและลูกแก้ว ไม่ต้องซื้อหรือดาวน์โหลดไฟล์ภาพลิขสิทธิ์จากภายนอก

## 9) วิธีแก้โค้ดบน GitHub โดยตรง

1. เปิด Repository และคลิกไฟล์ที่ต้องการ เช่น `style.css`
2. กดไอคอนดินสอ **Edit this file**
3. แก้ไขข้อความ กด **Commit changes**
4. รอ GitHub Pages เผยแพร่การเปลี่ยนแปลง แล้วเปิดหน้าเว็บกดรีเฟรช

## 10) ปัญหาที่พบได้บ่อย

| ปัญหา | วิธีตรวจสอบ |
|---|---|
| เว็บเป็น 404 | ตั้ง Pages `main` / `(root)` และเช็ก `index.html` อยู่ราก Repository |
| รูปแบบหาย/เมนูไม่ทำงาน | ตรวจว่า `style.css`, `js/app.js`, `js/data.js` อัปโหลดครบและอยู่ตามโครงสร้าง |
| ยังขึ้นโหมดตัวอย่าง | แก้ `js/firebase-config.js` แล้วหรือยัง? ต้องเปลี่ยน `YOUR_...` ให้ครบ |
| เข้าระบบไม่ได้ | ตรวจ Email/Password provider, อีเมล, รหัสผ่าน และ Authorized domains |
| Login ได้แต่ไม่ใช่ Admin | ตรวจ UID, collection `admins`, field `active` เป็นชนิด boolean true |
| Permission denied | ติดตั้ง/Publish `firestore.rules` แล้วหรือยัง? และใช้ฐานข้อมูล `(default)` ไหม |
| หน้าขาว/ไม่มีข้อมูล | เปิด Developer Tools (F12) → Console เพื่อดู error หรือการบล็อก CDN |
| เปิด `index.html` จากเครื่องโดยตรงแล้วมีปัญหา | ใช้ GitHub Pages หรือ local web server แทนการเปิดแบบ `file://` |
| ไม่เห็นบทความที่ยังไม่เคยสร้าง | เว็บไซต์แสดงบทความตัวอย่าง ถ้าต้องการบทความถาวรให้เพิ่มผ่าน Admin |

## 11) ทดลองในเครื่อง (ไม่บังคับ)

ถ้ามี Python: เปิด Terminal ในโฟลเดอร์โปรเจกต์แล้วรัน `python -m http.server 8000` จากนั้นเปิด `http://localhost:8000/` อย่าลืมเพิ่ม `localhost` ใน Firebase Authorized domains หากจะทดสอบล็อกอินบนเครื่อง

## 12) ข้อควรทราบก่อนใช้งานสาธารณะ

- GitHub Pages เป็นโฮสต์เว็บไซต์แบบ Static; Firebase เป็นผู้เก็บข้อมูลออนไลน์/ทำ Authentication — ไม่มีเซิร์ฟเวอร์ส่วนตัว
- การดูดวงในชุดตัวอย่างเป็นข้อความบรรณาธิการและการสุ่มไพ่ ไม่ใช่ระบบ AI ทำนายจริง หรือบริการโหราศาสตร์ที่ผ่านการตรวจสอบ
- ข้อมูลตัวอย่างไม่ได้เปลี่ยนคำทำนายโดยอัตโนมัติทุกวัน: Admin เป็นผู้บันทึกคำทำนายรายวัน/สัปดาห์/เดือนใน Firestore
- วันราศีในตัวอย่างเป็นการแบ่งตามแนวหนึ่งของโหราศาสตร์ไทย ไม่ใช่มาตรฐานเดียวของทุกสำนัก
- ไพ่ทาโรต์ที่ให้มาเป็นชุดความหมายแบบย่อ 15 ใบ ไม่ใช่สำรับ 78 ใบเต็ม
- Firestore มีโควตาและอัตราค่าบริการตามแผน Firebase; ตรวจสอบหน้า Pricing ของ Firebase ก่อนเปิดเว็บที่มีผู้ใช้งานจำนวนมาก
- อย่าเก็บข้อมูลส่วนบุคคลที่ไม่จำเป็น และตรวจสิทธิ์ก่อนเปิดให้บุคคลอื่นเข้าถึงระบบ

## ลิงก์ทางการ

- GitHub Pages: https://docs.github.com/en/pages/quickstart
- Firebase สำหรับ Web: https://firebase.google.com/docs/web/setup
- Firebase Authentication: https://firebase.google.com/docs/auth/web/password-auth
- Firestore Security Rules: https://firebase.google.com/docs/firestore/security/rules-conditions

---
สร้างสำหรับ GitHub Pages · ไฟล์ HTML/CSS/JS แก้ไขได้ · Firebase SDK แบบ CDN (ไม่ต้องใช้ npm หรือ build process)
