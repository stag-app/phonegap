var count = 0;

var minDeg = 60;
var minVer = 10;

var $nfcBtn = $('#nfc');
var $gyroBtn = $('#gyro');

document.addEventListener('deviceready', function(){
    $nfcBtn.click(onTagDiscovered);
    $gyroBtn.click(onOpen);

    if(nfc && nfc.enabled){
        nfc.enabled(function(){
            nfc.addTagDiscoveredListener(onTagDiscovered);
            $nfcBtn.hide();
        }, function(){
            nfc.showSettings();
        });
    }

    if(window.DeviceOrientationEvent){
        window.addEventListener('deviceorientation', orientationCallback, false);
    }

}, false);

function onTagDiscovered(){
    count=0;
    $("h1").text(count);
}

function onOpen(){
    count++;
    $("h1").text(count);
}

var open = 0;

function orientationCallback(event){
    var beta = event.beta;

    if(beta) $gyroBtn.hide();

    if(open != 1 && event.beta > minDeg + minVer){
        open = 1;
        onOpen();
    }
    else if(open != 0 && event.beta < minDeg){
        open = 0;
    }
}