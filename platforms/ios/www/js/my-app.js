// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon:true
});

// Export selectors engine
var $$ = Dom7;


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache:true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}


$$('#jb_login').on('click',function(){
    var mail = $$("#jb_email").val();
    var pass = $$('#jb_pass').val();

    if (!mail || !pass) {
        myApp.alert("Por favor, rellene todos los campos.");
        return;
    }
    else
    {
        myApp.showPreloader('Cargando...');

        localStorage['mail']=mail;
        localStorage['pass']=pass;
        $.ajax({
            url : 'https://www.jarboss.com/mobile/controller/procesarLogin.php',
            type: 'POST',
            dataType : 'json',
            data: "email="+mail+"&password="+pass+"&type_log=2",
            success: function(server){ //$('#status').html("ajax ok");
               console.log(server);
                if(server.status == 'ok'){
                    var sesion = {
                        'idUsuario': server.idus,
                        'idempresa': server.idem,
                        'last_update':server.fecha,
                        'token': server.token,
                        'empresa':server.empresa,
                        'nombre': server.nombres_usuario,
                        'loginType': server.loginType,
                        'permiso_up':server.permiso_up,
                        'session':1,
                        'userMail':mail
                    }
                     localStorage.setItem('sessionJawk',JSON.stringify(sesion));
                     sessionStorage.setItem('sessionJawk',JSON.stringify(sesion));
                     localStorage['primerfase'] = 1;
                    ////.///////////////////////
                       var mensaje = server.nombres_usuario;
                
            
                    myApp.hidePreloader();
                   var url = "login.html";
                   // $(location).attr('href',url);
                   window.location.href = url;
                }else{
                    myApp.hidePreloader();
                    myApp.alert('Datos incorrectos','Error');
                   //navigator.vibrate(1200);
                }
            }
        });  

    }
});
var db = window.openDatabase('jbworkdb2', '1.0', 'jbworkdb.db', 10 * 1024 * 1024)
function preOff(iduser){

       window.db.transaction(function(txt){
      txt.executeSql("DELETE FROM usuarios");
      txt.executeSql("DELETE FROM post");
      txt.executeSql("DELETE FROM reporte_mantenimiento");
      txt.executeSql("DELETE FROM jb_dinamic_tables_rows_result");
      txt.executeSql("DELETE FROM jb_dinamic_tables_rows");
      txt.executeSql("DELETE FROM jb_fotos_reportes");
      txt.executeSql("DELETE FROM jb_firmas_reportes");
      
      txt.executeSql("DELETE FROM item_listview");
      txt.executeSql("DELETE FROM item");
      txt.executeSql("DELETE FROM checklits_section");
      txt.executeSql("DELETE FROM ubicacion");
      txt.executeSql("DELETE FROM gr_code");

      txt.executeSql("DELETE FROM sucursales");
      txt.executeSql("DELETE FROM jb_dinamic_relation");
      txt.executeSql("DELETE FROM jb_dinamic_section");
      txt.executeSql("DELETE FROM grupos");
      txt.executeSql("DELETE FROM jb_dinamic_tables");
      txt.executeSql("DELETE FROM jb_dinamic_tables_columns");
      txt.executeSql("DELETE FROM jb_dinamic_tables_option_row");
      //txt.executeSql("DROP TABLE IF EXISTS jb_dinamic_tables_option_row");
  });

    localStorage.removeItem('idPlantilla_activa');
    localStorage.removeItem('nombrePlantilla_activa');
    localStorage.removeItem('idreporte');
    localStorage.removeItem('id_row');
    localStorage.removeItem('idtabla');
    localStorage.removeItem('nomRepor');
    localStorage.removeItem('fotopop');
    localStorage.removeItem('idtabla2');
    localStorage.removeItem('idrow2');
    localStorage.removeItem('totalfoto');
    localStorage.removeItem('countfoto');
    localStorage.removeItem('rowsresul');
    localStorage.removeItem('mantenimiento');
    localStorage.removeItem('posteo');
    localStorage.removeItem('jb_reporte_ubicacion');
    localStorage.removeItem('idGrupo');
    localStorage.removeItem('idEmpresa');
    localStorage.removeItem('nombrepor');
    localStorage.removeItem('plantillasOn');

    localStorage.removeItem('repSeccion');
    localStorage.removeItem('tmpPlantillas');        
    localStorage.removeItem('nomsucursal');        

    SessionOff();
}

function SessionOff(){   
    localStorage.removeItem("sessionJawk");
    localStorage.removeItem("mail");
    localStorage.removeItem("pass");
    sessionStorage.removeItem("sessionJawk");
    
    setTimeout(function(){
        window.location.href = "index.html";
    },200)   
}

