function loginUser(){  //$('#status').html("entro login");
	myApp.showPreloader('Cargando...');
    var email = $("#mail").val();
    var password = $("#password").val();
    if(email == '' || password == ''){
        myApp.hidePreloader();
        myApp.alert('Espacios Vacios','Error');
    }else{
        localStorage['mail']=email;
        localStorage['pass']=password;
        $.ajax({
            url : 'https://www.jarboss.com/mobile/controller/procesarLogin.php',
            type: 'POST',
            dataType : 'json',
            data: "email="+email+"&password="+password,
            success: function(server){ //$('#status').html("ajax ok");
            console.log(server);
                if(server.status == 'ok'){
                    //alert(server.status);
                    localStorage['idusuario']=server.idus;
                    sessionStorage['idusuario']=server.idus;
                    localStorage['idempresa']=server.idem;
                    sessionStorage['idempresa']=server.idem;
                    localStorage['last_update']=server.fecha;
                    sessionStorage['last_update']=server.fecha;
                    //localStorage['paginador']=10;
                    localStorage['token']=server.token;
                    sessionStorage['token']=server.token;
                    localStorage['empresa']=server.empresa;
                    sessionStorage['empresa']=server.empresa;
                    localStorage['nombreus']=server.nombres_usuario;
                    sessionStorage['loginType']=server.loginType;
                    localStorage['loginType']=server.loginType;
                    localStorage['permiso_up']=server.permiso_up;
                    sessionStorage['permiso_up']=server.permiso_up;
                    /*
                    Pasar estos valores aquí
                    var rand1 = 1 + Math.floor(Math.random() * 6);
                    var rand2 = 1 + Math.floor(Math.random() * 6 * rand1);
                    var rand3 = 1 + Math.floor(Math.random() * rand1 * rand2);
                    var randGeneral = "ios_" + rand1 + "" + rand2 + "" + rand3;
                    alert("device -> " + randGeneral);
                    localStorage['resourceOpenfire'] = randGeneral;
                    */

               var mensaje = server.nombres_usuario;
               var emC = localStorage['mail'].split('@');
               var token=localStorage['token'];
                  /*  $.ajax({
                        type: "POST",
                        dataType : "json",
                        url: "https://www.jarboss.com/mobile/controller/JBGET.php?type=users&module=openfire",
                        data:"token="+token+"&movilemp="+localStorage['idempresa']+"&moviluser="+localStorage['idusuario']+"&tipo_empresa="+localStorage['loginType'],
                        success: function(server){
                            $.each(server,function(i,v){
                                usuarioID = v.usuario.replace(".", "-");
                                usuario_conID = v.usuario_conID.replace(".", "-");
                                if($("#nombreUsuario").text() + "" + $("#jb_id").text() == usuarioID || $("#nombreUsuario").text() + "" + $("#jb_id").text() == v.usuario_conID || $("#nombreUsuario").text() + "" + $("#jb_id").text() == usuario_conID){
                                    $("#jb_id").html(v.idUser);
                                }
                            });
                        }
                    });*/
                    localStorage.removeItem('regactivo');
                    localStorage.removeItem('emails');
                    myApp.hidePreloader();
                   // url = "index.html#";
               //$(location).attr('href',url);
                }else{
                    myApp.hidePreloader();
                    myApp.alert('Datos incorrectos','Error');
                   navigator.vibrate(2000);
                }
            }
        });  
    }  
}

function SessionOff(){   
	//myApp.showPreloader('Cerrando Sesion...');;
    var idr = localStorage['deviceRegId'];
    logoutDispostivo(idr);
    $("#statusm").text("M");
    localStorage.removeItem("idempresa");
    localStorage.removeItem("last_update");
    localStorage.removeItem("token");
    localStorage.removeItem("empresa");
    localStorage.removeItem("nombreus");
    localStorage.removeItem("pass");
    localStorage.removeItem("deviceRegId");
    localStorage.removeItem("deviceId");
    localStorage.removeItem("idusuario");
    localStorage.removeItem('idUserEmpresa');
    $("#password").val("");
    // limpiar("panl");
    $("#mail").val(localStorage['mail']);
    //location.reload;
    localStorage['jb_grupo_position']= 0
    localStorage['jb_area_respuesta_id']= ''
    localStorage['jb_area_respuesta_txtpost']= ''
    //myApp.hidePreloader();
    url = "Login.html#";
    $(location).attr('href',url);
    
}

function logoutDispostivo(id){
    var user=localStorage['idusuario'];
    var emp=localStorage['idempresa'];
    var token=localStorage['token'];
    //alert(token);
    $.ajax({
        type: "POST",
        dataType : 'json',
        url: "https://www.jarboss.com/mobile/controller/procesarLogoutGcm.php",
        data: "token="+token+"&id_registro="+id,
        beforeSend: function(){               },
        success: function(server){
            //alert(server.status)
        },
        error: function(xhr, testStatus, error){}
    });
}
/*
function loginUserByStolo()
 {
   //pregunta a la funcion getLocalStorage por la existencia del storage de jarboss.
      if(!getLocalStore("all"))
        {

            var password = calcMD5(localStorage['pass']);
            $("#xmpp_user_use").html(password);
            $("#psUsuario").html(password);

            $("#nombreDeUsuario").text(localStorage['nombreus']);
  var emC = localStorage['mail'].split('@');
   $("#nombreUsuario").text(emC[0]);
   $("#jb_id").text(localStorage['idusuario']);
    $("#nombre_empresa_jabber").text(localStorage['empresa']);
    /*sigue*/
          //Menu(localStorage['nombreus']);
        /*  localStorage['paginador']=10;
            if($("#listaConectadosSeccion").text() != "SeccionConectados")
            {
                url = "index.html";// estas variable esta denifnida en algun lugar?
                $(location).attr('href',url);
                return true;
            }
        }   
 }*/

 function getLocalStore(tp)
   {  
     if(tp == "all")
     {   
        //este apartado recibe "all" y evalua todas las local storage necesarias si estan completa devuelve "true" de lo contrario "false".
           if (typeof localStorage['idusuario'] != "undefined" && typeof localStorage['idempresa'] != "undefined" && typeof localStorage['last_update'] != "undefined" && typeof localStorage['token'] != "undefined" && typeof localStorage['empresa'] != "undefined" && typeof localStorage['loginType'] != "undefined")
           {
            //window.location.hash = '#lista_contactos';
               if($("#listaConectadosSeccion").text() != "SeccionConectados")
               {
                   url = "index.html";
                   $(location).attr('href',url);
                   //return true;
               }
            }

        else
        {
          //window.location.hash = 'index.html';
          //url = "index.html";
          //$(location).attr('href',url);
            return false;
        }
     }
     else
     {
        //este apartado espera una variable identica al nombre de una local storage para ser evaluada individualmente si la encuentra devuelve true de lo contrario false
       if (typeof localStorage['+tp+'] == "undefined")
         return false;
        else
          return true;
     }
   }

function cargaModuloIdEmpresa()
{
    var token = localStorage['token'];
    $.ajax({
           type: "POST",
           dataType : "json",
           url: "https://www.jarboss.com/mobile/controller/JBGET.php?type=users&module=openfire",
           data:"token="+token+"&movilemp="+localStorage['idempresa']+"&moviluser="+localStorage['idusuario']+"&tipo_empresa="+localStorage['loginType'],
           success: function(server)
           {
           $.each(server,function(i,v)
                  {
                  usuarioID = v.usuario.replace(".", "-");
                  usuario_conID = v.usuario_conID.replace(".", "-");
                  
                  $("#jb_total_id_zone").append('<div id="jb_relation_user_id_'+usuarioID+'">'+v.id_empleado+'</div>');
                  $("#jb_total_id_zone_alternative").append('<div id="jb_relation_user_id_alternative_'+usuario_conID+'">'+v.id_empleado+'</div>');
                  $("#jb_total_user_zone").append('<div id="jb_relation_userComplete_id_'+usuarioID+'">'+v.userComplete+'</div>');
                  $("#jb_total_user_zone_alternative").append('<div id="jb_relation_userComplete_id_'+usuario_conID+'">'+v.userComplete+'</div>');
                  $("#jb_total_emp_zone").append('<div id="jb_relation_userconID_id_'+usuario_conID+'">'+v.nombre_empresa_actual+'</div>');
                  $("#jb_empresa_url_zone").append('<div id="jb_relation_url_id_'+usuarioID+'">'+v.nombre_empresa+'</div>');
                  $("#jb_id_user_url").append('<div id="jb_relation_idEspecific_url_'+usuarioID+'">'+v.idUser+'</div>');
                  
                  });
           }
           });
    $("#jb_id").html(localStorage['idusuario']);
    var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
    //alert(localStorage['eail']);
    var usuario = localStorage['mail'].split("@");
    var password = $("#xmpp_user_use").text();
    var jb_id = $("#jb_id").text();
    var ultimaPresencia = $("#ultima_sesion_usuario").text();
    var usuario1 = usuario[0].toLowerCase() + localStorage['idusuario'] +  "@chat.jarboss.com";
    
    //alert("usuario => " + usuario1 + " pass => " + password);
    /*
    script.src = 'js/jarboss/chatXMPP/BOSH.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);
    */
    
}



function contraconfirsol()
{
    if($("#recontra").val() != "")
    {
     
        var email = $("#recontra").val();
        
        $.ajax({
        
               type:"POST",
               datatype:"JSON",
               url:"https://www.jarboss.com/procesarRecoveryPasswords.php",
               data:"email="+email,
               
               success:function(server)
               {//alert(server.path+'    -  '+server);
                    if(server.status == "existe")
                    {
                            $.ajax({
                                   type:"POST",
                                   url:"https://www.jarboss.com/"+server.path+"controller/procesarSolicitudPassword.php?resource=M",
                                   data:"email="+email,
                                   
                                   success:function(server2)
                                   {//alert('aucwaa');
                                        if(server2.status == "ok")
                                            {
                                                alert("Se te envio a tu correo un enlace de recuperacion");
                                                window.location= "index.html";
                                            }
                                   }
                            });
                    } else
                        {
                            alert("Verifica el correo ingresado");
                        }
               },
               error: function(){
               //alert(' no success');
               }
        
        });
    
    }

}





function regempresa()
{
    if ($("#reempresa").val()!="") {
        var email = $("#reempresa").val().trim();
        
        $.ajax({
               
               type:"POST",
               //dataType:"json",
               url:"https://www.jarboss.com/procesarCreateDatabaseAutomatically.php",
               data:"nombre_empresa="+email,
               success:function(server)
               {
               var empres = server.trim();
               if(typeof server !== undefined || server !== "")
               {
               $.ajax({
                      type:"POST",
                      //dataType:"json",
                      url:"https://www.jarboss.com/"+empres+"controller/procesarPreregistro.php?type=m",
                      data:"email="+email,
                      success:function(servere2)
                      {
                      if (servere2.status == "ok") {
                      alert("Te enviamos una invitacion a tu correo");
                      window.location= "index.html";

                      }
                      }
                      
                      });
               }
               }
               
               });
        
    }
}




