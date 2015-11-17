function scan(id)
{
    //localStorage.removeItem('LocalData');
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if(!result.cancelled)
            {
                if(result.format == "QR_CODE")
                {
                        
                        var data = result.text.split('_');
                        var idPlantilla =   data[0];
                        var idReporte   =   data[1];
                        var nombre      =   data[2];
                        var cordenadas  =   data[3];
                        
                        if (idPlantilla == localStorage['idPlantilla_activa'] && idReporte == localStorage['idtabla']) 
                        {
                            $('#respReport_'+id).val(nombre);   
                            var distancia = haversine(cordenadas);
                            //alert(parseInt(distancia));
                            distancia = Math.round(distancia*1)/1;
                            var list = $('[id^=id_reporte_form_]');
                            $.each(list,function(k,v){
                                var id = $(this).attr('id').replace('id_reporte_form_','');
                                var data = $(this).attr('data');
                                var tipo = $(this).attr('data-type');
                                if (data == 4 && tipo == 1) {
                                    $('#respReport_'+id).val(distancia);
                                }
                                if (data == 5 && tipo == 2) {
                                    if (distancia > 500) {
                                        $('#respReport_'+id).val('no');
                                    }else if (distancia <= 500) {
                                        $('#respReport_'+id).val('si');
                                    }
                                }
                            }); 
                        }else{
                            alert('no son iguales '+idPlantilla +" "+idReporte);
                        }
                        /*
                        var data = localStorage.getItem("LocalData");
                        console.log(data);
                        //data = JSON.parse(data);
                        //data[data.length] = [name, value];

                        //localStorage.setItem("LocalData", JSON.stringify(data));

                        alert("Done");
                        $("table#allTable tbody").empty();

                        var data2 = localStorage.getItem("LocalData");
                        console.log(data2);
                        data2 = JSON.parse(data2);
                            */
                   
                }
            }
        },
        function (error) {
            alert("Scanning Fallido: " + error);
        }
   );
}

//de grados a radianes
function radians(grados){
    return grados * Math.PI / 180;
}
function grados(radianes)
{
    return radianes * 180 / Math.PI;
}
function haversine(cordenadas) {
         var cord     = cordenadas.split(',')
       var cord2    = localStorage['jb_reporte_ubicacion'].split('_');
       var lat2     = cord[1];
       var lon2     = cord[0];
       var lat1     = cord2[0];
       var lon1     = cord2[1];
       //var radians = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
       var lat1 = radians(lat1), lon1 = radians(lon1), lat2 = radians(lat2), lon2 = radians(lon2);
       var R = 6372.8; // km
       var dLat = lat2 - lat1;
       var dLon = lon2 - lon1;
        //alert(" = "+lat2+" - "+lat1+" , = "+lon2+" - "+lon1);
          
       var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
       var c = 2 * Math.asin(Math.sqrt(a));
       return R * c;
}






function qrChkReport()
{
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if(!result.cancelled)
            {
                if(result.format == "QR_CODE")
                {   
                    var data = result.text.split('_');
                    var idEmpresa =   data[0];
                    var idPlantillaAct   =   data[1];
                    var idTabla      =   data[2];
                    
                    if (idTabla == localStorage['idtabla'] && idPlantillaAct == localStorage['idPlantilla_activa'] && idEmpresa == localStorage['idEmpresa'])/* */ 
                    {   
                        if (typeof localStorage['report'] !== 'undefined') {
                            localStorage.removeItem('report');
                        }
                        localStorage['reportQr'] = idTabla;
                        $('#id_reporte_form_qr47').hide();
                        alert('Validado');
                    }else{
                        alert('Error en el Qr, No es el correcto.');
                        //alert(result.text)
                        //alert('no son iguales idPlantilla Qr->'+idTabla +" localStorage-> "+localStorage['idtabla']+" qr idReporte-> "+idPlantillaAct+" localStorage->"+localStorage['idPlantilla_activa']+" "+idEmpresa+" localStorage-> "+localStorage['idEmpresa']);
                    }
                }
            }
        },
        function (error) {
            alert("Scanning Fallido: " + error);
        }
   );
}