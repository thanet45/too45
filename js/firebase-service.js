import {firebaseConfig,isFirebaseConfigured} from './firebase-config.js';
// Firebase modular SDK จาก Firebase CDN — ไม่ต้องติดตั้ง Node.js
import {initializeApp} from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js';
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut} from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js';
import {getFirestore,doc,getDoc,setDoc,deleteDoc,collection,getDocs,onSnapshot,serverTimestamp} from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js';
let auth=null,db=null;
if(isFirebaseConfigured){const app=initializeApp(firebaseConfig);auth=getAuth(app);db=getFirestore(app);}
export const firebaseReady=isFirebaseConfigured;
export function listenAuth(callback){if(!auth){callback(null);return ()=>{};}return onAuthStateChanged(auth,callback);}
export async function login(email,password){if(!auth)throw new Error('โปรดตั้งค่า Firebase ก่อน');return signInWithEmailAndPassword(auth,email,password);}
export async function logout(){if(auth)await signOut(auth);}
export async function isAdmin(uid){if(!db||!uid)return false;const snap=await getDoc(doc(db,'admins',uid));return snap.exists()&&snap.data().active===true;}
export function listenCollection(path,onData,onError){if(!db){onData([]);return ()=>{};}return onSnapshot(collection(db,path),snap=>onData(snap.docs.map(d=>({id:d.id,...d.data()}))),onError);}
export function listenSettings(onData,onError){if(!db){onData({});return ()=>{};}return onSnapshot(doc(db,'settings','site'),snap=>onData(snap.exists()?snap.data():{}),onError);}
export async function savePrediction(period,signId,values){if(!db)throw new Error('ยังไม่ได้เชื่อม Firebase');await setDoc(doc(db,'predictions',`${period}_${signId}`),{...values,period,signId,updatedAt:serverTimestamp()});}
export async function saveSite(values){if(!db)throw new Error('ยังไม่ได้เชื่อม Firebase');await setDoc(doc(db,'settings','site'),{...values,updatedAt:serverTimestamp()});}
export async function saveArticle(id,values){if(!db)throw new Error('ยังไม่ได้เชื่อม Firebase');await setDoc(doc(db,'articles',id),{...values,updatedAt:serverTimestamp()});}
export async function removeArticle(id){if(!db)throw new Error('ยังไม่ได้เชื่อม Firebase');await deleteDoc(doc(db,'articles',id));}
