function chatroom(){
	$(".msgSendBtn").text("Send Message");
	$(".loading").show();	
	$("#allMessages").html("");
	$("#message_box").html("");
	$("#group_message").val("");
	$.ajax( { url: databaseGroupMessage,
              type: "GET",
              contentType: "application/json",
              success:function(data){
              	for(var i = data.length - 1 ; i >= 0 ; i--){
              		var html = '<h5>'+data[i].message+'<span>'+data[i].senders_name+'-'+data[i].time+'</span></h5>';
					$("#allMessages").append(html);
	            	$(".loading").hide(); 
              	}
              }
          });


	$.ajax( { url: databaseUrl+apiKey,
		type: "GET",
		contentType: "application/json",
		success: function(data){
			$("#workerList").html("");
			if(data.length == 1 || data.length == 0){
                var html = '<h5>No Workers Found</h5>';
                $("#workerList").append(html);
                $(".loading").hide();
            }
            else{
			    for(var i = 0; i <= data.length - 1 ; i++){
			    	if(data[i] != "system.indexes"){
				    	$.ajax( { url: databaseCollections+data[i]+apiKey,
							      type: "GET",
							      contentType: "application/json",
							      success:function(data){
							      	if(data[0].workerStatus == "working"){
							      		var html = '<li onclick="selectPerson(this)">'+data[0].workerName+'</li>';
										$("#workerList").append(html);
						            	$(".loading").hide();	
							      	}
						} } );		    		
			    	}
			    }
			    $(".loading").hide();
            }
		}} );
}


function sendMessage(){
	$(".loading").show();
	var msg = $("#group_message").val();
	var currentdate = new Date(); 
    if(currentdate.getHours() > 12){
    	var currentTime = currentdate.getHours() - 12;
		var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "--"  
                + currentTime + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + " PM";
    }
    if(currentdate.getHours() < 12){
    	var currentTime = currentdate.getHours();
    	var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "--"  
                + currentTime + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + " AM";
    }

    $.ajax( { url: databaseGroupMessage,
          data: JSON.stringify(  { "senders_name" : "Admin",
          							"message" :  msg,
          							"time" : datetime} ),
          type: "POST",
          contentType: "application/json",
            success: function (data) { 
            	var html = '<h5>'+msg+'<span>Admin-'+datetime+'</span></h5>';
				$("#allMessages").prepend(html);
            	$(".loading").hide();  
            } } );

	
}

function selectPerson(e){
	var recieverName = $(e).text();
	$("#message_box").html("");
	$("#person_message").val("");
	$(e).parent().parent().parent().parent().parent().find(".btn").text("Send Message to "+recieverName);
	$.ajax( { url: databasePersonalMessage+recieverName+apiKey,
              type: "GET",
              contentType: "application/json",
              success:function(data){
              	for(var i = data.length - 1 ; i >= 0 ; i--){
              		var html = '<h5>'+data[i].message+'<span>'+data[i].senders_name+'-'+data[i].time+'</span></h5>';
					$("#message_box").append(html);
	            	$(".loading").hide(); 
              	}
              	$("#person_message").val("");
              }
          });

}
function sendMessageToPerson(e) {
	var recieverName = $(e).text().split(" ")[3];
	var msg = $("#person_message").val();
	var currentdate = new Date(); 
    if(currentdate.getHours() > 12){
    	var currentTime = currentdate.getHours() - 12;
		var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "--"  
                + currentTime + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + " PM";
    }
    if(currentdate.getHours() < 12){
    	var currentTime = currentdate.getHours();
    	var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "--"  
                + currentTime + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + " AM";
    }
    if(recieverName != undefined && recieverName != ""){
	    if(msg != ""){
			$.ajax( { url: databasePersonalMessage+recieverName+apiKey,
				      data: JSON.stringify({
				        "senders_name" : "Admin",
				        "reciever_name" : recieverName,
				        "message" : msg,
				        "time" : datetime
				      }),
				      type: "POST",
				      contentType: "application/json",
				      success:function(data){
				      		var html = '<h5>'+msg+'<span>Admin-'+datetime+'</span></h5>';
							$("#message_box").prepend(html);
		            	
				      } } );	
	    }
	    else{
	    	alert("Please Enter Message !!");
	    }
    }else{
    	alert("Please Select Person to Send !!");
    }
}