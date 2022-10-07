
console.log("Extension running");

window.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById('clearbtn').addEventListener('click', ()=>{

    chrome.storage.local.remove(['email', 'pass'], ()=>{
      console.log('Old email pass is removed')
    })
  });
})


email = null
pass = null
async function readStorage(){
  userEmail = await chrome.storage.local.get(['email'])
  userPass = await chrome.storage.local.get(['pass'])
}

readStorage().then(()=> {
  email = userEmail.email
  pass = userPass.pass
  if(email == null || pass == null){
    email = prompt("Email For OTP");
    pass = prompt("Password");
    chrome.storage.local.set({email: email, pass: pass});
  }
}).then(()=> {
  waitForElm('input[name="OTPe"]').then((otpInput)=> {
    console.log('reading OTP from email')

    getOTP().then((otp)=>{
      if(otp)
        otpInput.value = otp
      else
        alert('Cannot find OTP from email')
    });
  })
});


async function getOTP() {
  // console.log('Before requsting credentials', email, pass)
  const res = fetch("http://localhost:5000/api/v1/otp", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      pass: pass,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    
  })
  .then((response) => response.json())
  .then((user) => {
    return user.data;
  })
  .catch((error) => {console.log(error);});

  const response = await res;
  return response;
}

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
