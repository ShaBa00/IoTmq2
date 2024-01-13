import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
        getDatabase,
        ref,
        child,
        update,
        set,
        get,
     } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDx9y5py8rJeW9L487x4JyXgd6p4vSUvDQ",
  authDomain: "iotproject-ef816.firebaseapp.com",
  databaseURL: "https://iotproject-ef816-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iotproject-ef816",
  storageBucket: "iotproject-ef816.appspot.com",
  messagingSenderId: "935376260181",
  appId: "1:935376260181:web:c16b6534a2d8fba68318dc"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const checkbox = document.getElementById('cb3-8');
checkbox.addEventListener('change', (event) => {
    const newValue = event.target.checked;
    const switchRef = ref(db, 'Led/Switch');
    set(switchRef, newValue);
  });
const mq2ValueRef = ref(db, 'Senzor/MQ2Vrijednost');
  setInterval(updateMQ2Value, 1000);
function updateMQ2Value() {
    get(mq2ValueRef).then((snapshot) => {
      if (snapshot.exists()) {
        const mq2Value = snapshot.val();
        console.log('Vrijednost MQ2Vrijednosti:', mq2Value);
        switch (true) {
            case mq2Value < 20:
              PopUpH();
              hideElements(['prvi8', 'prvi7', 'prvi6', 'prvi5', 'prvi4', 'prvi3', 'prvi2']);
              showElements(['prvi1']);
              break;
            case mq2Value >= 20 && mq2Value < 60:
              PopUpH();
              hideElements(['prvi8', 'prvi7', 'prvi6', 'prvi5', 'prvi4', 'prvi3']);
              showElements(['prvi1', 'prvi2']);
              break;
            case mq2Value >= 60 && mq2Value < 100:
              PopUpH();
              hideElements(['prvi8', 'prvi7', 'prvi6', 'prvi5', 'prvi4']);
              showElements(['prvi1', 'prvi2', 'prvi3']);
              break;
            case mq2Value >= 100 && mq2Value < 200:
              PopUpS();
              hideElements(['prvi8', 'prvi7', 'prvi6', 'prvi5']);
              showElements(['prvi1', 'prvi2', 'prvi3',  'prvi4']);
              break;
            case mq2Value >= 200 && mq2Value < 360:
              hideElements(['prvi8', 'prvi7', 'prvi6']);
              showElements(['prvi1', 'prvi2', 'prvi3', 'prvi4', 'prvi5']);
              break;
            case mq2Value >= 360 && mq2Value < 550:
              hideElements(['prvi8', 'prvi7']);
              showElements(['prvi1', 'prvi2', 'prvi3', 'prvi4', 'prvi5', 'prvi6']);
              break;
            case mq2Value >= 550:
              hideElements(['prvi8']);
              showElements(['prvi1', 'prvi2', 'prvi3', 'prvi4', 'prvi5', 'prvi6', 'prvi7', 'prvi8']);
              break;
          }
        document.getElementById('mq2Value').textContent = mq2Value;
      } else {
        console.log('Vrijednost MQ2Vrijednosti nije pronađena.');
      }
    }).catch((error) => {
      console.error('Došlo je do greške pri čitanju MQ2Vrijednosti:', error);
    });
}
function PopUpH(){  
  const e=document.getElementById("Upozorenje");
  e.style.display='none';
}
function PopUpS(){
  const e=document.getElementById("Upozorenje");
  e.style.display='flex';
}
function hideElements(elementsToHide) {
    for (let i = 0; i < elementsToHide.length; i++) {
      const element = document.getElementById(elementsToHide[i]);
      setTimeout(() => {
        element.style.display = 'none';
      }, i * 500);
    }
  }
function showElements(elementsToShow) {
    for (let i = 0; i < elementsToShow.length; i++) {
      const element = document.getElementById(elementsToShow[i]);
      setTimeout(() => {
        element.style.display = 'block';
      }, i * 500);
    }
}