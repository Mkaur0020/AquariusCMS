function genrate(e){
    var amountToBePaid = [];
    var data = $('#txt').val();
    $(e).parent().parent().find("#table .tableData .data").each(function(){
        var amount = $(this).find("h6").text();
        var client_name = $(this).find(".clientName").val();
        var client_address = $(this).find(".clientAddress").val();
        var client_startDate = $(this).find(".startDate").val();
        var client_startTime = $(this).find(".startTime").val();
        var client_endDate = $(this).find(".endDate").val();
        var client_endTime = $(this).find(".endTime").val();
        var client_status = $(this).find(".checkStatus").text();
        var client_checkInDate = $(this).find(".checkInDate").text();
        var client_checkInTime = $(this).find(".checkInTime").text();
        var client_checkOutDate = $(this).find(".checkOutDate").text();
        var client_checkOutTime = $(this).find(".checkOutTime").text();
        if(client_status == "Check-Out"){
            amountToBePaid.push({"Client_Name":client_name,
                                 "Client_Address":client_address,
                                 "Appointmenr_Start_Date":client_startDate,
                                 "Appointmenr_End_Date":client_endDate,
                                 "Appointmenr_Start_Time":client_startTime,
                                 "Appointmenr_End_Time":client_endTime,
                                 "Appointmenr_Status":client_status,
                                 "Appointmenr_Check-In_Date":client_checkInDate,
                                 "Appointmenr_Check-In_Time":client_checkInTime,
                                 "Appointmenr_Check-Out_Date":client_checkOutDate,
                                 "Appointmenr_Check-Out_Time":client_checkOutTime,
                                 "Amount_To_Be_Paid":amount
                                            });
           
           }
    }).promise().done( function(){ 
        JSONToCSVConvertor(amountToBePaid, "Payroll Report", true); 
    } );
    if(data == ''){
        return;

    }
        
        //JSONToCSVConvertor(data, "Vehicle Report", true);
}





function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "Aquarius_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}