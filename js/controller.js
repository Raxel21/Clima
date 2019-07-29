var mainApp = angular.module('mainApp', ['ui.router', 'ngAnimate']);
mainApp.controller('mainCtrl', function($scope, $rootScope, $state) {
});

mainApp.controller('homeCtrl', function($scope,$rootScope,$state, $http) {
	// Funcion que se ejecutara cuando el usuario haga una busqueda
	$scope.getData = function (data) {
		// Obtenemos los datos que ha introducido el usuario
		$scope.city = data.city;
		// Declaramos un arreglo vacio
		$scope.datos = [];
		$http({
			// Metodo por el cual haremos la llamada a la API
			method: 'GET',
			// Direccion de donde obtendremos la API
			url: 'https://api.openweathermap.org/data/2.5/weather?q='.concat($scope.city, '&appid=0fe7ba98499cbc5e957ea206ee61bda9&lang=es&units=metric')
			// Cuando la API se cargada obtendremos los datos por medio de snapshot
		}).then(function(snapshot) {
			// Agregaremos los datos por medio de push
			$scope.datos.push(snapshot);
			// Variable en estado falso para ocultar el mensaje 'Sin resultados' 
			$rootScope.found = false;
			console.log(snapshot.data);
      // Convertir hora UNIX a hora normal
      $scope.utctimecalc = new Date(snapshot.data.dt * 1000);
      $scope.hour = $scope.utctimecalc.getHours();
      $scope.min = $scope.utctimecalc.getMinutes();
		}).catch(function(err) {
			// Variable en estado verdadero para mostrar el mensaje 'Sin resultados'
			$rootScope.found = true;
		});
	}
});

mainApp.controller('aboutCtrl', function($scope, $rootScope, $state) {
  //Configuracion del mapa
  var mymap = L.map('map', {
    center: [14.5275211, -90.5909739],
    zoom: 10,
    zoomControl: true,
  });

//Mapa
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
{
    attribution: '&copy; <a href="http://osm.org/copyright" target = "_blank">OpenStreetMap</a> contributors'
}).addTo(mymap);



var popup = L.popup();

//Funcion para mostrar el popup
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("Hiciste click en el mapa en " + e.latlng.toString()) //esample from leaflet, will be immediately replaced by weatherpopup...
    .openOn(mymap);


//Obtener el JSON con jQuery por medio de AJAX
$(document).ready(function(){
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?lat=" + e.latlng.lat + '&lon=' + e.latlng.lng + "&appid=0fe7ba98499cbc5e957ea206ee61bda9&lang=es",
    dataType: 'json',
    success: function(data) {
      // Variables con los datos del JSON
      weatherlocation_lon = data.coord.lon; 
      weatherlocation_lat = data.coord.lat; 
      weatherstationname = data.name 
      weatherstationid = data.id 
      weathertime = data.dt 
      temperature = data.main.temp;
      airpressure = data.main.pressure; 
      airhumidity = data.main.humidity; 
      temperature_min = data.main.temp_min; 
      temperature_max = data.main.temp_max; 
      windspeed = data.wind.speed; 
      cloudcoverage = data.clouds.all; 
      weatherconditionid = data.weather[0].id 
      weatherconditionstring = data.weather[0].main 
      weatherconditiondescription = data.weather[0].description 
      weatherconditionicon = data.weather[0].icon

    // Convertir el timpo UNIX a Hora UTC 
    var utctimecalc = new Date(weathertime * 1000);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = utctimecalc.getFullYear();
    var month = months[utctimecalc.getMonth()];
    var date = utctimecalc.getDate();
    var hour = utctimecalc.getHours();
    var min = utctimecalc.getMinutes();
    var sec = utctimecalc.getSeconds();
    var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min;

    // Recalcular las medidas
    var weathercondtioniconhtml = "http://openweathermap.org/img/w/" + weatherconditionicon + ".png";
    var weathertimenormal = time;
    var temperaturecelsius = Math.round((temperature - 273) * 100) / 100; 
    var windspeedknots = Math.round((windspeed * 1.94) * 100) / 100; 
    var windspeedkmh = Math.round((windspeed * 3.6) * 100) / 100;
    var winddirectionstring = "Im the wind from direction"; 
    //Popup con el contenido
    var fontsizesmall = 1;
    popup.setContent("Datos del clima:<br>" + "<img src=" + weathercondtioniconhtml + "><br>" + " " + weatherconditiondescription + "<br><br>Temperatura: " + temperaturecelsius + "°C<br>Presión del aire: " + airpressure + " hPa<br>Humedad: " + airhumidity + "%" + "<br>Nobosidad: " + cloudcoverage + "%<br><br>Velocidad del viento: " + windspeedkmh + " km/h<br>" + " " + "Fecha y hora: " + weathertimenormal + "<br>Lugar: " + weatherstationname + " " +"<br>Coordenadas: " + weatherlocation_lon + ", " + weatherlocation_lat);           


    },
    error: function() {
      alert("Error al recibir datos de openweatheramp");
    }
  });        
});
//getting json function ends here

//popupfunction ends here
}

//popup
mymap.on('click', onMapClick);
});
mainApp.controller('merCtrl', function($scope, $rootScope, $state, $http) {
  /**
 * Initialize the map.
 */
  (function initMap() {
    // Key de openweathermap
    let myKey = '0fe7ba98499cbc5e957ea206ee61bda9';
    // capa o imagen del mapa
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18, attribution: '&copy; <a href="http://osm.org/copyright" target = "_blank">OpenStreetMap</a> contributors: <a href="https://openweathermap.org/" target="_blank"> OpenWeatherMap'});
    // Capas a aplicar sobre el mapa
    var clouds = L.OWM.clouds({opacity: 0.5, appId: myKey});
    var temp = L.OWM.temperature({opacity: 0.5, appId: myKey});
    var city = L.OWM.current({intervall: 15, imageLoadingUrl: 'img/owmloading.gif', appId: myKey, lang: 'es',minZoom: 5});
    var snow = L.OWM.snow({opacity: 0.5, appId: myKey});
    var rain = L.OWM.rain({opacity: 0.5, appId: myKey});
    var precipitation = L.OWM.precipitation( {opacity: 0.5, appId: myKey} );
    var wind = L.OWM.wind({opacity: 0.5, appId: myKey});

    // Latitud y longitud del mapa (Ubicacion del mapa)
    var map = L.map('maps', { center: new L.LatLng(14.5275211, -90.5909739), zoom: 12, layers: [osm] });
    // Estilo del mapa
    var baseMaps = { "Mapa estandar": osm };
    // Opciones de capas del mapa
    var overlayMaps = { 'Nubes': clouds, 'Ciudades': city,
    'Temperatura': temp, 'Nieve': snow, 'Lluvia': rain, 'Velocidad del Viento': wind,
    'Precipitaciones': precipitation};
    // Agregar los controles de las capas
    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
  })();
});