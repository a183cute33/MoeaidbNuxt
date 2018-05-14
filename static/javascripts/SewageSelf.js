'use strict';

var WTPArray = [],
    IndParkArray = [],
    map,
    OverlayWater,
    OverlayGroundwater,
    markers,
    interval,
    infowindow = null;

function initMap() {
    blockUI();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        styles: [{
            elementType: 'geometry',
            stylers: [{
                color: '#242f3e'
            }]
        }, {
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#242f3e'
            }]
        }, {
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#746855'
            }]
        }, {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#d59563'
            }]
        }, {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#d59563'
            }]
        }, {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{
                color: '#263c3f'
            }]
        }, {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#6b9a76'
            }]
        }, {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{
                color: '#38414e'
            }]
        }, {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#212a37'
            }]
        }, {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#9ca5b3'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{
                color: '#746855'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#1f2835'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#f3d19c'
            }]
        }, {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{
                color: '#2f3948'
            }]
        }, {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#d59563'
            }]
        }, {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{
                color: '#17263c'
            }]
        }, {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#515c6d'
            }]
        }, {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#17263c'
            }]
        }]
    });
    var taiwan = new google.maps.LatLngBounds(new google.maps.LatLng(22.090256, 120.34362699999997), new google.maps.LatLng(25.114255999999997, 121.71682699999997));
    map.fitBounds(taiwan);
    infowindow = new google.maps.InfoWindow();

    infowindow.addListener('closeclick', function () {
        clearInterval(interval);
    });

    //水資源經緯度
    ajax("http://210.59.250.98/moeaidbAPI/v1/IndPark/IndPark?$format=JSON").then(function (c) {
        c.forEach(function (thing, index) {
            IndParkArray.push(new IndParkAndInfo(c[index].IndParkID, c[index].IndParkName.Zh_tw, c[index].Lat, c[index].Lon, 0));
        });
    }).then(function () {
        ajax("http://210.59.250.98/moeaidbAPI/v1/Wastewater/WTP?$format=JSON").then(function (c) {
            WTPArray = new Array(c.length);
            c.forEach(function (thing, index) {
                $("#WTP").append($("<option></option>").attr("value", c[index].WTPName.Zh_tw).text(c[index].WTPName.Zh_tw));
                var InParkName = IndParkArray.filter(function (x) {
                    return x.Id === c[index].IndParkID;
                });
                WTPArray.push(new WTPAndInfo(c[index].WTPID, c[index].WTPName.Zh_tw, InParkName[0].Name, c[index].Coordinate.Lat, c[index].Coordinate.Lon, c[index].WTPAddress));
            });
            WTPArray.forEach(function (thing, index) {
                markers = new google.maps.Marker({
                    position: {
                        lat: WTPArray[index].Lat,
                        lng: WTPArray[index].Lon
                    },
                    map: map,
                    title: WTPArray[index].WTPName
                });
                google.maps.event.addListener(markers, 'click', function (markers, index) {
                    return function () {
                        clearInterval(interval);
                        infowindow.close();
                        ajax('http://117.56.59.157:8085/THB/Internal/CCTV/' + WTPArray[index].WTPID).then(function (c) {
                            infowindow.setContent('<div style="width:300px;height:200px;"><img id="pic" src="' + c.RelayUrl + '//snapshot?SID=' + btoa(new Date().getTime()) + 'alt="Smiley face" width="100%" height="95%">\n</div>');
                            interval = setInterval(function () {
                                console.log(c.RelayUrl);
                                infowindow.setContent('<div style="width:300px;height:200px;"><img id="pic" src="' + c.RelayUrl + '//snapshot?SID=' + btoa(new Date().getTime()) + 'alt="Smiley face" width="100%" height="95%">\n</div>');
                            }, 3000);
                            infowindow.open(map, markers);
                        }).catch(function () {
                            alert('無影像');
                        });
                        // list(WTPArray[index].WTPID, WTPArray[index].WTPName, WTPArray[index].WTPAddress, WTPArray[index].InParkName);
                    };
                }(markers, index));
            });
            // 控制器
            var Control = document.getElementById('Overlay');
            Control.style.backgroundColor = '#fff';
            Control.style.border = '2px solid #999';
            Control.style.margin = '8px';
            Control.style.marginLeft = '20px';
            Control.style.paddingTop = '5px';
            Control.style.paddingRight = '5px';
            Control.style.paddingLeft = '10px';
            Control.style.paddingBottom = '5px';
            Control.style.lineHeight = '30px';
            Control.style.fontFamily = 'Roboto', 'sans-serif';
            map.controls[google.maps.ControlPosition.LEFT_TOP].push(Control);
            $.unblockUI();
        }).catch(function () {
            alert('無資料');
        });
    }).catch(function () {
        alert('無資料');
    });
};

//污水處理廠 查詢
$('button').click(function () {
    var search = $('#WTP').val();
    WTPArray.forEach(function (thing, index) {
        if (WTPArray[index].WTPName == search) {
            // list(WTPArray[index].WTPID, WTPArray[index].WTPName, WTPArray[index].WTPAddress, WTPArray[index].InParkName);
            mapCenter(WTPArray[index].Lat, WTPArray[index].Lon, 15);
        }
    });
});

//水污染管制區範圍圖
$('#OverlayWater').click(function () {
    if ($("#OverlayWater").is(":checked")) {
        if (OverlayWater != undefined) OverlayWater.setMap(null);
        var url = 'https://geose.epa.gov.tw/epagis/services/PublicWMS/MapServer/WMSServer?REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=12&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=EPSG:4326\n        &BBOX=' + map.getBounds().getSouthWest().lng() + ',' + map.getBounds().getSouthWest().lat() + ',' + map.getBounds().getNorthEast().lng() + ',' + map.getBounds().getNorthEast().lat() + '&WIDTH=' + map.getDiv().offsetWidth + '&HEIGHT=' + map.getDiv().offsetHeight;
        var overlayOpts = {
            opacity: 0.3
        };
        var imageBounds = {
            north: map.getBounds().getNorthEast().lat(),
            south: map.getBounds().getSouthWest().lat(),
            east: map.getBounds().getNorthEast().lng(),
            west: map.getBounds().getSouthWest().lng()
        };
        OverlayWater = new google.maps.GroundOverlay(url, imageBounds, overlayOpts);
        OverlayWater.setMap(map);
    } else {
        if (OverlayWater != undefined) OverlayWater.setMap(null);
    }
});

//地下水污染管制區範圍圖
$('#OverlayGroundwater').click(function() {
    if ($("#OverlayGroundwater").is(":checked")) {
        if (OverlayGroundwater != undefined) OverlayGroundwater.setMap(null);
        var url = 'https://geose.epa.gov.tw/epagis/services/PublicWMS/MapServer/WMSServer?REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=30&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=EPSG:4326\n        &BBOX=' + map.getBounds().getSouthWest().lng() + ',' + map.getBounds().getSouthWest().lat() + ',' + map.getBounds().getNorthEast().lng() + ',' + map.getBounds().getNorthEast().lat() + '&WIDTH=' + map.getDiv().offsetWidth + '&HEIGHT=' + map.getDiv().offsetHeight;
        var overlayOpts = {
            opacity: 0.3
        };
        var imageBounds = {
            north: map.getBounds().getNorthEast().lat(),
            south: map.getBounds().getSouthWest().lat(),
            east: map.getBounds().getNorthEast().lng(),
            west: map.getBounds().getSouthWest().lng()
        };
        OverlayGroundwater = new google.maps.GroundOverlay(url, imageBounds, overlayOpts);
        OverlayGroundwater.setMap(map);
    } else {
        if (OverlayGroundwater != undefined) OverlayGroundwater.setMap(null);
    }
});

//水資源污水廠table list
function list(id, Name, Address, InParkName) {
    ajax('http://210.59.250.98/moeaidbAPI/v1/Wastewater/InFactoryLimit/' + id + '?$format=JSON').then(function(c) {
        $('#InParkName').html(InParkName);
        $('#WPT_name').html(Name);
        $('#WTPAddress').html(Address);
        $('.popup-box').css('display', 'block');
        $('#map').css('width', '100%');
    }).catch(function () {
        alert('無資料');
    });
    ajax('http://210.59.250.98/moeaidbAPI/v1/Wastewater/CWMSMLatest/' + id + '?$format=JSON').then(function (c) {
        c.forEach(function (item) {
            if (item.DataTypeID == 210) {
                $('#SSIn').html(item.Value);
                $('#DataTime').html(moment(item.DataTime).format("YYYY-MM-DD HH:mm"));
            } else if (item.DataTypeID == 243) {
                $('#CODIn').html(item.Value);
            } else if (item.DataTypeID == 246) {
                $('#DataTypeID').html(item.Value);
            } else if (item.DataTypeID == 247) {
                $('#ElectricalConductivityIn').html(item.Value);
            } else if (item.DataTypeID == 248) {
                $('#WaterQuantityIn').html(item.Value);
            } else if (item.DataTypeID == 259) {
                $('#WaterTemperatureIn').html(item.Value);
            }
        });
    }).catch(function () {
        alert('無資料');
        $('#DataTypeID').html("");
        $('#DataTime').html("");
    });
}