function showEmplyeesForAttendance() {
    $(".loading").show();
    $("#attendaceWorkerList").html("");
    $.ajax({
        url: databaseUrl + apiKey,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            $("#attendaceWorkerList").html("");
            if (data.length == 1 || data.length == 0) {
                var html = '<h5>No Workers Found</h5>';
                $("#attendaceWorkerList").append(html);
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
                                    var html = '<li onclick="selectPersonforattendance(this)" style="cursor:pointer;border-bottom: 1px solid #ccc;padding: 5px;">' + data[0].workerName + '</li>';
                                    $("#attendaceWorkerList").append(html);
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


function selectPersonforattendance(e) {
    var name = $(e).text();
    $("#attendanceBox").html("");

    $.ajax({
        url: databaseEmployeeAttendace + name + apiKey,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            if (data.length == 0) {
                var html = '<tr>';
                html += '<td>No Data</td>';
                html += '<td>No Data</td>';
                html += '<td>No Data</td>';
                html += '<td>No Data</td>';
                html += '<td>No Data</td>';
                html += '<td>No Data</td>';
                html += '</tr>';
                $("#attendanceBox").append(html);
            } else {
                for (var i = data.length - 1 ; i >= 0 ; i--) {

                    var html = '<tr>';
                    html += '<td>' + data[i].date + '</td>';
                    html += '<td>' + data[i].status + '</td>';
                    html += '<td>' + data[i].inTime + '</td>';
                    html += '<td><a href="https://www.google.com/maps/search/?api=1&query=' + data[i].inLat + ',' + data[i].inLong + '" target="_blank">Location</a></td>';
                    html += '<td>' + data[i].outTime + '</td>';
                    html += '<td><a href="https://www.google.com/maps/search/?api=1&query=' + data[i].outLat + ',' + data[i].outLong + '" target="_blank">Location</a></td>';
                    html += '</tr>';

                    $("#attendanceBox").append(html);
                }
            }
        },
        error: function (data) {}
    });
}
