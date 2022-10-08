
if(!userID) {
    window.location.replace("../login/");
}



fDatabase.ref("CCTV-Camera").on("value", (data) => {
  if(data.exists()) {
    const id = data.key;
    const item = data.val();

    document.querySelector(".cctv-image").src = item.photo ?? "../../assets/images/face_scan_1.gif";
    document.querySelector(".cctv-name").innerHTML = item.name ?? "-";
    document.querySelector(".cctv-gender").innerHTML = item.gender ?? "-";
    document.querySelector(".cctv-identity").innerHTML = item.identity ?? "'";
    document.querySelector(".cctv-accuracy").innerHTML = (item.accuracy ?? "-") +" %";
    document.querySelector(".cctv-time").innerHTML = new Date(item.time).toString().replace("GMT+0200 (Eastern European Standard Time)", "");

    document.querySelector(".cctv-div").classList.remove("loader");
  }
});




window.addEventListener('popstate', (event) => {
    history.go(1);
});
history.pushState({ state: 1 }, '');
