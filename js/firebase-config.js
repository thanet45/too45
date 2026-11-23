// 1. เปิด Firebase Console > Project settings > Your apps > Web app
// 2. คัดลอกค่าที่ได้รับมาแทนข้อความ YOUR_... ทั้งหมด (ไม่ต้องนำ service account/private key มาใส่)
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.firebasestorage.app',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
};
export const isFirebaseConfigured = !Object.values(firebaseConfig).some(v=>String(v).startsWith('YOUR_'));
