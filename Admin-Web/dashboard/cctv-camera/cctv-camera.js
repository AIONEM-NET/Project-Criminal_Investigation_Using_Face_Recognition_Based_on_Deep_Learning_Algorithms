
if(!userID) {
    window.location.replace("../login/");
}



fDatabase.ref("CCTV-Camera").on("value", (item) => {
  if(item.exists()) {
    const id = item.key;
    const data = item.val();

    document.querySelector(".cctv-location").value = data.location ?? "";
    document.querySelector(".cctv-image").src = data.photo ?? "../../assets/images/face_scan_1.gif";
    document.querySelector(".cctv-name").innerHTML = data.name ?? "-";
    document.querySelector(".cctv-gender").innerHTML = data.gender ?? "-";
    document.querySelector(".cctv-identity").innerHTML = data.identity ?? "'";
    document.querySelector(".cctv-accuracy").innerHTML = (data.accuracy ?? "-") +" %";
    document.querySelector(".cctv-time").innerHTML = new Date(data.time).toString().substring(0, 24);

    document.querySelector(".cctv-div").classList.remove("loader");
  }
});


document.querySelector(".cct-location-update").addEventListener("click", function() {

  let location = document.querySelector(".cctv-location").value;

  if(!location) {
    alert("Enter CCTV Camera Location")
    return;
  }

  
  const isYes = confirm(`Do you want to update CCTV Camera Location to "${location}" ?`);

  if(isYes) {
  
      fDatabase.ref('CCTV-Camera/' +'/location').set(location);

  }

});



window.addEventListener('popstate', (event) => {
    history.go(1);
});
history.pushState({ state: 1 }, '');
