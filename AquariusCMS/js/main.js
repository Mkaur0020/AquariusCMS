
(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);

function login(){
    var username = $("#username").val();
    var password = $("#password").val();
    $.ajax( { url: "https://api.mlab.com/api/1/databases/login_admin/collections/admin?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari",
          type: "GET",
          contentType: "application/json",
          success: function(data){
            if(username == data[0].username && password == data[0].password){
                window.location.href='main.html'
            }
            else{
                alert("Username or Password may be wrong !!")
            }
          } } );
    
}
function forgotPassword(){
    var username = prompt("Please enter admin username:");

    if (username == null || username == "") {

    } else {
        $.ajax( { url: "https://api.mlab.com/api/1/databases/login_admin/collections/admin?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari",
          type: "GET",
          contentType: "application/json",
          success: function(data){
            //console.log(data)
            if(username == data[0].username){
                var contact = prompt("Please enter registered admin contact:");
                if(contact == null || null == ""){

                }
                else{
                   $.ajax( { url: "https://api.mlab.com/api/1/databases/login_admin/collections/admin?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari",
                  type: "GET",
                  contentType: "application/json",
                  success: function(data){ 
                        if(contact.length == 10 ){
                            $.ajax( { url: "https://platform.clickatell.com/messages/http/send?apiKey=IdQeSiqMSumMquoX1e_RIA==&to=1"+contact+"&content=Secret Code - 0410",
                              type: "GET",
                              contentType: "application/json",
                              success: function(data){   
                                    var secretCode = prompt("Please enter Secret code sent to registered contact:");
                                    if(secretCode == "0410"){
                                        var new_password = prompt("Please enter new password:");
                                        if(new_password == null || new_password == ""){
                                            alert("Wrong Format !!")
                                        }else{
                                            $.ajax( { url: "https://api.mlab.com/api/1/databases/login_admin/collections/admin/5b1681721f6e4f35aea464b1?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari",
                                              data: JSON.stringify( { "username": "admin","password" : new_password ,"registered_contact": "5873385370"} ),
                                              type: "PUT",
                                              contentType: "application/json" } );
                                            alert("Password Changed !!");
                                        }
                                    }
                                    else{
                                        alert("Wrong Secret Code !!")
                                    }
                              } } );
                        }else{
                            alert("Wrong contact format !!")
                        }
                    } } );
                }
            }
            else{
                alert("Wrong Username !!");
            }
          } } );
    }
}