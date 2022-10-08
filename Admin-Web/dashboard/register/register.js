
const form = document.querySelector("form");
form.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    let name = document.querySelector("input[name='name']").value;
    let email = document.querySelector("input[name='email']").value;
    let district = document.querySelector("select[name='district']").value;
    let password = document.querySelector("input[name='password']").value;
    let rePassword = document.querySelector("input[name='re-password']").value;

    if(password != rePassword) {
        alert("Both password don't match !!");
        return;
    }

    form.classList.add("loader");

    await fAuth.createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {

        const user = userCredential.user;

        await fDatabase.ref('Police/' + user.uid).set({
            uid: user.uid,
            email: user.email,
            name : name,
            district : district,
        })
        .then(() => {

            alert("Registration successfully");

            window.location.replace("../police/");

        });

    })
    .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;
        if(errorMessage) {
            alert(errorMessage);
        }
    });

    form.classList.remove("loader");

});
