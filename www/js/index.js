document.addEventListener('deviceready', function(){
    $('#deviceready').find('.event').toggle();
    if(nfc && nfc.enabled){
        nfc.enabled(function(){
            $("#nfc").find('.event').toggle();
        }, function(){
            nfc.showSettings();
        });
    }
}, false);