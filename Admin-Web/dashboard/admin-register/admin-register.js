
const form = document.querySelector(".form-register");
form.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    let name = document.querySelector("input[name='name']").value;
    let email = document.querySelector("input[name='email']").value;
    let type = document.querySelector("select[name='type']").value;
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

        await fDatabase.ref('Admins/' + user.uid).set({
            uid: user.uid,
            email: user.email,
            name : name,
            // type : type,
            // district : district,
        })
        .then(() => {

            alert("Registration successfully");

        });


        await user.updateProfile({
            displayName: "Admin"
        }).then(() => {
            
        }).catch((error) => {
            const errorCode = error.code;
            let errorMessage = error.message;
            if(errorMessage) {
                console.log(errorMessage);
            }
        });

        
        await user.sendEmailVerification()
        .then(() => {

            // alert("Verification email is sent to the Admin");

        })
        .catch((error) => {
            const errorCode = error.code;
            let errorMessage = error.message;
            if(errorMessage) {
                alert(errorMessage);
            }
        });


        await fAuth.sendPasswordResetEmail(email)
        .then(() => {

            // alert("Password rest email is sent to the Admin");

            window.location.replace("../admins/");

        })
        .catch((error) => {
            const errorCode = error.code;
            let errorMessage = error.message;
            if(errorMessage) {
                alert(errorMessage);
            }
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
