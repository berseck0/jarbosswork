function getCurrentPosition()
{
    alert("buscando")
    setTimeout(function(){
        //getCurrentPosition
        navigator.geolocation.watchPosition(localizado, noLocalizado);
    },400);
    $('#btnGps').hide();
    $('#btnPublicar').hide();
}

function nuevaPositiongps()
{   
    $('body #bntGpsRenueva').removeAttr('onclick');
    alert('Reubicando..');
    navigator.geolocation.watchPosition(localizado, noLocalizado);
    
    setTimeout(function(){$('body #bntGpsRenueva').attr('onclick','nuevaPositiongps()');},300);     
}

function localizado(pos) {
    alert('encontrado')
    var lat = pos.coords.latitude;      
    var lon = pos.coords.longitude; 
    //alert(lat + " <-lat lon-> "+lon);
   
    $('body #CordMaps').attr('onclick','saveCordenadas(1,'+lat+','+lon+')');
    //localStorage['jb_reporte_ubicacion'] = pos.coords.longitude+'_'+pos.coords.latitude;
    //$('#btnGps').attr('style','backgroudn-color:rgb(105,234,105);padding:0px 5px;');
        var divmap = document.getElementById('muestra_map');
        var mapas;
        var mark;
        var place = new google.maps.LatLng(lat,lon);
       // divmap.append('holaa');
        var mapsOption = {
            center: place,
            zoom:16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    
        //el mapa y su ubicacion
        mapas = new google.maps.Map(divmap, mapsOption);
        //el puntero dela ubicacion
        mark = new google.maps.Marker({
            position:place,
            map:mapas,
            draggable: true
        });
}

// onError Callback receives a PositionError object
//
function noLocalizado(error) {
    console.log(error);
       // $("#jb_reporte_ubicacion_error2").show();
}



function skipLocationStep()
{
    localStorage['jb_reporte_ubicacion'] = '0_0';
}

