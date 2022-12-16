
if(!userID) {
    window.location.replace("../../login/");
}

document.querySelector("tbody").innerHTML = "";
document.querySelector(".table-responsive").classList.add("loader");

let isDataTable = true;
fDatabase.ref('Admins').on('value', (list) => {

    let html = "";
    let i = 0;
    let counts = list.numChildren();
    list.forEach((item) => {

        const id = item.key;
        const data = item.val();

        i++;
        let html1 = `
            <tr>
                <td>
                    ${i}
                </td>
                <td>
                    ${data.name ?? '-'}
                </td>
                <td class="text-center">
                    ${data.email ?? '-'}
                </td>
                <td class="text-center" style="display: inline-flex-1; gap: 4px;">
                    <label class="badge text-center ${data.isActive == true ? 'badge-success' : 'badge-danger' }" onclick="onAdminActivate('${id}', ${data.isActive == true}, '${data.name}');" style="pointer: cursor;">
                        ${data.isActive == true ? 'Activated' : 'Disabled'}
                    </label>
                    <a class="badge text-center text-white badge-secondary hidden" href="../admin-edit/?id=${id}" style="pointer: cursor;">
                        <i class="fa fa-edit"></i> <span>Edit</span>
                    </a>
                    <label class="badge text-center badge-danger" onclick="onAdminDelete('${id}', ${data.isActive == true}, '${data.name}');" style="pointer: cursor;">
                    <i class="fa fa-trash"></i> Delete
                    </label>
                </td>
            </tr>
        `;

        html = html1 + html;
        
    });

    document.querySelector("tbody").innerHTML = html;

    if(isDataTable) {
        $('.table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                text: '<i class="fa fa-file-excel-o"></i> Excel',
                exportOptions: {
                    columns: ':not(.no-export)'
                }
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fa fa-file-pdf-o"></i> PDF',
                exportOptions: {
                    columns: ':not(.no-export)'
                }
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print"></i> PRINT',
                exportOptions: {
                    columns: ':not(.no-export)'
                }
            },
        ]
        });
        isDataTable = false;
    }

    document.querySelector(".table-responsive").classList.remove("loader");

});



function onAdminActivate(id, isActive, name) {

    const isYes = confirm(`Do you want to ${isActive == true ? 'DISABLE' : 'ACTIVATE'} Admin "${name}" ?`);

    if(isYes) {
    
        fDatabase.ref('Admins/'+ id +'/isActive').set(!(isActive == true));

    }

}


function onAdminDelete(id, isActive, name) {

    const isYes = confirm(`Do you want to 'DELETE' Admin "${name}" ?`);

    if(isYes) {
    
        fDatabase.ref('Admins/'+ id).remove();

    }

}