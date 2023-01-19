
if(!userID) {
    window.location.replace("../../login/");
}

document.querySelector(".face-database").innerHTML = "";
document.querySelector(".face-database").classList.add("loader");

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
            <div class="col-12">
                <div clas="col-12" style="margin-top: 10px">
                    <h3 class="text-center" style="line-height: 20px; height: 20px; overflow: hidden;">
                        ${i}. ${data.name}
                    </h3>
                </div>
                <div clas="col-12" style="margin-top: 10px">
                    <h3 class="text-center face-database-tracking ${data.isTracking ? data.isDetected ? 'wanted' : 'wanted' : ''}">
                        ${data.isTracking ? data.isDetected ? 'WANTED' : 'WANTED' : '-'}
                    </h3>
                </div>
                <div class="row col-12">
                    <div class="col-4 face-database-1" style="padding: 10px 10px">
                        <div style="border: solid 2px #3f51b5; border-radius: 10px; height: max-content;">
                            <div class="col-12">
                                <img src="${data.photo || ('../../assets/images/no-face-' + data.gender +".png").toLowerCase()}" alt="" style="width: 100%; height: 200px; object-fit: contain;"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 face-database-2" style="padding: 10px 10px">
                        <div style="border: solid 2px #3f51b5; border-radius: 10px; height: max-content;">
                            <div class="col-12">
                                <img src="${data.photo1 || ('../../assets/images/no-face-' + data.gender +".png").toLowerCase()}" alt="" style="width: 100%; height: 200px; object-fit: contain;"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 face-database-3" style="padding: 10px 10px">
                        <div style="border: solid 2px #3f51b5; border-radius: 10px; height: max-content;">
                            <div class="col-12">
                                <img src="${data.photo2 || ('../../assets/images/no-face-' + data.gender +".png").toLowerCase()}" alt="" style="width: 100%; height: 200px; object-fit: contain;"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 face-database-4" style="padding: 10px 10px">
                        <div style="border: solid 2px #3f51b5; border-radius: 10px; height: max-content;">
                            <div class="col-12">
                                <img src="${data.photo3 || ('../../assets/images/no-face-' + data.gender +".png").toLowerCase()}" alt="" style="width: 100%; height: 200px; object-fit: contain;"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 face-database-5" style="padding: 10px 10px">
                        <div style="border: solid 2px #3f51b5; border-radius: 10px; height: max-content;">
                            <div class="col-12">
                                <img src="${data.photo4 || ('../../assets/images/no-face-' + data.gender +".png").toLowerCase()}" alt="" style="width: 100%; height: 200px; object-fit: contain;"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 face-database-6" style="padding: 10px 10px">
                        <div style="border: solid 2px #3f51b5; border-radius: 10px; height: max-content;">
                            <div class="col-12">
                                <img src="${data.photo5 || ('../../assets/images/no-face-' + data.gender +".png").toLowerCase()}" alt="" style="width: 100%; height: 200px; object-fit: contain;"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        html = html + html1;
        
    });

    document.querySelector(".face-database").innerHTML = html;

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

    document.querySelector(".face-database").classList.remove("loader");

});