    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }


function capturePhotoEdit()
{
    navigator.camera.getPicture(onSuccess, onFail, { quality: 30, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: false });
}



function onSuccess(imageURI)
{
  //alert("primer ruta guardadad->"+imageURI);//localStorage.removeItem('fotopop');//var nomfoto = imageURI.substr(imageURI.lastIndexOf('/')+1);
    //var idrpp = localStorage['idreporte'].toLowerCase();//localStorage['fotopop']= imageURI;
   //$(".fotoCapCam .campFotoValue").val(idrpp+"_"+nomfoto);//$("#option_btn_img #tu_id").attr("src",imageURI).show();
    localStorage.removeItem('fotopop');
   $('#option_btn_img #tu_id').removeAttr('src');
    moverPhoto(imageURI);
}

function onFail(message) {
    
    //alert('No se tomo ninguna foto:' + message);
    
}




/*funcion para mover las fotos en el app y crear un directorio*/
/////////////////////////////////////////////////////////////////////////////////
function moverPhoto(file){
    //alert(file);
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
    //window.resolveLocalFileSystemURI( file , resolveOnSuccess, resOnError);
}



function resolveOnSuccess (entry){
  //alert('segun resolvio la ruta '+entry.name);
        var d = new Date();
        var n = d.getTime();

        //new file name
        var idrpp = localStorage['idreporte'].toLowerCase();

        var newFileName = idrpp+"_"+n+".jpg";
        var myFolderApp = "jarbossWorkImg";

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {

                fileSys.root.getDirectory( myFolderApp,
                    {create:true},
                    function(directory) {
                        entry.moveTo(directory, newFileName, function(new_entry){
                            path = new_entry.fullPath;
                            url = new_entry.toURL();

                            console.log(path+"\n"+url);

                            //alert( "ruta obtenida->"+path+"\n una url->"+url );
                            localStorage['fotopop']= url;
                            var nombres = $('.fotoCapCam .campFotoValue').val();

                            if (nombres=='') {
                              $(".fotoCapCam .campFotoValue").val(newFileName);
                            }else 
                            {
                              nombres= nombres+','+newFileName;
                              $(".fotoCapCam .campFotoValue").val='';
                              $(".fotoCapCam .campFotoValue").val(nombres);
                            }
                            //myApp.alert('img  with="90%" id='+idrpp+'_'+n+' src='+url+'');
                            if ($("#seccionprincipal #jb_fotos_galery").is(':visible')) {
                                var ides='#seccionprincipal';
                            }else if ($("#seccioneditin #jb_fotos_galery").is(':visible')) {
                                var ides='#seccioneditin';
                            }
                            //alert(ides);
                            if ($('#'+idrpp+'_'+n).length == 0) {
                                $(ides+' #jb_fotos_galery').append('<div id="foto_seccion_'+n+'" class="jb_divfotogaleria"><span onclick="eliminafoto('+n+');" class="jb_suprfoto"></span><img  with="90%" id="'+idrpp+'_'+n+'" src="'+url+'"><input type="hidden" id="fotogaleria_'+n+'" value="'+url+'"></div>');
                            }
                              
                            

                        }, resOnError);
                    },
                    resOnError);
            },
            resOnError);
    }

function resOnError (error) {
        alert('Error en la ubicacion'+error.code+': '+error.message);
    }

function  removePhoto(entry)
{

  //var relativeFilePath = "MyDir/file_name.png";
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){

      fileSystem.root.getFile(entry, {create:false}, function(fileEntry){
          fileEntry.remove(function(file){
              console.log("File removed!");
              alert("archivo eliminado");
          },function(){
              console.log("error deleting the file " + error.code);
              alert("error al eliminar archivo");
              });
          },function(){
              console.log("file does not exist");
              alert("archivo no exite")
          });
      },function(evt){
          console.log(evt.target.error.code);
  });
}


/*
//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry){
    
    var d = new Date();
    var n = d.getTime();
    //new file name
    var newFileName = n + ".jpg";
    var myFolderApp = "jarbossWorkImg";
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
                             //The folder is created if doesn't exist
                             fileSys.root.getDirectory( myFolderApp,
                                                       {create:true, exclusive: false},
                                                       function(directory) {
                                                       entry.moveTo(directory, newFileName,  successMove, resOnError);
                                                       },
                                                       resOnError);
                             },
                             resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    //I do my insert with "entry.fullPath" as for the path
    
    var rutaImg= "file://"+entry.fullPath;
    alert(rutaImg);
    $('#option_btn_img #tu_id').removeAttr('src');
    $("#option_btn_img #tu_id").attr("src",rutaImg).show();
    $(".campFotoValue").val(rutaImg);
    
    
   /* var read = newFileReader();
    read.onloaden= function(evet){
        alert(evet.target.result);
    }
    read.readAsDataURL(entry);
    */
  /*
}

function resOnError(error) {
    alert(error.code);
}

*/










/* invocas desde cualquier elemento con onclick capturePhotoEdit*/
/* muestra la foto tomado agregando la siguiente linea "<img style='width:100%;display:none' id='tu_id' src='' />" */
/*
*/







