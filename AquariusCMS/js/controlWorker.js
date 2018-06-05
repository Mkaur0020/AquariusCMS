function showWorkerList(){
	$(".loading").show();
	$("#workerInfoDiv").html("");
	$.ajax( { url: databaseUrl+apiKey,
		type: "GET",
		contentType: "application/json",
		success: function(data){
			if(data.length == 1 || data.length == 0){
                var html = '<h1>No Workers Found</h1>';
                $("#workerInfoDiv").append(html);
                $(".loading").hide();
            }
            else{
            	$("#editWorkerName").val("");
		        $("#editWorkerContact").val("");
		        $("#editWorkerEmail").val("");
		        $("#editWorkerAddress").val("");
		        $("#workerUniqueKey").val("");
		        $("#updateBtn").text("Update");
		        $("#updateBtn").attr("databaseName","null");
			    for(var i = 0; i <= data.length - 1 ; i++){
			    	if(data[i] != "system.indexes"){
				    	$.ajax( { url: databaseCollections+data[i]+apiKey,
							      type: "GET",
							      contentType: "application/json",
							      success:function(data){
							      	if(data[0].workerStatus == "working"){
							      		var html = '<div class="card" onclick="editInfoWorker(this)">';
							      			html += '<img src="images/selected.png" class="selectedImg">'
							            	html += '  <img src="https://www.volatour.com/images/productimg/img_avatar.png" alt="Avatar" style="width:100%">';
							                html += '	<h4><b>'+data[0].workerName+'</b></h4> ';
							                html += '	<h3 style="display:none;"><b>'+data[0].databaseName+'</b></h3> ';
							            	html += '</div>';
							            $("#workerInfoDiv").append(html);	
							      	}
							      	else{
								    	var html = '<div class="card noWorking" onclick="editInfoWorker(this)">';
								    		html += '<img src="images/selected.png" class="selectedImg">'
							            	html += '  <img src="https://www.volatour.com/images/productimg/img_avatar.png" alt="Avatar" style="width:100%">';
							                html += '	<h4><b>'+data[0].workerName+'</b></h4> ';
							                html += '	<h3 style="display:none;"><b>'+data[0].databaseName+'</b></h3> ';
							            	html += '</div>';
							            $("#workerInfoDiv").append(html);						        							      		
							      	}
						} } );		    		
			    	}
			    }
			    $(".loading").hide();
            }
		}} );
}

function createNewWorker(){
	var name = $("#workerName").val();
	var lastName = $("#workerLastName").val();
    var workerGender = $("#workerGender").val();
	var databaseName = $("#workerName").val();
	var contact = $("#workerContact").val();
    var emergencyContact = $("#workerEmergencyContact").val();
 	var email = $("#workerEmail").val();   
	var address = $("#workerAddress").val();
	var sinNumber = $("#workerSinNumber").val();
    var hireDate = $("#workerHireDate").val();
	var transportInfo = $("#workerTransportation").val();
    if(transportInfo == "has_Vehicle"){
        var driveRange = $("#driveRange").val();
    }else{
        var driveRange = "";
    }
	var payRate = $("#payRate").val();
	var workerType = $("#workerType").val();
    if(workerType == "others"){
        var workerTypeInfo = $("#otherEmployeeType").val();
    }
    var workingPlace = $("#workerWorkingPlace").val();
	var workerCNO = $("#workerCNO").val();
    if(workerCNO == "cno_yes"){
        var workerCNOnumber = $("#cnoInfoNumber").val();
        var workerCNOexpiryDate = $("#cnoInfoExpiryDate").val();
    }else{
        var workerCNOnumber = "";
        var workerCNOexpiryDate = "";
    }
	var workerPSW = $("#workerPSW").val();
	var workerCPR = $("#workerCPR").val();
    if(workerCPR == "cpr_yes"){
        var cprInfoNumber = $("#cprInfoNumber").val();
        var cprInfoExpiryDate = $("#cprInfoExpiryDate").val();
    }else{
        var cprInfoNumber = "";
        var cprInfoExpiryDate = "";
    }
	var workerPoliceCheck = $("#workerPoliceCheck").val();
    if(workerPoliceCheck == "police_check_yes"){
        var policeCheckInfo = $("#policeCheckInfo").val();
    }else{
        var policeCheckInfo = "";
    }
	var workerBankingInfo = $("#workerBankingInfo").val();
    if(workerBankingInfo == "banking_info_yes"){
        var workerBankingInfoInstitution = $("#bankingInfoInstitution").val();
        var workerBankingInfoTransit = $("#bankingInfoTransit").val();
        var workerBankingInfoAccountNumber = $("#bankingInfoAccountNumber").val();
    }else{
        var workerBankingInfoInstitution = "";
        var workerBankingInfoTransit = "";
        var workerBankingInfoAccountNumber = "";
    }
	var workerCollegeDoc = $("#workerCollegeDoc").val();
	var workerPPE = $("#workerPPE").val();
    if(workerPPE == "ppe_yes"){
        var ppeInfo = $("#ppeInfo").val();
    }else{
        var ppeInfo = "";
    }
	var workerPassport = $("#workerPassport").val();
    var workerDriverLicense = $("#workerDriverLicense").val();
    var workerRestrictionToWork = $("#restrictionToWork").val();
    var workerWorkPermit = $("#workerWorkPermit").val();
    if(workerWorkPermit == "workPermit_yes"){
        var workPermitInfoNumber = $("#workPermitInfoNumber").val();
        var workPermitInfoExpiryDate = $("#workPermitInfoExpiryDate").val();
    }else{
        var workPermitInfoNumber = "";
        var workPermitInfoExpiryDate = "";
    }
    var workerStudyPermit = $("#workerStudyPermit").val();
    if(workerStudyPermit == "studyPermit_yes"){
        var studyPermitInfoNumber = $("#studyPermitInfoNumber").val();
        var studyPermitInfoExpiryDate = $("#studyPermitInfoExpiryDate").val();
    }else{
        var studyPermitInfoNumber = "";
        var studyPermitInfoExpiryDate = "";
    }
    
	var databaseName = name.replace(/\s+/g, '_');
	if (name != ""){
		if(contact != "" && contact.length == 10){
			if(isValidEmailAddress(email)){
				if(address != ""){
					if(sinNumber != ""){
						if(payRate != ""){
							$(".loading").show();
							$.ajax( { url: databaseCollections+databaseName+apiKey,
									      data: JSON.stringify({
                                            "workingPlace" : workingPlace,
                                            "workerType" : workerType,
                                            "workerTypeInfo":workerTypeInfo,
									        "workerName" : name,
									        "workerLastName" : lastName,
                                            "workerGender" : workerGender,
									        "workerContact" : contact,
                                            "emergencyContact" : emergencyContact,  
									        "workerEmail" : email,
									        "workerAddress" : address,
									        "workerSinNumber" : sinNumber,
                                            "hireDate" : hireDate,
									        "transportInfo" : transportInfo,
                                            "driveRange":driveRange,
									        "payRate" : payRate,
									        "workerStatus" : "working",
									        "databaseName" : databaseName,
                                            "workerRestrictionToWork" : workerRestrictionToWork,
									        "certificates":[
											    { 	"workerCNO":workerCNO,
                                                    "workerCNOnumber":workerCNOnumber,
                                                    "workerCNOexpiryDate":workerCNOexpiryDate,
											    	"workerPSW":workerPSW,
											    	"workerCPR":workerCPR,
                                                    "cprInfoNumber":cprInfoNumber,
                                                    "cprInfoExpiryDate":cprInfoExpiryDate,
											    	"workerPoliceCheck":workerPoliceCheck,
                                                    "policeCheckInfo":policeCheckInfo,
											    	"workerBankingInfo":workerBankingInfo,
                                                    "workerBankingInfoInstitution":workerBankingInfoInstitution,
                                                    "workerBankingInfoTransit":workerBankingInfoTransit,
                                                    "workerBankingInfoAccountNumber":workerBankingInfoAccountNumber,
											    	"workerCollegeDoc":workerCollegeDoc,
											    	"workerPPE":workerPPE,
                                                    "ppeInfo":ppeInfo,
											    	"workerPassport":workerPassport,
                                                    "workerDriverLicense":workerDriverLicense,
                                                    "workerWorkPermit":workerWorkPermit,
                                                    "workPermitInfoNumber":workPermitInfoNumber,
                                                    "workPermitInfoExpiryDate":workPermitInfoExpiryDate,
                                                    "workerStudyPermit":workerStudyPermit,
                                                    "studyPermitInfoNumber":studyPermitInfoNumber,
                                                    "studyPermitInfoExpiryDate":studyPermitInfoExpiryDate
												}
											]
									      }),
									      type: "POST",
									      contentType: "application/json",
									      success:function(data){
									        location.reload();
									      } } );							
						}
						else{
							alert("Pay Rate is n Wrong Format !!");
						}
					}
					else{
						alert("SIN number is n Wrong Format !!");
					}
				}
				else{
					alert("Address is in Wrong Format !!")
				}
			}
			else{
				alert("Email is in Wrong Format !!")	
			}
		}
		else{
			alert("Contact is in Wrong Format !!")	
		}
	}
	else{
		alert("Name is in Wrong Format !!")
	}
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

function editInfoWorker(e){
	localStorage.setItem("currentWorker", $(e).index());
	$(e).parent().find(".card").each(function(){
		if(localStorage.getItem("currentWorker") != $(this).index()){
			$(this).find('img:first-child').hide();
		}
		else{
			$(this).find('img:first-child').show();	
		}
	});
	$(".loading").show();
	var databaseName = $(e).find("h3").text();
	$.ajax( { url: databaseCollections+databaseName+apiKey,
	      type: "GET",
	      contentType: "application/json",
	      success:function(data){
	        $("#editWorkerName").val(data[0].workerName);
            $("#editworkerLastName").val(data[0].workerLastName);
            $("#editworkerGender").val(data[0].workerGender);
	        $("#editWorkerContact").val(data[0].workerContact);
            $("#editworkerEmergencyContact").val(data[0].emergencyContact);
              
            $("#editworkerHireDate").val(data[0].hireDate);
	        $("#editWorkerEmail").val(data[0].workerEmail);
	        $("#editWorkerAddress").val(data[0].workerAddress);
	        $("#editWorkerStatus").val(data[0].workerStatus);

	        $("#editWorkerSinNumber").val(data[0].workerSinNumber);
	        $("#editWorkerTransportation").val(data[0].transportInfo);
            $("#editdriveRange").val(data[0].driveRange);
            $("#editworkerType").val(data[0].workerType);
            $("#editotherEmployeeType").val(data[0].workerTypeInfo);
              
	        $("#editpayRate").val(data[0].payRate);
		    $("#editworkerWorkingPlace").val(data[0].workingPlace);
			$("#editheathInformation").val(data[0].heathInformation);
              
			$("#editworkerCNO").val(data[0].certificates[0].workerCNO);
            $("#editcnoInfoNumber").val(data[0].certificates[0].workerCNOnumber);
            $("#editcnoInfoExpiryDate").val(data[0].certificates[0].workerCNOexpiryDate);
              
              
			$("#editworkerPSW").val(data[0].certificates[0].workerPSW);
              
			$("#editworkerCPR").val(data[0].certificates[0].workerCPR);
            $("#editcprInfoNumber").val(data[0].certificates[0].cprInfoNumber);
            $("#editcprInfoExpiryDate").val(data[0].certificates[0].cprInfoExpiryDate); 
              
			$("#editworkerPoliceCheck").val(data[0].certificates[0].workerPoliceCheck);
            $("#editpoliceCheckInfo").val(data[0].certificates[0].policeCheckInfo);
              
			$("#editworkerBankingInfo").val(data[0].certificates[0].workerBankingInfo);
              $("#editbankingInfoInstitution").val(data[0].certificates[0].workerBankingInfoInstitution);
              $("#editbankingInfoTransit").val(data[0].certificates[0].workerBankingInfoTransit);
              $("#editbankingInfoAccountNumber").val(data[0].certificates[0].workerBankingInfoAccountNumber);
                       
			$("#editworkerCollegeDoc").val(data[0].certificates[0].workerCollegeDoc);
              
			$("#editworkerPPE").val(data[0].certificates[0].workerPPE);
              $("#editppeInfo").val(data[0].certificates[0].ppeInfo);
              
			$("#editworkerPassport").val(data[0].certificates[0].workerPassport);
              $("#editworkerDriverLicense").val(data[0].certificates[0].workerDriverLicense);
              
              $("#editworkerWorkPermit").val(data[0].certificates[0].workerWorkPermit);
              $("#editworkPermitInfoNumber").val(data[0].certificates[0].workPermitInfoNumber);
              $("#editworkPermitInfoExpiryDate").val(data[0].certificates[0].workPermitInfoExpiryDate);
              $("#editworkerStudyPermit").val(data[0].certificates[0].workerStudyPermit);
              $("#editstudyPermitInfoNumber").val(data[0].certificates[0].studyPermitInfoNumber);
              $("#editstudyPermitInfoExpiryDate").val(data[0].certificates[0].studyPermitInfoExpiryDate);
              
              $("#editrestrictionToWork").val(data[0].workerRestrictionToWork);
              
	        $("#workerUniqueKey").val("Unique Key-"+data[0]._id.$oid);
	        $("#updateBtn").text("Update-"+data[0].workerName);
	        $("#updateBtn").attr("databaseName",data[0].databaseName);
	        $(".loading").hide();
	      } } );
}

function updateWorker(e){
	var name = $("#editworkerName").val();
	var lastName = $("#editworkerLastName").val();
    var workerGender = $("#editworkerGender").val();
	var databaseName = $("#editworkerName").val();
	var contact = $("#editWorkerContact").val();
    var emergencyContact = $("#editworkerEmergencyContact").val();
 	var email = $("#editWorkerEmail").val();   
	var address = $("#editworkerAddress").val();
	var sinNumber = $("#editworkerSinNumber").val();
    var workerStatus = $("#editWorkerStatus").val();
    var hireDate = $("#editworkerHireDate").val();
	var transportInfo = $("#editWorkerTransportation").val();
    if(transportInfo == "has_Vehicle"){
        var driveRange = $("#editdriveRange").val();
    }else{
        var driveRange = "";
    }
	var payRate = $("#editpayRate").val();
	var workerType = $("#editworkerType").val();
    if(workerType == "others"){
        var workerTypeInfo = $("#editotherEmployeeType").val();
    }
    var workingPlace = $("#editworkerWorkingPlace").val();
	var workerCNO = $("#editworkerCNO").val();
    if(workerCNO == "cno_yes"){
        var workerCNOnumber = $("#editcnoInfoNumber").val();
        var workerCNOexpiryDate = $("#editcnoInfoExpiryDate").val();
    }else{
        var workerCNOnumber = "";
        var workerCNOexpiryDate = "";
    }
	var workerPSW = $("#editworkerPSW").val();
	var workerCPR = $("#editworkerCPR").val();
    if(workerCPR == "cpr_yes"){
        var cprInfoNumber = $("#editcprInfoNumber").val();
        var cprInfoExpiryDate = $("#editcprInfoExpiryDate").val();
    }else{
        var cprInfoNumber = "";
        var cprInfoExpiryDate = "";
    }
	var workerPoliceCheck = $("#editworkerPoliceCheck").val();
    if(workerPoliceCheck == "police_check_yes"){
        var policeCheckInfo = $("#editpoliceCheckInfo").val();
    }else{
        var policeCheckInfo = "";
    }
	var workerBankingInfo = $("#editworkerBankingInfo").val();
    if(workerBankingInfo == "banking_info_yes"){
        var workerBankingInfoInstitution = $("#editbankingInfoInstitution").val();
        var workerBankingInfoTransit = $("#editbankingInfoTransit").val();
        var workerBankingInfoAccountNumber = $("#editbankingInfoAccountNumber").val();
    }else{
        var workerBankingInfoInstitution = "";
        var workerBankingInfoTransit = "";
        var workerBankingInfoAccountNumber = "";
    }
	var workerCollegeDoc = $("#editworkerCollegeDoc").val();
	var workerPPE = $("#editworkerPPE").val();
    if(workerPPE == "ppe_yes"){
        var ppeInfo = $("#editppeInfo").val();
    }else{
        var ppeInfo = "";
    }
	var workerPassport = $("#editworkerPassport").val();
    var workerDriverLicense = $("#editworkerDriverLicense").val();
    var workerRestrictionToWork = $("#editrestrictionToWork").val();
    var workerWorkPermit = $("#editworkerWorkPermit").val();
    if(workerWorkPermit == "workPermit_yes"){
        var workPermitInfoNumber = $("#editworkPermitInfoNumber").val();
        var workPermitInfoExpiryDate = $("#editworkPermitInfoExpiryDate").val();
    }else{
        var workPermitInfoNumber = "";
        var workPermitInfoExpiryDate = "";
    }
    var workerStudyPermit = $("#editworkerStudyPermit").val();
    if(workerStudyPermit == "studyPermit_yes"){
        var studyPermitInfoNumber = $("#editstudyPermitInfoNumber").val();
        var studyPermitInfoExpiryDate = $("#editstudyPermitInfoExpiryDate").val();
    }else{
        var studyPermitInfoNumber = "";
        var studyPermitInfoExpiryDate = "";
    }
    var updateKey = $("#workerUniqueKey").val();
    var updateKey = updateKey.split("-")[1];
	if(updateKey != "" && updateKey != undefined && updateKey != null){
		if (name != ""){
			if(contact != "" && contact.length == 10){
				if(isValidEmailAddress(email)){
					if(address != ""){
						$(".loading").show();
						var currentWorker = $(e).attr("databaseName");
						$.ajax( { url: databaseCollections+currentWorker+"/"+updateKey+apiKey,
							  data: JSON.stringify( { "$set" : {"workingPlace" : workingPlace,
                                                                "workerType" : workerType,
                                                                "workerTypeInfo":workerTypeInfo,
                                                                "workerName" : name,
                                                                "workerLastName" : lastName,
                                                                "workerGender" : workerGender,
                                                                "workerContact" : contact,
                                                                "emergencyContact" : emergencyContact,  
                                                                "workerEmail" : email,
                                                                "workerAddress" : address,
                                                                "workerSinNumber" : sinNumber,
                                                                "hireDate" : hireDate,
                                                                "transportInfo" : transportInfo,
                                                                "driveRange":driveRange,
                                                                "payRate" : payRate,
                                                                "workerStatus" : workerStatus,
                                                                "databaseName" : databaseName,
                                                                "workerRestrictionToWork" : workerRestrictionToWork,
                                                                "certificates":[
                                                                    { 	"workerCNO":workerCNO,
                                                                        "workerCNOnumber":workerCNOnumber,
                                                                        "workerCNOexpiryDate":workerCNOexpiryDate,
                                                                        "workerPSW":workerPSW,
                                                                        "workerCPR":workerCPR,
                                                                        "cprInfoNumber":cprInfoNumber,
                                                                        "cprInfoExpiryDate":cprInfoExpiryDate,
                                                                        "workerPoliceCheck":workerPoliceCheck,
                                                                        "policeCheckInfo":policeCheckInfo,
                                                                        "workerBankingInfo":workerBankingInfo,
                                                                        "workerBankingInfoInstitution":workerBankingInfoInstitution,
                                                                        "workerBankingInfoTransit":workerBankingInfoTransit,
                                                                        "workerBankingInfoAccountNumber":workerBankingInfoAccountNumber,
                                                                        "workerCollegeDoc":workerCollegeDoc,
                                                                        "workerPPE":workerPPE,
                                                                        "ppeInfo":ppeInfo,
                                                                        "workerPassport":workerPassport,
                                                                        "workerDriverLicense":workerDriverLicense,
                                                                        "workerWorkPermit":workerWorkPermit,
                                                                        "workPermitInfoNumber":workPermitInfoNumber,
                                                                        "workPermitInfoExpiryDate":workPermitInfoExpiryDate,
                                                                        "workerStudyPermit":workerStudyPermit,
                                                                        "studyPermitInfoNumber":studyPermitInfoNumber,
                                                                        "studyPermitInfoExpiryDate":studyPermitInfoExpiryDate
                                                                    }
                                                                ] 
														} } ),
							  type: "PUT",
							  contentType: "application/json",
							  success:function(data){
							  	location.reload();
							  } } );
					}
					else{
						alert("Address is in Wrong Format !!")
					}
				}
				else{
					alert("Email is in Wrong Format !!")	
				}
			}
			else{
				alert("Contact is in Wrong Format !!")	
			}
		}
		else{
			alert("Name is in Wrong Format !!")
		}
	}
}
function searchWorkers(e){
	var searchValue = $(e).val();
    $("#allWorkers .card h4").each(function(){
        if($(this).text().search(new RegExp(searchValue, "i")) < 0){
            $(this).parent().hide();
        }else{
            $(this).parent().show();
        }
    })
}


function employeeType(){
    var result = $("#workerType").val();
    if(result == "others"){
        $(".otherEmployeeType").css("display","table");
    }else{
        $(".otherEmployeeType").hide();
    }
}
function availableCno(){
    var result = $("#workerCNO").val();
    if(result == "cno_yes"){
        $(".cnoInfo").css("display","table");
    }else{
        $(".cnoInfo").hide();
    }
}
function bankingInfo(){
    var result = $("#workerBankingInfo").val();
    if(result == "banking_info_yes"){
        $(".bankingInfo").css("display","table");
    }else{
        $(".bankingInfo").hide();
    }
}
function selectDriveRange(){
    var result = $("#workerTransportation").val();
    if(result == "has_Vehicle"){
        $(".driveRange").css("display","table");
    }else{
        $(".driveRange").hide();
    }
}
function availablePpe(){
   var result = $("#workerPPE").val();
    if(result == "ppe_yes"){
        $(".ppeInfo").css("display","table");
    }else{
        $(".ppeInfo").hide();
    } 
}
function availablePoliceCheck(){
    var result = $("#workerPoliceCheck").val();
    if(result == "police_check_yes"){
        $(".policeCheckInfo").css("display","table");
    }else{
        $(".policeCheckInfo").hide();
    }
}
function availableCpr(){
    var result = $("#workerCPR").val();
    if(result == "cpr_yes"){
        $(".cprInfo").css("display","table");
    }else{
        $(".cprInfo").hide();
    }
}
function availableWorkPermit(){
    var result = $("#workerWorkPermit").val();
    if(result == "workPermit_yes"){
        $(".workPermitInfo").css("display","table");
    }else{
        $(".workPermitInfo").hide();
    }
}
function availableStudyPermit(){
    var result = $("#workerStudyPermit").val();
    if(result == "studyPermit_yes"){
        $(".studyPermitInfo").css("display","table");
    }else{
        $(".studyPermitInfo").hide();
    }
}