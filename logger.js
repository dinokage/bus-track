
const firebaseConfig = {
  apiKey: "AIzaSyAbHNhuV5VK2GIH2hvJah5FJa_sYmv29V8",
  authDomain: "bus-track-f7fe8.firebaseapp.com",
  databaseURL:
    "https://bus-track-f7fe8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bus-track-f7fe8",
  storageBucket: "bus-track-f7fe8.appspot.com",
  messagingSenderId: "471108940589",
  appId: "1:471108940589:web:04d5bf98f4d264a90859a4",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get Database
const database = app.getDatabase();
// Read user location
function storePosition(position, routeID) {
  set(ref(db, 'routes/' + routeID), {
    long: position.coords.longitude,
    lat: position.coords.latitude,
    speed: position.coords.speed
  });
}