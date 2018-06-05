function showWorkerAvailability() {
    $(".loading").show();
    $("#newworkerList").html("");
    $.ajax({
        url: databaseUrl + apiKey,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            $("#workerList").html("");
            if (data.length == 1 || data.length == 0) {
                var html = '<h5>No Workers Found</h5>';
                $("#newworkerList").append(html);
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
                                    var html = '<li onclick="selectPersonforavailability(this)">' + data[0].workerName + '</li>';
                                    $("#newworkerList").append(html);
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

function selectPersonforavailability(e) {
    var name = $(e).text();
    $("#availabilityBox").html("");
    $.ajax({
        url: databaseEmployeeAvalaibility + name + apiKey,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            for (var i = data.length - 1 ; i >= 0 ; i--) {
                var startDate0 = data[i].startDate0.slice(3, 15);
                var startDate1 = data[i].startDate1.slice(3, 15);
                var startDate2 = data[i].startDate2.slice(3, 15);
                var startDate3 = data[i].startDate3.slice(3, 15);
                var startDate4 = data[i].startDate4.slice(3, 15);

                var html = '<tr><td><h5>' + startDate0 + ' -</h5>to <br><h5>-' + startDate4 + '</h5></td>';
                if ((data[i].startTime0).split(":")[0] >= 12) {
                    html += '<td><h6 class="mondayTime">' + data[i].startTime0 + '<br> to <br>' + data[i].endTime0 + '</h6></td>';
                } else if (data[i].startTime0 == "" || data[i].endTime0 == "") {
                    html += '<td><h6 class="mondayTime">--<br> to <br>--</h6></td>';
                } else if ((data[i].startTime0).split(":")[0] < 12) {
                    html += '<td><h6 class="mondayTime">' + data[i].startTime0 + '<br> to <br>' + data[i].endTime0 + '</h6></td>';
                }

                //html += '<td><h5>' + startDate1 + '</h5></td>';
                if ((data[i].startTime1).split(":")[0] >= 12) {
                    html += '<td><h6 class="tuesdayTime">' + data[i].startTime1 + '<br> to <br>' + data[i].endTime1 + '</h6></td>';
                } else if (data[i].startTime1 == "" || data[i].endTime1 == "") {
                    html += '<td><h6 class="tuesdayTime">--<br> to <br>--</h6></td>';
                } else if ((data[i].startTime1).split(":")[0] < 12) {
                    alert(data[i].startTime1);
                    html += '<td><h6 class="tuesdayTime">' + data[i].startTime1 + '<br> to <br>' + data[i].endTime1 + '</h6></td>';
                }

                //html += '<td><h5>' + startDate2 + '</h5></td>';
                if ((data[i].startTime2).split(":")[0] >= 12) {
                    html += '<td><h6 class="wednesdayTime">' + data[i].startTime2 + '<br> to <br>' + data[i].endTime2 + '</h6></td>';
                } else if (data[i].startTime2 == "" || data[i].endTime2 == "") {
                    html += '<td><h6 class="wednesdayTime">--<br> to <br>--</h6></td>';
                } else if ((data[i].startTime2).split(":")[0] < 12) {
                    html += '<td><h6 class="wednesdayTime">' + data[i].startTime2 + '<br> to <br>' + data[i].endTime2 + '</h6></td>';
                }

                //html += '<td><h5>' + startDate3 + '</h5></td>';
                if ((data[i].startTime3).split(":")[0] >= 12) {
                    html += '<td><h6 class="thrusdayTime">' + data[i].startTime3 + '<br> to <br>' + data[i].endTime3 + '</h6></td>';
                } else if (data[i].startTime3 == "" || data[i].endTime3 == "") {
                    html += '<td><h6 class="thrusdayTime">--<br> to <br>--</h6></td>';
                } else if ((data[i].startTime3).split(":")[0] < 12) {
                    html += '<td><h6 class="thrusdayTime">' + data[i].startTime3 + '<br> to <br>' + data[i].endTime3 + '</h6></td>';
                }

                //html += '<td><h5>' + startDate4 + '</h5></td>';
                if ((data[i].startTime4).split(":")[0] >= 12) {
                    html += '<td><h6 class="fridayTime">' + data[i].startTime4 + '<br> to <br>' + data[i].endTime4 + '</h6></td>';
                } else if (data[i].startTime4 == "" || data[i].endTime4 == "") {
                    html += '<td><h6 class="fridayTime">--<br> to <br>--</h6></td>';
                } else if ((data[i].startTime4).split(":")[0] < 12) {
                    html += '<td><h6 class="fridayTime">' + data[i].startTime4 + '<br> to <br>' + data[i].endTime4 + '</h6></td>';
                }
                html += '<td><button type="button" class="btn btn-success" onclick="genrateAvailability(this)">Get File</button></td></tr>';
                $("#availabilityBox").append(html);
            }
        }
    });
}

function genrateAvailability(e) {
    var availability = [];
    var data = $('#txt').val();
    $(e).parent().parent().each(function () {
        var weekStartDate = $(this).find("h5").text();
        var monday_timing = $(this).find(".mondayTime").text();
        var tuesday_timing = $(this).find(".tuesdayTime").text();
        var wednesday_timing = $(this).find(".wednesdayTime").text();
        var thrusday_timing = $(this).find(".thrusdayTime").text();
        var friday_timing = $(this).find(".fridayTime").text();
        availability.push({
            "Week": weekStartDate,
            "Monday_Time": monday_timing,
            "Tuesday_Time": tuesday_timing,
            "Wednesday_Time": wednesday_timing,
            "Thrusday_Time": thrusday_timing,
            "Friday_Time": friday_timing
        });

    }).promise().done(function () {
        JSONToCSVConvertor(availability, "Availability Report", true);
    });
    if (data == '') {
        return;

    }

    //JSONToCSVConvertor(data, "Vehicle Report", true);
}
