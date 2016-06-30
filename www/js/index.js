var count = 0;

var minDeg = 40;
var minVer = 30;

var $nfcBtn = $('#nfc');
var $gyroBtn = $('#gyro');

var BASE_URL = "https://stag-api.herokuapp.com";

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

    $(".count").sevenSeg({ digits: 2, value: 0 });

    $("#up").click(onOpen);
    $("#down").click(onMinus);

}, false);

function onTagDiscovered(event){
    count=0;
    $(".count").sevenSeg({ value: count });
    fetch(BASE_URL + '/api/nfc?id='+event.tag.id.join('_'));
}

function onOpen(){
    count++;
    $(".count").sevenSeg({ value: count });
    fetch(BASE_URL + '/api/setCount?count='+count);
}

function onMinus(){
    if(count == 0) return;
    count--;
    $(".count").sevenSeg({ value: count });
    fetch(BASE_URL + '/api/setCount?count='+count);
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