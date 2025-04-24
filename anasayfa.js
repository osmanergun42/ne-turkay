// Firebase kurulumu
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, increment, arrayUnion } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvW1DcksQEB2sYYuwNkeEXXd1AqtM0wjo",
  authDomain: "sitem-82182.firebaseapp.com",
  projectId: "sitem-82182",
  storageBucket: "sitem-82182.firebasestorage.app",
  messagingSenderId: "374365308439",
  appId: "1:374365308439:web:5f910b801f4404d0babe52"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let secilenDocId = null;
let secilenDocVeri = null;
const bilgiKutusu = document.getElementById("uzayBilgisiKutusu");
const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");
const yorumListesi = document.getElementById("yorumListesi");
const yorumInput = document.getElementById("yorumInput");
const yorumEkleBtn = document.getElementById("yorumEkleBtn");

async function rastgeleBilgiGoster() {
  const snapshot = await getDocs(collection(db, "uzayBilgileri"));
  const docs = snapshot.docs;
  const rastgeleDoc = docs[Math.floor(Math.random() * docs.length)];

  secilenDocId = rastgeleDoc.id;
  secilenDocVeri = rastgeleDoc.data();

  guncelleGoruntu();
}

function guncelleGoruntu() {
  bilgiKutusu.textContent = secilenDocVeri.bilgi;
  likeCount.textContent = `${secilenDocVeri.begeni || 0} beğeni`;
  yorumListesi.innerHTML = "";
  (secilenDocVeri.yorumlar || []).forEach(y => {
    const li = document.createElement("li");
    li.textContent = y;
    yorumListesi.appendChild(li);
  });
}

likeBtn.addEventListener("click", async () => {
  const key = "liked_" + secilenDocId;
  const docRef = doc(db, "uzayBilgileri", secilenDocId);

  const liked = localStorage.getItem(key);
  if (liked) {
    await updateDoc(docRef, { begeni: increment(-1) });
    localStorage.removeItem(key);
    secilenDocVeri.begeni--;
  } else {
    await updateDoc(docRef, { begeni: increment(1) });
    localStorage.setItem(key, "1");
    secilenDocVeri.begeni = (secilenDocVeri.begeni || 0) + 1;
  }
  guncelleGoruntu();
});

yorumEkleBtn.addEventListener("click", async () => {
  const yorum = yorumInput.value.trim();
  if (yorum && secilenDocId) {
    const docRef = doc(db, "uzayBilgileri", secilenDocId);
    await updateDoc(docRef, {
      yorumlar: arrayUnion(yorum)
    });
    yorumInput.value = "";
    secilenDocVeri.yorumlar = [...(secilenDocVeri.yorumlar || []), yorum];
    guncelleGoruntu();
  }
});

rastgeleBilgiGoster();