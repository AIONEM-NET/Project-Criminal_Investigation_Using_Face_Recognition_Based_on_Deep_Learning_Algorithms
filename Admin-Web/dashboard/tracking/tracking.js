
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

        i++;
        let html1 = `
            <tr>
                <td>
                    ${i}
                </td>
                <td class="py-1">
                    <img src="${data.photo ?? '../../assets/images/logo_face.jpg'}" alt=""/>
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
                    <label class="badge text-center ${data.isTracking ? data.isDetected == true ? 'badge-success' : 'badge-danger' : 'badge-primary' }">
                        ${data.isTracking ? data.isDetected == true ? 'Detected' : 'Not Detected' : '-------'}
                    </label>
                </td>
                <td class="text-center">
                    <label class="badge text-center ${data.isTracking == true ? 'badge-success' : 'badge-danger' }" onclick="onCriminalTracking('${id}', ${data.isTracking == true}, '${data.name}');" style="pointer: cursor;">
                        ${data.isTracking == true ? 'Tracking' : 'No Tracking'}
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



function onCriminalTracking(id, isTracking, name) {

    const isYes = confirm(`Do you want to ${isTracking == true ? 'STOP' : 'START'} Tracking ${name} ?`);

    if(isYes) {
    
        fDatabase.ref('Criminals/'+ id +'/isTracking').set(!(isTracking == true));

        fDatabase.ref('Criminals/'+ id +'/isDetected').set(false);

    }

}
