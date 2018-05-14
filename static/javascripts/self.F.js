toastr.options = {
    "positionClass": 'toast-top-center'
};

function CadastralAndInfo(Id, Name, number, Lat, Lon) {
    this.Id = Id;
    this.Name = Name;
    this.Number = number;
    this.Lat = Lat;
    this.Lon = Lon;
}

function IndParkAndInfo(Id, Name, Lat, Lon, count) {
    this.Id = Id;
    this.Name = Name;
    this.Lat = Lat;
    this.Lon = Lon;
    this.count = count;
}

function RentInfoAndInfo(Id, count) {
    this.Id = Id;
    this.count = count;
}

function HisAndInfo(Position, DataTypeID, DataTime, Value) {
    this.Position = Position;
    this.DataTypeID = DataTypeID;
    this.DataTime = DataTime;
    this.Value = Value;
}

function MarkerAndInfo(Id, marker) {
    this.Id = Id;
    this.marker = marker;
}

function SumAndInfo(Id, sum) {
    this.Id = Id;
    this.sum = sum;
}

//是否顯示全部marker
function setMapOnAll(markers, map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].marker.setMap(map);
    }
}
//是否顯示單一marker
function showMarker(marker, map) {
    marker.setMap(map);
}

function mapEvent() {
    if (overlay != undefined) {
        removeOverlay();
        var url = "http://210.59.250.49:8081/geoserver/IND_PARK/wms?service=WMS&version=1.1.0&request=GetMap&layers=IND_PARK:Cadastral&styles=&bbox=" + map.getBounds().getSouthWest().lng() + "," + map.getBounds().getSouthWest().lat() + "," + map.getBounds().getNorthEast().lng() + "," + map.getBounds().getNorthEast().lat() + "&width=" + map.getDiv().offsetWidth + "&height=" + map.getDiv().offsetHeight + "&srs=EPSG:4326&format=image/png";
        addOverlay(url);
    }
}

function clear() {
    //移除map.data.loadGeoJson
    map.data.forEach(function(feature) {
        map.data.remove(feature);
    });
    //移除controls
    map.controls[google.maps.ControlPosition.LEFT_CENTER].clear();
    $('#RentInfoButton').css('display', 'none');
    setMapOnAll(markerRentInfo, null);
    setMapOnAll(markerCadastral, null);
    if (overlay != undefined) removeOverlay();
}

function MapControl(styleControl) {
    styleControl.style.backgroundColor = '#fff';
    styleControl.style.border = '2px solid #999';
    styleControl.style.paddingTop = '5px';
    styleControl.style.paddingRight = '5px';
    styleControl.style.paddingLeft = '5px';
    styleControl.style.paddingBottom = '5px';
    styleControl.style.lineHeight = '30px';
    styleControl.style.fontFamily = 'Roboto', 'sans-serif';
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(styleControl);
}

function ajax(options) {
    return new Promise(function(resolve, reject) {
        $.ajax(options).done(resolve).fail(reject);
    });
}

function blockUI() {
    $.blockUI({
        overlayCSS: { backgroundColor: '#fff' },
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
}

function mapCenter(Lat, Lon, zoom) {
    map.setCenter({
        lat: Lat,
        lng: Lon
    });
    map.setZoom(zoom);
}

function addOverlayUrl(url) {
    var overlayOpts = {
        opacity: 0.3
    };
    var imageBounds = {
        north: map.getBounds().getNorthEast().lat(),
        south: map.getBounds().getSouthWest().lat(),
        east: map.getBounds().getNorthEast().lng(),
        west: map.getBounds().getSouthWest().lng()
    };
    overlay = new google.maps.GroundOverlay(url, imageBounds, overlayOpts);
    overlay.setMap(map);
}

function addOverlay() {
    var w = map.getDiv().offsetWidth;
    var h = map.getDiv().offsetHeight;
    var url = "http://210.59.250.49:8081/geoserver/IND_PARK/wms?service=WMS&version=1.1.0&request=GetMap&layers=IND_PARK:Cadastral&styles=&bbox=" + map.getBounds().getSouthWest().lng() + "," + map.getBounds().getSouthWest().lat() + "," + map.getBounds().getNorthEast().lng() + "," + map.getBounds().getNorthEast().lat() + "&width=" + map.getDiv().offsetWidth + "&height=" + map.getDiv().offsetHeight + "&srs=EPSG:4326&format=image/png";
    var overlayOpts = {
        opacity: 0.3
    };
    var imageBounds = {
        north: map.getBounds().getNorthEast().lat(),
        south: map.getBounds().getSouthWest().lat(),
        east: map.getBounds().getNorthEast().lng(),
        west: map.getBounds().getSouthWest().lng()
    };
    overlay = new google.maps.GroundOverlay(url, imageBounds, overlayOpts);
    overlay.setMap(map);
}

function removeOverlay() {
    overlay.setMap(null);
}

//range 圖示
function icon(count, range) {
    var icon = "";
    if (count <= range * 1) icon = "images/icon1.png";
    else if (count <= range * 2) icon = "images/icon2.png";
    else if (count <= range * 3) icon = "images/icon3.png";
    else if (count <= range * 4) icon = "images/icon4.png";
    else icon = "images/icon5.png";
    return icon;
}

//range 顏色
function kml(count, range) {
    var label = "";
    if (count <= range * 1) label = "green";
    else if (count <= range * 2) label = "yellow";
    else label = "red";
    return label;
}

//計算array 總數
function repert(array) {
    var count = array.reduce(function(allElements, ele) {
        if (ele in allElements) allElements[ele]++;
        else allElements[ele] = 1;
        return allElements;
    }, {});
    return count;
}
//Date MM/dd
Date.prototype.ymdhm = function() {
    return this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate() + ' ' + this.getUTCHours() + ':' + this.getMinutes();
};

Date.prototype.h = function() {
    return this.getUTCHours();
};

Date.prototype.hm = function() {
    return this.getUTCHours() + ':' + this.getMinutes();
};