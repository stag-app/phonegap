var count = 0;

document.addEventListener('deviceready', function(){
    $('#deviceready').find('.event').toggle();
    if(nfc && nfc.enabled){
        nfc.enabled(function(){
            $("#nfc").find('.event').toggle();
            nfc.addTagDiscoveredListener(onTagDiscovered);
        }, function(){
            nfc.showSettings();
        });
    }
}, false);

function onTagDiscovered(){
    count++;
    $("h1").text(count);
}