
if(!userID) {
    window.location.replace("../../login/");
}

document.querySelector("tbody").innerHTML = "";
document.querySelector(".table-responsive").classList.add("loader");

let isDataTable = true;
fDatabase.ref('Criminals').on('value', (list) => {

    let html = "";
    let i = 0;
    let counts = list.numChildren();
    list.forEach((item) => {

        const id = item.key;
        const data = item.val();

        if(!data.identity) return;

        i++;
        let html1 = `
            <tr>
                <td>
                    ${i}
                </td>
                <td>
                    <img src="${data.photo ?? ''}" alt=""/>
                </td>
                <td>
                    ${data.name ?? '-'}
                </td>
                <td class="text-center">
                    ${data.identity ?? '-'}
                </td>
                <td class="text-center">
                    ${data.gender ?? '-'}
                </td>
                <td class="text-center">
                    ${data.time ? new Date(data.time).toString().substring(0, 24) : '-'}
                </td>
                <td class="text-center">
                    <a class="btn btn-danger btn-sm font-weight-medium text-white"
                       onclick="onCriminalDelete('${id}', '${data.name}');">
                        <i class="fa fa-trash"></i>
                        Delete
                    </a>
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



function onCriminalDelete(id, name) {

    const isYes = confirm(`Do you want to DELETE "${name}" ?`);

    if(isYes) {
    
        fDatabase.ref('Criminals/'+ id).remove();

    }

}
