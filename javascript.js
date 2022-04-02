// Import the functions you need from the SDKs you need
      import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
      import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
      import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
      // Your web app's Firebase configuration
      const firebaseConfig = {
      apiKey: "AIzaSyAP-nA0iwyUXG4rIg5LLNf-Jv9AxG7qayk",
      authDomain: "user-authentication-c4a3c.firebaseapp.com",
      projectId: "user-authentication-c4a3c",
      storageBucket: "user-authentication-c4a3c.appspot.com",
      messagingSenderId: "407632377144",
      appId: "1:407632377144:web:d57bb411a3a9bc62df3dcd",
      measurementId: "G-QWMGGC04SJ"
            
      };
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const database = getDatabase(app);
      
    document.getElementById("reg-btn").addEventListener('click', function(){
        document.getElementById("register-div").style.display="inline";
        document.getElementById("login-div").style.display="none";
     });
     
     document.getElementById("log-btn").addEventListener('click', function(){
      document.getElementById("register-div").style.display="none";
      document.getElementById("login-div").style.display="inline";
     
     });
     
       document.getElementById("login-btn").addEventListener('click', function(){
        const loginEmail= document.getElementById("login-email").value;
        const loginPassword =document.getElementById("login-password").value;
     
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
       .then((userCredential) => {
         const user = userCredential.user;

         document.getElementById("result-box").style.display="inline";
          document.getElementById("login-div").style.display="none";
          document.getElementById("result").innerHTML="Welcome Back<br>"+loginEmail+" was Login Successfully";
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         document.getElementById("result-box").style.display="inline";
          document.getElementById("login-div").style.display="none";
          document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
     
       });
     });
     
     
       document.getElementById("register-btn").addEventListener('click', function(){
     
        const registerEmail= document.getElementById("register-email").value;
        const registerPassword =document.getElementById("register-password").value;
        const fname= document.getElementById("fname").value;
        const lname=getId('lname')
        const birthday= document.getElementById("register-date").value;
        const phoneno= getId("register-tel")
        if (registerEmail.length<4){
          alert('please enter an email address')
          return;
        }
        if(fname.length<1){
          alert('please enter your first name')
          return;
        }
        if (lname.length<1){
          alert('please enter your last name')
          return;
        }
        if (phoneno.length!=10){
          alert('please enter 10 digit')
          return;
        }
        
          var p = document.getElementById('register-password').value,
              errors = [];
          if (p.length < 8) {
              errors.push("Your password must be at least 8 characters");
          }
          if (p.search(/[a-z]/i) < 0) {
              errors.push("Your password must contain at least one letter."); 
          }
          if (p.search(/[0-9]/) < 0) {
              errors.push("Your password must contain at least one digit.");
          }
          if (errors.length > 0) {
              alert(errors.join("\n"));
              return false;
          }
        
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword,fname,lname, birthday,phoneno)
       .then((userCredential) => {
         const user = userCredential.user;
          // ... user.uid
          set(ref(database, 'users/' + user.uid), {
            First_name:getId('fname'),
            Last_name:getId('lname'),
            email: getId('register-email'),
            password:getId('register-password'),
            phone_no:getId('register-tel'),
            birthday:getId('register-date')
        }) .then(() => {
         document.getElementById("result-box").style.display="inline";
          document.getElementById("register-div").style.display="none";
          document.getElementById("result").innerHTML="Welcome <br>"+registerEmail+" was Registered Successfully";
        }) 
        }).catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         document.getElementById("result-box").style.display="inline";
          document.getElementById("register-div").style.display="none";
          document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
     
       });
     });
     
     
     document.getElementById("log-out-btn").addEventListener('click', function(){
       signOut(auth).then(() => {
          document.getElementById("result-box").style.display="none";
            document.getElementById("login-div").style.display="inline";
       }).catch((error) => {
          document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
       });
     
     });
     
     function  getId(id){
      return document.getElementById(id).value;
  }
     