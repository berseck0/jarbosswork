var db = window.openDatabase('jbworkdb2', '1.0', 'jbworkdb.db', 10 * 1024 * 1024)
$("#menuDerechoslide").click(function(){
	if ($("#menudeplegable").is(":visible")) {
			$("#menudeplegable").hide();		
	}else{
		$("#menudeplegable").show();
	}
});
var session = getStorage('sessionJawk');

function regresa_plantilla(){
  $("#menudeplegable").hide();
  $("#jb_title").empty();
  $("#jb_title").html("Seleccion un reporte");
  $("#jb_regresa_plantilla").remove();
  $("#list_plantillas").show();
  $("#jb_plantilla_selec").remove();
  $("#jb_plantilla_datos").remove();
  localStorage.removeItem("idPlantilla_activa");
  localStorage.removeItem('nombrePlantilla_activa');
  localStorage.removeItem("idreporte");
  localStorage.removeItem("nomsucursal");
}

$(document).on("ready",function(){
  $('#nombreUSer').append('<label>Nombre:</label><br>'+session.nombre);
  $('#empresaUSer').append('<label>Empresa:</label><br>'+session.empresa);
  $('#SessionOff').attr('onclick','preOff('+session.idUsuario+');');
  $('#btnPublicar').hide();
  $('#btnGps').hide();
  $('#imgProfile').removeAttr('onclick');
  $('#imgProfile').attr('src','https://www.jarboss.com/'+session.empresa+'/plugins/resize/imagenes/jarboss_pic_profile_'+session.idUsuario+'.jpg')

               
  if (typeof session !== 'undefined' && session != "") {
      
        if (typeof localStorage['primerfase']!== 'undefined' && localStorage['primerfase']!="") {
          jbdatabase();
          localStorage.removeItem('primerfase');
        }
        window.db.transaction(function(txt2){
              txt2.executeSql("SELECT sesionuser FROM usuarios WHERE iduser=\'"+session.idUsuario+"\';",[], function(tx, results){
                     
                      if (results.rows.length == 0) {
                            //jbdatabase();
                            myApp.showPreloader();
                            setTimeout(function(){
                              //jbdatabase();
                                  actualizadbZinck();
                                  //console.log('asasas');
                            },4000);
                      }else {
                          console.log('sesion 1 bien');

                              var idPlantillaActiva     = localStorage['idPlantilla_activa'];
                              var nombrePlantillaActiva = localStorage['nombrePlantilla_activa'];
                              var idReporte             = localStorage['idreporte'];

                            if( typeof idPlantillaActiva !== "undefined" && typeof nombrePlantillaActiva !== "undefined" && typeof idReporte !== "undefined" && idPlantillaActiva != "" && nombrePlantillaActiva != "" && idReporte != ""){
                                //console.log(idPlantillaActiva +' '+nombrePlantillaActiva+'  '+ idReporte);
                                setTimeout(function(){
                                    // console.log($('#id_plantillas_'+localStorage['idPlantilla_activa']).is(':visible'));
                                    if ($('#id_plantillas_'+localStorage['idPlantilla_activa']).is(':visible')) {
                                        $('#id_plantillas_'+localStorage['idPlantilla_activa']+' a')[0].click();
                                    }
                                },800);
                                setTimeout(function(){
                                  if ( $('body #ligaSegReport').is(':visible')) {
                                     $('body #ligaSegReport')[0].click();
                                     console.log('liga seg reporte click');
                                  }
                                   procesar_plantilla();
                                },2000);
                            } 
                            if (typeof localStorage['idreporte'] !== "undefined" ) {
                                //console.log("idrepor->"+localStorage['idreporte']);
                                $("#reporteiniciado").append('<a href="#reportes-sec" class="item-link"> </a>');
                                $('#tit_report_sec').empty();

                                setTimeout(function(){
                                  $("#reporteiniciado a")[0].click();
                                },1500);
                            }

                      }
              });
        });

    

}
    
  

  
  
  
});
///fin del  document on ready//////////////////////////////
function getStorage(data)
{
  return JSON.parse(localStorage.getItem(data))
}
function jbdatabase(){
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
  })
  
  window.db.transaction(function(txt){
      //txt.executeSql('DELETE from usuarios');//txt.executeSql
      txt.executeSql("DROP TABLE IF EXISTS usuarios");
      txt.executeSql("CREATE TABLE IF NOT EXISTS usuarios(iduser TEXT(20), token TEXT(50), sesionuser TEXT(10), nombreuser TEXT(100), logintype TEXT(10), idempresa TEXT(50), empresa TEXT(100), fecha TEXT(50), correo TEXT(30), puesto TEXT(50),departamento TEXT(50))")
      txt.executeSql("CREATE TABLE IF NOT EXISTS post(token TEXT(50), post TEXT(200), modo TEXT(50), longitud_latitud TEXT(40), id_usuario TEXT(30), id_reporte TEXT(30), id_grupo TEXT(30), id_empresa TEXT(30));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS reporte_mantenimiento(status TEXT(30), resultado TEXT(40), nombre TEXT(100), id_usuario TEXT(30), id_grupo TEXT(30), id_plantilla TEXT(30), id TEXT(30), fecha TEXT(50));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS jb_dinamic_tables_rows_result(total TEXT(50), nota TEXT(140), miniatura TEXT(100), id_reporte TEXT(30), id_plantilla TEXT(30), id TEXT(30), adjunto TEXT(50));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS jb_dinamic_tables_rows(status TEXT(20),id_table TEXT(30), id_reporte TEXT(30), id_row TEXT(20), id_column TEXT(10), id TEXT(30), fecha TEXT(50), contenido TEXT(50),position int(5),tipo int,campSintilla TEXT(200));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS jb_fotos_reportes(id_table TEXT(30),id_reporte TEXT(30), id_row TEXT(30),id TEXT(30), foto TEXT(800),id_column TEXT(15))");
      txt.executeSql("CREATE TABLE IF NOT EXISTS jb_firmas_reportes(id_table TEXT(30),id_reporte TEXT(30), id_row TEXT(30),id TEXT(30), firma TEXT(800),id_column TEXT(15),nombre text(40))");
      
      txt.executeSql("CREATE TABLE IF NOT EXISTS item_listview(status TEXT(30), nombre TEXT(100));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS item(status TEXT(30),name TEXT(50), id TEXT(30));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS checklits_section(section_status TEXT(30), section_nombre TEXT(20), section_id TEXT(20));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS ubicacion(longitud TEXT(30), latitud TEXT(30));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS gr_code(id TEXT(30), contenido TEXT(100), tipo TEXT(20));");

      txt.executeSql("CREATE TABLE IF NOT EXISTS sucursales(id TEXT(30), nombre TEXT(100),type_section int(2));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS jb_dinamic_relation(id_section TEXT(30), id TEXT(30), fecha TEXT(40), email TEXT(30),type_section int(2));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS jb_dinamic_section(id TEXT(30), id_empresa TEXT(30), nombre TEXT(50), fecha TEXT(15),type_section int(2));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS grupos(nombregrupo TEXT(100), nombres TEXT(100), id TEXT(20), es_privado TEXT(10),type_section int(2));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS jb_dinamic_tables(valor TEXT(30), tipo TEXT(10), status TEXT(20), position int(3), nombre TEXT(50),id_section TEXT(30), id_empresa TEXT(20), id TEXT(30), fecha TEXT(40),type_section int(2));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS jb_dinamic_tables_columns(id TEXT(30), id_table TEXT(30), nombre TEXT(100), content_type TEXT(20), fecha TEXT(20), position int(3), valor TEXT(20), id_section TEXT(20), status TEXT(14),type_section int(2));");
      txt.executeSql("CREATE TABLE IF NOT EXISTS jb_dinamic_tables_option_row(id TEXT(30),id_column TEXT(20), contenido TEXT(20), status TEXT(10), fecha TEXT(20), id_table TEXT(30), valor TEXT(20),type_section int(2),position int(2));");
  }, error_log);
  //funcion para ver los errores de la base de datos
  function error_log(error){
    console.log(error.message);
  }
}
  //////iniciamos la actualizacion completa de la base de datos
function actualizadbZinck()
{
      //console.log(localStorage['sesion']);
      $.ajax({
            url : 'https://www.jarboss.com/mobile/controller/procesarLogin.php',
            type: 'POST',
            dataType : 'json',
            data: "email="+localStorage['mail']+"&password="+localStorage['pass']+"&type_log=2",
            success: function(server){ 
                //console.log(server);    
                window.db.transaction(function(txt){
                    // console.log('localstorage'+localstorage['idusuario']);
                    txt.executeSql("SELECT * FROM usuarios WHERE iduser=\'"+server.idus+"\';",[], function(tx, results){
                        if (results.rows.length == 0){
                           txt.executeSql("INSERT INTO usuarios(iduser, nombreuser, fecha, idempresa, token, sesionuser, logintype, empresa, correo, puesto, departamento ) VALUES (\'"+server.idus+"\', \'"+server.nombres_usuario+"\', \'"+server.fecha+"\', \'"+server.idem+"\',\'"+server.token+"\',\'1\',\'"+server.loginType+"\',\'"+server.empresa+"\',\'"+localStorage['mail']+"\',\'"+server.puesto+"\',\'"+server.departamento+"\');");   
                        }else
                        {
                          txt.executeSql("UPDATE usuarios SET sesionuser='1' where iduser=\'"+server.idus+"\';");  
                        }
                    });
                });
                setTimeout(function() {
                 // alert('siguiente paso');
                    dinamicSection();
                }, 1000);
            }
      }); 
}
  //llenamos las tablas 
function dinamicSection(){
        //1
        $.ajax({
               type:"POST",
               datatype:"JSON",
               url: "https://www.jarboss.com/AdminReportes/controladores/controladorSyncExternos.php?source=0",
               data:"source="+session.token,
               success:function(server)
               {  //type setion 1
                  //console.log('controladorSyncExternos 1');
                 // console.log(server)
                  $.each(server,function(k,v){
                      window.db.transaction(function(txt){
                            txt.executeSql("INSERT INTO jb_dinamic_section(id,id_empresa,nombre,fecha,type_section) VALUES (\'"+v.id+"\', \'"+v.id_empresa+"\', \'"+v.nombre+"\', \'"+v.fecha+"\',\'"+v.type_section+"\');");               
                      });
                  });  
                },
               error: function(){
                //alert(' no success');
               }
        });
        setTimeout(function(){
            //0
            $.ajax({
                 type:"POST",
                 datatype:"JSON",
                 url:"https://www.jarboss.com/AdminReportes/controladores/controladorSyncInternos.php?source=0",
                 data:"source="+session.token,
                  
                 success:function(server)
                 {  //type section 0
                    //console.log('controladorSyncInternos 0')
                    //console.log(server)
                    $.each(server,function(k,v){
                        window.db.transaction(function(txt){
                          txt.executeSql("INSERT INTO jb_dinamic_section(id,id_empresa,nombre,fecha,type_section) VALUES (\'"+v.id+"\', \'"+v.id_empresa+"\', \'"+v.nombre+"\', \'"+v.fecha+"\',\'"+v.type_section+"\');");               
                        });
                    });  
                    setTimeout(function(){
                      dinamicTable();
                    },900)
                  },
                 error: function(){
                  //alert(' no success');
                 }
            });          
        },1000);
}
  //siguente carga
function dinamicTable(){
     $.ajax({
             type:"POST",
             datatype:"JSON",
              url: "https://www.jarboss.com/AdminReportes/controladores/controladorSyncExternos.php?source=1",
             data:"movilemp="+session.idempresa+"&moviluser="+session.idUsuario+"&source="+session.token,
             
             success:function(server)
             {   
                  //console.log(server)
                  $.each(server,function(k,v){
                      window.db.transaction(function(txt){
                          txt.executeSql("INSERT INTO jb_dinamic_tables( valor, tipo, status, position, nombre,id_section, id_empresa, id,fecha,type_section) VALUES (\'"+v.valor+"\', \'"+v.tipo+"\', \'"+v.status+"\', \'"+v.position+"\', \'"+v.nombre+"\', \'"+v.ids+"\', \'"+v.ide+"\', \'"+v.id+"\', \'"+v.fecha+"\',1);");
                      });  
                  });
             },
              error: function(){
              //alert(' no success');
              }
      });

     setTimeout(function(){
        $.ajax({
               type:"POST",
               datatype:"JSON",
                url:"https://www.jarboss.com/AdminReportes/controladores/controladorSyncInternos.php?source=1",
               data:"movilemp="+session.idempresa+"&moviluser="+session.idUsuario+"&source="+session.token,
             
               success:function(server)
               {  
                //console.log(server)
                    $.each(server,function(k,v){
                        window.db.transaction(function(txt){
                            txt.executeSql("INSERT INTO jb_dinamic_tables( valor, tipo, status, position, nombre,id_section, id_empresa, id,fecha,type_section) VALUES (\'"+v.valor+"\', \'"+v.tipo+"\', \'"+v.status+"\', \'"+v.position+"\', \'"+v.nombre+"\', \'"+v.ids+"\', \'"+v.ide+"\', \'"+v.id+"\', \'"+v.fecha+"\',0);");
                        });  
                    });
                    setTimeout(function(){
                        dinamicTableColum();
                    },900)
               },
                error: function(){
                //alert(' no success');
                }
        });
     },1000)
}

  ///siguente carga de tablas
function dinamicTableColum(){
     $.ajax({
             type:"POST",
             datatype:"JSON",
              url:"https://www.jarboss.com/AdminReportes/controladores/controladorSyncExternos.php?source=2",
             data:"movilemp="+session.idempresa+"&moviluser="+session.idUsuario+"&source="+session.token,
             
             success:function(server)
             {
                $.each(server,function(k,v){
                    window.db.transaction(function(txt){
                        txt.executeSql("INSERT INTO jb_dinamic_tables_columns( id,id_table,nombre,content_type,fecha,position,valor,id_section,status,type_section) VALUES (\'"+v.id+"\', \'"+v.idt+"\', \'"+v.nombre+"\', \'"+v.type+"\', \'"+v.fecha+"\', \'"+v.position+"\', \'"+v.valor+"\', \'"+v.ids+"\',\'"+v.status+"\',1);");
                    });  
                });
             },
             error: function(){
             //alert(' no success');
             }
      });

      setTimeout(function(){
          $.ajax({
                 type:"POST",
                 datatype:"JSON",
                  url:"https://www.jarboss.com/AdminReportes/controladores/controladorSyncInternos.php?source=2",
                 data:"movilemp="+session.idempresa+"&moviluser="+session.idUsuario+"&source="+session.token,
                 
                 success:function(server)
                 {
                      $.each(server,function(k,v){
                          window.db.transaction(function(txt){
                              txt.executeSql("INSERT INTO jb_dinamic_tables_columns( id,id_table,nombre,content_type,fecha,position,valor,id_section,status,type_section) VALUES (\'"+v.id+"\', \'"+v.idt+"\', \'"+v.nombre+"\', \'"+v.type+"\', \'"+v.fecha+"\', \'"+v.position+"\', \'"+v.valor+"\', \'"+v.ids+"\',\'"+v.status+"\',0);");
                          });  
                      });
                      setTimeout(function(){
                         dinamicTableOptioRow();
                      },900);
                 },
                 error: function(){
                    //alert(' no success');
                 }
          });
      },1000)
}

  /// siguente opciones
function dinamicTableOptioRow(){
    $.ajax({
           type:"POST",
           datatype:"JSON",
            url:"https://www.jarboss.com/AdminReportes/controladores/controladorSyncExternos.php?source=3",
           data:"movilemp="+session.idempresa+"&source1="+session.idUsuario+"&source="+session.token,
           
           success:function(server)
           {  //console.log(server)
              $.each(server,function(k,v){
                  window.db.transaction(function(txt){
                      txt.executeSql("SELECT id FROM jb_dinamic_tables_option_row WHERE id=\'"+v.id+"\'",[], function(tx, results){
                        var row = results.rows.length;
                        //console.log("resultado de consulta ->"+row);
                        if (row != 1){
                         //console.log("INSERT INTO jb_dinamic_tables_option_row(id, id_column, contenido, status, fecha, id_table, valor,type_section,position) VALUES (\'"+v.id+"\', \'"+v.idc+"\', \'"+v.contenido+"\', \'"+v.status+"\', \'"+v.fecha+"\', \'"+v.id_table+"\', \'"+v.valor+"\',1,\'"+v.position+"\');");
                          txt.executeSql("INSERT INTO jb_dinamic_tables_option_row(id ,id_column, contenido, status, fecha, id_table, valor,type_section,position) VALUES (\'"+v.id+"\', \'"+v.idc+"\', \'"+v.contenido+"\', \'"+v.status+"\', \'"+v.fecha+"\', \'"+v.id_table+"\', \'"+v.valor+"\',1,\'"+v.position+"\');");   
                        }
                      });
                  });  
              });
           },
           error: function(){
              //alert(' no success');
           }
    });
    setTimeout(function(){
      console.log();
        $.ajax({
             type:"POST",
             datatype:"JSON",
              url:"https://www.jarboss.com/AdminReportes/controladores/controladorSyncInternos.php?source=3",
             data:"movilemp="+session.idempresa+"&source1="+session.idUsuario+"&source="+session.token,
             success:function(server)
             {  
                $.each(server,function(k,v){
                    window.db.transaction(function(txt){  
                      txt.executeSql("SELECT id FROM jb_dinamic_tables_option_row WHERE id=\'"+v.id+"\'",[], function(tx, results){
                        var row = results.rows.length;
                        //console.log("resultado de consulta ->"+row);
                        if (row != 1){
                         //console.log("INSERT INTO jb_dinamic_tables_option_row(id, id_column, contenido, status, fecha, id_table, valor,type_section,position) VALUES (\'"+v.id+"\', \'"+v.idc+"\', \'"+v.contenido+"\', \'"+v.status+"\', \'"+v.fecha+"\', \'"+v.id_table+"\', \'"+v.valor+"\',1,\'"+v.position+"\');");
                          txt.executeSql("INSERT INTO jb_dinamic_tables_option_row(id ,id_column, contenido, status, fecha, id_table, valor,type_section,position) VALUES (\'"+v.id+"\', \'"+v.idc+"\', \'"+v.contenido+"\', \'"+v.status+"\', \'"+v.fecha+"\', \'"+v.id_table+"\', \'"+v.valor+"\',0,\'"+v.position+"\');");   
                        }
                      });                    
                   });  
                });
                setTimeout(function(){
                  dinamicRelation();
                },900)
             },
             error: function(){
             //alert(' no success');
             }
        });
    },1000)
}

  // dinamic relaciones
function dinamicRelation(){
    $.ajax({
           type:"POST",
           datatype:"JSON",//
            url: "https://www.jarboss.com/AdminReportes/controladores/controladorSyncExternos.php?source=4",
           data:"source="+session.token,
           
           success:function(server)
           {
              $.each(server,function(k,v){
                  window.db.transaction(function(txt){
                      txt.executeSql("INSERT INTO jb_dinamic_relation(id ,id_section, fecha, email,type_section) VALUES (\'"+v.id+"\', \'"+v.id_section+"\', \'"+v.fecha+"\', \'"+v.email+"\',1);");                         
                  });  
              });
           },
           error: function(error){
              alert(' no success '+error);
           }
    });
    setTimeout(function() {
        $.ajax({
                 type:"POST",
                 datatype:"JSON",//
                  url:"https://www.jarboss.com/AdminReportes/controladores/controladorSyncInternos.php?source=4",
                 data:"source="+session.token,
                 
                 success:function(server)
                 {
                      $.each(server,function(k,v){
                          window.db.transaction(function(txt){
                              txt.executeSql("INSERT INTO jb_dinamic_relation(id ,id_section, fecha, email,type_section) VALUES (\'"+v.id+"\', \'"+v.id_section+"\', \'"+v.fecha+"\', \'"+v.email+"\',0);");                         
                          });  
                      });
                      setTimeout(function(){
                        grupos();
                      },800);
                 },
                 error: function(error){
                    alert(' no success '+error);
                 }
        });
    }, 1000);
}

  //llenamos la tabla de grupos
function grupos(){
   $.ajax({
           type:"POST",
           datatype:"JSON",
           url:"https://www.jarboss.com/mobile/controller/JBGET.php?module=grupos&source=allmygroups",
           data:"movilemp="+session.idempresa+"&moviluser="+session.idUsuario+"&token="+session.token,
         
           success:function(server)
           {     // console.log(server)
              $.each(server,function(k,v){
                    window.db.transaction(function(txt){
                        txt.executeSql("INSERT INTO grupos( nombregrupo, nombres, id, es_privado,type_section) VALUES (\'"+v.nombre+"\', \'"+v.nombre_empresa+"\', \'"+v.id+"\', \'"+v.es_privado+"\',0);");
                    }); 
              }); 
           },
           error: function(){
           //alert(' no success');
           } 
    });
    setTimeout(function(){
      $.ajax({
             type:"POST",
             datatype:"JSON",
             url:"https://www.jarboss.com/mobile/controller/GEX.php",
             data:"id_usuario="+session.idUsuario+"&token="+session.token+"&cnt=0&opt=5",
             
             success:function(server)
             {      
                  $.each(server,function(k,v){
                      window.db.transaction(function(txt){
                            txt.executeSql("INSERT INTO grupos( nombregrupo, nombres, id, es_privado,type_section) VALUES (\'"+v.nombre+"\', \'"+v.nombre_empresa+"\', \'"+v.id+"\', \'"+v.es_privado+"\',1);");
                      }); 
                  }); 
                  setTimeout(function(){
                   // alert('sucursales');
                    sucursales();
                  },900);
             },
             error: function(){
             //alert(' no success');
             } 
      });
    },900);

}

  ///tabla de sucursales
function sucursales(){
    $.ajax({
           type:"POST",
           datatype:"JSON",
           url:"https://www.jarboss.com/Soriana.com/sucursalesJson.php?source=*",
           data:"movilemp="+session.idempresa+"&moviluser="+session.idUsuario+"&source="+session.token,
           
           success:function(server)
           {
              $.each(server,function(k,v){
                  window.db.transaction(function(txt){
                     txt.executeSql("INSERT INTO sucursales( nombre, id) VALUES (\'"+v.nombre+"\', \'"+v.id+"\');");
                  }); 
              });
            },
           error: function(){
           //alert(' no success');
           }
    });
              setTimeout(function(){
                myApp.hidePreloader();
                //alert('termino la carga.');
              },20500);
}

    //al hacer click hacemos la busqueda de los reportes
function sincFinalProces(opt){
  myApp.showPreloader();
    window.db.transaction(function(txt){
       // console.log("SELECT * FROM jb_dinamic_relation where email like\'%"+session.userMail+"%\' and type_section="+opt+";")
        txt.executeSql("SELECT * FROM jb_dinamic_relation where email like\'%"+session.userMail+"%\' and type_section="+opt+";",[],function(txs,resul){
            if (resul.rows.length != 0) {
                for (var i = 0; i < resul.rows.length; i++) {
                    var p = resul.rows.item(i);
                    generaplantillas(p.id_section,p.id,opt);
                }
            }else
            {
               $('#list_plantillas ul').append('<span>Por el momento no tienes asignado ningún reporte, envía un correo a soporte@jarboss.com y con gusto te podemos ayudar.</span>');
                myApp.hidePreloader();
            }
        });
    });
}

  ///removemos attr del btn posicion
function noposition(){
  $("#btnGps").removeAttr('onclick');
  $("#btnGps").removeAttr('style');
  $("#btnGps").attr('onclick','getCurrentPosition();');
}

  /// guardamos las cordenadas gps 
function saveCordenadas(opt,lat,lon)
{
  if (opt == 1) {
    //alert(lat +" "+lon);
      $("#btnGps").removeAttr('onclick');
      $("#btnGps").attr('style','background-color: rgb(223, 223, 223);padding: 0px 7px;');
      //$("#btnGps").attr('onclick','renovarGps();');
      localStorage['jb_reporte_ubicacion'] = lat+'_'+lon;
      backreportesProceso(2);
  }else if (opt == 2) {
    $("#btnGps").removeAttr('style');
    $("#btnGps").removeAttr('onclick');
    $("#btnGps").attr('onclick','getCurrentPosition();');
  }
}

  /// funcion previa para salir del mapa 
function backreportesProceso(opt)
{
  //$('body #linkbackMaps').removeAttr('onclick');
  if (opt ==1) {
      var resp = confirm('Perderá su ubicación. Si no guardó.');
      if (resp) {
          $('#btnGps').show();
          $('#btnPublicar').show();
        $('body #linkbackMaps').attr('href','#reportes-sec');
      };
      setTimeout(function(){
        $('body #linkbackMaps').attr('onclick','backreportesProceso(1)');
      },300);
  }
  else if(opt ==2)
  {
    alert('Ubucación Válida.');
      $('#btnGps').show();
      /*
    $('body #linkbackMaps').removeAttr('href');
    $('body #linkbackMaps').attr('href','#reportes-sec');
    setTimeout(function(){
      $('body #linkbackMaps')[0].click();
      $('#btnGps').show();
      $('#btnPublicar').show();
    },300);*/
  }
}

  /// funcion para volver a renovar posicion gps      
function renovarGps()
{
    $("#btnGps").removeAttr('onclick');
    setTimeout(function(){
      $("#btnGps").attr('onclick','renovarGps();');
    },400);
    var resp = confirm('Desea renovar su ubicación.');
    if (resp) {
      //alert(resp);
      localStorag.removeItem('jb_reporte_ubicacion');
      getCurrentPosition();
    }
}                    
 /// generamos una lista de plantillas  de reportes  
function generaplantillas(id_section,id,opt)
{
    var idsection = id_section.split(',');
    var count=0;
    var counter= 0;
    $.each(idsection,function(k,v){
        if (v != "") {
            window.db.transaction(function(txt2){
                console.log("SELECT * FROM jb_dinamic_section WHERE id=\'"+v+"\' and type_section="+opt+";");
                txt2.executeSql("SELECT * FROM jb_dinamic_section WHERE id=\'"+v+"\' and type_section="+opt+";" ,[],function(txt, results){
                    var lista = [];
                    if (results.rows.length == 1) {
                        count = count + 1;
                        for (var i = 0; i < results.rows.length; i++) {
                            var p = results.rows.item(i);
                            lista.push('<li id="id_plantillas_'+p.id+'" data="'+p.type_section+'" onclick="procesarPlantilla(\''+p.id+'\',\''+p.nombre+'\',0,\''+p.id_empresa+'\')" ><a href="#reportes" class="item-link"><div class="item-content"><div class="item-inner"><div class="item-title">'+p.nombre+'</div></div></div></a></li>');
                        }
                        
                        $("#list_plantillas ul").append(lista);
                        myApp.hidePreloader();
                    }else if (results.rows.length == 0){
                        counter = counter + 1;
                        if (count == idsection.length - 1 ) {
                            myApp.hidePreloader();
                            return false;               
                        }else if (counter == idsection.length - 1) {
                            $('#list_plantillas ul').append('<span>Por el momento no tienes asignado ningún reporte, envía un correo a soporte@jarboss.com y con gusto te podemos ayudar.</span>');
                            myApp.hidePreloader();
                        }
                    }
                });
            });
        }
    });
    myApp.hidePreloader();
} 

function reporInterSow()
{
    $('#reporInert').removeAttr('onclick');
    if (typeof localStorage['repSeccion'] !== 'undefined'){
      localStorage.removeItem('repSeccion');
    }
    localStorage['repSeccion'] = 0;
    $('#list_plantillas ul').empty();
    $('#reporInert').attr('class','seccionReport repActivo');
    $('#reporExt').removeAttr('class','repActivo');
    $('#reporExt').attr('class','seccionReport');
    sincFinalProces(0);
    setTimeout(function(){
               $('#reporInert').attr('onclick','reporInterSow()');
               },1000);
}

function reporExterSow()
{
    $('#reporExt').removeAttr('onclick');
    if (typeof localStorage['repSeccion'] !== 'undefined'){
      localStorage.removeItem('repSeccion');
    }
    localStorage['repSeccion'] = 1;
    $('#list_plantillas ul').empty();
    $('#reporInert').removeAttr('class','repActivo');
    $('#reporInert').attr('class','seccionReport');
    $('#reporExt').attr('class',' seccionReport repActivo');
    sincFinalProces(1);
    setTimeout(function(){
               $('#reporExt').attr('onclick','reporExterSow()');
               },1000);
    
}

function procesarPlantilla(id,nombre,opt,idEmpresa)
{ 
    if (typeof localStorage['nombrePlantilla_activa'] !== 'undefined') {
        localStorage.removeItem('nombrePlantilla_activa');
    }
    localStorage['nombrePlantilla_activa'] = nombre;
    $("body #jb_list_plantillas").empty();
    
    if (opt == 1) {
        eliminaReporte(localStorage['idreporte']);
    }

  
    window.db.transaction(function(txt){
      txt.executeSql("SELECT nombregrupo, id FROM grupos where type_section='"+localStorage['repSeccion']+"'",[],function(txt, results){
            var forma = '<div id="jb_plantilla_datos" class="list-block"> <ul><li><div class="item-content jbItemContent">'+
            '<!--div class="item-media"><i class="icon icon-form-name"></i></div-->'+
            '<div class="item-inner"><div class="item-input">'+
            '<select id="grup_select"><option>Selecciona un grupo</option>';
            
            for (var i = 0; i < results.rows.length; i++) {
                 var p = results.rows.item(i);
                forma += '<option value="'+p.id+'">'+p.nombregrupo+'</option>'; 
            }

            forma+='</select>'+
            '</div></div></div></li>';
            if (chkreport(id) == 1) {
                forma +=' <li><div class="item-content jbItemContent">'+
                '<!--div class="item-media"><i class="icon icon-form-name"></i></div-->'+
                '<div class="item-inner"><div class="item-input">'+
                '<input type="text" placeholder="Buscar Sucursal" onkeyup="busquedaSucursal(this.value,1)" id="nom_sucursal">'+
                '<div id="sucursal_list" style="display:none;"></div></div></div></div></li>';
            }

            forma +='</ul>'+  
            '<div class="content-block"><a href="#reportes-sec" id="ligaSegReport" >'+
            '<input type="button" value="Guardar" class="button button-big button-fill color-azul" onclick="procesar_plantilla(\''+id+'\',\''+idEmpresa+'\');"></a></div>'+
            '</div>';
            $("#jb_list_plantillas").append(forma);
      }); 
    });
}

////verificamos los rpeortes
function chkreport(id)
{
  // proveedores 550c369486341,5511c6c9df153,5511c689cb71d,5511c6ffc7ca1,552e945c25a42,552e942d23045,5511c6278f8b7,5511bff0421e2
  // soriana 54c6a304089e5 , 54c69428d66ed , 54d0f0268afc6 , 54d0fcd0f1f23 , 5575d1d30c78f
 var r ="";
  switch(id)
  {
    case '550c369486341':
    case '5511c6c9df153':
    case '5511c689cb71d':
    case '5511c6ffc7ca1':
    case '552e942d23045':
    case '552e945c25a42':
    case '54c6a304089e5':
    case '54c69428d66ed':
    case '54d0f0268afc6':
    case '54d0fcd0f1f23':
    case '5575d1d30c78f':
    case '5511c6278f8b7':
    case '5511bff0421e2':
    case '5511c69e6c022':
    case '5511c6e9509ea':
    case '5511c714e375e':
    case '55c8e16bd1ccf18':
    case '5575d1d30c78f':
    case '55c8e16bd1ccf19':
       r = true;
    break;
    default:
       r = false;
      break;

  }
  return r;   

}


//muestra una lista de sucursales disponibles
function busquedaSucursal(search,opt)
{
  var sear = $.trim(search);
  if( sear == ""){
    $("#sucursal_list").hide();
    $("#sucursales").remove();
  }
  if(sear !='')
  { 
    if (sear.length > 1) {
      $("#sucursal_list").show();
      $("body #sucursales ul").empty();
      window.db.transaction(function(txt){
        txt.executeSql("SELECT * FROM sucursales WHERE nombre like \'%"+search+"%\' limit 7",[],function(txt, results){
            for (var i = 0; i < results.rows.length; i++) {
                 var p = results.rows.item(i);
                if ($("#sucursal_list #sucursales ul").length == 0) {
                    var html = '<div id="sucursales" class="list-sucursales"><ul></ul></div>';
                    $("#sucursal_list").append(html);
                }
                var htmli = '<li id=sucursal_activa_'+p.id+' onclick="grups_selected(\''+p.id+'\',\''+p.nombre+'\');">'+p.nombre+'</li>';
                $("#sucursal_list #sucursales ul").append(htmli);
            }
        });
      });
    }
  }
}


//funcion para la seleccion de una sucursal y asiganarla ala caja de text
function grups_selected(id,nombre)
{
  $('#sucursal_list').empty();
  $('#sucursal_list').hide();
  $('#nom_sucursal').val(nombre);
  $('#nom_sucursal').attr('value',id);
}

//funcion para  trabajar un reporte que se va generar guardarlo pro primera vez o proseguir trabajando
function procesar_plantilla(idPlantilla,idEmpresa)
{  //console.log(idPlantilla+" "+idEmpresa);
  if (typeof localStorage['idPlantilla_activa'] === 'undefined' && typeof localStorage['idEmpresa'] === 'undefined') {
    localStorage['idPlantilla_activa'] = idPlantilla;
    localStorage['idEmpresa'] = idEmpresa;
  }
  $('#tit_report_sec').empty();
  $('#tit_report_sec').append(''+localStorage['nombrePlantilla_activa']+'');

  if( typeof localStorage['idreporte'] !== "undefined" && localStorage['idreporte'] != "" ) {
    listreport();
    $('body #btnGps').show();
    $('body #btnPublicar').show();
    $('body #imgProfile').attr('onclick','backtodoor(1);');
   //console.log('si definido'+localStorage['idreporte']);
  }else{
      $('body #btnGps').show();
      $('body #btnPublicar').show();
      $('body #imgProfile').attr('onclick','backtodoor(1);');
       localStorage['idPlantilla_activa'] = idPlantilla;
      localStorage['idEmpresa'] = idEmpresa;
       var id_suc = $("#nom_sucursal").attr('value');
       var id_grp = $('#grup_select').val();
       var nom_suc;
      if ($('#nom_sucursal').is(':visible')) {
          nom_suc = $('#nom_sucursal').val();
          if (nom_suc=='') {
            var notsucu=1;
          }else
          {
            var notsucu=0
          }
      }else
      {
        nom_suc = "";
        var notsucu=0;
      }

      if (id_grp != 'Selecciona un grupo' && notsucu == 0) {
          $('#ligaSegReport').attr('href','#reportes-sec');
          var status=0;
          var fecha = genFecha();
          var id = genera_id();
          var resultado=0;

          if (typeof localStorage['idreporte'] === "undefined") {
            var  idrepor = 0;
          }else { 
            var idrepor = localStorage['idreporte'];
          }

          window.db.transaction(function(txt){
              txt.executeSql("SELECT nombre FROM reporte_mantenimiento where id=\'"+idrepor+"\'",[],function(txt, results){
                  if (results.rows.length != 1) {
                       txt.executeSql("INSERT INTO reporte_mantenimiento(status,resultado,nombre,id_usuario,id_grupo,id_plantilla,id,fecha) VALUES(\'"+status+"\',\'"+resultado+"\',\'"+nom_suc+"\',\'"+session.idUsuario+"\',\'"+id_grp+"\',\'"+localStorage['idPlantilla_activa']+"\',\'"+id+"\',\'"+fecha+"\');");
                  }
              });
          });
          $('#tit_report_sec').empty();
          localStorage['idreporte']=id;
          localStorage['nomsucursal']=nom_suc;
          localStorage['idGrupo']= id_grp;
          listreport();   
      }else
      {
        alert('Captura lo adecuado.');
        $('#ligaSegReport').removeAttr('href');
      }
  }
}

/// funcion genera id al azar  de letras y num

function genera_id(){
  var text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var ids="";
  for(var i = 0; i < 15; i++)
  {
    ids += text.charAt(Math.floor(Math.random() * text.length));
  }
    return ids;
}

//generamos la fecha 
function genFecha(){
    var fecha = new Date();
    var dia = fecha.getDate();
    if (dia < 10) { dia = '0'+dia;}
    var mes = fecha.getMonth()+1;
    if (mes < 10) { mes = '0'+mes;}
    var year = fecha.getFullYear();
    var hora = fecha.getHours();
    var min = fecha.getMinutes();
    var seg = fecha.getSeconds();
    var fechaOk = year+'-'+mes+'-'+dia+' '+hora+':'+min+':'+seg;
    return fechaOk;
}

//buscamos los tipos de reportes ha procesar
function listreport()
{ 
    $('#reinReport').attr('onclick','regresaReport()');
    $('#reinReport').removeAttr('href');
    $("#list_report_sec ul").empty();
    // $('#tool_report').append('<div class="toolbar-inner"><a href="#" class="link">ubicacion</a><a href="#" class="link">publicar</a></div>');
   // console.log("SELECT * FROM jb_dinamic_tables WHERE id_section=\'"+localStorage['idPlantilla_activa']+"\' and status='1' and type_section="+localStorage['repSeccion']+" order by position ASC ")
    window.db.transaction(function(txt2){
        txt2.executeSql("SELECT * FROM jb_dinamic_tables WHERE id_section=\'"+localStorage['idPlantilla_activa']+"\' and status='1' and type_section="+localStorage['repSeccion']+" order by position ASC ",[],function(txt, results){
              for (var i = 0; i < results.rows.length; i++) {
                  var p = results.rows.item(i);
                  //console.log(p);
                  console.log(p.id+' '+p.nombre+' '+p.tipo);
                  switch(p.tipo)
                  {
                    case '2':
                    case '12':
                    case '15':
                    case '47':
                      /*reportes con selec al inicio y opciones ocultas dependiendo*/
                        genReportLi(p.nombre,p.id,'genReportDos');
                    break;
                    case '5':
                      /* reportes con porcentajes ycalculos*/
                        genReportLi(p.nombre,p.id,'genReportAlterPorcent');
                    break; 
                    case '13':
                      /* reporte de checkin y checkout */
                        genReportLi(p.nombre,p.id,'genReportAlterno');
                    break;
                    case '14':
                      /* reporte de checkin y checkout */
                        genReportLi(p.nombre,p.id,'genReportAsistencias');
                    break;
                    case '19':
                        /*los reportes con qr*/
                        genReportLi(p.nombre,p.id,'genReportAlterQr');
                    break; 
                    case '38':
                      /* reporte de checkin y checkout */
                        genReportLi(p.nombre,p.id,'genReportTurnos');
                    break;
                    case '53':
                      /* reportes que no se repite */
                          genReportLi(p.nombre,p.id,'genReportNoRepet');
                    break;
                    case '54':
                      /*reportes que se repiten los guardados*/
                          genReportLi(p.nombre,p.id,'genReportRepet');
                    break;
                    default:
                        /* entran muy bien el 1,6,7,8,9 ,11,17 ,45,46*/
                        genReportLi(p.nombre,p.id,'genReport');
                    break;
                  }
              }
        });
    });
}

function regresaReport()
{
  $('#reinReport').removeAttr('onclick');
  var resp = confirm('Se eliminarán los datos');
  if (resp) {
      var resp2 = confirm('¿Estás seguro que deseas eliminar este reporte?');
       if (resp2) {
            procesarPlantilla('\''+localStorage['idPlantilla_activa']+'\',\''+localStorage['nombrePlantilla_activa'] +'\',1');
            eliminaReporte(localStorage['idreporte']);
            saveCordenadas(2);
            $('body #btnGps').hide();
            $('body #btnPublicar').hide();
            $('#reinReport').attr('href','#');
      }else{
        $('#reinReport').attr('onclick','regresaReport()');
      }
  }
  else{
      $('#reinReport').attr('onclick','regresaReport()');
    }
}

///generamos el pre reporte segun el caso dos
/*function genReportAlterno(nombre,id)
{
  $("#list_report_sec ul").append('<li id="id_reporte_'+id+'" onclick="capturaEntradaSalida(\''+id+'\',\''+nombre+'\')" data="0" ><a  class="item-link">'+
                        '<div class="item-content" style="padding-left:0;"><div class="item-inner" style="padding-left:10px;">'+
                        '<div class="item-title jbPoint">'+nombre+'</div><span id="reportProceso_'+id+'"  class="jbSpanPen" >pendiente</span></div>'+
                        '</div></a></li>');
  verificaReporte(id);
} 
*/

function genReportLi(nombre,id,opcion)
{
  switch(opcion)
  {
    case 'genReportTurnos':
    var accion = 'onclick="capturaInfoTurnos(\''+id+'\',\''+nombre+'\')"';
    var liga = 'href="#option-repo"';
    break;
    case  'genReportNoRepet' :
    var accion ='onclick="capReportNoRepet(\''+id+'\',\''+nombre+'\')"';
    var liga = 'href="#option-repo"';
    break;
     case 'genReportRepet':
    var accion ='onclick="capReportRepet(\''+id+'\',\''+nombre+'\',2)"';
    var liga = 'href="#option-repo"';
    break;
     case 'genReportAsistencias':
    var accion ='onclick="capturaInfoAsistencia(\''+id+'\',\''+nombre+'\')"';
    var liga = '';
    break;
     case 'genReportAlterPorcent':
    var accion ='onclick="capturaInfoPorcent(\''+id+'\',\''+nombre+'\')"';
    var liga = 'href="#option-repo"';
    break;
     case 'genReportAlterQr':
    var accion ='onclick="capturaInfoQr(\''+id+'\',\''+nombre+'\')"';
    var liga = 'href="#option-repo"';
    break;
     case 'genReportAlterno':
    var accion ='onclick="capturaEntradaSalida(\''+id+'\',\''+nombre+'\')"';
    var liga = '';
    break;
     case 'genReportDos':
    var accion ='onclick="capturaInfoDos(\''+id+'\',\''+nombre+'\')"';
    var liga = 'href="#option-repo"';
    break;
     case 'genReport':
    var accion ='onclick="capturaInfo(\''+id+'\',\''+nombre+'\')"';
    var liga = 'href="#option-repo"';
    break;
  }

  $("#list_report_sec ul").append('<li id="id_reporte_'+id+'" '+accion+' data="0" ><a '+liga+' class="item-link">'+
                        '<div class="item-content" style="padding-left:0;"><div class="item-inner" style="padding-left:10px;">'+
                        '<div class="item-title jbPoint">'+nombre+'</div><span id="reportProceso_'+id+'"  class="jbSpanPen" >pendiente</span></div>'+
                        '</div></a></li>');

  $('#btnEndReportes').attr('onclick','pre_save_reportes(0,0)');
  verificaReporte(id);
}
//hacemos la cpatura de datos para guardarlos en la db
function capturaEntradaSalida(id,nombre)
{
      if (typeof localStorage['jb_reporte_ubicacion'] === 'undefined') {
          myApp.alert('guarda primero tu ubicación');
          $('#id_reporte_'+id).removeAttr('onclick');
          setTimeout(function(){
              $('#id_reporte_'+id).attr('onclick',"capturaEntradaSalida(\'"+id+"\',\'"+nombre+"\')");
          },1000);
      }else{
          //$('#id_reporte_'+id+' a').attr('href',"#option-repo");
          var id_row    = genera_id();
          localStorage['idtabla']   = id;
          localStorage['nomRepor']  =nombre;
          var idPlantilla = localStorage['idPlantilla_activa'];
          var id_repor    = localStorage['idreporte'];
          var fecha       = genFecha();
          var status_row  = 1;

           window.db.transaction(function(txt2){
              txt2.executeSql("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC",[],function(txt, results){
                var np=0;
                for (var i = 0; i < results.rows.length; i++) {
                      var rp = results.rows.item(i);
                      //onsole.log(rp);
                      var id2 = genera_id();
                      if (rp.position == 0) {
                        np += RegistroAlterno(status_row,rp.id_table,id_repor,id_row,rp.id,id2,fecha,localStorage['jb_reporte_ubicacion'],rp.position,rp.content_type); 
                      }else if (rp.position == 1) {
                        np += RegistroAlterno(status_row,rp.id_table,id_repor,id_row,rp.id,id2,fecha,fecha,rp.position,rp.content_type); 
                      }
                }
                console.log(np);
                //np=np-1;
                if(np == results.rows.length){
                  txt2.executeSql("INSERT into item_listview(nombre,status) VALUES(\'"+nombre+"\','2');");
                    console.log('son iguales aqui lo demas')
                    myApp.alert('Validando..');
                    setTimeout(function(){
                        $('#id_reporte_'+id).removeAttr('data').attr('data','2');  
                        $('#reportProceso_'+id).empty();
                        $('#reportProceso_'+id).append('Terminado');
                        $('#reportProceso_'+id).removeAttr('style');
                        $('#reportProceso_'+id).attr('style','color:rgb(48, 150, 48);');
                        $('#id_reporte_'+id).removeAttr('onclick');
                        $('#id_reporte_'+id).attr('onclick','visualisaRepor(\''+id_repor+'\',\''+nombre+'\',\''+id+'\',0)');
                        $('#id_reporte_'+id+' a').attr('href','#vistaRepor');
                    },800);
                }
              });
          });
      }  
}

///generamos  unregistro alterno para los chekin chekot
function RegistroAlterno(status_row,id_table,id_repor,id_row,res,id,fecha,conten,position,tipoData)
{   
    var cont =1;
    //console.log(status_row+" "+id_table+" "+id_repor+" "+id_row+" "+res+" "+id+" "+fecha+" "+conten+" "+position+" "+tipoData);
    window.db.transaction(function(txt){
      txt.executeSql("INSERT INTO jb_dinamic_tables_rows(status,id_table,id_reporte,id_row,id_column,id,fecha,contenido,position,tipo) VALUES (\'"+status_row+"\', \'"+id_table+"\', \'"+id_repor+"\', \'"+id_row+"\', \'"+res+"\', \'"+id+"\',\'"+fecha+"\',\'"+conten+"\',\'"+position+"\',"+tipoData+");");
    });
    return cont;
}

///generamos la plantilla con los cmapos a rellenar llamando las funciones 
function capturaInfo(id,nombre)
{
    //myApp.showPreloader('Cargando...');
    $('#opReport').removeAttr('href');
    $('body #btnGps').hide();
    $('body #btnPublicar').hide();
    $('#tit_option_repo').empty();
    $('#tit_option_repo').append(nombre);
    $('#op_report_sec ul').empty();
    $('#listVistaReporEdit ul').empty();
    localStorage['id_row'] = genera_id();
    localStorage['idtabla'] = id;
    localStorage['nomRepor']=nombre;
    verificaReporte(id,1)
    //showpreloader2();
    $('#seccionprincipal #jb_fotos_galery').show();
  
    window.db.transaction(function(txt2){
        //console.log("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC");
        txt2.executeSql("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC",[],function(txt, results){
            var lista_gen= [];
            for (var i = 0; i < results.rows.length; i++) {
                  var p = results.rows.item(i);
                  //console.log(p);
                 //console.log(p.id+" "+p.nombre+" " +p.position+" "+p.content_type);
                  switch(p.id){
                    case '558336d8a7a78':
                    case '5581ad144a90e':
                    case '558336d8a6560':
                    case '558336d8a7c1b':
                    case '558336d8a71ab':
                    case '558336d8a5e71':
                    case '558336d8a6e25':
                    case '558336d8a63a4':
                    case '558336d8a61e4':
                    case '558336d8a68df':
                    case '558336d8a7703':
                    case '558336d8a671e':
                    case '558336d8a6037':
                    case '558336d8a6aa3':
                    case '558336d8a6c66':
                    case '558336d8a7537':
                    case '558336d8a7375':
                    case '558336d8a6fe8':
                    case '55e4a5ea603a7':
                    case '55e4b83df1ee2':
                    case '55e4c32608bb2':
                    case '55e4c433be373':
                    case '55e4c5a25438e':
                          var nombre = p.nombre.split('___');
                          var listDivs= [];
                          for (var f = 0; f < nombre.length; f++) {
                              if (nombre[f]!="") {
                                  listDivs.push(genContOptionReport(nombre[f],p.id,f));
                              }
                          }
                          //console.log($('#showAlert div').length +" == "+ nombre.length);
                           if ($('#showAlert div').length == 0 ) {
                              $('#showAlert').append(listDivs);
                              console.log('sigue entrando');
                           }
                          var conListDiv='<div id="optListNum_99">Selecciona un Equipo/instalación</div>';;
                          var list = genOptionReport(conListDiv,p.id,p.content_type,p.id_table,i,p.position);
                    break;
                    default:
                                       //console.log(p.nombre,p.id,p.content_type,p.id_table,i,p.position);
                        var list = genOptionReport(p.nombre,p.id,p.content_type,p.id_table,i,p.position);
                    break;

                  }
                  
                //localStorage['listado_generada']=[];
                
                  lista_gen.push(list);     
                 if (p.position == 0 && p.content_type == 3 ) {
                        var idrowk = p.id;
                          console.log("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+" and row.id not in(select id from item it where it.id=row.id)ORDER BY row.position ASC;");
                      txt2.executeSql("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\'  and row.id not in(select id from item it where it.id=row.id) ORDER BY row.position ASC;",[],function(txt2, results2){          
                            //console.log(results2.rows.length +" "+idrowk+" "+p.id);
                            if (results2.rows.length == 0) {
                                console.log('#id_reporte_form_'+idrowk+' se oculto =---------');
                                $('#id_reporte_form_'+idrowk).hide();
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes(1,0,\'capturaInfo\')');
                            }else{ 
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes('+results2.rows.length+',0,\'capturaInfo\')');
                              for (var rw = 0; rw < results2.rows.length; rw++) {
                                  var r = results2.rows.item(rw);
                                  // console.log(r.contenido);
                                  genConOptionReport(r.contenido,r.id_column,r.id,rw);
                                  if ( $('.optListNum_'+rw).length == 1) {
                                      $('#optListNum_'+rw).removeAttr('class');
                                      $('#optListNum_'+rw).removeAttr('id').attr('id','optListNum_'+r.id);

                                  }
                              }   
                            }
                      });
                 }else if(p.position == 0 && p.content_type != 3){
                  //console.log(p.id+" es el segundo else if")
                      $('#btnEndReportes').removeAttr('onclick');
                      $('#btnEndReportes').attr('onclick','pre_save_reportes(1,0,,\'capturaInfo\')');
                      txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\'",[],function(txt2, results2){
                          for (var i = 0; i < results2.rows.length; i++) {
                              var r = results2.rows.item(i);
                              // console.log("segundo id->"+r);
                              genConOptionReport(r.contenido,r.id_column,r.id,i);    
                          }
                      });
                 } else{
                  //console.log(p.id+" es el ultimo else ")
                    //console.log("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\'");
                    txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\'",[],function(txt2, results2){
                            for (var i = 0; i < results2.rows.length; i++) {
                                var r = results2.rows.item(i);
                                //console.log(r);
                                genConOptionReport(r.contenido,r.id_column,r.id,i);   
                            }
                    });
                 }
            }
            var empresa = session.empresa.toLowerCase();
            if (empresa == "seguridadsps.com.mx" || empresa == "seguridadconfiable.com" || empresa == "magna.com") {
                var listQr = '<li id="id_reporte_form_qr47" data="0" data-type="0">'+
                    '<div class="item-inner" style="display:block;">'+
                    '<input type="button" class="button" value="Código Qr" onclick="qrChkReport();"/></li>';
                    lista_gen.push(listQr);
            }
                $('#op_report_sec ul').append(lista_gen);
                //$('.jbContentBlock').hide();
                var ids = ['55afdd95ed46e','5511ab1987721','5511ab19ed1b3','5511ab1a8f105','5511c967331a6','5511c9673320f','5511c96733274','5511c96733f6e','55afdd95ed4dd','55afd7c723923','55afd7e013437','55afdd95ecdaa','55afdd95ece16','55afdd95ecf5d','55afdd95ecfc9','55afdd95ed10d','55afdd95ed178','55afdd95ed2bc','55afdd95ed329','556f31ba3527b','54fe5f349ca76','54fe5f4978939','55772c6af15b3','556f32328a78a','55772c814c5f5','556f324b4467a','55772c8adb165','556f3287a2025','55772cbc29412','556f32cccbdd3','55772cc4ab103','556f361379dd5','55772cccb6382','556f3645b7b83','55772cd5c2d98','53fd0b17eaf39','5511c96733ddc','5511c96733e40','5511c96733d77','559d33d11e24c','559d33d2003f2','559d33e4b5886','559d342a5295a','559d342b8e7d0','559d342cba659','559d346f21860','559d346f23e37','559d346fa3847','559d3d8110eef','559d3d827977b','559d3d835f921','53fd0e475fdc8','53fd0e475ff79','53fd0e47600fb','53fd0e4760258','545d0c4ded301','545d0c2c736b2','53fd0b17eb19b','53fd0b17eb385','53fd0b17eb538','545d0c4ded1cc','545d0c2c7354d','53fd0d7ab5658','53fd0d7ab57dd','53fd0d7ab594e','53fd0d7ab5abd','545d0c4ded269','545d0c2c735ff','545d0c2c73323','53fd13a76b0be','53fd13a76b26d','53fd13a76b406','545d0c4ded09f','53fd13a76b5b9','545d0c2c733de','53fd0a5e6cddc','53fd115815bde','53fd115815d2f','53fd115815e6c','53fd115815faf','545d0c4ded398','545d0c2c73766','53fd2033ba442','53fd2033ba584','545d0c4deced9','545d0c2c731df','53fd0a5e6d0e8','53fd21a81e2a6','545d0c4decf71','545d0c2c73279','53fd1a1a8c54a','53fd1a1a8c70e','53fd1a1a8c8af','53fd1a1a8ca1c','545d0c4ded008','53fd0a5e6cf72','5511c96733b81','5511c96733be6','5511c96733c4d','5511c9673397d','5511c967339e2','5511c96733a4c','5511c96733787','5511c967337ee','5511c96733853','5511c96733592','5511c967335f3','5511c96733657','5511c967333a1','5511c9673340b','5511c9673346f','552e95ff838b2','552e9600f26af','552e9600f2540','552e952218ee9','552e95241b680','552e95252b0d1','5511c96733fd3','5511c96734036','559d33577669d','559d335890fa3','559d335a40a32','559d2b7e9fd02','559d2b80213f7','559d2b8ce4cb5','559d2c9f99764','559d2ca093d0e','559d2ca209204','559d2f57854fd','559d2f5876061','559d2f5a82c1e','559d2fac6c54a','559d2fad3bfac','559d2fae5452a','559d313c3db39','559d313d0e8db','559d313e6c818','559d3280b3bcc','559d32815656c','559d32828ddf7','559d33079187d','559d330855ff9','559d33098ec73','559d33577669d','559d335890fa3','559d335a40a32'];
                $.each(ids, function(k,v){
                    if ($('#id_reporte_form_'+v).length != 0) {
                      $('#id_reporte_form_'+v).hide();
                      //console.log($('#id_reporte_'+v));
                    }
                });
                //console.log(lista_gen);
        });
    });

}

function capturaInfoDos(id,nombre)
{
   $('#opReport').removeAttr('href');
    $('body #btnGps').hide();
    $('body #btnPublicar').hide();
    $('#tit_option_repo').empty();
    $('#tit_option_repo').append(nombre);
    $('#op_report_sec ul').empty();
    $('#listVistaReporEdit ul').empty();
    localStorage['id_row'] = genera_id();
    localStorage['idtabla'] = id;
    localStorage['nomRepor']=nombre;
    verificaReporte(id,1)
    //showpreloader2();
    $('#seccionprincipal #jb_fotos_galery').show();
  
    window.db.transaction(function(txt2){
        //console.log("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC");
        txt2.executeSql("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC",[],function(txt, results){
            var lista_gen= [];
              
            for (var i = 0; i < results.rows.length; i++) {
                  var p = results.rows.item(i);
                  //console.log(p.nombre,p.id,p.content_type,p.id_table,i,p.position);
                  var list = genOptionReport47(p.nombre,p.id,p.content_type,p.id_table,i,p.position);
                  lista_gen.push(list);     
                 if (p.position == 0 && p.content_type == 3 ) {
                        var idrowk = p.id;
                         //console.log("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\'  and row.id not in(select id from item it where it.id=row.id)ORDER BY row.position ASC;");
                      txt2.executeSql("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\' and row.id not in(select id from item it where it.id=row.id) ORDER BY row.position ASC;",[],function(txt2, results2){          
                            if (results2.rows.length == 0) {
                                //console.log('#id_reporte_form_'+idrowk);
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes(1,0,\'capturaInfoDos\')');
                            }else{ 
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes('+results2.rows.length+',0,\'capturaInfoDos\')');
                              for (var rw = 0; rw < results2.rows.length; rw++) {
                                  var r = results2.rows.item(rw);
                                  // console.log(r.contenido);
                                  genConOptionReport(r.contenido,r.id_column,r.id,rw);
                                  if ( $('.optListNum_'+rw).length == 1) {
                                      $('#optListNum_'+rw).removeAttr('class');
                                      $('#optListNum_'+rw).removeAttr('id').attr('id','optListNum_'+r.id);

                                  }
                              }   
                            }
                      });
                 }else{
                  //console.log(p.id+" es el ultimo else ")
                     txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\' ",[],function(txt2, results2){
                            for (var i = 0; i < results2.rows.length; i++) {
                                var r = results2.rows.item(i);
                                //console.log(r);
                                genConOptionReport(r.contenido,r.id_column,r.id,i);   
                            }
                    });
                 }
            }
            var empresa = session.empresa.toLowerCase();
            if (empresa == "seguridadsps.com.mx" || empresa == "seguridadconfiable.com" || empresa == "magna.com") {
                var listQr = '<li id="id_reporte_form_qr47" data="0" data-type="0">'+
                    '<div class="item-inner" style="display:block;">'+
                    '<input type="button" class="button" value="Código Qr" onclick="qrChkReport();"/></li>';
                    lista_gen.push(listQr);
            }
                  //console.log(lista_gen);
                $('#op_report_sec ul').append(lista_gen);
              /*
                var listado = $('[id^=id_reporte_form_]');
                $.each(listado,function(){
                      var position = $(this).attr('data');
                      if (position >1) {
                        $(this).hide();
                      }
                })*/
        });
    });
}

function capturaInfoQr(id,nombre)
{
    if (typeof localStorage['jb_reporte_ubicacion'] === 'undefined') {
        $('#id_reporte_'+id+' a').removeAttr('href');
        myApp.alert('Registra tu posicion');
    }else{
      $('#id_reporte_'+id+' a').attr('href','#option-repo');
    

    $('#opReport').removeAttr('href');
    $('body #btnGps').hide();
    $('body #btnPublicar').hide();
    $('#tit_option_repo').empty();
    $('#tit_option_repo').append(nombre);
    $('#op_report_sec ul').empty();
    $('#listVistaReporEdit ul').empty();
    localStorage['id_row'] = genera_id();
    localStorage['idtabla'] = id;
    localStorage['nomRepor']=nombre;
    verificaReporte(id,1)
    //showpreloader2();
    $('#seccionprincipal #jb_fotos_galery').show();
  
    window.db.transaction(function(txt2){
        // console.log("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC");
        txt2.executeSql("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC",[],function(txt, results){
            var lista_gen= [];
            for (var i = 0; i < results.rows.length; i++) {
                  var p = results.rows.item(i);
                  //console.log(p);
                  //console.log(p.id+" "+p.nombre+" " +p.position+" "+p.content_type);
                  switch(p.id){
                    case '558336d8a7a78':
                    break;
                    default:
                  //      console.log(p.nombre,p.id,p.content_type,p.id_table,i);
                        var list = genOptionReportQr(p.nombre,p.id,p.content_type,p.id_table,i);
                    break;

                  }
                
                  lista_gen.push(list);     
                 if (p.position == 0 && p.content_type == 3 ) {
                        var idrowk = p.id;
                         // console.log("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+" and row.id not in(select id from item it where it.id=row.id)ORDER BY row.position ASC;");
                      txt2.executeSql("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+" and row.id not in(select id from item it where it.id=row.id) ORDER BY row.position ASC;",[],function(txt2, results2){          
                            //console.log(results2.rows.length +" "+idrowk+" "+p.id);
                            if (results2.rows.length == 0) {
                                //console.log('#id_reporte_form_'+idrowk);
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes(1,0,\'capturaInfoQr\')');
                            }else{ 
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes('+results2.rows.length+',0,\'capturaInfoQr\')');
                              for (var rw = 0; rw < results2.rows.length; rw++) {
                                  var r = results2.rows.item(rw);
                                  // console.log(r.contenido);
                                  genConOptionReport(r.contenido,r.id_column,r.id,rw);
                                  if ( $('.optListNum_'+rw).length == 1) {
                                      $('#optListNum_'+rw).removeAttr('class');
                                      $('#optListNum_'+rw).removeAttr('id').attr('id','optListNum_'+r.id);

                                  }
                              }   
                            }
                      });
                 }else if(p.position == 0 && p.content_type != 3){
                  //console.log(p.id+" es el segundo else if")
                      $('#btnEndReportes').removeAttr('onclick');
                      $('#btnEndReportes').attr('onclick','pre_save_reportes(1,0,\'capturaInfoQr\')');
                      txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+"",[],function(txt2, results2){
                          for (var i = 0; i < results2.rows.length; i++) {
                              var r = results2.rows.item(i);
                              // console.log("segundo id->"+r);
                              genConOptionReport(r.contenido,r.id_column,r.id,i);    
                          }
                      });
                 }else{
                  //console.log(p.id+" es el ultimo else ")
                    //console.log("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\'");
                    txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+"",[],function(txt2, results2){
                            for (var i = 0; i < results2.rows.length; i++) {
                                var r = results2.rows.item(i);
                                //console.log(r);
                                genConOptionReport(r.contenido,r.id_column,r.id,i);   
                            }
                    });
                 }
            }
            var empresa = session.empresa.toLowerCase();
            if (empresa == "seguridadsps.com.mx" || empresa == "seguridadconfiable.com" || empresa == "magna.com") {
                var listQr = '<li id="id_reporte_form_qr47" data="0" data-type="0">'+
                    '<div class="item-inner" style="display:block;">'+
                    '<input type="button" class="button" value="Código Qr" onclick="qrChkReport();"/></li>';
                    lista_gen.push(listQr);
            }
                $('#op_report_sec ul').append(lista_gen);

                var ids = ['55b65ec0b1dd9','55b65ec223cba'];
                $.each(ids, function(k,v){
                    if ($('#id_reporte_form_'+v).length != 0) {
                      $('#id_reporte_form_'+v).hide();
                    }
                });
        });
    });
  }
}

function capturaInfoPorcent(id,nombre)
{
  //myApp.showPreloader('Cargando...');
    $('#opReport').removeAttr('href');
    $('body #btnGps').hide();
    $('body #btnPublicar').hide();
    $('#tit_option_repo').empty();
    $('#tit_option_repo').append(nombre);
    $('#op_report_sec ul').empty();
    $('#listVistaReporEdit ul').empty();
    localStorage['id_row'] = genera_id();
    localStorage['idtabla'] = id;
    localStorage['nomRepor']=nombre;
    verificaReporte(id,1)
    //showpreloader2();
    $('#seccionprincipal #jb_fotos_galery').show();
  
    window.db.transaction(function(txt2){
        //console.log("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC");
        txt2.executeSql("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC",[],function(txt, results){
            var lista_gen= [];
            for (var i = 0; i < results.rows.length; i++) {
                  var p = results.rows.item(i);
                  //console.log(p.id+" "+p.nombre+" " +p.position+" "+p.content_type);
                    //console.log(p.nombre,p.id,p.content_type,p.id_table,i);
                  var list = genContOptionReportPorcent(p.nombre,p.id,p.content_type,p.id_table,i,p.position);
                
                  lista_gen.push(list);     
                 if (p.position == 0 && p.content_type == 3 ) {
                        var idrowk = p.id;
                         // console.log("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+" and row.id not in(select id from item it where it.id=row.id)ORDER BY row.position ASC;");
                      txt2.executeSql("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+" and row.id not in(select id from item it where it.id=row.id) ORDER BY row.position ASC;",[],function(txt2, results2){          
                            //console.log(results2.rows.length +" "+idrowk+" "+p.id);
                            if (results2.rows.length == 0) {
                                //console.log('#id_reporte_form_'+idrowk);
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes(1,0,\'capturaInfoPorcent\')');
                            }else{ 
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes('+results2.rows.length+',0,\'capturaInfoPorcent\')');
                              for (var rw = 0; rw < results2.rows.length; rw++) {
                                  var r = results2.rows.item(rw);
                                  // console.log(r.contenido);
                                  genConOptionReport(r.contenido,r.id_column,r.id,rw);
                                  if ( $('.optListNum_'+rw).length == 1) {
                                      $('#optListNum_'+rw).removeAttr('class');
                                      $('#optListNum_'+rw).removeAttr('id').attr('id','optListNum_'+r.id);

                                  }
                              }   
                            }
                      });
                 }else if(p.position == 0 && p.content_type != 3){
                  //console.log(p.id+" es el segundo else if")
                      $('#btnEndReportes').removeAttr('onclick');
                      $('#btnEndReportes').attr('onclick','pre_save_reportes(1,0,\'capturaInfoPorcent\')');
                      txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+"",[],function(txt2, results2){
                          for (var i = 0; i < results2.rows.length; i++) {
                              var r = results2.rows.item(i);
                              // console.log("segundo id->"+r);
                              genConOptionReport(r.contenido,r.id_column,r.id,i);    
                          }
                      });
                 } else{
                  //console.log(p.id+" es el ultimo else ")
                    //console.log("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\'");
                    txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+"",[],function(txt2, results2){
                            for (var i = 0; i < results2.rows.length; i++) {
                                var r = results2.rows.item(i);
                                //console.log(r);
                                genConOptionReport(r.contenido,r.id_column,r.id,i);   
                            }
                    });
                 }
            }
            var empresa = session.empresa.toLowerCase();
            if (empresa == "seguridadsps.com.mx" || empresa == "seguridadconfiable.com" || empresa == "magna.com") {
                var listQr = '<li id="id_reporte_form_qr47" data="0" data-type="0">'+
                    '<div class="item-inner" style="display:block;">'+
                    '<input type="button" class="button" value="Código Qr" onclick="qrChkReport();"/></li>';
                    lista_gen.push(listQr);
            }
                $('#op_report_sec ul').append(lista_gen);
                //$('.jbContentBlock').hide();
                var ids = ['55afdd95ed46e','5511ab1987721','5511ab19ed1b3', '5511ab1a8f105','5511c967331a6','5511c9673320f','5511c96733274','5511c96733f6e','55afdd95ed4dd','55afd7c723923','55afd7e013437','55afdd95ecdaa','55afdd95ece16','55afdd95ecf5d','55afdd95ecfc9','55afdd95ed10d','55afdd95ed178','55afdd95ed2bc','55afdd95ed329','556f31ba3527b','54fe5f349ca76','54fe5f4978939','55772c6af15b3','556f32328a78a','55772c814c5f5','556f324b4467a','55772c8adb165','556f3287a2025','55772cbc29412','556f32cccbdd3','55772cc4ab103','556f361379dd5','55772cccb6382','556f3645b7b83','55772cd5c2d98','53fd0b17eaf39','5511c96733ddc','5511c96733e40','5511c96733d77','559d33d11e24c','559d33d2003f2','559d33e4b5886','559d342a5295a','559d342b8e7d0','559d342cba659','559d346f21860','559d346f23e37','559d346fa3847','559d3d8110eef','559d3d827977b','559d3d835f921','53fd0e475fdc8','53fd0e475ff79','53fd0e47600fb','53fd0e4760258','545d0c4ded301','545d0c2c736b2','53fd0b17eb19b','53fd0b17eb385','53fd0b17eb538','545d0c4ded1cc','545d0c2c7354d','53fd0d7ab5658','53fd0d7ab57dd','53fd0d7ab594e','53fd0d7ab5abd','545d0c4ded269','545d0c2c735ff','545d0c2c73323','53fd13a76b0be','53fd13a76b26d','53fd13a76b406','545d0c4ded09f','53fd13a76b5b9','545d0c2c733de','53fd115815bde','53fd115815d2f','53fd115815e6c','53fd115815faf','545d0c4ded398','545d0c2c73766','53fd2033ba442','53fd2033ba584','545d0c4deced9','545d0c2c731df','53fd21a81e2a6','545d0c4decf71','545d0c2c73279','53fd1a1a8c54a','53fd1a1a8c70e','53fd1a1a8c8af','53fd1a1a8ca1c','545d0c4ded008','5511c96733b81','5511c96733be6','5511c96733c4d','5511c9673397d','5511c967339e2','5511c96733a4c','5511c96733787','5511c967337ee','5511c96733853','5511c96733592','5511c967335f3','5511c96733657','5511c967333a1','5511c9673340b','5511c9673346f','552e95ff838b2','552e9600f26af','552e9600f2540','552e952218ee9','552e95241b680','552e95252b0d1','5511c96733fd3','5511c96734036','559d33577669d','559d335890fa3','559d335a40a32','559d2b7e9fd02','559d2b80213f7','559d2b8ce4cb5','559d2c9f99764','559d2ca093d0e','559d2ca209204','559d2f57854fd','559d2f5876061','559d2f5a82c1e','559d2fac6c54a','559d2fad3bfac','559d2fae5452a','559d313c3db39','559d313d0e8db','559d313e6c818','559d3280b3bcc','559d32815656c','559d32828ddf7','559d33079187d','559d330855ff9','559d33098ec73','559d33577669d','559d335890fa3','559d335a40a32'];
                $.each(ids, function(k,v){
                    if ($('#id_reporte_form_'+v).length != 0) {
                      $('#id_reporte_form_'+v).hide();
                      //console.log($('#id_reporte_'+v));
                    }
                });
                //console.log(lista_gen);
        });
    });
}

function capturaInfoAsistencia(id,nombre)
{
    $('#opReport').removeAttr('href');
    $('body #btnGps').hide();
    $('body #btnPublicar').hide();
    $('#tit_option_repo').empty();
    $('#tit_option_repo').append(nombre);
    $('#op_report_sec ul').empty();
    $('#listVistaReporEdit ul').empty();
    localStorage['id_row'] = genera_id();
    localStorage['idtabla'] = id;
    localStorage['nomRepor']=nombre;
    verificaReporte(id,1)
    //showpreloader2();
    $('#seccionprincipal #jb_fotos_galery').show();
  
    window.db.transaction(function(txt2){
        //console.log("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC");
        txt2.executeSql("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC",[],function(txt, results){
            var lista_gen= [];
            for (var i = 0; i < results.rows.length; i++) {
                  var p = results.rows.item(i);
                        //console.log(p.nombre,p.content_type,i,p.position);
                        var list = genOptionReportAsistencia(p.nombre,p.id,p.content_type,p.id_table,i,p.position);
                  //console.log(list);
                  lista_gen.push(list);     
                
                 if (i == 0 && p.content_type == 3 ) {
                        var idrowk = p.id;
                         // console.log("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+" and row.id not in(select id from item it where it.id=row.id)ORDER BY row.position ASC;");
                      txt2.executeSql("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+" and row.id not in(select id from item it where it.id=row.id) ORDER BY row.position ASC;",[],function(txt2, results2){          
                            //console.log(results2.rows.length +" "+idrowk+" "+p.id);
                          
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes('+results2.rows.length+',0,\'capturaInfoAsistencia\')');
                              for (var rw = 0; rw < results2.rows.length; rw++) {
                                  var r = results2.rows.item(rw);
                                   //console.log(r.contenido);
                                  //genConOptionReport(r.contenido,r.id_column,r.id,rw);
                                  if ( $('.optListNum_'+rw).length == 1) {
                                      $('#optListNum_'+rw).removeAttr('class');
                                      $('#optListNum_'+rw).removeAttr('id').attr('id','optListNum_'+r.id);

                                  }
                              }   
                      });
                 }else if(i == 0 && p.content_type != 3){
                  //console.log(p.id+" es el segundo else if")
                      $('#btnEndReportes').removeAttr('onclick');
                      $('#btnEndReportes').attr('onclick','pre_save_reportes(1,0,\'capturaInfoAsistencia\')');
                      txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+"",[],function(txt2, results2){
                          for (var i = 0; i < results2.rows.length; i++) {
                              var r = results2.rows.item(i);
                               console.log("segundo id->"+r);
                              genConOptionReport(r.contenido,r.id_column,r.id,i);    
                          }
                      });
                 } else{
                  //console.log(p.id+" es el ultimo else ")
                    //console.log("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\'");
                    txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+"",[],function(txt2, results2){
                            for (var i = 0; i < results2.rows.length; i++) {
                                var r = results2.rows.item(i);
                                //console.log(r);
                                genConOptionReport(r.contenido,r.id_column,r.id,i);   
                            }
                    });
                 }
            }
            var empresa = session.empresa.toLowerCase();
            if (empresa == "seguridadsps.com.mx" || empresa == "seguridadconfiable.com" || empresa == "magna.com") {
                var listQr = '<li id="id_reporte_form_qr47" data="0" data-type="0">'+
                    '<div class="item-inner" style="display:block;">'+
                    '<input type="button" class="button" value="Código Qr" onclick="qrChkReport();"/></li>';
                    lista_gen.push(listQr);
            }
                $('#op_report_sec ul').append(lista_gen);
                //$('.jbContentBlock').hide();
                var ids = ['55afdd95ed46e','5511ab1987721','5511ab19ed1b3','5511ab1a8f105','5511c967331a6','5511c9673320f','5511c96733274','5511c96733f6e','55afdd95ed4dd','55afd7c723923','55afd7e013437','55afdd95ecdaa','55afdd95ece16','55afdd95ecf5d','55afdd95ecfc9','55afdd95ed10d','55afdd95ed178','55afdd95ed2bc','55afdd95ed329','556f31ba3527b','54fe5f349ca76','54fe5f4978939','55772c6af15b3','556f32328a78a','55772c814c5f5','556f324b4467a','55772c8adb165','556f3287a2025','55772cbc29412','556f32cccbdd3','55772cc4ab103','556f361379dd5','55772cccb6382','556f3645b7b83','55772cd5c2d98','53fd0b17eaf39','5511c96733ddc','5511c96733e40','5511c96733d77','559d33d11e24c','559d33d2003f2','559d33e4b5886','559d342a5295a','559d342b8e7d0','559d342cba659','559d346f21860','559d346f23e37','559d346fa3847','559d3d8110eef','559d3d827977b','559d3d835f921','53fd0e475fdc8','53fd0e475ff79','53fd0e47600fb','53fd0e4760258','545d0c4ded301','545d0c2c736b2','53fd0b17eb19b','53fd0b17eb385','53fd0b17eb538','545d0c4ded1cc','545d0c2c7354d','53fd0d7ab5658','53fd0d7ab57dd','53fd0d7ab594e','53fd0d7ab5abd','545d0c4ded269','545d0c2c735ff','545d0c2c73323','53fd13a76b0be','53fd13a76b26d','53fd13a76b406','545d0c4ded09f','53fd13a76b5b9','545d0c2c733de','53fd0a5e6cddc','53fd115815bde','53fd115815d2f','53fd115815e6c','53fd115815faf','545d0c4ded398','545d0c2c73766','53fd2033ba442','53fd2033ba584','545d0c4deced9','545d0c2c731df','53fd0a5e6d0e8','53fd21a81e2a6','545d0c4decf71','545d0c2c73279','53fd1a1a8c54a','53fd1a1a8c70e','53fd1a1a8c8af','53fd1a1a8ca1c','545d0c4ded008','53fd0a5e6cf72','5511c96733b81','5511c96733be6','5511c96733c4d','5511c9673397d','5511c967339e2','5511c96733a4c','5511c96733787','5511c967337ee','5511c96733853','5511c96733592','5511c967335f3','5511c96733657','5511c967333a1','5511c9673340b','5511c9673346f','552e95ff838b2','552e9600f26af','552e9600f2540','552e952218ee9','552e95241b680','552e95252b0d1','5511c96733fd3','5511c96734036','559d33577669d','559d335890fa3','559d335a40a32','559d2b7e9fd02','559d2b80213f7','559d2b8ce4cb5','559d2c9f99764','559d2ca093d0e','559d2ca209204','559d2f57854fd','559d2f5876061','559d2f5a82c1e','559d2fac6c54a','559d2fad3bfac','559d2fae5452a','559d313c3db39','559d313d0e8db','559d313e6c818','559d3280b3bcc','559d32815656c','559d32828ddf7','559d33079187d','559d330855ff9','559d33098ec73','559d33577669d','559d335890fa3','559d335a40a32'];
                $.each(ids, function(k,v){
                    if ($('#id_reporte_form_'+v).length != 0) {
                      $('#id_reporte_form_'+v).hide();
                      //console.log($('#id_reporte_'+v));
                    }
                });
                //console.log(lista_gen);
        });
    });
}

function capturaInfoTurnos(id,nombre)
{
    $('#opReport').removeAttr('href');
    $('body #btnGps').hide();
    $('body #btnPublicar').hide();
    $('#tit_option_repo').empty();
    $('#tit_option_repo').append(nombre);
    $('#op_report_sec ul').empty();
    $('#listVistaReporEdit ul').empty();
    localStorage['id_row'] = genera_id();
    localStorage['idtabla'] = id;
    localStorage['nomRepor']=nombre;
    verificaReporte(id,1)
    $('#seccionprincipal #jb_fotos_galery').show();
  
    window.db.transaction(function(txt2){
        //console.log("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC");
        txt2.executeSql("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC",[],function(txt, results){
            var lista_gen= [];
            for (var i = 0; i < results.rows.length; i++) {
                  var p = results.rows.item(i);
                  //console.log(p);                 
                 //console.log(p.nombre,p.id,p.content_type,i,p.position);
                  var list = genOptionReportAsistencia(p.nombre,p.id,p.content_type,p.id_table,i,p.position);
                 
                  lista_gen.push(list);     
                 if (p.position == 0 && p.content_type == 3 ) {
                        var idrowk = p.id;
                         // console.log("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+" and row.id not in(select id from item it where it.id=row.id)ORDER BY row.position ASC;");
                      txt2.executeSql("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+" and row.id not in(select id from item it where it.id=row.id) ORDER BY row.position ASC;",[],function(txt2, results2){          
                            if (results2.rows.length == 0) {
                                //console.log('#id_reporte_form_'+idrowk);
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes(1,0,\'capturaInfo\')');
                            }else{ 
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes('+results2.rows.length+',0,\'capturaInfo\')');
                              for (var rw = 0; rw < results2.rows.length; rw++) {
                                  var r = results2.rows.item(rw);
                                  // console.log(r.contenido);
                                  genConOptionReport(r.contenido,r.id_column,r.id,rw);
                                  if ( $('.optListNum_'+rw).length == 1) {
                                      $('#optListNum_'+rw).removeAttr('class');
                                      $('#optListNum_'+rw).removeAttr('id').attr('id','optListNum_'+r.id);

                                  }
                              }   
                            }
                      });
                 }else if(p.position == 0 && p.content_type != 3){
                  //console.log(p.id+" es el segundo else if")
                      $('#btnEndReportes').removeAttr('onclick');
                      $('#btnEndReportes').attr('onclick','pre_save_reportes(1,0,,\'capturaInfo\')');
                      txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+"",[],function(txt2, results2){
                          for (var i = 0; i < results2.rows.length; i++) {
                              var r = results2.rows.item(i);
                              // console.log("segundo id->"+r);
                              genConOptionReport(r.contenido,r.id_column,r.id,i);    
                          }
                      });
                 }else if(p.position == 14 && p.content_type == 3)
                 {
                    txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+"",[],function(txt2, results2){
                            for (var i = 0; i < results2.rows.length; i++) {
                                var r = results2.rows.item(i);
                                console.log(r);
                                genConOptionReportTurnos(r.contenido,r.id_column,r.id,i);   
                            }
                    });
                 }else{
                  //console.log(p.id+" es el ultimo else ")
                    //console.log("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\'");
                    txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\' and type_section="+localStorage['repSeccion']+"",[],function(txt2, results2){
                            for (var i = 0; i < results2.rows.length; i++) {
                                var r = results2.rows.item(i);
                                //console.log(r);
                                genConOptionReport(r.contenido,r.id_column,r.id,i);   
                            }
                    });
                 }
            }
            var empresa = session.empresa.toLowerCase();
            if (empresa == "seguridadsps.com.mx" || empresa == "seguridadconfiable.com" || empresa == "magna.com") {
                var listQr = '<li id="id_reporte_form_qr47" data="0" data-type="0">'+
                    '<div class="item-inner" style="display:block;">'+
                    '<input type="button" class="button" value="Código Qr" onclick="qrChkReport();"/></li>';
                    lista_gen.push(listQr);
            }
                $('#op_report_sec ul').append(lista_gen);
               
        });
    });
}

///si opt = 2 ses repete si es opt =1 nomas entra una vez
function capReportRepet(id,nombre,opt)
{ console.log('datos que llegan->'+id+" "+nombre+" "+opt);
    $('#opReport').removeAttr('href');
    $('body #btnGps').hide();
    $('body #btnPublicar').hide();
    $('#tit_option_repo').empty();
    $('#tit_option_repo').append(nombre);
    $('#op_report_sec ul').empty();
    $('#listVistaReporEdit ul').empty();
    localStorage['id_row'] = genera_id();
    localStorage['idtabla'] = id;
    localStorage['nomRepor']=nombre;
    verificaReporte(id,1)
    //showpreloader2();
    $('#seccionprincipal #jb_fotos_galery').show();
  
    window.db.transaction(function(txt2){
        //console.log("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC");
        txt2.executeSql("SELECT nombre,id,position,content_type,id_table,status FROM jb_dinamic_tables_columns WHERE id_table=\'"+id+"\' and type_section="+localStorage['repSeccion']+" ORDER BY position ASC",[],function(txt, results){
            var lista_gen= [];
              
            for (var i = 0; i < results.rows.length; i++) {
                  var p = results.rows.item(i);
                  //console.log(p.nombre,p.id,p.content_type,p.id_table,i,p.position);
                  var list = genOptionReport47(p.nombre,p.id,p.content_type,p.id_table,i,p.position);
                  lista_gen.push(list);     
                 if (p.position == 0 && p.content_type == 1 ) {
                        //var idrowk = p.id;
                         //console.log("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\'  and row.id not in(select id from item it where it.id=row.id)ORDER BY row.position ASC;");
                      txt2.executeSql("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\' and row.id not in(select id from item it where it.id=row.id) ORDER BY row.position ASC;",[],function(txt2, results2){          
                            if (results2.rows.length == 0) {
                                console.log(results2.rows.length);
                                //console.log('#id_reporte_form_'+idrowk);
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes('+opt+',0,\'capReportRepet\')');
                             
                            }
                      });
                 }else if( p.position == 0 && p.content_type ==3)
                 {
                      console.log("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\'  and row.id not in(select id from item it where it.id=row.id)ORDER BY row.position ASC;");
                      txt2.executeSql("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+p.id+"\' and row.id not in(select id from item it where it.id=row.id) ORDER BY row.position ASC;",[],function(txt2, results2){          
                                console.log(results2.rows.length);
                            if (results2.rows.length > 0) {
                                for (var i = 0; i < results2.rows.length; i++) {
                                  var r = results2.rows.item(i);
                                  //console.log(r);
                                  genConOptionReport(r.contenido,r.id_column,r.id,i);   
                                }
                                //console.log('#id_reporte_form_'+idrowk);
                                $('#btnEndReportes').removeAttr('onclick');
                                $('#btnEndReportes').attr('onclick','pre_save_reportes('+results2.rows.length+',0,\'capReportRepet\')');
                             
                            }
                      });
                 }
                 else{
                  //console.log(p.id+" es el ultimo else ")
                     txt2.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\' ",[],function(txt2, results2){
                            for (var i = 0; i < results2.rows.length; i++) {
                                var r = results2.rows.item(i);
                                //console.log(r);
                                genConOptionReport(r.contenido,r.id_column,r.id,i);   
                            }
                    });
                 }
            }
            var empresa = session.empresa.toLowerCase();
            if (empresa == "seguridadsps.com.mx" || empresa == "seguridadconfiable.com" || empresa == "magna.com") {
                var listQr = '<li id="id_reporte_form_qr47" data="0" data-type="0">'+
                    '<div class="item-inner" style="display:block;">'+
                    '<input type="button" class="button" value="Código Qr" onclick="qrChkReport();"/></li>';
                    lista_gen.push(listQr);
            }
                  //console.log(lista_gen);
                $('#op_report_sec ul').append(lista_gen);
              /*
                var listado = $('[id^=id_reporte_form_]');
                $.each(listado,function(){
                      var position = $(this).attr('data');
                      if (position >1) {
                        $(this).hide();
                      }
                })*/
        });
    });

}


function capReportNoRepet(id,nombre)
{
    capReportRepet(id,nombre,1);
}

//generamos el formulario la estructura de los li
function genOptionReport(nombre,id,tipo,id_table,position,pocision)
{ 
    //console.log(tipo+" "+id);
    var tip = "";
    var tipesp='';
    switch(tipo){
        case '1' :
          switch(id)
          { 
          case '54ff114b54e15':
          var accion = 'onkeyup="calculaOcupacion(this.value);"';
          break;
          default:
          var accion='';
          break;
          }

          tip= '<div style="width:100%;"><input type="text" id="respReport_'+id+'" '+accion+' class="jbSelect" placeholder="Escriba"></div>';
        break;
        case '2': 
              switch(id)
              {
                case '559ad52febe79':
                case '559ad53094514':
                case '559ad5312e0c5':
                case '559ad531c0182':
                case '559ad5325e676':
                case '559ad532efdaf':
                case '559ad53399ab5':
                case '559ad5345175e':
                case '559ad534e64c8':
                case '559ad53580bd9':
                case '559ad536521d1':
                case '559ad53709454':
                case '559ad537a90ff':
                case '559ad53862d0c':
                case '559ad5392b167':
                  var func = 'onclick="valSiNo(\''+id+'\',1);"';
                  var func2 = 'onclick="valSiNo(\''+id+'\',2);"';
                  var style='style="display:block;"';
                  var clasbnt1 = 'class="button button-fill color-blue"';
                  var clasbnt2 = 'class="button button-fill color-gray"';
                break;
                case '558336d8a7a78':
                case '5581ad144a90e':
                case '558336d8a6560':
                case '558336d8a7c1b':
                case '558336d8a71ab':
                case '558336d8a5e71':
                case '558336d8a6e25':
                case '558336d8a63a4':
                case '558336d8a61e4':
                case '558336d8a68df':
                case '558336d8a7703':
                case '558336d8a671e':
                case '558336d8a6037':
                case '558336d8a6aa3':
                case '558336d8a6c66':
                case '558336d8a7537':
                case '558336d8a7375':
                case '558336d8a6fe8':
                case '55e4a5ea603a7':
                case '55e4b83df1ee2':
                case '55e4c32608bb2':
                case '55e4c433be373':
                case '55e4c5a25438e':
                    var func = 'onclick="showRowsInvert(1,\''+id+'\');"';
                    var func2 = 'onclick="showRowsInvert(2,\''+id+'\');"';
                    var style='style="display:none;"';
                    var clasbnt1 = 'class="button button-fill color-gray"';
                    var clasbnt2 = 'class="button button-fill color-blue"';
                break;
                default:
                    var func = 'onclick="showRows(1,\''+id+'\');"';
                    var func2 = 'onclick="showRows(2,\''+id+'\');"';
                    var style='style="display:block;"';
                    var clasbnt1 = 'class="button button-fill color-blue"';
                    var clasbnt2 = 'class="button button-fill color-gray"';
                break;
              }
              
          tip = '<input  type="text" id="respReport_'+id+'" class="respSiNo" style="display:none;" value="no"><div class="conten-block jbContentBlock" '+style+'><div class="row"><div class="col-100 jbBtnBlock"><input type="button" value="NO" id="btn1" '+func+' '+clasbnt1+'></div><div class="col-100 jbBtnBlock"><input type="button" value="SI" id="btn2" '+func2+' '+clasbnt2+'></div></div></div>';
        break;
        case '3' : 
              switch(id)
              {
                case '5511abc517086':
                case '53fd07ab6863d':
                case '556f4118d399a':
                case '55142ceba27a6':
                case '5511e3468fbfd':
                case '5511e3468f80d':
                case '5511e3468f41e':
                case '55142ceba37f5':
                case '5511e3468ec2d':
                case '5511e3468e7bf':
                case '5511e3468e3c4':
                case '552e97b2dbff8':
                case '552e9cb6da079':
                case '53fd0456efe5b':
                case '53fcfee5e19a6':
                case '53fcfd563df53':
                case '54c6adc415339':
                case '54c6c0ed3ef2f':
                case '54c6c1014efde':
                case '54c6c11725e82':
                case '54c6c12166898':
                  var option = 'onchange="verificaselec(this.value);"';
                break;
                case '558336d8a7a0f':
                case '5581ad1332ac7':
                case '558336d8a64f1':
                case '558336d8a7bb2':
                case '558336d8a7136':
                case '558336d8a5dc0':
                case '558336d8a6db0':
                case '558336d8a6332':
                case '558336d8a6174':
                case '558336d8a6868':
                case '558336d8a768e':
                case '558336d8a66ab':
                case '558336d8a5fcd':
                case '558336d8a6a2c':
                case '558336d8a6bf6':
                case '558336d8a74c2':
                case '558336d8a7303':
                case '558336d8a74c2':
                case '55e4a5e13ee18':
                case '55e4b83c27e1a':
                case '55e4c2a52d11e':
                case '55e4c42e7f393':
                case '55e4c59d9a0eb':
                      var option = 'onchange="optionSelect(this.id);"';
                break;
                default:
                  var option ='';
                break;
              }
         
          tip = '<div style="width:100%" ><select id="respReport_'+id+'" class="jbSelect" '+option+'><option>Selecciona una opción</option></select></div>';
        break;
        case '4':
          tip = '<div style="width:100%;"><textarea type="text" id="respReport_'+id+'" placeholder="Escribe una nota/observación"></textarea></div>';
        break;
        case '9': 
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        case '5':
          tip = '<label style="width:100%;" class="label-checkbox item-content"><input type="checkbox" id="respReport_'+id+'" value="0" onclick="habilita(this.id);"><div class="item-media"><i class="icon icon-form-checkbox"></i> </div></label>';
        break;
        case '6':
          tip = '<div style="width:100%;"><input type="number" class="jbSelect" id="respReport_'+id+'" placeholder="Escriba"></div>';
        break;
        case '7':
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        case '8':
          tip="nada";
        break;
        /// case '10'  no_firma_disponible.jpg
        case '10':
            //tip= 
            var forma   ='<div style="display:none;" id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'" ></div><div style="width:100%;"><input type="hidden" class="jbSelect" id="respReport_'+id+'" value="firma_'+localStorage['id_row'].toLowerCase()+'.png" ></div>'
                        +' <form method="post" action="" class="sigPad">'
                        +'      <ul class="sigNav">'
                        +'        <li class="drawIt"><a href="#draw-it" >Firma en el Cuadro</a></li>'
                        +'        <li class="clearButton"><a href="#clear">Limpiar</a></li>'
                        +'      </ul>'
                        +'      <div class="sig sigWrapper" style="width: 300px;  height: 115px;  overflow: hidden;">'
                        +'        <div class="typed"></div>'
                        +'        <canvas class="pad" style="width: 100%;  background-color: #fff;"></canvas>'
                        +'        <input type="hidden" name="output" id="jsonfirma_'+id+'" class="output">'
                        +'      </div>'
                        +'    </form>';
                        $('#jb_firma').empty();
                        $('#jb_firma').append(forma);
                        $(".sigPad").signaturePad({drawOnly:true});
          //'<div style="width:100%;"><span>La actividad de firmar no esta disponible por el momento, pero no te preocupes puedes continuar con tu reporte sin contratiempos.</span><input type="hidden" value="no_firma_disponible.jpg" id="respReport_'+id+'"></div>';
          break;
          case '11':
            tip= '<div style="width:100%;"><input type="text" id="respReport_'+id+'" value="'+session.nombreUser+'" disabled></div>';
          break;
        default :
          tip = tipo;
        break;
    }
    
    if (nombre == 'Reactivo ...') {
      nombre = 'Nota';
    }
    if ( id =='551c6389cc9c4'|| id=='551c638a7a89d' ||id == '53fd115815d2f' || id == '53fd115815e6c' || id == '53fd115815d2f' || id == '53fd115815e6c' || id == '53fd2033ba2cd'|| id == '53fd2033ba442'|| id == '53fd21a81df89' || id =='53fd21a81e0cb' || id == '53fd1a1a8c70e' || id=='53fd1a1a8c8af' || id == '53fd13a76b26d' || id =='53fd13a76b406' || id =='53fd0b17eb19b' || id == '53fd0b17eb385'|| id =='53fd0d7ab57dd' || id =='53fd0d7ab594e' || id=='53fd0e475ff79' || id =='53fd0e47600fb' || id == '53fd0a5e6d0e8' || id =='53fd0a5e6cf72' || id == '53fd0a5e6d0e8') {
      tip = '<div style="width:100%;"><input type="number" class="jbSelect" id="respReport_'+id+'" placeholder="Escriba"></div>';
    };
    if (tipo != 10) {
      if (id =='555f51bf00259') {
        position = position -1;
      }
      var lista = '<li id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'" data-position="'+pocision+'">'+
                  '<div class="item-inner" style="display:block;">'+
                  '<div class="item-title jbCapPhoto"  id="campReport_'+id+'">'+nombre+'</div>'+tip+'</div></li>';
    }
    return lista;

    //acomodamos la posicion de la foto
    if (id == '552e9cc2baff5') {
          var foto = $('#id_reporte_form_'+id);
          $('#id_reporte_form_'+id).remove();
          setTimeout(function(){
              $('#op_report_sec ul').append(foto);
          },500);
    }
      
    var ids = ['55afdd95ed46e','5511ab1987721','5511ab19ed1b3', '5511ab1a8f105','5511c967331a6','5511c9673320f','5511c96733274','5511c96733f6e','55afdd95ed4dd','55afd7c723923','55afd7e013437','55afdd95ecdaa','55afdd95ece16','55afdd95ecf5d','55afdd95ecfc9','55afdd95ed10d','55afdd95ed178','55afdd95ed2bc','55afdd95ed329','556f31ba3527b','54fe5f349ca76','54fe5f4978939','55772c6af15b3','556f32328a78a','55772c814c5f5','556f324b4467a','55772c8adb165','556f3287a2025','55772cbc29412','556f32cccbdd3','55772cc4ab103','556f361379dd5','55772cccb6382','556f3645b7b83','55772cd5c2d98','53fd0b17eaf39','5511c96733ddc','5511c96733e40','5511c96733d77','559d33d11e24c','559d33d2003f2','559d33e4b5886','559d342a5295a','559d342b8e7d0','559d342cba659','559d346f21860','559d346f23e37','559d346fa3847','559d3d8110eef','559d3d827977b','559d3d835f921','53fd0e475fdc8','53fd0e475ff79','53fd0e47600fb','53fd0e4760258','545d0c4ded301','545d0c2c736b2','53fd0b17eb19b','53fd0b17eb385','53fd0b17eb538','545d0c4ded1cc','545d0c2c7354d','53fd0d7ab5658','53fd0d7ab57dd','53fd0d7ab594e','53fd0d7ab5abd','545d0c4ded269','545d0c2c735ff','545d0c2c73323','53fd13a76b0be','53fd13a76b26d','53fd13a76b406','545d0c4ded09f','53fd13a76b5b9','545d0c2c733de','53fd0a5e6cddc','53fd115815bde','53fd115815d2f','53fd115815e6c','53fd115815faf','545d0c4ded398','545d0c2c73766','53fd2033ba442','53fd2033ba584','545d0c4deced9','545d0c2c731df','53fd0a5e6d0e8','53fd21a81e2a6','545d0c4decf71','545d0c2c73279','53fd1a1a8c54a','53fd1a1a8c70e','53fd1a1a8c8af','53fd1a1a8ca1c','545d0c4ded008','53fd0a5e6cf72','5511c96733b81','5511c96733be6','5511c96733c4d','5511c9673397d','5511c967339e2','5511c96733a4c','5511c96733787','5511c967337ee','5511c96733853','5511c96733592','5511c967335f3','5511c96733657','5511c967333a1','5511c9673340b','5511c9673346f','552e95ff838b2','552e9600f26af','552e9600f2540','552e952218ee9','552e95241b680','552e95252b0d1','5511c96733fd3','5511c96734036','559d33577669d','559d335890fa3','559d335a40a32','559d2b7e9fd02','559d2b80213f7','559d2b8ce4cb5','559d2c9f99764','559d2ca093d0e','559d2ca209204','559d2f57854fd','559d2f5876061','559d2f5a82c1e','559d2fac6c54a','559d2fad3bfac','559d2fae5452a','559d313c3db39','559d313d0e8db','559d313e6c818','559d3280b3bcc','559d32815656c','559d32828ddf7','559d33079187d','559d330855ff9','559d33098ec73','559d33577669d','559d335890fa3','559d335a40a32'];
    $.each(ids, function(k,v){
        if ($('#id_reporte_form_'+v).length != 0) {
          $('#id_reporte_form_'+v).hide();
          //console.log($('#id_reporte_'+v));
        }
    });
}

function genOptionReportQr(nombre,id,tipo,id_table,position)
{
    var tip = "",tipesp = '';
    switch(tipo){
        case '1' :
            switch(id)
            {
              case '55b65ec0b1dd9':
                tip= '<div class="jbInputText"><input type="text" id="respReport_'+id+'"  class="jbSelect" placeholder="Distancia" disabled></div>';
              break;  
              default: 
                tip= '<div style="width:100%;"><input type="text" id="respReport_'+id+'"  class="jbSelect" placeholder="Escriba"></div>';
              break;
            }
        break;
        case '2': 
              switch(id)
              {
                case '559ad52febe79':
                    var func = 'onclick="valSiNo(\''+id+'\',1);"';
                    var func2 = 'onclick="valSiNo(\''+id+'\',2);"';
                    var style='style="display:block;"';
                break;
                case '55b65ec223cba':
                     tip = '<div class="jbInputText"><input  type="text" id="respReport_'+id+'" class="respSiNo" value="no" disabled></div>';
                break;
                default:
                    //var func = 'onclick="showRows(1,\''+id+'\');"';
                    //var func2 = 'onclick="showRows(2,\''+id+'\');"';
                    //var style='style="display:block;"';
                    tip = '<input  type="text" id="respReport_'+id+'" class="respSiNo" style="display:none;" value="no"><div class="conten-block jbContentBlock" '+style+'><div class="row"><div class="col-100 jbBtnBlock"><input type="button" value="NO" id="btn1" '+func+' class="button button-fill color-blue"></div><div class="col-100 jbBtnBlock"><input type="button" value="SI" id="btn2" '+func2+' class="button button-fill color-gray"></div></div></div>';
                break;
              }
              
        break;
        case '3' : 
              switch(id)
              {
                case '5511abc517086':
                  var option = 'onchange="verificaselec(this.value);"';
                break;
                case '558336d8a7a0f':
                      var option = 'onchange="optionSelect(this.id);"';
                break;
                default:
                  var option ='';
                break;
              }
         
          tip = '<div style="width:100%" ><select id="respReport_'+id+'" class="jbSelect" '+option+'><option>Selecciona una opción</option></select></div>';
        break;
        case '4':
          tip = '<div style="width:100%;"><textarea type="text" id="respReport_'+id+'" placeholder="Escribe una nota/observación"></textarea></div>';
        break;
        case '9': 
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        case '5':
          tip = '<label style="width:100%;" class="label-checkbox item-content"><input type="checkbox" id="respReport_'+id+'" value="0" onclick="habilita(this.id);"><div class="item-media"><i class="icon icon-form-checkbox"></i> </div></label>';
        break;
        case '6':
          tip = '<div style="width:100%;"><input type="number" class="jbSelect" id="respReport_'+id+'" placeholder="Escriba"></div>';
        break;
        case '7':
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        case '9':
          tip="nada";
        break;
        /// case '10'  no_firma_disponible.jpg
        case '10':
            //tip= 
            var forma   ='<div style="display:none;" id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'"></div><div style="width:100%;"><input type="hidden" class="jbSelect" id="respReport_'+id+'" value="firma_'+localStorage['id_row'].toLowerCase()+'.png" ></div>'
                        +' <form method="post" action="" class="sigPad">'
                        +'      <ul class="sigNav">'
                        +'        <li class="drawIt"><a href="#draw-it" >Firma en el Cuadro</a></li>'
                        +'        <li class="clearButton"><a href="#clear">Limpiar</a></li>'
                        +'      </ul>'
                        +'      <div class="sig sigWrapper" style="width: 300px;  height: 115px;  overflow: hidden;">'
                        +'        <div class="typed"></div>'
                        +'        <canvas class="pad" style="width: 100%;  background-color: #fff;"></canvas>'
                        +'        <input type="hidden" name="output" id="jsonfirma_'+id+'" class="output">'
                        +'      </div>'
                        +'    </form>';
                        $('#jb_firma').empty();
                        $('#jb_firma').append(forma);
                        $(".sigPad").signaturePad({drawOnly:true});
          break;
        default :
          tip = tipo;
        break;
    }
    
    if (nombre == 'Reactivo ...') {
      nombre = 'Nota';
    }
    if ( id =='551c6389cc9c4'|| id=='551c638a7a89d' ||id == '53fd115815d2f' || id == '53fd115815e6c' || id == '53fd115815d2f' || id == '53fd115815e6c' || id == '53fd2033ba2cd'|| id == '53fd2033ba442'|| id == '53fd21a81df89' || id =='53fd21a81e0cb' || id == '53fd1a1a8c70e' || id=='53fd1a1a8c8af' || id == '53fd13a76b26d' || id =='53fd13a76b406' || id =='53fd0b17eb19b' || id == '53fd0b17eb385'|| id =='53fd0d7ab57dd' || id =='53fd0d7ab594e' || id=='53fd0e475ff79' || id =='53fd0e47600fb' || id == '53fd0a5e6d0e8' || id =='53fd0a5e6cf72' || id == '53fd0a5e6d0e8') {
      tip = '<div style="width:100%;"><input type="number" class="jbSelect" id="respReport_'+id+'" placeholder="Escriba"></div>';
    };
    if (tipo != 10) {
        if (id == '555cad80eaa75') {
          var lista = '<li id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'">'+
                  '<div class="item-inner" style="display:block;">'+
                  '<input type="button" class="button" value="Código Qr" onclick="scan(\''+id+'\');"/></li>'+
                  '<li id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'">'+
                  '<div class="item-inner" style="display:block;">'+
                  '<div class="jbInputText"><input type="text" id="respReport_'+id+'" class="jbSelect" placeholder="Nombre" disabled></div></div></li>';
        }else
        { 
            var lista = '<li id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'">'+
                  '<div class="item-inner" style="display:block;">'+
                  '<div class="item-title jbCapPhoto"  id="campReport_'+id+'">'+nombre+'</div>'+tip+'</div></li>';
        }
    }
    return lista;
}

function genContOptionReportPorcent(nombre,id,tipo,id_table,position,pocision)
{
    var tip = "";
    var tipesp='';
    console.log(pocision+" posisiones");
    switch(tipo){
        case '1' :
          switch(pocision)
          { 
            case 2:
                var func = 'onkeyup="calculaOcupacion(this.value);"';
            break;
            default:
                var func='';
            break;
          }

          tip= '<div style="width:100%;"><input type="number" id="respReport_'+id+'" '+func+' class="jbSelect" placeholder="Escriba"></div>';
        break;
        case '2': 
          tip = '<input  type="text" id="respReport_'+id+'" class="respSiNo" style="display:none;" value="no"><div class="conten-block jbContentBlock" ><div class="row"><div class="col-100 jbBtnBlock"><input type="button" value="NO" id="btn1"  class="button button-fill color-blue"></div><div class="col-100 jbBtnBlock"><input type="button" value="SI" id="btn2"  class="button button-fill color-gray"></div></div></div>';
        break;
        case '3' : 
          tip = '<div style="width:100%" ><select id="respReport_'+id+'" class="jbSelect" ><option>Selecciona una opción</option></select></div>';
        break;
        case '4':
          tip = '<div style="width:100%;"><textarea type="text" id="respReport_'+id+'" placeholder="Escribe una nota/observación"></textarea></div>';
        break;
        case '9': 
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        case '5':
          tip = '<label style="width:100%;" class="label-checkbox item-content"><input type="checkbox" id="respReport_'+id+'" value="0" onclick="habilita(this.id);"><div class="item-media"><i class="icon icon-form-checkbox"></i> </div></label>';
        break;
        case '6':
          tip = '<div style="width:100%;"><input type="number" class="jbSelect" id="respReport_'+id+'" placeholder="Escriba"></div>';
        break;
        case '7':
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        case '9':
          tip="nada";
        break;
        /// case '10'  no_firma_disponible.jpg
        case '10':
            //tip= 
            var forma  =""; 
        break;
        default :
          tip = tipo;
        break;
    }
    
    if (nombre == 'Reactivo ...') {
      nombre = 'Nota';
    }
    if ( id =='551c6389cc9c4'|| id=='551c638a7a89d' ||id == '53fd115815d2f' || id == '53fd115815e6c' || id == '53fd115815d2f' || id == '53fd115815e6c' || id == '53fd2033ba2cd'|| id == '53fd2033ba442'|| id == '53fd21a81df89' || id =='53fd21a81e0cb' || id == '53fd1a1a8c70e' || id=='53fd1a1a8c8af' || id == '53fd13a76b26d' || id =='53fd13a76b406' || id =='53fd0b17eb19b' || id == '53fd0b17eb385'|| id =='53fd0d7ab57dd' || id =='53fd0d7ab594e' || id=='53fd0e475ff79' || id =='53fd0e47600fb' || id == '53fd0a5e6d0e8' || id =='53fd0a5e6cf72' || id == '53fd0a5e6d0e8') {
      tip = '<div style="width:100%;"><input type="number" class="jbSelect" id="respReport_'+id+'" placeholder="Escriba"></div>';
    };
    if (tipo != 10) {
      var lista = '<li id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'" data-position="'+pocision+'">'+
                  '<div class="item-inner" style="display:block;">'+
                  '<div class="item-title jbCapPhoto"  id="campReport_'+id+'">'+nombre+'</div>'+tip+'</div></li>';
    }
    return lista;
    //var listarray = [lista];
    //localStorage['listaArrayElementos'] = localStorage['listaArrayElementos'].push(listarray);
    //console.log(localStorage['listaArrayElementos']);
    //$('#op_report_sec ul').append(listarray);
    //acomodamos la posicion de la foto
    if (id == '552e9cc2baff5') {
          var foto = $('#id_reporte_form_'+id);
          $('#id_reporte_form_'+id).remove();
          setTimeout(function(){
              $('#op_report_sec ul').append(foto);
          },500);
    }
      
}

//generamos el formulario la estructura de los li
function genOptionReport47(nombre,id,tipo,id_table,position,pocision)
{ 
    //console.log(tipo+" "+id);
    var tip = "";
    var tipesp='';
    if (id == '55e4b8b3c425c') {
      tipo = '1';
    }
    switch(tipo){
        case '1' :
          tip= '<div style="width:100%;"><input type="text" id="respReport_'+id+'"  class="jbSelect" placeholder="Escriba"></div>';
        break;
        case '2': 
          var func = 'onclick="valSiNo(\''+id+'\',1);"';
          var func2 = 'onclick="valSiNo(\''+id+'\',2);"';
          var style='style="display:block;"';
          var clasbnt1 = 'class="button button-fill color-blue"';
          var clasbnt2 = 'class="button button-fill color-gray"';
          tip = '<input  type="text" id="respReport_'+id+'" class="respSiNo" style="display:none;" value="no"><div class="conten-block jbContentBlock" '+style+'><div class="row"><div class="col-100 jbBtnBlock"><input type="button" value="NO" id="btn1" '+func+' '+clasbnt1+'></div><div class="col-100 jbBtnBlock"><input type="button" value="SI" id="btn2" '+func2+' '+clasbnt2+'></div></div></div>';
        break;
        case '3' : 
          tip = '<div style="width:100%" ><select id="respReport_'+id+'" class="jbSelect" ><option>Selecciona una opción</option></select></div>';
        break;
        case '4':
          tip = '<div style="width:100%;"><textarea type="text" id="respReport_'+id+'" placeholder="Escribe una nota/observación"></textarea></div>';
        break;
        case '9': 
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        case '5':
          tip = '<label style="width:100%;" class="label-checkbox item-content"><input type="checkbox" id="respReport_'+id+'" value="0" onclick="habilita(this.id);"><div class="item-media"><i class="icon icon-form-checkbox"></i> </div></label>';
        break;
        case '6':
          tip = '<div style="width:100%;"><input type="number" class="jbSelect" id="respReport_'+id+'" placeholder="Escriba"></div>';
        break;
        case '7':
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        case '8':
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        /// case '10'  no_firma_disponible.jpg
        case '10':
            //console.log(position);
            if (position =='1') {
                $('#jb_firma').empty();
                formas = '<div style="display:none;" id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'" ></div><input type="hidden" class="jbSelect" id="respReport_'+id+'" value="croquis_'+localStorage['id_row'].toLowerCase()+'.png" >'
                          +'<input type="hidden" name="output" id="jsonfirma_'+id+'"><a href="#croquisReporte" onclick="drawCroquis(\''+id+'\');"> <div class="botonCroquisjb"><div> <label>Captura el Croquis</label> </div></div></a>';
                $('#jb_firma').append(formas);

            }else
            {

            var forma   ='<div style="display:none;" id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'" ></div><div style="width:100%;"><input type="hidden" class="jbSelect" id="respReport_'+id+'" value="firma_'+localStorage['id_row'].toLowerCase()+'.png" ></div>'
                        +' <form method="post" action="" class="sigPad">'
                        +'      <ul class="sigNav">'
                        +'        <li class="drawIt"><a href="#draw-it" >Firma en el Cuadro</a></li>'
                        +'        <li class="clearButton"><a href="#clear">Limpiar</a></li>'
                        +'      </ul>'
                        +'      <div class="sig sigWrapper" style="width: 300px;  height: 115px;  overflow: hidden;">'
                        +'        <div class="typed"></div>'
                        +'        <canvas class="pad" style="width: 100%;  background-color: #fff;"></canvas>'
                        +'        <input type="hidden" name="output" id="jsonfirma_'+id+'" class="output">'
                        +'      </div>'
                        +'    </form>';
                        $('#jb_firma').empty();
                        $('#jb_firma').append(forma);
                        $(".sigPad").signaturePad({drawOnly:true});
            }
          break;
        default :
          tip = tipo;
        break;
    }
    
    if (nombre == 'Reactivo ...') {
      nombre = 'Nota';
    }
    if ( id =='551c6389cc9c4'|| id=='551c638a7a89d' ||id == '53fd115815d2f' || id == '53fd115815e6c' || id == '53fd115815d2f' || id == '53fd115815e6c' || id == '53fd2033ba2cd'|| id == '53fd2033ba442'|| id == '53fd21a81df89' || id =='53fd21a81e0cb' || id == '53fd1a1a8c70e' || id=='53fd1a1a8c8af' || id == '53fd13a76b26d' || id =='53fd13a76b406' || id =='53fd0b17eb19b' || id == '53fd0b17eb385'|| id =='53fd0d7ab57dd' || id =='53fd0d7ab594e' || id=='53fd0e475ff79' || id =='53fd0e47600fb' || id == '53fd0a5e6d0e8' || id =='53fd0a5e6cf72' || id == '53fd0a5e6d0e8') {
      tip = '<div style="width:100%;"><input type="number" class="jbSelect" id="respReport_'+id+'" placeholder="Escriba"></div>';
    };
    
    if (tipo != 10) {
      if (id =='555f51bf00259' || id == '562a79259474c') {
        position = position -1;
      }
      var lista = '<li id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'" data-position="'+pocision+'">'+
                  '<div class="item-inner" style="display:block;">'+
                  '<div class="item-title jbCapPhoto"  id="campReport_'+id+'">'+nombre+'</div>'+tip+'</div></li>';
    }
    return lista;
      
   
}

function genOptionReportAsistencia(nombre,id,tipo,id_table,position,pocision){
    console.log(tipo+" "+nombre+" "+position+" "+pocision);
    var tip = "";
    var tipesp='';
    if ( tipo == 3 && pocision == 7) {
        tipo = '8';
    }else if (tipo == 3 && pocision == 13) {
      tipo ='11';
    }else if(tipo == 3 && pocision == 14)
    {
      tipo = '12';
    }
    switch(tipo){
        case '1' :
          switch(id)
          { 
          case '54ff114b54e15':
          var accion = 'onkeyup="calculaOcupacion(this.value);"';
          break;
          default:
          var accion='';
          break;
          }

          tip= '<div style="width:100%;"><input type="text" id="respReport_'+id+'" '+accion+' class="jbSelect" placeholder="Escriba"></div>';
        break;
        case '2': 
              
                    var func = 'onclick="showRows(1,\''+id+'\');"';
                    var func2 = 'onclick="showRows(2,\''+id+'\');"';
                    var style='style="display:block;"';
                    var clasbnt1 = 'class="button button-fill color-blue"';
                    var clasbnt2 = 'class="button button-fill color-gray"';
          tip = '<input  type="text" id="respReport_'+id+'" class="respSiNo" style="display:none;" value="no"><div class="conten-block jbContentBlock" '+style+'><div class="row"><div class="col-100 jbBtnBlock"><input type="button" value="NO" id="btn1" '+func+' '+clasbnt1+'></div><div class="col-100 jbBtnBlock"><input type="button" value="SI" id="btn2" '+func2+' '+clasbnt2+'></div></div></div>';
        break;
        case '3' : 
            //var option = 'onchange="verificaselec(this.value);"';
            //var option = 'onchange="optionSelect(this.id);"';   
            var option='';       
          tip = '<div style="width:100%" ><select id="respReport_'+id+'" class="jbSelect" '+option+'><option>Selecciona una opción</option></select></div>';
        break;
        case '4':
          tip = '<div style="width:100%;"><input type="text" id="respReport_'+id+'" placeholder="Escribe una nota/observación"></div>';
        break;
        case '9': 
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        case '5':
          tip = '<label style="width:100%;" class="label-checkbox item-content"><input type="checkbox" id="respReport_'+id+'" value="0" onclick="habilita(this.id);"><div class="item-media"><i class="icon icon-form-checkbox"></i> </div></label>';
        break;
        case '6':
          tip = '<div style="width:100%;"><input type="number" class="jbSelect" id="respReport_'+id+'" placeholder="Escriba"></div>';
        break;
        case '7':
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        case '8':
          tip = '<div style="width:100%;"><input type="text" id="respReportName_'+id+'" onkeyup="shEmpleadosList(this.value,\''+id+'\');" placeholder="Escribe El Nombre"><input type="hidden" id="respReport_'+id+'"  placeholder="Escribe El Nombre"><div class="listEmpledosLayer"><ul id="listEmpleado_'+id+'" class="listEmpleados"></ul></div></div>';
        break;
        case '10':
            var forma   ='<div style="display:none;" id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'" ></div><div style="width:100%;"><input type="hidden" class="jbSelect" id="respReport_'+id+'" value="firma_'+localStorage['id_row'].toLowerCase()+'.png" ></div>'
                        +' <form method="post" action="" class="sigPad">'
                        +'      <ul class="sigNav">'
                        +'        <li class="drawIt"><a href="#draw-it" >Firma del Empleado</a></li>'
                        +'        <li class="clearButton"><a href="#clear">Limpiar</a></li>'
                        +'      </ul>'
                        +'      <div class="sig sigWrapper" style="width: 300px;  height: 115px;  overflow: hidden;">'
                        +'        <div class="typed"></div>'
                        +'        <canvas class="pad" style="width: 100%;  background-color: #fff;"></canvas>'
                        +'        <input type="hidden" name="output" id="jsonfirma_'+id+'" class="output">'
                        +'      </div>'
                        +'    </form>';
                        $('#jb_firma').empty();
                        $('#jb_firma').append(forma);
                        $(".sigPad").signaturePad({drawOnly:true});
          break;
          case '11':
              tip = '<div style="width:100%;"><input type="text" class="jbSelect" id="respReport_'+id+'" value="'+session.nombre+'" disabled></div>';
          break;
          case '12':
            tip = '<div style="width:100%" ><select id="respReport_'+id+'" class="jbSelect" onchange="verificaSelecTurno(this.value,\''+id+'\')"><option>Selecciona una opción</option></select></div>';
          break;
        default :
          tip = tipo;
        break;
    }
    
    if (nombre == 'Reactivo ...') {
      nombre = 'Nota';
    }

    if (tipo != 10) {
      if (id =='555f51bf00259') {
        position = position -1;
      }
      var lista = '<li id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'" data-position="'+pocision+'">'+
                  '<div class="item-inner" style="display:block;">'+
                  '<div class="item-title jbCapPhoto"  id="campReport_'+id+'">'+nombre+'</div>'+tip+'</div></li>';
    }
    return lista;
          
}

function calculaOcupacion(dato)
{
  //console.log(dato);
  var lista = $('[id^=id_reporte_form_]');
  $.each(lista ,function(){
      var posit = $(this).attr('data');
      var tipe = $(this).attr('data-type');
      var id = $(this).attr('id').replace('id_reporte_form_','');
      if (tipe == 1){
          switch(posit)
          {
            case '1':
                  localStorage.removeItem('desocupado');
                  localStorage.removeItem('ocupacion');
                  var dat = $('#respReport_'+id).val();
                  var desocupado = ( parseInt(dat) - parseInt(dato) ); 
                  localStorage['desocupado']=desocupado;
                  var ocupacion  = (parseInt(dato) * 100 / parseInt(dat));
                  localStorage['ocupacion']=Math.round(ocupacion * 100) / 100
                  console.log(desocupado+" "+ocupacion);
            break;
            case '3':
                $('#respReport_'+id).val(localStorage['desocupado']);
               
            break;
            case '4':
                  $('#respReport_'+id).val(localStorage['ocupacion']);
            break;
          }
          
      }
  });
}

function drawCroquis(id)
{
  var $canvas,
        onResize = function(event) {
          $canvas.attr({
            height: window.innerHeight,
            width: window.innerWidth
          });
        };
    $canvas = $('.AreaDeDibujo canvas');
    //$canvas.attr('height','500');
    //$canvas.attr('width','500');
    
      window.addEventListener('orientationchange', onResize, false);
      window.addEventListener('resize', onResize, false);
      onResize();

  $('.AreaDeDibujo').signaturePad({
        drawOnly: true,
        defaultAction: 'drawIt',
        validateFields: false,
        lineWidth: 0,
        output: '.outputDraw',
        sigNav: null,
        name: null,
        typed: null,
        clear: '.clearButton',
        typeIt: null,
        drawIt: null,
        typeItDesc: null,
        drawItDesc: null
      /*drawOnly: true,
      defaultAction: 'drawIt',
      validateFields: true,
      lineWidth: 0,
      output: '.outputDraw',
      drawIt: '.drawIt',
      clear: '.clearButton',
      typeItDesc: null*/
  });
  $('#saveCroquisId').attr('onclick','saveCroquis(\''+id+'\')');
}
function limpiarCanvas()
{
  var canvas = document.getElementById("drawCanvas");
  var ctx = canvas.getContext("2d");
 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function saveCroquis(id)
{
  if (typeof localStorage['croquis'] !== 'undefined') {
    localStorage.removeItem('croquis');
    localStorage['croquis']= $('#drawCroquisSeguros').val();
    $('#jsonfirma_'+id).val(localStorage['croquis']);
    $('#drawCroquisSeguros').attr('value','');
    $('#backToCroquis')[0].click();
    $('.botonCroquisjb').css('background', 'rgba(77, 179, 35, 0.92)');
  }else
  {
    localStorage['croquis']= $('#drawCroquisSeguros').val();
    $('#jsonfirma_'+id).val(localStorage['croquis']);
    $('#drawCroquisSeguros').attr('value','');
    $('#backToCroquis')[0].click();
    $('.botonCroquisjb').css('background','rgba(77, 179, 35, 0.92)');
  }
}
function saveFirma(id)
{
    var firma = $("#jsonfirma_"+id).val();
    var nomfirma = $("#respReport_"+id).val();
    var empre = veriEmpresa(localStorage['empresa']);
    if (empre ==1) {
      var Nem = localStorage['empresa'];
    }else
    {
      var Nem = '';
    }
    var url2 = encodeURI("https://www.jarboss.com/AdminReportes/firma/convertirFirma.php");
    $.ajax({
        type:"POST",
        datatype:"JSON",
        url:url2,
        data:"firma="+firma+"&nomfirma="+nomfirma+"&lap="+Nem,
        success: function(server){
            console.log(server);
        }
    });
}

function verificaselec(id)
{
  //console.log(id);
   if (id == '5511acf531af7'|| id == '53fd08010a3a7'||id == '559fe50267f3d' || id == '552440ac5ce5e' || id == '5511e45b7063f' || id == '5511e63a4bce3' || id =='5511e6887b0b9' || id == '5524455f4a4ef' || id == '5511e6ceb4797' || id == '5511e43be43ff' || id == '5511e40fbee21' || id == '55300d6c43594' || id == '55300d2320ad5' || id =='53fd06d1013f9' || id =='53fcffc9de0fb' || id == '53fcfe337090c' || id == '54ca9439904bd' || id == '54ca94398fee4' || id == '54ca94398f90a' || id =='54ca94398f331' || id =='54ca94398ed57') {
        var array = $("[id^=id_reporte_form_]");
        $.each(array,function(k,v){
           // var idse = $(v).attr('id').replace('id_reporte_form_','');
            var pose = $(v).attr('data');
            if (pose > '1') {
             //console.log(idse +" "+pose);
              $('#'+v.id).hide();
              $('#id_reporte_form_552e97b2dbff8').show();
              $('#id_reporte_form_552e9cb6da079').show();
            };
        });
   }else
   {
      var array = $("[id^=id_reporte_form_]");
       $.each(array,function(k,v){
            //var idse = $(v).attr('id').replace('id_reporte_form_','');
            var pose = $(v).attr('data');
            if (pose > '1') {
              $('#'+v.id).show();
            };
        });
   }
  //console.log(optio);
}

function optionSelect(id)
{ 
  var idData= $('#'+id+' option:selected').attr('value');
  //console.log(id + " "+ idData);
  var espacio = $('#optListNum_'+idData).attr('data');
  $('#campReport_'+espacio).empty();
  $('#campReport_'+espacio).append($('#optListNum_'+idData).text());
  if ($('.jbContentBlock').not(':visible')) {
      $('.jbContentBlock').show();
  }
}

function habilita(id)
{
  //console.log(id)
  $('#'+id).removeAttr('onclick');
  $('#'+id).removeAttr('value');
  $('#'+id).attr('onclick','desabilita(this.id)');
  $('#'+id).attr('value','1');
     
}

function desabilita(id)
{
  $('#'+id).removeAttr('onclick');
  $('#'+id).removeAttr('value');
  $('#'+id).attr('onclick','habilita(this.id)');
  $('#'+id).attr('value','0');
}

function verificaSelecTurno(opt,id)
{
  var sec = $('#'+opt).attr('data');
  var list = $('[id^=id_reporte_form_]');
  $.each(list ,function(){
      var posit = $(this).attr('data');
      var tipe  = $(this).attr('data-position');
      var id    = $(this).attr('id').replace('id_reporte_form_','');
      switch(tipe)
      {
        case '15':
          if (sec == 0) {
            var res='7:00 - 15:20';
            $('#respReport_'+id).val(res);
          }else if (sec ==1) {
            var res='15:20 - 22:50';
            $('#respReport_'+id).val(res);
          }else{
            var res='';
            $('#respReport_'+id).val(res);
          } 
        break;
      }
  });
}
/// generamos los contenidos de los campos
function genConOptionReport(contenido,idColumn,idRow,numeral)
{ 
    $('#id_reporte_form_'+idColumn+' select').append('<option value="'+idRow+'" id='+numeral+'>'+contenido+'</option>');
}
function genConOptionReportTurnos(contenido,idColumn,idRow,numeral)
{ 
    $('#id_reporte_form_'+idColumn+' select').append('<option value="'+idRow+'" id="'+idRow+'" data="'+numeral+'">'+contenido+'</option>');
}
function genContOptionReport(contenido,idColumn,idRow)
{
  return '<div id="optListNum_'+idRow+'" data='+idColumn+' class="optListNum_'+idRow+'">'+contenido+'</div>';
  //$('#showAlert').append('<div id="optListNum_'+idRow+'" style="display:none;">'+contenido+'</div>');
}

///escondemos y mostramos los campos el input si no
function showRows(opt,id)
{
   if(opt == 1){
      var todosRows = $('[id^=id_reporte_form_]');
      var num = todosRows.length;
      console.log(num);
      $.each(todosRows,function(){
          var data = $(this).attr('data');
          if (num > 7 ) {
            if (data > 1 && data <=8) {
                  $(this).hide();
                }
          }
          if (num < 7) {
              if (data > 1 && data < 5) {
                $(this).hide();
              }
              if (data == 5) {
                $(this).show();
              };
              $('#id_reporte_form_551b08ec1a42d').show();
          }
      });

      $('#respReport_'+id).attr('value','no');
      $('#id_reporte_form_'+id+' #btn1').removeAttr('stayle');
      $('#id_reporte_form_'+id+' #btn2').removeAttr('stayle');
      $('#id_reporte_form_'+id+' #btn1').attr('style','background-color: rgb(0, 122, 255);');
      $('#id_reporte_form_'+id+' #btn2').attr('style','background-color: rgba(182, 182, 182, 0.85);'); 
   }
   if(opt == 2)
   {

    var todosRows = $('[id^=id_reporte_form_]');
      var num = todosRows.length;
      //console.log(num);
      $.each(todosRows,function(){
        var data = $(this).attr('data');
        if (num > 7 ) {
          if (data > 1 && data <=8) {
                $(this).show();
              }
        }
        if (num < 7) {
              if (data > 1 && data < 5) {
                $(this).show();
              }
              if (data == 5) {
                $(this).hide();
              };
                $('#id_reporte_form_551b08ec1a42d').hide();
        }
      });

      $('#respReport_'+id).attr('value','si');
      $('#id_reporte_form_'+id+' #btn1').removeAttr('stayle');
      $('#id_reporte_form_'+id+' #btn2').removeAttr('stayle');
      $('#id_reporte_form_'+id+' #btn1').attr('style','background-color: rgba(182, 182, 182, 0.85);');
      $('#id_reporte_form_'+id+' #btn2').attr('style','background-color: rgb(0, 122, 255);');   
    }
}

function showRowsInvert(opt,id)
{
  if(opt == 1){
      var todosRows = $('[id^=id_reporte_form_]');
      var num = todosRows.length;
      //console.log(num);
      $.each(todosRows,function(){
          var data = $(this).attr('data');
          if (data > 1) {
                $(this).show();
              }
      });

      $('#respReport_'+id).attr('value','no');
      $('#id_reporte_form_'+id+' #btn1').removeAttr('stayle');
      $('#id_reporte_form_'+id+' #btn2').removeAttr('stayle');
      $('#id_reporte_form_'+id+' #btn1').attr('style','background-color: rgb(0, 122, 255);');
      $('#id_reporte_form_'+id+' #btn2').attr('style','background-color: rgba(182, 182, 182, 0.85);'); 
   }
   if(opt == 2)
   {
      var todosRows = $('[id^=id_reporte_form_]');
      var num = todosRows.length;
      //console.log(num);
      $.each(todosRows,function(){
        var data = $(this).attr('data');
        if (data > 1) {
              $(this).hide();
        }
      });

      $('#respReport_'+id).attr('value','si');
      $('#id_reporte_form_'+id+' #btn1').removeAttr('stayle');
      $('#id_reporte_form_'+id+' #btn2').removeAttr('stayle');
      $('#id_reporte_form_'+id+' #btn1').attr('style','background-color: rgba(182, 182, 182, 0.85);');
      $('#id_reporte_form_'+id+' #btn2').attr('style','background-color: rgb(0, 122, 255);');   
    }
}

function valSiNo(id,op)
{
  if (op ==1 ) {
    $('#respReport_'+id).attr('value','no');

      $('#id_reporte_form_'+id+' #btn1').removeAttr('stayle');
      $('#id_reporte_form_'+id+' #btn2').removeAttr('stayle');
      $('#id_reporte_form_'+id+' #btn1').attr('style','background-color: rgb(0, 122, 255);');
      $('#id_reporte_form_'+id+' #btn2').attr('style','background-color: rgba(182, 182, 182, 0.85);');
  }
  if (op == 2) {
    $('#respReport_'+id).attr('value','si');

      $('#id_reporte_form_'+id+' #btn1').removeAttr('stayle');
      $('#id_reporte_form_'+id+' #btn2').removeAttr('stayle');
      $('#id_reporte_form_'+id+' #btn1').attr('style','background-color: rgba(182, 182, 182, 0.85);');
      $('#id_reporte_form_'+id+' #btn2').attr('style','background-color: rgb(0, 122, 255);');
  }
}


function shEmpleadosList(data,idCamp)
{
  //console.log(data+" "+idCamp);
  //console.log("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+idCamp+"\' and type_section="+localStorage['repSeccion']+" and row.contenido like '%"+data+"%'and row.id not in(select id from item it where it.id=row.id) ORDER BY row.position ASC;");
  if (data == "") {
    $('#listEmpleado_'+idCamp).hide();
    $('#listEmpleado_'+idCamp).empty();
  }else
  {
      $('#listEmpleado_'+idCamp).show();
      window.db.transaction(function(txt2){
         txt2.executeSql("SELECT row.contenido,row.id_column,row.id FROM jb_dinamic_tables_option_row row WHERE row.id_column=\'"+idCamp+"\' and type_section="+localStorage['repSeccion']+" and row.contenido like '%"+data+"%' and row.id not in(select id from item it where it.id=row.id) ORDER BY row.position ASC LIMIT 10;",[],function(txt2, results2){          
                $('#listEmpleado_'+idCamp).empty();         
            for (var rw = 0; rw < results2.rows.length; rw++) {
                var r = results2.rows.item(rw);
                 console.log(r.contenido+" "+r.id);
                 var html = '<li onclick="empleado_selected(\''+r.id+'\',\''+r.contenido+'\',\''+idCamp+'\');">'+r.contenido+'</li>';
                 $('#listEmpleado_'+idCamp).append(html);
            }   
        });
     });
  }

}

function empleado_selected(id,nombre,idCamp)
{
  console.log(id+" "+nombre+" "+idCamp);
  $('#listEmpleado_'+idCamp).hide();
  $('#listEmpleado_'+idCamp).empty();
  $('#respReportName_'+idCamp).val(nombre);
  $('#respReport_'+idCamp).attr('value',id);
}

function pre_save_reportes(opt,ps,funct)
{     
    $('#btnEndReportes').removeAttr('onclick');
    var empresa = session.empresa.toLowerCase();
    if (empresa == "seguridadsps.com.mx" || empresa == "seguridadconfiable.com" || empresa == "magna.com") {          
        if (typeof localStorage['reportQr'] === 'undefined' || localStorage['reportQr'] !== localStorage['idtabla']) 
        {
          alert('Valida tu Reporte con el Qr para proseguir '+localStorage['reportQR']+" "+localStorage['idtabla']);
          setTimeout(function(){
          $('#btnEndReportes').attr('onclick','pre_save_reportes('+opt+','+ps+','+funct+')');
          },500)
        }else{
          //$('#btnEndReportes').removeAttr('onclick');
          pre_save_reportesDos(opt,ps,funct);
        }
    }else{
      pre_save_reportesDos(opt,ps,funct);
    }
}

function pre_save_reportesDos(opt,ps,funct)
{
      var columrepo = $('[id^=id_reporte_form_]:visible');
      var totalrow  = columrepo.length-1;
      var countinit = 0;
      $.each(columrepo,function(){
            var idcol = $(this).attr('id').replace('id_reporte_form_','');
            var positio = $(this).attr('data');
             //console.log(countinit+" "+positio);
             if (idcol == '55d36334e6640') {
                    //console.log('entro en este')
                    if( totalrow == countinit){
                        //console.log(countinit);
                        if (ps == 0) {
                            save_reportes(opt,funct);
                        }
                        else if (ps == 1)
                        {
                          actualizarReport();
                        }
                    }
             }else if (countinit == positio) {
                var campo = $('#respReport_'+idcol).val();
                if (campo == "Selecciona una opción" || campo == '') {
                    $('#btnEndReportes').attr('onclick','pre_save_reportes('+opt+','+ps+')');
                    var nomcamp = $('#campReport_'+idcol).text();
                    myApp.alert('llena el campo '+nomcamp);
                    return false;
                }else 
                {
                  console.log('entro en otrosas'+totalrow+" "+countinit);
                  if(totalrow == countinit)
                  {
                        if (ps == 0) {
                            save_reportes(opt,funct);
                        }
                        else if (ps == 1)
                        {
                          actualizarReport();
                        }
                  }
                }
            }
            countinit = parseInt(positio)+1;
      });
}
// guardamos las respuestas en la tabla 
function save_reportes(opt,funct)
{
    console.log(opt);
    var opColum = $('[id^=campReport_]');
    var respColum = $('[id^=respReport_]');
    var idPlantilla = localStorage['idPlantilla_activa'];
    var id_table = localStorage['idtabla'];
    var id_repor = localStorage['idreporte'];
    var id_row = localStorage['id_row'];
    var status_row = 1;
    var fecha = genFecha();
    $('body #tu_id').removeAttr('src');
    $('body #tu_id').hide();

    $.each(respColum,function(){
          var res =  $(this).attr('id').replace('respReport_','');
          var id = genera_id();
          var text = $('#respReport_'+res).val();
          var position = $('#id_reporte_form_'+res).attr('data');
          var tipoData = $('#id_reporte_form_'+res).attr('data-type');
          if (text =='si') {
            text ='1';
          }
          if (text == 'no') {
            text ='0';
          }
          
          if(text != "") {
              var  conten = text;
              window.db.transaction(function(txt){
                  //console.log("select * from jb_dinamic_tables_rows where id=\'"+id+"\' and id_reporte=\'"+id_repor+"\' and id_column=\'"+res+"\';");
                  txt.executeSql("select * from jb_dinamic_tables_rows where id=\'"+id+"\' and id_reporte=\'"+id_repor+"\' and id_column=\'"+res+"\';",[],function(txt2,resul){
                    if (resul.rows.length==0) {
                      switch(res){
                        case '558336d8a7a78':
                        case '5581ad144a90e':
                        case '558336d8a6560':
                        case '558336d8a7c1b':
                        case '558336d8a71ab':
                        case '558336d8a5e71':
                        case '558336d8a6e25':
                        case '558336d8a63a4':
                        case '558336d8a61e4':
                        case '558336d8a68df':
                        case '558336d8a7703':
                        case '558336d8a671e':
                        case '558336d8a6037':
                        case '558336d8a6aa3':
                        case '558336d8a6c66':
                        case '558336d8a7537':
                        case '558336d8a7375':
                        case '558336d8a6fe8':
                        case '55e4a5ea603a7':
                        case '55e4b83df1ee2':
                        case '55e4c32608bb2':
                        case '55e4c433be373':
                        case '55e4c5a25438e':
                            var campSintilla = $('#campReport_'+res).text();
                            txt.executeSql("INSERT INTO jb_dinamic_tables_rows(status,id_table,id_reporte,id_row,id_column,id,fecha,contenido,position,tipo,campSintilla) VALUES (\'"+status_row+"\', \'"+id_table+"\', \'"+id_repor+"\', \'"+id_row+"\', \'"+res+"\', \'"+id+"\',\'"+fecha+"\',\'"+conten+"\',\'"+position+"\',"+tipoData+",\'"+campSintilla+"\');");      
                        break;
                        default:
                            txt.executeSql("INSERT INTO jb_dinamic_tables_rows(status,id_table,id_reporte,id_row,id_column,id,fecha,contenido,position,tipo) VALUES (\'"+status_row+"\', \'"+id_table+"\', \'"+id_repor+"\', \'"+id_row+"\', \'"+res+"\', \'"+id+"\',\'"+fecha+"\',\'"+conten+"\',\'"+position+"\',"+tipoData+");");      
                        break;
                      }
                    }
                  }); 
              });
              if (tipoData == '7' || tipoData == '9')
              {
                 var sharefoto = $('[id^=fotogaleria_]');
                 $.each(sharefoto,function(){
                      var idsfoto = $(this).attr('id').replace('fotogaleria_','');
                      var rutafoto = $('#fotogaleria_'+idsfoto).val();
                      //console.log(rutafoto);
                      window.db.transaction(function(txt){
                           txt.executeSql("INSERT INTO jb_fotos_reportes(id_table,id_reporte,id_row,id,foto,id_column) VALUES(\'"+id_table+"\',\'"+id_repor+"\',\'"+id_row+"\',\'"+id+"\',\'"+rutafoto+"\',\'"+res+"\');");                   
                      });
                 });        
              }else if (tipoData == '10') {
                  //jb_firmas_reportes(id_table TEXT(30),id_reporte TEXT(30), id_row TEXT(30),id TEXT(30), firma TEXT(800),id_column TEXT(15))");
                  var firma = $('#jsonfirma_'+res).val();
                  
                  window.db.transaction(function(txt){
                       txt.executeSql("INSERT INTO jb_firmas_reportes(id_table,id_reporte,id_row,id,firma,id_column,nombre) VALUES(\'"+id_table+"\',\'"+id_repor+"\',\'"+id_row+"\',\'"+id+"\',\'"+firma+"\',\'"+res+"\',\'"+conten+"\');");                   
                  });
              }
              if(position == '0'){
                  window.db.transaction(function(txt){
                        var nom = $('#tit_option_repo').text();

                        console.log("INSERT INTO item(status,name,id) VALUES('1',\'"+nom+"\',\'"+conten+"\');");
                        txt.executeSql("select * from item where id=\'"+conten+"\' and name=\'"+nom+"\'",[],function(txts,resuelto){
                              if (resuelto.rows.length==0) {
                                  txt.executeSql("INSERT INTO item(status,name,id) VALUES('1',\'"+nom+"\',\'"+conten+"\');");
                              }
                        });      
                  });
                  // calculaproceso(res,id,idPlantilla,id_repor,id_table,id_row);///funcion para calcular
              } 
          }
    });
    opt = opt-1;
    if (opt > 0) {
        //console.log(opt+" "+localStorage['nomRepor']);
        window.db.transaction(function(txt){
            txt.executeSql("select nombre from item_listview where nombre=\'"+localStorage['nomRepor']+"\';",[],function(txs, resul){
                //console.log(resul.rows.length);
                if (resul.rows.length == 0) {
                    txt.executeSql("INSERT into item_listview(nombre,status) VALUES(\'"+localStorage['nomRepor']+"\','1');");
                }
                if (resul.rows.length > 0) {
                    txt.executeSql("UPDATE item_listview set status='1' WHERE nombre=\'"+localStorage['nomRepor']+"\';");
                }
            });
            myApp.alert("Información Guardada");
            $("#seccionprincipal #jb_fotos_galery").empty();  
        });
        setTimeout(function(){
            localStorage.removeItem('id_row');
            localStorage.removeItem('fotopop');
            console.log(funct);
            switch(funct){
              case 'capturaInfoAsistencia':
                  capturaInfoAsistencia(localStorage['idtabla'],localStorage['nomRepor']);
              break;
               case 'capturaInfoQr':
                  capturaInfoQr(localStorage['idtabla'],localStorage['nomRepor']);
              break;
               case 'capturaInfoDos':
                  capturaInfoDos(localStorage['idtabla'],localStorage['nomRepor']);
              break;
               case 'capturaInfoPorcent':
                  capturaInfoPorcent(localStorage['idtabla'],localStorage['nomRepor']);
              break;
               case 'capturaEntradaSalida':
                  capturaEntradaSalida(localStorage['idtabla'],localStorage['nomRepor']);
              break;
              case 'capReportRepet':
                  capReportRepet(localStorage['idtabla'],localStorage['nomRepor']);
              break;
              case 'capReportNoRepet':
                  capReportNoRepet(localStorage['idtabla'],localStorage['nomRepor']);
              break;

              case 'capturaInfoTurnos':
                  capturaInfoTurnos(localStorage['idtabla'],localStorage['nomRepor']);
              break;
              default:
                  capturaInfo(localStorage['idtabla'],localStorage['nomRepor']);
              break;
            }
            verificaReporte(id_table,1);
        },400);
    }else if (opt == 0)
    {
        verificaReporte(id_table,2);
        //console.log(opt+"lo ultimo ->"+"UPDATE item_listview status='2' WHERE nombre=\'"+localStorage['nomRepor']+"\';");
        window.db.transaction(function(txt){
            txt.executeSql("select nombre from item_listview where nombre=\'"+localStorage['nomRepor']+"\';",[],function(txs, resul){
                  //console.log(resul.rows.length);
                  if (resul.rows.length == 0) {
                      txt.executeSql("INSERT into item_listview(nombre,status) VALUES(\'"+localStorage['nomRepor']+"\','2');");
                  }
                  if (resul.rows.length > 0) {
                      txt.executeSql("UPDATE item_listview set status='2' WHERE nombre=\'"+localStorage['nomRepor']+"\';");
                  }
            });
        });
        $('#showAlert').empty();
        setTimeout(function(){
          $('#opReport')[0].click();
           verificaReporte(id_table);
        },900);
        setTimeout(function(){
          $('#opReport')[0].click();
        },600);
        localStorage.removeItem('id_row');
        myApp.alert("Información Guardada");
    }
}

function calculaproceso(res,id,idPlantilla,id_repor,id_table,id_row)
{
    console.log("id campo->"+res+" id generado-> "+id+" id plantilla->"+idPlantilla+" id rpeorte-> "+id_repor+" id->table"+id_table+"  id roe->"+id_row);

    //var db = window.openDatabase('jawkdb', '1.1', 'base prueba', 10 * 1024 * 1024);

   /* db.transaction(function(txt){
        txt.executeSql("select * from jb_dinamic_tables_rows_result where id_reporte=\'"+id_repor+"\' and id_plantilla=\'"+idPlantilla+"\'",[],function(ts,result){
            console.log(result.rows.length);
            if (result.rows.length == 0) {
              console.log("INSERT into jb_dinamic_tables_rows_result(total,nota, miniatura,id_reporte , id_plantilla , id, adjunto) values(\'100\',\'\',\'\',\'"+id_repor+"\',\'"+idPlantilla+"\',\'"+id+"\',\'\');");
              txt.executeSql("INSERT into jb_dinamic_tables_rows_result(total,nota, miniatura,id_reporte , id_plantilla , id, adjunto) values(\'100\',\'\',,\'\',\'"+id_repor+"\',\'"+idPlantilla+"\',\'"+id+"\',\'\');");
            }else if (result.rows.length == 1) {
              var r = result.rows.item(0);
              newtotal = r.total - 20;
              console.log("update jb_dinamic_tables_rows_result set total=\'"+newtotal+"\' where id_reporte =\'"+id_repor+"\' and id_plantilla = \'"+idPlantilla+"\';");
              
              txt.executeSql("update jb_dinamic_tables_rows_result set total=\'"+newtotal+"\' where id_reporte =\'"+id_repor+"\' and id_plantilla = \'"+idPlantilla+"\';");
            
            }
        });

        //jb_dinamic_tables_rows_result(total TEXT(50), nota TEXT(140), miniatura TEXT(100), id_reporte TEXT(30), id_plantilla TEXT(30), id TEXT(30), adjunto TEXT(50));
    });
    */
}

function backReport()
{
    $('#opReport').attr('href','#reportes-sec');
    $("#bntHistorial").hide();
    $('#btnGps').show();
    $('#btnPublicar').show();
    $('#jb_firma').empty();
    $('#seccionprincipal #jb_fotos_galery').empty();
    $(".fotoCapCam .campFotoValue").value='';
    $('#showAlert').empty();
}

// eliminamos el reporte incompleto cuando reinicia el proceso
function eliminaReporte(id)
{
  window.db.transaction(function(txt2){
      txt2.executeSql("DELETE FROM jb_dinamic_tables_rows WHERE id_reporte=\'"+id+"\' ",[],function(txt, results){
        
            //console.log('jb_dinamic_tables_rows ->'+results.rows.length);
      });
      txt2.executeSql("DELETE FROM reporte_mantenimiento WHERE id=\'"+id+"\' ",[],function(txt, results){
        //console.log('reporte_mantenimiento ->'+results.rows.length);
            
      });
      txt2.executeSql("DELETE FROM item_listview; ",[],function(txt, results){
        //console.log('item_listview ->'+results.rows.length);
            
      });

      txt2.executeSql("DELETE FROM item; ",[],function(txt, results){
        //console.log('item ->'+results.rows.length);
            
      });
      txt2.executeSql("DELETE FROM jb_firmas_reportes; ",[],function(txt, results){
        //console.log('item ->'+results.rows.length);
            
      });
      //id_table,id_reporte,id_row,id,foto,id_column
      txt2.executeSql("select * from jb_fotos_reportes where id_reporte=\'"+id+"\';",[],function(t2s,resuelve){
          if (resuelve.rows.length>0) {
                var cont;
                for (var i = 0; i < resuelve.rows.lengthr; i++) {
                      var f = resuelve.rows.item(i);
                      removePhoto(f.foto);
                      cont=i;
                }
                delfo=resuelve.rows.length-1;
                if (delfo == cont) {
                    alert(delfo+" "+cont+" segunya ");
                    txt2.executeSql("DELETE FROM jb_fotos_reportes; ",[],function(txt, results){});
                }
          }
      });
      txt2.executeSql("DELETE FROM jb_dinamic_tables_rows_result WHERE id_reporte=\'"+id+"\' ",[],function(txt, results){
           //console.log('jb_dinamic_tables_rows ->'+results.rows.length);
      });
  });
        localStorage.removeItem('idreporte');
        localStorage.removeItem('nomRepor');
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
        localStorage.removeItem('rowsresul');
        localStorage.removeItem('jb_reporte_ubicacion');
        localStorage.removeItem('idGrupo');
        localStorage.removeItem('desocupado');
        localStorage.removeItem('ocupacion');
        localStorage.removeItem('repSeccion');
        localStorage.removeItem('idEmpresa');
        setTimeout(function(){
          window.location = 'login.html';
        },1050);
}

//funcion para verificar el proceso del reporte///////////////////////////////
function verificaReporte(idtabla,opt)
{ 
  window.db.transaction(function(txt2){
      txt2.executeSql("SELECT tables.nombre, item.status FROM jb_dinamic_tables tables,item_listview item WHERE tables.id=\'"+idtabla+"\' and tables.nombre=item.nombre;",[],function(txt, results){
          for (var i = 0; i < results.rows.length; i++) {
              var p = results.rows.item(i);
              //console.log(p);
              if ( p.status == 1) {
                  $('#reportProceso_'+idtabla).empty();
                  $('#reportProceso_'+idtabla).append('Iniciado');
                  $('#reportProceso_'+idtabla).removeAttr('style')
                  $('#reportProceso_'+idtabla).attr('style','color:rgb(229, 165, 0);')
                  $('#id_reporte_'+idtabla).removeAttr('data');
                  $('#id_reporte_'+idtabla).attr('data',p.status)
              }else if (p.status == 2) {
                  $('#id_reporte_'+idtabla).removeAttr('data');
                  $('#id_reporte_'+idtabla).attr('data',p.status);
                  $('#reportProceso_'+idtabla).empty();
                  $('#reportProceso_'+idtabla).append('Terminado');
                  $('#reportProceso_'+idtabla).removeAttr('style');
                  $('#reportProceso_'+idtabla).attr('style','color:rgb(48, 150, 48);');
                  $('#id_reporte_'+idtabla).removeAttr('onclick');
                  $('#id_reporte_'+idtabla).attr('onclick','visualisaRepor(\''+localStorage['idreporte']+'\',\''+p.nombre+'\',\''+idtabla+'\',0)');
                  $('#id_reporte_'+idtabla+' a').removeAttr('href');
                  $('#id_reporte_'+idtabla+' a').attr('href','#vistaRepor');
              }
              if (opt == 1) {
                  setTimeout(function(){
                      $('#bntHistorial').removeAttr('onclick');
                      $('#bntHistorial').removeAttr('onclick');
                      $('#bntHistorial').attr('onclick','visualisaRepor(\''+localStorage['idreporte']+'\',\''+p.nombre+'\',\''+idtabla+'\')');
                      $('#bntHistorial').removeAttr('href');
                      $('#bntHistorial').attr('href','#vistaRepor');
                      $('#bntHistorial').show();
                  },200);
              }
              if (opt == 2) {
                  //console.log(opt+" jaksjaksjaks");
                  setTimeout(function(){
                      $('#bntHistorial').removeAttr('onclick');
                      $('#bntHistorial').removeAttr('onclick');
                      $('#bntHistorial').attr('onclick','visualisaRepor(\''+localStorage['idreporte']+'\',\''+p.nombre+'\',\''+idtabla+'\',0)');
                      $('#bntHistorial').removeAttr('href');
                      $('#bntHistorial').attr('href','#vistaRepor');
                      $('#bntHistorial').show();
                  },100);
              }
          }
      });
  });
}



////visualisamos un reporte terminado 
function visualisaRepor(idrepor,nombre,idtable,opt,sec)
{
    //console.log(idrepor+" "+nombre+" "+idtable+" "+opt);
    $('#bntHistorial').hide();
    if (opt == 0) {
        $('#regReport').removeAttr('onclick');
        $('#regReport').removeAttr('href');
        $('#regReport').attr('onclick','procesar_plantilla();');
        $('#regReport').attr('href','#reportes-sec');
        $('#tit_vista_repo').empty();
        $('body #bntHistorial').hide();
        $('body #btnGps').hide();
        $('body #btnPublicar').hide();
    }else
    {
        $('#regReport').removeAttr('onclick');
        $('#regReport').attr('onclick','capturaInfo(\''+idtable+'\',\''+nombre+'\')');
        $('#tit_vista_repo').empty();
        $('#tit_vista_repo').append('Historial '+nombre);
    }
    $('#listReporteFinal_end ul').empty();
        
    window.db.transaction(function(txt2){
        //console.log("select rows.contenido as id, option.contenido as nombre,rows.id_row from jb_dinamic_tables_rows rows, jb_dinamic_tables_option_row option where rows.position=0 and rows.id_reporte=\'"+idrepor+"\' and rows.id_table=\'"+idtable+"\' and rows.contenido=option.id;");
        txt2.executeSql("select rows.contenido as id, option.contenido as nombre,rows.id_row from jb_dinamic_tables_rows rows, jb_dinamic_tables_option_row option where rows.position=0 and rows.id_reporte=\'"+idrepor+"\' and rows.id_table=\'"+idtable+"\' and rows.contenido=option.id;",[],function(txt, results){
              //console.log('dinamic_tables_rows ->'+results.rows.length);
              if (results.rows.length == 0) {
                  // console.log("select * from jb_dinamic_tables_rows where id_reporte=\'"+idrepor+"\' and id_table=\'"+idtable+"\'");
                  txt2.executeSql("select * from jb_dinamic_tables_rows where id_reporte=\'"+idrepor+"\' and id_table=\'"+idtable+"\' limit 1;",[],function(txt,res){
                      for (var i =0; i < res.rows.length; i++) {
                          var k = res.rows.item(i);
                          //console.log(i+" "+k);
                          listaVistaHistorial2(nombre,k.id_column,idtable,k.id_row);
                      };
                  });
              }else
              {
                for (var i = 0; i < results.rows.length; i++) {
                  var p = results.rows.item(i);
                  listaVistaHistorial(p.nombre,p.id,idtable,p.id_row);  
                }
              }
        });
   });
}



function listaVistaHistorial(nombre,idrow,idtable,id_row)
{
    $('#listReporteFinal_end ul').append('<li id="reporteFinal_'+idrow+'" ><a class="item-link" href="#datosvistaRepor" onclick="infoReporteEdit(\''+idtable+'\',\''+nombre+'\',\''+id_row+'\');"><div class="item-content"><div class="item-inner"><div class="item-title">'+nombre+'</div></div></div></a></li>');
}

function listaVistaHistorial2(nombre,idcolumn,idtable,id_row)
{
    $('#listReporteFinal_end ul').append('<li id="reporteFinal_'+idcolumn+'" ><a class="item-link" href="#datosvistaRepor" onclick="infoReporteEdit(\''+idtable+'\',\''+nombre+'\',\''+id_row+'\');"><div class="item-content"><div class="item-inner"><div class="item-title">'+nombre+'</div></div></div></a></li>');
}

function delbtnUpDate()
{
  $("#bnUpDate").remove();
}

function infoReporteEdit(idtable,nombre,idrow)
{ 
  $('#seccioneditin #jb_fotos_galery').show();
  $('#tit_vista_repo').empty();
  $('#tit_vista_repo').append(nombre);
  $('#op_report_sec ul').empty();
  $('#datosSAveReporte ul').empty();
  $("#listVistaReporEdit ul").empty();
  $("#menuAlterno #bnUpDate").remove();
  $('#menuAlterno').append('<a class="button" id="bnUpDate" onclick="pre_save_reportes(10,1);"><span>Actualizar</span></a>');
  //localStorage['id_row'] = genera_id();
  localStorage['idtabla2'] = idtable;
  localStorage['nombrepor']=nombre;
  localStorage['idrow2']=idrow;
  //console.log("nombre->"+nombre+"idtable->"+idtable);
  window.db.transaction(function(txt2){

    txt2.executeSql("SELECT * FROM jb_dinamic_tables_columns WHERE id_table=\'"+idtable+"\' ORDER BY position ASC",[],function(txt, results){
        for (var i = 0; i < results.rows.length; i++) {
              var p = results.rows.item(i);
               console.log(p.content_type+" "+p.position+" "+p.nombre);
               if (p.content_type != '9') {
                      if (p.position == 0 && p.content_type == 3) {

                      }else if(p.content_type == 10){
                            lisSaveReportFirma(p.id,p.nombre);
                      }else if(p.content_type == 7){
                        lisSaveReporteimg(p.id,p.nombre);
                      }else
                      {
                          switch(p.id){
                              case '558336d8a7a78':
                              case '5581ad144a90e':
                              case '558336d8a6560':
                              case '558336d8a7c1b':
                              case '558336d8a71ab':
                              case '558336d8a5e71':
                              case '558336d8a6e25':
                              case '558336d8a63a4':
                              case '558336d8a61e4':
                              case '558336d8a68df':
                              case '558336d8a7703':
                              case '558336d8a671e':
                              case '558336d8a6037':
                              case '558336d8a6aa3':
                              case '558336d8a6c66':
                              case '558336d8a7537':
                              case '558336d8a7375':
                              case '558336d8a6fe8':
                              case '55e4a5ea603a7':
                              case '55e4b83df1ee2':
                              case '55e4c32608bb2':
                              case '55e4c433be373':
                              case '55e4c5a25438e':
                                    var nombre = p.nombre.split('___');
                                  
                                   lisSaveReport(p.id,"");
                              break;
                              default:
                                  console.log("segundo if->"+p.id+ " "+p.nombre);
                                  lisSaveReport(p.id,p.nombre);
                              break;
                          }
                    }
               }else 
               {  
                  lisSaveReporteimg(p.id,p.nombre);
               }
               if (p.content_type == 3 && p.position == 0) {
                  ////nada escrito
               }else
               {
                  console.log('porque no entra');
                  lisOptionModifi(p.nombre,p.id,p.content_type,p.id_table,p.position);
               }

               if (p.content_type == 3 && p.position == 1) {
                    //console.log("select option.contenido, option.id_column from jb_dinamic_tables_rows rows, jb_dinamic_tables_option_row option where rows.id_column=\'"+p.id+"\' and rows.id_reporte=\'"+localStorage['idreporte']+"\' and rows.id_table=\'"+idtable+"\' and rows.status='1' and rows.contenido=option.id ORDER BY rows.position ASC;");
                    txt.executeSql("select option.contenido, option.id_column from jb_dinamic_tables_rows rows, jb_dinamic_tables_option_row option where rows.id_column=\'"+p.id+"\' and rows.id_row=\'"+idrow+"\' and rows.id_reporte=\'"+localStorage['idreporte']+"\' and rows.id_table=\'"+idtable+"\' and rows.status='1' and rows.contenido=option.id ORDER BY rows.position ASC;",[],function(txt,resul){
                      for (var i = 0; i < resul.rows.length; i++) {
                          var r = resul.rows.item(i);
                          console.log(r);
                          dataListResp(r.id_column,r.contenido);
                      }
                    });
               }else if (p.content_type == 3 && p.position != 0) {
                  ///console.log("select option.contenido, option.id_column from jb_dinamic_tables_rows rows, jb_dinamic_tables_option_row option where rows.id_column=\'"+p.id+"\' and rows.id_reporte=\'"+localStorage['idreporte']+"\' and rows.id_table=\'"+idtable+"\' and rows.status='1' and rows.contenido=option.id ORDER BY rows.position ASC;");
                  txt.executeSql("select option.contenido, option.id_column from jb_dinamic_tables_rows rows, jb_dinamic_tables_option_row option where rows.id_column=\'"+p.id+"\' and rows.id_row=\'"+idrow+"\' and rows.id_reporte=\'"+localStorage['idreporte']+"\' and rows.id_table=\'"+idtable+"\' and rows.status='1' and rows.contenido=option.id ORDER BY rows.position ASC;",[],function(txt,resul){
                      for (var i = 0; i < resul.rows.length; i++) {
                          var r = resul.rows.item(i);
                            //console.log(r);
                          dataListResp(r.id_column,r.contenido);
                      }
                  });
               }else if (p.content_type == 9 || p.content_type == 7) {
                  //console.log("#listDatos_"+p.id+" div");
                  $("#listDatos_"+p.id+" div").empty();
                  //console.log("select foto, id_column from jb_fotos_reportes where id_row=\'"+idrow+"\' and id_reporte=\'"+localStorage['idreporte']+"\' and id_table=\'"+idtable+"\';");
                  txt.executeSql("select foto, id_column from jb_fotos_reportes where  id_row=\'"+idrow+"\' and id_reporte=\'"+localStorage['idreporte']+"\' and id_table=\'"+idtable+"\';",[],function(txt,resul){
                      //alert(resul.rows.length);
                      if (resul.rows.length >0) {
                          for (var i = 0; i < resul.rows.length; i++) {
                              var r = resul.rows.item(i);
                              //console.log(r);
                              dataListRespImg(r.id_column,r.foto,i);
                          }; 
                      }
                  });
               }else if(p.content_type == 10){
                   txt.executeSql("select firma, id_column from jb_firmas_reportes where id_column=\'"+p.id+"\' and id_row=\'"+idrow+"\' and id_reporte=\'"+localStorage['idreporte']+"\' and id_table=\'"+idtable+"\';",[],function(txt,resul){
                      for (var i = 0; i < resul.rows.length; i++) {
                          var r = resul.rows.item(i);
                          console.log(r);
                          dataListFirma(r.id_column,r.firma);
                      }
                   });
              }
              else{
                  switch(p.id){
                      case '558336d8a7a78':
                      case '5581ad144a90e':
                      case '558336d8a6560':
                      case '558336d8a7c1b':
                      case '558336d8a71ab':
                      case '558336d8a5e71':
                      case '558336d8a6e25':
                      case '558336d8a63a4':
                      case '558336d8a61e4':
                      case '558336d8a68df':
                      case '558336d8a7703':
                      case '558336d8a671e':
                      case '558336d8a6037':
                      case '558336d8a6aa3':
                      case '558336d8a6c66':
                      case '558336d8a7537':
                      case '558336d8a7375':
                      case '558336d8a6fe8':
                      case '55e4a5ea603a7':
                      case '55e4b83df1ee2':
                      case '55e4c32608bb2':
                      case '55e4c433be373':
                      case '55e4c5a25438e':
                              console.log(p.id);
                              //console.log("select contenido, id_column from jb_dinamic_tables_rows where id_column=\'"+p.id+"\'  and id_reporte=\'"+localStorage['idreporte']+"\' and id_table=\'"+idtable+"\' and status='1' ORDER BY position ASC;");
                              txt.executeSql("select contenido, id_column, campSintilla,id_column from jb_dinamic_tables_rows where id_column=\'"+p.id+"\' and id_row=\'"+idrow+"\' and id_reporte=\'"+localStorage['idreporte']+"\' and id_table=\'"+idtable+"\' and status='1' ORDER BY position ASC;",[],function(txt,resul){
                                  for (var i = 0; i < resul.rows.length; i++) {
                                      var r = resul.rows.item(i);
                                      //console.log(r);
                                      dataListResp(r.id_column,r.contenido);
                                      //console.log($('#listDatos_'+r.id_column).append(r.campSintilla));
                                        $('#listDatos_'+r.id_column).prepend(r.campSintilla);
                                     
                                  }
                              });
                      break;
                      default:
                            console.log("select contenido, id_column from jb_dinamic_tables_rows where id_column=\'"+p.id+"\'  and id_reporte=\'"+localStorage['idreporte']+"\' and id_table=\'"+idtable+"\' and status='1' ORDER BY position ASC;");
                            txt.executeSql("select contenido, id_column from jb_dinamic_tables_rows where id_column=\'"+p.id+"\' and id_row=\'"+idrow+"\' and id_reporte=\'"+localStorage['idreporte']+"\' and id_table=\'"+idtable+"\' and status='1' ORDER BY position ASC;",[],function(txt,resul){
                                for (var i = 0; i < resul.rows.length; i++) {
                                    var r = resul.rows.item(i);
                                    //console.log(r);
                                    dataListResp(r.id_column,r.contenido);
                                }
                            });
                      break;
                          }
                
              }

              txt.executeSql("SELECT contenido,id_column,id FROM jb_dinamic_tables_option_row WHERE id_column=\'"+p.id+"\'",[],function(txt2, results2){
                  //var conten2 ="";
                  for (var i = 0; i < results2.rows.length; i++) {
                      var r = results2.rows.item(i);
                      console.log(r);
                      lisContOptionModifi(r.contenido,r.id_column,r.id);
                  }   
              });
        } 
    });
  });

}

function lisSaveReportFirma(id,nombre)
{
  $('#datosSAveReporte ul').append('<li id="listDatos_'+id+'">'+nombre+': <div id="firmaGenerate"><canvas class="pad"></canvas></div></li>'); 
}

function lisSaveReport(id,nombre)
{
   $('#datosSAveReporte ul').append('<li id="listDatos_'+id+'">'+nombre+'<span></span></li>');
}

function lisSaveReporteimg(id,nombre)
{
 $('#datosSAveReporte ul').append('<li id="listDatos_'+id+'">'+nombre+': <div id="galeriaFotos"></div></li>'); 
}

function dataListResp(id,contenido)
{
    if (contenido == '0') {
        contenido = 'no';
    }else if (contenido =='1') {
        contenido = 'si';
    }else if (contenido == 'no_firma_disponible.jpg') {
        contenido ='Sin firma';
    }
    $("#listDatos_"+id+" span").empty();
    $("#listDatos_"+id+" span").append(': '+contenido);    
}

function dataListRespImg(id,contenido,id2)
{ 
    console.log(contenido+" "+id);
    $("#listDatos_"+id+" #galeriaFotos").append("<div class='jb_fotosGaleri'><span onclick='delFotoGaleri("+id2+");'></span><img src=\'"+contenido+"\' id='"+id2+"'></div>");
}

function dataListFirma(id,contenido)
{
    $("#listDatos_"+id+" #fimraGenerate canvas").empty(); 
     $('#listDatos_'+id+' #firmaGenerate').signaturePad({displayOnly:true}).regenerate(contenido);

}

//generamos el formulario la estructura de los li
function lisOptionModifi(nombre,id,tipo,id_table,position)
{ 
    var tip = "";
    switch(tipo){
        case '1' :
          tip= '<div style="width:100%;"><input type="text" id="respReport_'+id+'" class="jbSelect" placeholder="Escriba"></div>';
        break;
        case '2': 
              switch(id)
              {
                case '559ad52febe79':
                case '559ad53094514':
                case '559ad5312e0c5':
                case '559ad531c0182':
                case '559ad5325e676':
                case '559ad532efdaf':
                case '559ad53399ab5':
                case '559ad5345175e':
                case '559ad534e64c8':
                case '559ad53580bd9':
                case '559ad536521d1':
                case '559ad53709454':
                case '559ad537a90ff':
                case '559ad53862d0c':
                case '559ad5392b167':
                  var func = 'onclick="valSiNo(\''+id+'\',1);"';
                  var func2 = 'onclick="valSiNo(\''+id+'\',2);"';
                break;
                case '558336d8a7a78':
                case '5581ad144a90e':
                case '558336d8a6560':
                case '558336d8a7c1b':
                case '558336d8a71ab':
                case '558336d8a5e71':
                case '558336d8a6e25':
                case '558336d8a63a4':
                case '558336d8a61e4':
                case '558336d8a68df':
                case '558336d8a7703':
                case '558336d8a671e':
                case '558336d8a6037':
                case '558336d8a6aa3':
                case '558336d8a6c66':
                case '558336d8a7537':
                case '558336d8a7375':
                case '558336d8a6fe8':
                    var func = 'onclick="showRowsInvert(1,\''+id+'\');"';
                    var func2 = 'onclick="showRowsInvert(2,\''+id+'\');"';
                break;
                default:
                    var func = 'onclick="showRows(1,\''+id+'\');"';
                    var func2 = 'onclick="showRows(2,\''+id+'\');"';
                break
              }
              
          tip = '<input  type="text" id="respReport_'+id+'" class="respSiNo" style="display:none;" value="no"><div class="conten-block jbContentBlock"><div class="row"><div class="col-100 jbBtnBlock"><input type="button" value="NO" id="btn1" '+func+' class="button button-fill color-blue"></div><div class="col-100 jbBtnBlock"><input type="button" value="SI" id="btn2" '+func2+' class="button button-fill color-gray"></div></div></div>';
        break;
        case '3' : 
              switch(id)
              {
                case '5511abc517086':
                case '53fd07ab6863d':
                case '556f4118d399a':
                case '55142ceba27a6':
                case '5511e3468fbfd':
                case '5511e3468f80d':
                case '5511e3468f41e':
                case '55142ceba37f5':
                case '5511e3468ec2d':
                case '5511e3468e7bf':
                case '5511e3468e3c4':
                case '552e97b2dbff8':
                case '552e9cb6da079':
                case '53fd0456efe5b':
                case '53fcfee5e19a6':
                case '53fcfd563df53':
                case '54c6adc415339':
                case '54c6c0ed3ef2f':
                case '54c6c1014efde':
                case '54c6c11725e82':
                case '54c6c12166898':
                  var option = 'onchange="verificaselec(this.value);"';
                break;
                case '558336d8a7a0f':
                case '5581ad1332ac7':
                case '558336d8a64f1':
                case '558336d8a7bb2':
                case '558336d8a7136':
                case '558336d8a5dc0':
                case '558336d8a6db0':
                case '558336d8a6332':
                case '558336d8a6174':
                case '558336d8a6868':
                case '558336d8a768e':
                case '558336d8a66ab':
                case '558336d8a5fcd':
                case '558336d8a6a2c':
                case '558336d8a6bf6':
                case '558336d8a74c2':
                case '558336d8a7303':
                case '558336d8a74c2':
                  var option = 'onchange="optionSelect(this.id);"';
                break;
                default:
                  var option ='';
                break;
              }
         
          tip = '<div style="width:100%" ><select id="respReport_'+id+'" class="jbSelect" '+option+'><option>Selecciona una opción</option></select></div>';
        break;
        case '4':
          tip = '<div style="width:100%;"><textarea type="text" id="respReport_'+id+'" placeholder="Escriba"></textarea></div>';
        break;
        case '9': 
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        case '6':
          tip = '<div style="width:100%;"><input type="number" class="jbSelect" id="respReport_'+id+'" placeholder="Escriba"></div>';
        break;
        case '5':
          tip = '<label style="width:100%;" class="label-checkbox item-content"><input type="checkbox" id="respReport_'+id+'" value="0" onclick="habilita(this.id);"><div class="item-media"><i class="icon icon-form-checkbox"></i> </div></label>';
        break;
         case '7':
          tip = '<div onclick="capturePhotoEdit();" class="jbPhotoEdit"><div class="jbIconCam"><i class="icon icon-form-camera"></i></div><div class="fotoCapCam" ><input type="hidden" id="respReport_'+id+'" class="campFotoValue"></div></div>';
        break;
        /// case '10'  no_firma_disponible.jpg
        case '10':
          tip= '<div style="width:100%;"><input type="hidden" class="jbSelect" id="respReport_'+id+'" value="firma_'+localStorage['idrow2'].toLowerCase()+'.png" ></div>';
           var forma   =' <form method="post" action="" class="sigPad">'
                        +'      <ul class="sigNav">'
                        +'        <li class="drawIt"><a href="#draw-it" >Firma en el Cuadro</a></li>'
                        +'        <li class="clearButton"><a href="#clear">Limpiar</a></li>'
                        +'      </ul>'
                        +'      <div class="sig sigWrapper" style="width: 300px;  height: 115px;  overflow: hidden;">'
                        +'        <div class="typed"></div>'
                        +'        <canvas class="pad" style="width: 100%;  background-color: #fff;"></canvas>'
                        +'        <input type="hidden" name="output" id="jsonfirma_'+id+'.png" class="output">'
                        +'      </div>'
                        +'    </form>';
                        $('#jb_firma_edit').empty();
                        $('#jb_firma_edit').append(forma);
                        $(".sigPad").signaturePad({drawOnly:true});
          //'<div style="width:100%;"><span>La actividad de firmar no esta disponible por el momento, pero no te preocupes puedes continuar con tu reporte sin contratiempos.</span><input type="hidden" value="no_firma_disponible.jpg" id="respReport_'+id+'"></div>';
          break;

        default :
          tip = tipo;
        break;
    }

    if (id =='551c6389cc9c4'|| id=='551c638a7a89d' || id == '53fd115815d2f' || id == '53fd115815e6c' || id == '53fd115815d2f' || id == '53fd115815e6c' || id == '53fd2033ba2cd'|| id == '53fd2033ba442'|| id == '53fd21a81df89' || id =='53fd21a81e0cb' || id == '53fd1a1a8c70e' || id=='53fd1a1a8c8af' || id == '53fd13a76b26d' || id =='53fd13a76b406' || id =='53fd0b17eb19b' || id == '53fd0b17eb385'|| id =='53fd0d7ab57dd' || id =='53fd0d7ab594e' || id=='53fd0e475ff79' || id =='53fd0e47600fb' || id == '53fd0a5e6d0e8' || id =='53fd0a5e6cf72' || id == '53fd0a5e6d0e8' ) {
        tip = '<div style="width:100%;"><input type="number" class="jbSelect" id="respReport_'+id+'" placeholder="Escriba numero"></div>';
      };
    if (nombre == 'Reactivo ...') {
      nombre = 'Nota';
    }

                        /* $("#listVistaReporEdit ul").append('<li id="id_reporte_form_'+id+'" data="'+position+'" type="'+tipo+'">'+
                          '<div class="item-inner" style="display:block;">'+
                              '<div class="item-title jbCapPhoto" id="campReport_'+id+'" >'+nombre+'</div>'+
                            tip+
                        '</div></li>');*/

   if (tipo != 10) {
      var lista = '<li id="id_reporte_form_'+id+'" data="'+position+'" data-type="'+tipo+'">'+
                  '<div class="item-inner" style="display:block;">'+
                  '<div class="item-title jbCapPhoto"  id="campReport_'+id+'">'+nombre+'</div>'+tip+'</div></li>';
    }
    return lista;

   var ids = ['55afdd95ed46e','55afdd95ed4dd','55afd7c723923','55afd7e013437','55afdd95ecdaa','55afdd95ece16','55afdd95ecf5d','55afdd95ecfc9','55afdd95ed10d','55afdd95ed178','55afdd95ed2bc','55afdd95ed329','5511ab1987721','556f31ba3527b','54fe5f349ca76','54fe5f4978939','55772c6af15b3','556f32328a78a','55772c814c5f5','556f324b4467a','55772c8adb165','556f3287a2025','55772cbc29412','556f32cccbdd3','55772cc4ab103','556f361379dd5','55772cccb6382','556f3645b7b83','55772cd5c2d98','5511ab19ed1b3','53fd0b17eaf39','5511c96733ddc','5511c96733e40','5511c96733d77','559d33d11e24c','559d33d2003f2','559d33e4b5886','559d342a5295a','559d342b8e7d0','559d342cba659','559d346f21860','559d346f23e37','559d346fa3847','559d3d8110eef','559d3d827977b','559d3d835f921','53fd0e475fdc8','53fd0e475ff79','53fd0e47600fb','53fd0e4760258','545d0c4ded301','545d0c2c736b2','53fd0b17eb19b','53fd0b17eb385','53fd0b17eb538','545d0c4ded1cc','545d0c2c7354d','53fd0d7ab5658','53fd0d7ab57dd','53fd0d7ab594e','53fd0d7ab5abd','545d0c4ded269','545d0c2c735ff','545d0c2c73323','53fd13a76b0be','53fd13a76b26d','53fd13a76b406','545d0c4ded09f','53fd13a76b5b9','545d0c2c733de','53fd0a5e6cddc','53fd115815bde','53fd115815d2f','53fd115815e6c','53fd115815faf','545d0c4ded398','545d0c2c73766','53fd2033ba442','53fd2033ba584','545d0c4deced9','545d0c2c731df','53fd0a5e6d0e8','53fd21a81e2a6','545d0c4decf71','545d0c2c73279','53fd1a1a8c54a','53fd1a1a8c70e','53fd1a1a8c8af','53fd1a1a8ca1c','545d0c4ded008','53fd0a5e6cf72', '5511ab1a8f105','5511c967331a6','5511c9673320f','5511c96733274','5511c96733b81','5511c96733be6','5511c96733c4d','5511c9673397d','5511c967339e2','5511c96733a4c','5511c96733787','5511c967337ee','5511c96733853','5511c96733592','5511c967335f3','5511c96733657','5511c967333a1','5511c9673340b','5511c9673346f','552e95ff838b2','552e9600f26af','552e9600f2540','552e952218ee9','552e95241b680','552e95252b0d1','5511c96733f6e','5511c96733fd3','5511c96734036','559d33577669d','559d335890fa3','559d335a40a32','559d2b7e9fd02','559d2b80213f7','559d2b8ce4cb5','559d2c9f99764','559d2ca093d0e','559d2ca209204','559d2f57854fd','559d2f5876061','559d2f5a82c1e','559d2fac6c54a','559d2fad3bfac','559d2fae5452a','559d313c3db39','559d313d0e8db','559d313e6c818','559d3280b3bcc','559d32815656c','559d32828ddf7','559d33079187d','559d330855ff9','559d33098ec73','559d33577669d','559d335890fa3','559d335a40a32'];
     $.each(ids, function(k,v){
        if ($('#id_reporte_form_'+v).length != 0) {
          $('#id_reporte_form_'+v).hide();
          //console.log($('#id_reporte_'+v));
        }
   });
}

/// generamos los contenidos de los campos
function lisContOptionModifi(contenido,idColumn,idRow)
{ 
   $('#id_reporte_form_'+idColumn+' select').append('<option value="'+idRow+'">'+contenido+'</option>');
}

function delFotoGaleri(id)
{
    var ruta = $('#galeriaFotos #'+id).attr('src');
    console.log(ruta);
    window.db.transaction(function(txt){
      //console.log("delete from jb_fotos_reportes where  foto=\'"+ruta+"\';");
        txt.executeSql("delete from jb_fotos_reportes where  foto=\'"+ruta+"\';",[],function(txt,resul){ 
          setTimeout(function(){
              infoReporteEdit(localStorage['idtabla2'],localStorage['nombrepor'],localStorage['idrow2']);
              //console.log(localStorage['idtabla2'],localStorage['nombrepor'],localStorage['idrow2']);
          },500);
        });
    });
}


function eliminafoto(id)
{
    $('#foto_seccion_'+id).remove();
}

function actualizarReport()
{

  var respColum = $('[id^=respReport_]');
  //var idPlantilla = localStorage['idPlantilla_activa'];
  var id_table = localStorage['idtabla'];
  var id_repor = localStorage['idreporte'];
  var id_row = localStorage['id_row'];
  var id = localStorage['idrow2'];
  var status_row = 1;

  $.each(respColum,function(){
        var res =  $(this).attr('id').replace('respReport_','');
        var text = $('#respReport_'+res).val();
        var position = $('#id_reporte_form_'+res).attr('data');
        var tipo = $('#id_reporte_form_'+res).attr('type');
        if (text =='si') {
          text ='1';
        }
        if (text == 'no') {
          text ='0';
        }
          if(text != "") {
              console.log("segundo if->"+text)
              var  conten = text;
              //console.log("UPDATE jb_dinamic_tables_rows SET contenido=\'"+conten+"\' WHERE  and id_reporte=\'"+id_repor+"\' and id_column=\'"+res+"\' and status='1'");
              window.db.transaction(function(txt){
                if (tipo == '10') {
                  var firma = $('#jsonfirma_'+res).val();
                  txt.executeSql("UPDATE jb_firmas_reportes SET firma=\'"+firma+"\', nombre=\'"+conten+"\' where id_reporte=\'"+id_repor+"\' and id=\'"+id+"\';");                      
                }else{
                  txt.executeSql("UPDATE jb_dinamic_tables_rows SET contenido=\'"+conten+"\' WHERE id_reporte=\'"+id_repor+"\'and id_column=\'"+res+"\' and status='1';");      
                }
                if (tipo == "7" || tipo == "9") {
                   var sharefoto = $('[id^=fotogaleria_]');
                   $.each(sharefoto,function(){
                      var idsfoto = $(this).attr('id').replace('fotogaleria_','');
                      var rutafoto = $('#seccioneditin #fotogaleria_'+idsfoto).val();
                      console.log(rutafoto);
                      txt.executeSql("INSERT INTO jb_fotos_reportes(id_table,id_reporte,id_row,foto,id_column) VALUES(\'"+id_table+"\',\'"+id_repor+"\',\'"+id_row+"\',\'"+rutafoto+"\',\'"+res+"\');");                   
                   });  
                }
              });
          }
  });

  myApp.alert('Información Actualizada');
  $('#seccioneditin #jb_fotos_galery').empty();
      setTimeout(function(){
        infoReporteEdit(localStorage['idtabla2'],localStorage['nombrepor'],localStorage['idrow2']);
        console.log(localStorage['idtabla2'],localStorage['nombrepor'],localStorage['idrow2']);
      },500);
}


function uploadSuccess(r)
{
   // alert("codigo"+ r.responseCode);
    var fotototal =localStorage['totalfoto']-1;
   if (fotototal == localStorage['countfoto']) {
    //alert(localStorage['totalfoto'] +" "+localStorage['countfoto']);
      if ( localStorage['rowsresul'] == 'ok' && localStorage['mantenimiento'] =='ok' && localStorage['posteo'] == 'ok') {
            myApp.hidePreloader();
            myApp.alert('Reporte publicado Correctamente');
            eliminaReporte(localStorage['idreporte']);
            localStorage.removeItem('totalfoto');
            localStorage.removeItem('countfoto');
            localStorage.removeItem('posteo');
            localStorage.removeItem('mantenimiento');
            localStorage.removeItem('rowsresul');
            localStorage.removeItem('jb_reporte_ubicacion');
            saveCordenadas(2);
            myApp.alert('Favor de regresar al inicio.');
            ///showalerts('',2);
            //$('#regresamainpage')[0].click();
      }else
      {
        myApp.alert('Error en el sincronizado verifica tu reporte')
        myApp.hidePreloader();
        ///showalerts('',2);
      }
   }else
   {
    //alert(localStorage['totalfoto'] +"  eliminando->"+localStorage['countfoto']);
    localStorage.removeItem('countfoto');
   }
    //localStorage['archUpload']='ok';
}


function uploadFail(error)
{
    //alert("ocurrio un error: Codigo subida"+error.code);
    myApp.hidePreloader();
}

function showGpsPublica()
{
  $('#btnPublicar').show();
  $('#btnGps').show();
}

function backtodoor(e)
{
    //alert(e);
    if (e == 3) {
      $('#imgProfile').removeAttr('onclick');

      alert('BackDoor Activado. Puedes Publicar Ahora.');
      setTimeout(function(){$('#imgProfile').attr('onclick','backtodoor(3);');},400);
      
      var list = $('[id^=id_reporte_]');
      //console.log(list);
        $.each(list,function(){
            var data = $(this).attr('data');
            if (data == 0 || data == 1) {
                $(this).removeAttr('data');
                $(this).attr('data','2');
                if (typeof localStorage['jb_reporte_ubicacion'] === 'undefined') {
                    localStorage['jb_reporte_ubicacion']= '0_0';
                }else
                {
                  localStorage.removeItem('jb_reporte_ubicacion');
                  localStorage['jb_reporte_ubicacion']= '0_0';
                }
            }
        });
    }else
    {
      var suma = e+1;
      $('#imgProfile').removeAttr('onclick');
      $('#imgProfile').attr('onclick','backtodoor('+suma+');');
    }
}

function prePublicarActivida()
{
    var conexion = checkConnection();  
    var empresa = veriEmpresa(session.empresa);


   if($('#lista_reporte_sec').is(':visible')){


        //myApp.alert(conexion);
        if (conexion == 'Ersror') {
            $('#btnPublicar').removeAttr('href');
            myApp.alert('Error en su Conexion a internet');
        }else
        {

            if (empresa == 1) {
                  console.log(session.empresa);
                    $('#tit_sinc').empty();
                    $('#tit_sinc').append(localStorage['nombrePlantilla_activa']);

                  var padre = $('[id^=id_reporte_]');
                  var numpadr = $('[id^=id_reporte_]').length;
                  var totalpadre = parseInt(numpadr) * 2;
                  var cont=0;

                  $.each(padre,function(k,v){
                      var id = $(this).attr('id').replace('id_reporte_','');
                      var data = $(this).attr('data');
                        cont = cont + parseInt(data);

                  }); 
                      var restas = totalpadre-1;
                    if (cont <  restas ) {
                        myApp.alert("No has completado los reporte");
                    }else
                     {
                        $('#ligaPublica')[0].click();
                        $('#btnPublicar').attr('href','#publicaReport');
                        $('#btnPublicar').hide();
                        $('#textActividad').value='';
                    
                        //publicarActivida();
                    }
              }else
              {
                  $('#tit_sinc').empty();
                  $('#tit_sinc').append(localStorage['nombrePlantilla_activa']);
                   var padre = $('[id^=id_reporte_]');
                  var numpadr = $('[id^=id_reporte_]').length;
                  var totalpadre = parseInt(numpadr)*2;
                  var cont=0;

                  $.each(padre,function(k,v){
                      var id = $(this).attr('id').replace('id_reporte_','');
                      var data = $(this).attr('data');
                      cont = cont + parseInt(data);
                  }); 
                      var restas = totalpadre-1;
                    if (cont <  restas ) {
                        myApp.alert("No has completado los reportes ");
                    }else
                    {
                        $('#ligaPublica')[0].click();
                        $('#btnPublicar').attr('href','#publicaReport');
                        $('#btnPublicar').hide();
                        $('#textActividad').value='';
                        
                        //publicarActivida();
                    }
              }
        }
     }else
      {
        myApp.alert('Genera un reporte');
        $('#btnPublicar').removeAttr('href');
      }
}


function zincActividades()
{
  var textinput = $('#textActividad').val();

  if (textinput == "") {
    myApp.alert("Describe tu actividad");
  }else if (typeof localStorage['jb_reporte_ubicacion'] === "undefined") {
    myApp.alert("Registra tu ubicación");
  }else
  {
      myApp.showPreloader();

      $('#textActividad').val('');
      var empresa = veriEmpresa(session.empresa);

      var Url = "";
      if (empresa == 1) {
        Url = "https://www.jarboss.com/mobile/controller/JBPOST.php?module=reportes&source=sync&module=reportesios&source3=1&source4="+localStorage['jb_reporte_ubicacion'];
      }
      else{
        Url = "https://www.jarboss.com/mobile/controller/JBPOST.php?module=reportes&source=syncext&module=reportesios&source3=1&source4="+localStorage['jb_reporte_ubicacion'];
      }
      
      window.db.transaction(function(txt){
          txt.executeSql("SELECT * FROM jb_dinamic_tables_rows where id_reporte=\'"+localStorage['idreporte']+"\';",[],function(txs,result){
              //console.log(result.rows.length);
            
              var data1 = '[';
              
              for (var i = 0 ; i < result.rows.length; i++) {
                  var p = result.rows.item(i);
                  data1 +='{"id_table":"'+p.id_table+'","id_reporte":"'+p.id_reporte+'","id_row":"'+p.id_row+'","id_column":"'+p.id_column+'","id":"'+p.id+'","fecha":"'+p.fecha+'","contenido":"'+p.contenido+'","position":'+p.position+',"status":"'+p.status+'"}';
                  (i != result.rows.length-1) && (data1 +=',');
              }
                data1 += ']';
                var jsone = JSON.stringify(data1);

                        if (empresa ==1) {
                          var Nem = session.empresa;
                        }else
                        {
                          var Nem = '';
                        }
                      txt.executeSql("select * from jb_firmas_reportes where id_reporte=\'"+localStorage['idreporte']+"\';",[],function(tr,resp){
                            if (resp.rows.length>0) {
                                  for (var rw = 0; rw < resp.rows.length; rw++) {
                                    var g = resp.rows.item(rw);
                                         
                                        $.ajax({
                                          type:"POST",
                                          datatype:"JSON",
                                          url:"https://www.jarboss.com/AdminReportes/firma/convertirFirma.php",
                                          data:"firma="+g.firma+"&nomfirma="+g.nombre+"&lap="+Nem,
                                          success: function(server){
                                            console.log(server);
                                          }
                                        });
                                  };
                            }
                      });
              console.log(Url+" token="+session.token+"&source="+data1);
               $.ajax({
                       type:"POST",
                       datatype:"JSON",
                       url:Url,
                       data:"token="+session.token+"&source="+data1,
                       
                       success:function(server)
                       {
                       
                          console.log("primer ajax->"+server);
                          localStorage['rowsresul'] = server.status;
                          if (server.status == 'ok') {
                            
                              if (empresa == 1) {
                                Url2 = "https://www.jarboss.com/mobile/controller/JBPOST.php?module=reportes&source=sync&module=reportesios&source3=0&source4="+localStorage['jb_reporte_ubicacion'];
                              }
                              else{
                                Url2 = "https://www.jarboss.com/mobile/controller/JBPOST.php?module=reportes&source=syncext&module=reportesios&source3=0&source4="+localStorage['jb_reporte_ubicacion'];
                              }
                                window.db.transaction(function(txt){
                                  txt.executeSql("SELECT * FROM reporte_mantenimiento where id=\'"+localStorage['idreporte']+"\';",[],function(tx,result){
                                      
                                      var data1 = '[';
                                      
                                      for (var i = 0 ; i < result.rows.length; i++) {
                                          var p = result.rows.item(i);
                                          //console.log(p);
                                          //console.log(p.id_table+" "+p.id_reporte+" "+p.id_row+" "+p.id_column+" "+p.id+" "+p.fecha+" "+p.contenido+" "+p.position);
                                          data1 +='{"status":"'+p.status+'","resultado":"'+p.resultado+'","nombre":"'+p.nombre+'","id_usuario":"'+p.id_usuario+'","id_grupo":"'+p.id_grupo+'","id_plantilla":"'+p.id_plantilla+'","id":"'+p.id+'","fecha":"'+p.fecha+'"}';
                                          (i != result.rows.length-1) && (data1 +=',');
                                      }
                                        data1 += ']';
                                        var jsone = JSON.stringify(data1);

                                       $.ajax({
                                               type:"POST",
                                               datatype:"JSON",
                                               url:Url2,
                                               data:"token="+session.token+"&source="+data1,
                                               
                                               success:function(server)
                                               {
                                                    console.log("segundo ajax->"+server);
                                                    localStorage['mantenimiento']= server.status;
                                                    if (server.status == 'ok') {
                                                        var empresa = veriEmpresa(session.empresa);
                                                        var url2=""; 
                                                        if (empresa ==1) {
                                                            url2 = "https://www.jarboss.com/mobile/controller/JBPOST.php?module=grupo&type=newmsg";
                                                        }else
                                                        {
                                                           url2="https://www.jarboss.com/mobile/controller/GEX.php";
                                                        }

                                                        if (empresa == 1) {
                                                              var data="token="+session.token+"&moviluser="+localStorage['idusuario']+"&movilemp="+localStorage['idempresa']+"&modo=0&id_grupo="+localStorage['idGrupo']+"&ubicacion="+localStorage['jb_reporte_ubicacion']+"&id_reporte="+localStorage['idreporte']+"&txtInput="+textinput;
                                                              console.log("dtos->"+data)                      
                                                        }else{
                                                             var data ="token="+session.token+"&cnt=1&opt=0&opcion=0&cabecera=''&ubicacion="+localStorage['jb_reporte_ubicacion']+"&id_result="+localStorage['idreporte']+"&comentario="+textinput+"&id_usuario="+localStorage['idusuario']+"&id_grupo="+localStorage['idGrupo']+"&ids_simples=''&adjuntos=''&id_user_session="+localStorage['moviluser'];             
                                                             onsole.log("dtos->"+data)   
                                                        }
                                                          $.ajax({
                                                             type:"POST",
                                                             datatype:"JSON",
                                                             url:url2,
                                                             data:data,
                                                             
                                                             success:function(server)
                                                             {
                                                                //alert("postguardado");
                                                                console.log("tercer ajas->"+server);
                                                                localStorage['posteo'] = server.status;
                                                                if (server.status == 'ok') {
                                                                    //myApp.alert("sincronizando fotos..");
                                                                    ///showalerts('incronizando fotos..',1)
                                                                    window.db.transaction(function(txt){
                                                                       txt.executeSql("select * from jb_fotos_reportes where id_reporte=\'"+localStorage['idreporte']+"\';",[],function(tx,result){
                                                                            var option = new FileUploadOptions();
                                                                            option.fileKey="file";
                                                                            option.mimeType="image/jpeg";
                                                                            option.chunkedMode= false;
                                                                            var params = new Object();
                                                                            option.params= params;
                                                                            var empresa = session.empresa;
                                                                           
                                                                            var ft = new FileTransfer();
                                                                            var nombrefoto;

                                                                            if (result.rows.length == 0) {
                                                                              localStorage['totalfoto']=1;
                                                                              localStorage['countfoto']=0;
                                                                              uploadSuccess();
                                                                            }else if (result.rows.length >0){
                                                                                  localStorage['totalfoto']=result.rows.length
                                                                                  //alert("primer conteo->"+result.rows.length);
                                                                                for (var i = 0 ; i < result.rows.length; i++) {
                                                                                      localStorage['countfoto']=i;
                                                                                      var p = result.rows.item(i);
                                                                                      nombrefoto = p.foto.substr(p.foto.lastIndexOf('/')+1);
                                                                                      option.fileName=p.foto.substr(p.foto.lastIndexOf('/')+1);
                                                                                      var namefull = nombrefoto;
                                                                                          namefull.toLowerCase();

                                                                                       ft.upload(p.foto, "https://www.jarboss.com/mobile/controller/procesarUploadMicro.php?lap="+empresa+"&ruta=grupo&namefile="+namefull+"", uploadSuccess, uploadFail, option);
                                                                                  }
                                                                            }
                                                                        });
                                                                    });
                                                                }
                                                             },
                                                             error: function(){
                                                             //alert(' no success');
                                                             }
                                                          });
                                                    }   
                                               },
                                               error: function(){
                                               //alert(' no success');
                                               }
                                          });
                                  });
                                });
                          }
                       },
                       error: function(){
                       //alert(' no success');
                       }
                  });
          });
      });       
  }
}



function veriEmpresa(empresa)
{
    empresa = empresa.toLowerCase();
    var resp =0;
    switch(empresa)
    {
      case "checkpt.net":
      case "soriana.com":
      case "seguridadsps.com.mx":
      case "jbv3.com":
      case "seguridadconfiable.com":
      case "alteadesarrollos.com":
      case "jugosa.com.mx":
      case "magna.com":
          resp = 1;
          break;
      default:
           resp=0;
           break;
    }
    return resp;
}


function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Error';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'Error';

    return states[networkState];
    //return stado;
}

function showalerts(str,opt)
{
  console.log(str+""+opt);
  if (opt ==1) {
    $('#showalert div').empty();
    $('#showalert .jbDialogo span').remove();
    $('#showAlert').show();
    $('#showAlert div').append('<span>'+str+'</span>');

  }else if (opt ==2) {
    $('#showAlert').hide();
    $('#showalert div').empty();
  }
}

