
if(!userID) {
    window.location.replace("../../login/");
}

document.querySelector("tbody").innerHTML = "";
document.querySelector(".table-responsive").classList.add("loader");

let isDataTable = true;
fDatabase.ref('Agents').on('value', (list) => {

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
                <td class="text-center">
                    ${data.type ?? '-'}
                </td>
                <td class="text-center">
                    ${data.district ?? '-'}
                </td>
                <td class="text-center" style="display: inline-flex-1; gap: 4px;">
                    <label class="badge text-center ${data.isActive == true ? 'badge-success' : 'badge-danger' }" onclick="onPoliceActivate('${id}', ${data.isActive == true}, '${data.name}');" style="pointer: cursor;">
                        ${data.isActive == true ? 'Activated' : 'Disabled'}
                    </label>
                    <a class="badge text-center text-white badge-secondary" href="../agent-edit/?id=${id}" style="pointer: cursor;">
                        <i class="fa fa-edit"></i> <span>Edit</span>
                    </a>
                    <label class="badge text-center badge-danger" onclick="onPoliceDelete('${id}', ${data.isActive == true}, '${data.name}');" style="pointer: cursor;">
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



function onPoliceActivate(id, isActive, name) {

    const isYes = confirm(`Do you want to ${isActive == true ? 'DISABLE' : 'ACTIVATE'} Agent "${name}" ?`);

    if(isYes) {
    
        fDatabase.ref('Agents/'+ id +'/isActive').set(!(isActive == true));

    }

}


function onPoliceDelete(id, isActive, name) {

    const isYes = confirm(`Do you want to 'DELETE' Agent "${name}" ?`);

    if(isYes) {
    
        fDatabase.ref('Agents/'+ id).remove();

    }

}