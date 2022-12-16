
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

if(!id) {
    window.location.replace("../admins/");
}

const form = document.querySelector(".form-register");

form.classList.add("loader");

let data = [];

fDatabase.ref('Admins/' + id).once('value', (item) => {

    const id = item.key;
    data = item.val();

    document.querySelector("input[name='name']").value = data.name ?? "";
    document.querySelector("input[name='email']").value = data.email ?? "";
    document.querySelector("input[name='phone']").value = data.phone ?? "";
    document.querySelector("select[name='type']").value = data.type ?? "";
    document.querySelector("select[name='district']").value = data.district ?? "";

    form.classList.remove("loader");

});


form.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    let name = document.querySelector("input[name='name']").value;
    let email = document.querySelector("input[name='email']").value;
    let phone = document.querySelector("input[name='phone']").value;
    let type = document.querySelector("select[name='type']").value;
    let district = document.querySelector("select[name='district']").value;

    form.classList.add("loader");

    data.phone = phone;
    data.name = name;
    // data.type = type;
    // data.district = district;

    await fDatabase.ref('Admins/' + id).set(data)
    .then(() => {

        alert("Admin updated successfully");

        window.location.replace("../admins/");

    });

    form.classList.remove("loader");

});
