const express = require('express');
const router = express.Router();

const {initializeApp} = require('firebase/app');
const {getDatabase, ref, get, child} = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyCSD2lu86udoR0EikjCkvW45QoOlVnsbZE",
  authDomain: "final-project-af7d5.firebaseapp.com",
  databaseURL: "https://final-project-af7d5-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "final-project-af7d5",
  storageBucket: "final-project-af7d5.appspot.com",
  messagingSenderId: "772153379471",
  appId: "1:772153379471:web:91e30ce060b39a03f83efa"
};  

const appFb = initializeApp(firebaseConfig);
const database = getDatabase(appFb);

/* GET home page. */
router.get('/', function(req, res) {
  get(child(ref(database), 'esp32_ta_01/'))
    .then((snap) => {
      if(snap.exists()){
        res.status(200)
        res.render('index', {
          nama_pasien: snap.val().nama_pasien,
          usia: snap.val().umur_pasien,
          obat: snap.val().nama_obat,
          gender: snap.val().gender_pasien,
          penyakit: snap.val().penyakit_pasien,
          payload: JSON.stringify(snap.val())
        })
      }else{
        res.json(null)
        res.status(404)
      }
    })
    .catch((err) => {
      console.error(err);
    })

});

router.post('/', function(req, res){

})

module.exports = router;
