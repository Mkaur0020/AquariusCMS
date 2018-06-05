$('document').ready(function () {
    $(".loading").show();
    $.ajax({
        url: databaseUrl + apiKey,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            if (data.length == 1 || data.length == 0) {
                var html = '<h1>No Data</h1>';
                $(".workerTable").append(html);
                $(".loading").hide();
            } else {

                for (var i = 0; i <= data.length - 1; i++) {
                    if (data[i] != "system.indexes") {
                        $.ajax({
                            url: databaseCollections + data[i] + apiKey,
                            type: "GET",
                            contentType: "application/json",
                            success: function (data) {
                                if (data[0].workerStatus != "no_more_working") {
                                    var html = '<div class="card cardNumber-' + i + '">';
                                    html += '<div class="bar"><h2 class="ontop">Name - ' + data[0].workerName + '</h2>';
                                    html += '<h2 class="ontop">Contact - ' + data[0].workerContact + '</h2>'
                                    html += '<h2 class="ontop">Email - ' + data[0].workerEmail + '</h2>'
                                    html += '<h2 class="ontop">Address - ' + data[0].workerAddress + '</h2>'
                                    html += '<h2 class="ontop">SIN number - ' + data[0].workerSinNumber + '</h2>'
                                    html += '<h2 class="ontop">Transportation - ' + data[0].transportInfo + '</h2>'
                                    html += '</div>';
                                    html += '<img  src="https://www.volatour.com/images/productimg/img_avatar.png" onmouseover="openInfo(this)" onmouseout="closeInfo(this)" width="120px">';
                                    html += '        <h3  style="display:none;">' + data[0].databaseName + '</h3>';
                                    html += '        <h4>' + data[0].workerName + '</h4>';
                                    html += '        <button class="btn btn-info gen_btn" onclick="genrate(this)"><span class="glyphicon glyphicon-download-alt"></span> Generate Payroll File</button>'
                                    html += '        <input type="text" class="searchClient" placeholder="Search Client" onkeyup="searchClient(this)">';

                                    html += '<button class=" btn btn-info buttonload" onclick="refreshData(this)">';
                                    html += '          <i class="fa fa-refresh"></i>  Refresh';
                                    html += '        </button>';
                                    html += '        <div id="table">';
                                    html += '            <div class="tableDataHead">';
                                    html += '                <div class="tableCol">Name</div>';
                                    html += '                <div class="tableCol">Address</div>';
                                    html += '                <div class="tableCol">Start Date / Time</div>';
                                    html += '                <div class="tableCol">End Date / Time</div>';
                                    html += '                 <div class="tableCol">Status</div>';
                                    html += '                <div class="tableCol">Check In Date/Time</div>';
                                    html += '                <div class="tableCol">Check Out Date/Time</div>';
                                    html += '                <div class="tableCol">Edit</div>';
                                    html += '                <div class="tableCol">Delete</div>';
                                    html += '            </div>';
                                    html += '            <div class="tableData tableData-' + data[0].databaseName + '">';
                                    html += '         </div>';
                                    html += '     </div>';
                                    html += ' </div>';
                                    if (data[0].workingPlace == "Nu_Age") {
                                        $("#Nu_Age .workerTable").append(html);
                                    }
                                    if (data[0].workingPlace == "Aquarius") {
                                        $("#Aquarius .workerTable").append(html);
                                    }
                                    if (data[0].workingPlace == "Haven") {
                                        $("#Haven .workerTable").append(html);
                                    }
                                    if (data[0].workingPlace == "TrueWellness") {
                                        $("#TrueWellness .workerTable").append(html);
                                    }
                                    var payRate = data[0].payRate
                                    for (var j = data.length - 1; j > 0; j--) {
                                        var spendHrsInAppt = data[j].checkInTime.split(":")[0] - data[j].checkOutTime.split(":")[0];
                                        var spendMinutesInAppt = data[j].checkInTime.split(":")[1] - data[j].checkOutTime.split(":")[1];
                                        var totalTimeSpent = spendHrsInAppt + "." + spendMinutesInAppt;
                                        var totalTimeSpent = String(totalTimeSpent);
                                        var totalTimeSpent = totalTimeSpent.replace('-', '');
                                        /*var moneyPayforHours = 1 * payRate;
                                        var moneyPayforMinutes = 0.5 * payRate;*/
                                        var moneyPayforHours = totalTimeSpent.split(".")[0] * payRate;
                                        var moneyPayforMinutes = (totalTimeSpent.split(".")[1] / 60) * payRate;
                                        var totalMoneyToPay = moneyPayforHours + moneyPayforMinutes;
                                        var totalMoneyToPay = String(totalMoneyToPay);
                                        var html = '<div id="worker-' + data[0].databaseName + '-data-' + j + '" class="data">';
                                        html += '<h6 class="amountToPaid">' + totalMoneyToPay.slice(0, 4) + ' $</h6>';
                                        if (data[j].startTime.split(":")[0] >= 07 && data[j].startTime.split(":")[0] <= 14) {
                                            html += '<img src="images/Status-weather-clear-icon.png">'
                                        }
                                        if (data[j].startTime.split(":")[0] >= 15 && data[j].startTime.split(":")[0] <= 23) {
                                            html += '<img src="images/kweather.png">'
                                        }
                                        if (data[j].startTime.split(":")[0] >= 00 && data[j].startTime.split(":")[0] <= 06) {
                                            html += '<img src="images/15150-illustration-of-the-full-moon-with-clouds-pv.png">'
                                        }
                                        html += '            <div class="tableCol">';
                                        html += '                <input class="clientName" type="text" value="' + data[j].clientName + '" disabled>';
                                        html += '            </div>';
                                        html += '            <div class="tableCol">';
                                        html += '                <input class="clientAddress" type="text" value="' + data[j].clientAddress + '" disabled>';
                                        html += '            </div>';
                                        html += '            <div class="tableCol">';
                                        html += '                <input class="startDate" type="date" value="' + data[j].startDate + '" disabled>';

                                        html += '                <input class="startTime" type="time" value="' + data[j].startTime + '" disabled>';

                                        html += '            </div>';
                                        html += '            <div class="tableCol">';
                                        html += '                <input class="endDate" type="date" value="' + data[j].endDate + '" disabled>';

                                        html += '                <input class="endTime" type="time" value="' + data[j].endTime + '" disabled>';

                                        html += '            </div>';
                                        html += '            <div class="tableCol"><span class="checkStatus">' + data[j].status + '</span></div>';
                                        html += '            <div class="tableCol"><span class="checkInDate">' + data[j].checkInDate + '</span><br><br><span class="checkInTime">' + data[j].checkInTime + '</span><br><a href="https://www.google.com/maps/search/?api=1&query=' + data[j].checkInLatitude + ',' + data[j].checkInLongitude + '" target="_blank">Location</a></div>';
                                        console.log()
                                        html += '            <div class="tableCol"><span class="checkOutDate">' + data[j].checkOutDate + '</span><br><br><span class="checkOutTime">' + data[j].checkOutTime + '</span><br><a href="https://www.google.com/maps/search/?api=1&query=' + data[j].checkOutLatitude + ',' + data[j].checkOutLongitude + '" target="_blank">Location</a></div>';
                                        html += '            <div class="tableCol">';
                                        html += '                <button type="button" class="btn btn-info btn-sm editDataBtn" onclick="editDataEntry(this)">';
                                        html += '                  <span class="glyphicon glyphicon-pencil"></span> Edit ';
                                        html += '                </button>';
                                        html += '                <button type="button" class="btn btn-info btn-sm doneDataBtn" value="' + data[j]._id.$oid + '" onclick="doneDataEntry(this)">';
                                        html += '                  <span class="glyphicon glyphicon-ok"></span> Done ';
                                        html += '                </button>';
                                        html += '            </div>';
                                        html += '            <div class="tableCol">';
                                        html += '                <button type="button" class="btn btn-danger btn-sm" value="' + data[j]._id.$oid + '" onclick="deleteEntry(this)">';
                                        html += '                  <span class="glyphicon glyphicon-trash"></span> Delete ';
                                        html += '                </button>';
                                        html += '            </div>';
                                        html += '        </div>';
                                        $(".tableData-" + data[0].databaseName).append(html);
                                    }
                                }
                            }
                        });
                    }
                    $(".loading").hide();
                }
            }

        }
    });




    $(".confirmAptBtn").click(function () {
        $("#id01").hide();
        var clientName = $("#newAptName").val();
        var clientAddress = $("#newAptAddress").val();
        var startDate = $("#newAptStartDate").val();
        var startTime = $("#newAptStartTime").val();
        var endDate = $("#newAptEndDate").val();
        var endTime = $("#newAptEndTime").val();
        var description = $("#newAptDescription").val();
        var workerName = $("#selectedWorker").val();
        var workerDatabseName = $(this).attr("storedDataTo");
        var clientName = clientName.charAt(0).toUpperCase() + clientName.slice(1).toLowerCase();

        var startDateSplit = startDate.split("-");
        var endDateSplit = endDate.split("-");
        if (clientName != "") {
            if (clientAddress != "") {
                if (startDateSplit[0].length > 4 || startDate == "" || endDateSplit[0].length > 4 || endDate == "") {
                    alert("Wrong Date Format !!");
                    $("#id01").show();
                } else {
                    if (startTime != "" && endTime != "") {
                        if (workerName != "") {
                            $.ajax({
                                url: databaseCollections + workerDatabseName + apiKey,
                                data: JSON.stringify({
                                    "clientName": clientName,
                                    "clientAddress": clientAddress,
                                    "startDate": startDate,
                                    "startTime": startTime,
                                    "endDate": endDate,
                                    "endTime": endTime,
                                    "workerName": workerName,
                                    "status": "--",
                                    "checkInDate": "--",
                                    "checkInTime": "--",
                                    "checkInLongitude": "--",
                                    "checkInLatitude": "--",
                                    "checkOutDate": "--",
                                    "checkOutTime": "--",
                                    "checkOutLongitude": "--",
                                    "checkOutLatitude": "--",
                                    "description": description
                                }),
                                type: "POST",
                                contentType: "application/json",
                                success: function (data) {
                                    //location.reload();
                                    $("#clientDetails tr").each(function () {
                                        $(this).find("td").each(function () {
                                            if ($(this).text() == clientName.toUpperCase()) {
                                                $(this).parent().addClass("thisIsDone");
                                            }
                                        })
                                    })
                                }
                            });

                        } else {
                            alert("Please Select the Worker from Generated list !!");
                            $("#id01").show();
                        }

                    } else {
                        alert("Wrong Time Format !!");
                        $("#id01").show();
                    }
                }

            } else {
                alert("Please Enter Client Address !!");
                $("#id01").show();
            }
        } else {
            alert("Please Enter Client Name !!");
            $("#id01").show();
        }

    });

});


function addApptBtn() {
    $("#id01").show();
    //$(e).parent().addClass("activeWorker");
    //workerName = $(e).parent().find("h3").text();
    $("#nearestEmployeeAvailable").html("");
    var clientName = $("#newAptName").val("");
    var clientAddress = $("#newAptAddress").val("");
    var startDate = $("#newAptStartDate").val("");
    var startTime = $("#newAptStartTime").val("");
    var endDate = $("#newAptEndDate").val("");
    var endTime = $("#newAptEndTime").val("");
    var description = $("#newAptDescription").val("");
}

function editDataEntry(e) {

    $(e).parent().parent().each(function () {
        $(this).find("input").removeAttr("disabled");
    })

    $(e).parent().find(".doneDataBtn").show();
    $(e).hide();
}

function doneDataEntry(e) {


    var updateKey = $(e).attr("value");
    var worker = $(e).parent().parent().parent().parent().parent().find("h3").text();

    var clientName = $(e).parent().parent().find(".clientName").val();
    var clientAddress = $(e).parent().parent().find(".clientAddress").val();
    var startDate = $(e).parent().parent().find(".startDate").val();

    var startTime = $(e).parent().parent().find(".startTime").val();
    console.log(startTime)
    var endDate = $(e).parent().parent().find(".endDate").val();
    var endTime = $(e).parent().parent().find(".endTime").val();
    var workerName = $(e).parent().parent().parent().parent().parent().find("h3").text();
    var startDateSplit = startDate.split("-");
    var endDateSplit = endDate.split("-");
    if (clientName != "") {
        if (clientAddress != "") {
            if (startDateSplit[0].length > 4 || startDate == "" || endDateSplit[0].length > 4 || endDate == "") {
                alert("Wrong Date Format !!");
            } else {
                if (startTime != "" && endTime != "") {
                    $.ajax({
                        url: databaseCollections + worker + "/" + updateKey + apiKey,
                        data: JSON.stringify({
                            "$set": {
                                "clientName": clientName,
                                "clientAddress": clientAddress,
                                "startDate": startDate,
                                "startTime": startTime,
                                "endDate": endDate,
                                "endTime": endTime
                            }
                        }),
                        type: "PUT",
                        contentType: "application/json",
                        success: function (data) {
                            if (startTime.split(":")[0] >= 07 && startTime.split(":")[0] <= 14) {
                                $(e).parent().parent().find("img").attr("src", "images/Status-weather-clear-icon.png");
                            }
                            if (startTime.split(":")[0] >= 15 && startTime.split(":")[0] <= 23) {
                                $(e).parent().parent().find("img").attr("src", "images/kweather.png");
                            }
                            if (startTime.split(":")[0] >= 00 && startTime.split(":")[0] <= 06) {
                                $(e).parent().parent().find("img").attr("src", "images/15150-illustration-of-the-full-moon-with-clouds-pv.png");
                            }
                            $(e).parent().parent().each(function () {
                                $(this).find("input").attr("disabled", true);
                            })

                            $(e).parent().find(".editDataBtn").show();
                            $(e).hide();
                        }
                    });

                } else {
                    alert("Wrong Time Format !!");

                }
            }

        } else {
            alert("Please Enter Client Address !!");

        }
    } else {
        alert("Please Enter Client Name !!");

    }
}

function search(e) {
    var searchValue = $(e).val();
    $(".workerTable .card h4").each(function () {
        if ($(this).text().search(new RegExp(searchValue, "i")) < 0) {
            $(this).parent().hide();
        } else {
            $(this).parent().show();
        }
    })
}

function searchClient(e) {
    var searchValue = $(e).val();
    $(e).parent().find(".clientName").each(function () {
        if ($(this).val().search(new RegExp(searchValue, "i")) < 0) {
            $(this).parent().parent().hide();
        } else {
            $(this).parent().parent().show();
        }
    })
}

function deleteEntry(e) {
    $(".loading").show();
    $(e).parent().parent().fadeOut();
    var deleteKey = $(e).attr("value");
    var worker = $(e).parent().parent().parent().parent().parent().find("h3").text();
    var clientName = $(e).parent().parent().find(".clientName").val();
    var clientAddress = $(e).parent().parent().find(".clientAddress").val();
    var startDate = $(e).parent().parent().find(".startDate").val();
    var startTime = $(e).parent().parent().find(".startTime").val();
    var endDate = $(e).parent().parent().find(".endDate").val();
    var endTime = $(e).parent().parent().find(".endTime").val();

    $.ajax({
        url: databaseCollections + worker + "/" + deleteKey + apiKey,
        type: "DELETE",
        async: true,
        timeout: 300000,
        success: function (data) {
            $(".loading").hide();
        },
        error: function (xhr, status, err) {}
    });


}

function signout() {
    window.location.href = 'index.html'
}


function refreshData(e) {
    $(e).find("i").addClass("fa-spin");
    var databaseName = $(e).parent().find("h3").text();
    $(e).parent().find(".tableData ").html("");
    $.ajax({
        url: databaseCollections + databaseName + apiKey,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            if (data.length == 0 || data.length == 1) {
                $(e).find("i").removeClass("fa-spin");
            }
            var payRate = data[0].payRate;
            var employeeWorkingPlace = data[0].workingPlace;
            for (var j = data.length - 1; j > 0; j--) {
                var spendHrsInAppt = data[j].checkInTime.split(":")[0] - data[j].checkOutTime.split(":")[0];
                var spendMinutesInAppt = data[j].checkInTime.split(":")[1] - data[j].checkOutTime.split(":")[1];
                var totalTimeSpent = spendHrsInAppt + "." + spendMinutesInAppt;
                var totalTimeSpent = String(totalTimeSpent);
                var totalTimeSpent = totalTimeSpent.replace('-', '');
                /*var moneyPayforHours = 1 * payRate;
                var moneyPayforMinutes = 0.5 * payRate;*/
                var moneyPayforHours = totalTimeSpent.split(".")[0] * payRate;
                var moneyPayforMinutes = (totalTimeSpent.split(".")[1] / 60) * payRate;
                var totalMoneyToPay = moneyPayforHours + moneyPayforMinutes;
                var totalMoneyToPay = String(totalMoneyToPay);
                var html = '<div id="worker-' + data[0].databaseName + '-data-' + j + '" class="data">';
                html += '<h6 class="amountToPaid">' + totalMoneyToPay.slice(0, 4) + ' $</h6>';
                if (data[j].startTime.split(":")[0] >= 07 && data[j].startTime.split(":")[0] <= 14) {
                    html += '<img src="images/Status-weather-clear-icon.png">'
                }
                if (data[j].startTime.split(":")[0] >= 15 && data[j].startTime.split(":")[0] <= 23) {
                    html += '<img src="images/kweather.png">'
                }
                if (data[j].startTime.split(":")[0] >= 00 && data[j].startTime.split(":")[0] <= 06) {
                    html += '<img src="images/15150-illustration-of-the-full-moon-with-clouds-pv.png">'
                }
                html += '            <div class="tableCol">';
                html += '                <input class="clientName" type="text" value="' + data[j].clientName + '" disabled>';
                html += '            </div>';
                html += '            <div class="tableCol">';
                html += '                <input class="clientAddress" type="text" value="' + data[j].clientAddress + '" disabled>';
                html += '            </div>';
                html += '            <div class="tableCol">';
                html += '                <input class="startDate" type="date" value="' + data[j].startDate + '" disabled>';

                html += '                <input class="startTime" type="time" value="' + data[j].startTime + '" disabled>';

                html += '            </div>';
                html += '            <div class="tableCol">';
                html += '                <input class="endDate" type="date" value="' + data[j].endDate + '" disabled>';

                html += '                <input class="startTime" type="time" value="' + data[j].endTime + '" disabled>';

                html += '            </div>';
                html += '            <div class="tableCol">' + data[j].status + '</div>';
                html += '            <div class="tableCol">' + data[j].checkInDate + '<br><br>' + data[j].checkInTime + '<br><a href="https://www.google.com/maps/search/?api=1&query=' + data[j].checkInLatitude + ',' + data[j].checkInLongitude + '" target="_blank">Location</a></div>';
                html += '            <div class="tableCol">' + data[j].checkOutDate + '<br><br>' + data[j].checkOutTime + '<br><a href="https://www.google.com/maps/search/?api=1&query=' + data[j].checkOutLatitude + ',' + data[j].checkOutLongitude + '" target="_blank">Location</a></div>';
                html += '            <div class="tableCol">';
                html += '                <button type="button" class="btn btn-info btn-sm editDataBtn" onclick="editDataEntry(this)">';
                html += '                  <span class="glyphicon glyphicon-pencil"></span> Edit ';
                html += '                </button>';
                html += '                <button type="button" class="btn btn-info btn-sm doneDataBtn" value="' + data[j]._id.$oid + '" onclick="doneDataEntry(this)">';
                html += '                  <span class="glyphicon glyphicon-ok"></span> Done ';
                html += '                </button>';
                html += '            </div>';
                html += '            <div class="tableCol">';
                html += '                <button type="button" class="btn btn-danger btn-sm" value="' + data[j]._id.$oid + '" onclick="deleteEntry(this)">';
                html += '                  <span class="glyphicon glyphicon-trash"></span> Delete ';
                html += '                </button>';
                html += '            </div>';
                html += '        </div>';
                if (data[0].workingPlace == "Nu_Age") {
                    $("#Nu_Age .tableData-" + data[0].databaseName).append(html);
                }
                if (data[0].workingPlace == "Aquarius") {
                    $("#Aquarius .tableData-" + data[0].databaseName).append(html);
                }
                if (data[0].workingPlace == "Haven") {
                    $("#Haven .tableData-" + data[0].databaseName).append(html);
                }
                if (data[0].workingPlace == "TrueWellness") {
                    $("#TrueWellness .tableData-" + data[0].databaseName).append(html);
                }
                $(e).find("i").removeClass("fa-spin");
            }

        },
        error: function (data) {
            alert()
        }
    });
}

function openInfo(e) {
    $(e).parent().find(".bar").animate({
        width: '450px'
    }, "slow");
}

function closeInfo(e) {
    $(e).parent().find(".bar").animate({
        width: '0px'
    }, "slow");
}




function generateList() {
    $("#nearestEmployeeAvailable").html("");
    $(".loading").show();
    /*$.ajax( { url: databaseUrl+apiKey,
          type: "GET",
          contentType: "application/json",
            success: function(data){               
                    for(var i = 0; i <= data.length - 1 ; i++){
                       (function(i){
                            $(".loading").show();
                            window.setTimeout(function(){
                                if(data[i] != "system.indexes"){
                                    $.ajax( { url: databaseCollections+data[i]+apiKey,
                                          type: "GET",
                                          contentType: "application/json",
                                          success:function(data){
                                                if(data[0].workerStatus != "no_more_working"){
                                                    var clientAddress  =   $("#newAptAddress").val();
                                                    calculateDistances(data[0].databaseName,data[0].workerName,data[0].workerAddress,clientAddress);
                                                    
                                                    //var clientAddress  =   "82 Orchard mill, kitchener";
                                                }             
                                            } 
                                        } );    
                                }    
                            }, i * 1000);

                          }(i));
                              $(".loading").hide();
  
                    }

            }} );*/
    $.ajax({
        url: databaseUrl + apiKey,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            $("#workerList").html("");
            if (data.length == 1 || data.length == 0) {
                var html = '<h5>No Workers Found</h5>';
                $("#nearestEmployeeAvailable").append(html);
                $(".loading").hide();
            } else {
                for (var i = 0; i <= data.length - 1; i++) {
                    if (data[i] != "system.indexes") {
                        $.ajax({
                            url: databaseCollections + data[i] + apiKey,
                            type: "GET",
                            contentType: "application/json",
                            success: function (data) {
                                if (data[0].workerStatus == "working") {
                                    var html = '<li onclick="getEmployee(this)" databaseName="' + data[0].databaseName + '" >' + data[0].workerName + '</li>';
                                    $("#nearestEmployeeAvailable").append(html);
                                    $(".loading").hide();
                                }
                            }
                        });
                    }
                }
                $(".loading").hide();
            }
        }
    });
}

function sortList() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("nearestEmployeeAvailable");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("LI");
        //Loop through all list-items:
        for (i = 0; i < (b.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*check if the next item should
            switch place with the current item:*/
            if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                /*if next item is alphabetically
                lower than current item, mark as a switch
                and break the loop:*/
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark the switch as done:*/
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}

function getEmployee(e) {
    var name = $(e).text();
    var databaseName = $(e).attr("databasename");
    $("#selectedWorker").val(name);
    $("#selectedWorker").attr("storedDataTo", databaseName);
    $(".confirmAptBtn").attr("storedDataTo", databaseName);
}




function addAppt(e) {
    $("#id01").show();
    var clientName = $(e).parent().parent().find("td:nth-child(1)").text();
    var clientAddress = $(e).parent().parent().find("td:nth-child(2)").text();
    var startDate = $(e).parent().parent().find("td:nth-child(4)").text();
    var startDateYear = startDate.split("-")[2];
    var startDateMonth = startDate.split("-")[1];
    var startDateDate = startDate.split("-")[0];

    if (startDateMonth == "Jan") {
        var startDateMonth = "01";
    }
    if (startDateMonth == "Jan" || startDateMonth == "January") {
        var startDateMonth = "01";
    }
    if (startDateMonth == "Feb" || startDateMonth == "February") {
        var startDateMonth = "02";
    }
    if (startDateMonth == "Mar" || startDateMonth == "March") {
        var startDateMonth = "03";
    }
    if (startDateMonth == "Apr" || startDateMonth == "April") {
        var startDateMonth = "04";
    }
    if (startDateMonth == "May" || startDateMonth == "Ma") {
        var startDateMonth = "05";
    }
    if (startDateMonth == "June" || startDateMonth == "Jun") {
        var startDateMonth = "06";
    }
    if (startDateMonth == "July" || startDateMonth == "Jul") {
        var startDateMonth = "07";
    }
    if (startDateMonth == "Aug" || startDateMonth == "August") {
        var startDateMonth = "08";
    }
    if (startDateMonth == "Sep" || startDateMonth == "September") {
        var startDateMonth = "09";
    }
    if (startDateMonth == "Oct" || startDateMonth == "October") {
        var startDateMonth = "10";
    }
    if (startDateMonth == "Nov" || startDateMonth == "November") {
        var startDateMonth = "11";
    }
    if (startDateMonth == "Dec" || startDateMonth == "December") {
        var startDateMonth = "12";
    }
    var startDate = startDateYear + "-" + startDateMonth + "-" + startDateDate;
    var endDate = startDateYear + "-" + startDateMonth + "-" + startDateDate;
    var time = $(e).parent().parent().find("td:nth-child(5)").text();
    var startTime = time.split("-")[0];
    var endTime = time.split("-")[1];
    var startTime = startTime.slice(0, 2) + ":" + startTime.slice(2, 4);
    var endTime = endTime.slice(0, 2) + ":" + endTime.slice(2, 4);
    //$(e).parent().addClass("activeWorker");
    //workerName = $(e).parent().find("h3").text();
    $("#nearestEmployeeAvailable").html("");
    var clientName = $("#newAptName").val(clientName);
    var clientAddress = $("#newAptAddress").val(clientAddress);
    var startDate = $("#newAptStartDate").val(startDate);
    var startTime = $("#newAptStartTime").val(startTime);
    var endDate = $("#newAptEndDate").val(endDate);
    var endTime = $("#newAptEndTime").val(endTime);
    var description = $("#newAptDescription").val("None");
}
