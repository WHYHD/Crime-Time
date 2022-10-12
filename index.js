
const markerData = [];
const markers = [];
var x= 0;

async function initMap() {
  await getData();
    const uluru = { lat: 34.2111, lng: -118.4309 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: uluru,
      styles: [
        {
          featureType: 'road',
          elementType: '',
          stylers: [
            {color: '#EE00FF'},
            {visibility: ''},
            // Add any stylers you need.
          ]
        },
        {
          featureType: 'water',
          stylers: [
            {color: '#00FFFF'},
            {visibility: ''},
            // Add any stylers you need.
          ]
          // Add the stylers you need. 
        }
      ]
    });
    for(let i = 0; i < markerData.length; i++){
      const currMarker = markerData[i];
      const marker = new google.maps.Marker({
        position: {lat: currMarker[1], lng: currMarker[2]},
        map: map,
        title: currMarker[0],
        animation: google.maps.Animation.DROP,
        icon: 'robbery.png',
      });
      const infowindow = new google.maps.InfoWindow({
        content: currMarker[0],
      });

      marker.addListener("click", ()=> {
        infowindow.open(map, marker);
      });


      
      markers.push(marker);
    }
    console.log(markers);

    //Loops through all markers changing center to marker lat and lng. uncomment myLoop() to use
    var i = 0;                  //  set your counter to 1
    function myLoop() {         //  create a loop function
      setTimeout(function() {   //  call a 3s setTimeout when the loop is called
          markers[i].setIcon('blue_MarkerA.png');   //  your code here
          map.setCenter({lat: markerData[i][1], lng: markerData[i][2]}); 
          map.setZoom(15);
          document.getElementById('locationName').innerHTML = markerData[i][0];
          document.getElementById('time').innerHTML = markerData[i][3];
          document.getElementById('arrestDate').innerHTML = markerData[i][4];
          document.getElementById('chargeDes').innerHTML = markerData[i][5];
          document.getElementById('chargeGroup').innerHTML = markerData[i][6];
          document.getElementById('reportType').innerHTML = markerData[i][7];
          document.getElementById('dispoDesc').innerHTML = markerData[i][8];
          if(i == markers.length - 1){map.setZoom(10);}
        i++;                    //  increment the counter
        if (i < markers.length) {           //  if the counter < 10, call the loop function
          myLoop();             //  ..  again which will trigger another 
        }                       //  ..  setTimeout()
      }, 2000)
    }

    function loopBeta(){
      for (let i = 0; i < markers.length; i++) {
        markers[i].setIcon('robbery.png');
      }
    }
    document.getElementById("button").addEventListener("click", myLoop);
    document.getElementById("buttonBeta").addEventListener("click", loopBeta);
    document.getElementById("previous").addEventListener("click", previous);
    document.getElementById("next").addEventListener("click", next);
    document.getElementById("reset").addEventListener("click", reset);
    function previous(){
      if(x > 0){
        x--;
        map.setCenter({lat: markerData[x][1], lng: markerData[x][2]}); 
        map.setZoom(15);
        document.getElementById('locationName').innerHTML = markerData[x][0];
        document.getElementById('time').innerHTML = markerData[x][3];
        document.getElementById('arrestDate').innerHTML = markerData[x][4];
        document.getElementById('chargeDes').innerHTML = markerData[x][5];
        document.getElementById('chargeGroup').innerHTML = markerData[x][6];
        document.getElementById('reportType').innerHTML = markerData[x][7];
        document.getElementById('dispoDesc').innerHTML = markerData[x][8];
      }
      console.log(x);
    }
    function next(){
      if(x < markerData.length - 1){
        x++;
        map.setCenter({lat: markerData[x][1], lng: markerData[x][2]}); 
        map.setZoom(15);
        document.getElementById('locationName').innerHTML = markerData[x][0];
        document.getElementById('time').innerHTML = markerData[x][3];
        document.getElementById('arrestDate').innerHTML = markerData[x][4];
        document.getElementById('chargeDes').innerHTML = markerData[x][5];
        document.getElementById('chargeGroup').innerHTML = markerData[x][6];
        document.getElementById('reportType').innerHTML = markerData[x][7];
        document.getElementById('dispoDesc').innerHTML = markerData[x][8];
        console.log(x);
      }
    }
    function reset(){
      map.setZoom(10);
      x = 0;
      document.getElementById('locationName').innerHTML = "Location of Crime";
      document.getElementById('time').innerHTML = "Time";
      document.getElementById('arrestDate').innerHTML = "Arrest Date";
      document.getElementById('chargeDes').innerHTML = "Charge Desciption";
      document.getElementById('chargeGroup').innerHTML = "Charge Group Description";
      document.getElementById('reportType').innerHTML = "Report Type";
      document.getElementById('dispoDesc').innerHTML = "Disposition Description";
    }
  
}

window.initMap = initMap;


//getData();
async function getData(){
  const respone = await fetch('addresses.csv');
  const data = await respone.text();
 //console.log(data);

  const rows = data.split('\n');
  //console.log(rows);
    rows.forEach(elt =>{
      const row = elt.split(',');
      const loctionName = row[5];
      const lat = row[18];
      const log = row[19];
      const time = row[3];
      const arrestDate = row[2];
      const chargeDes = row[14];
      const chargeGroup = row[11];
      const reportType = row[1];
      const dispoDesc = row[15];
      const y = [loctionName, parseFloat(lat),parseFloat(log), time, arrestDate, chargeDes, chargeGroup, reportType, dispoDesc];
      markerData.push(y);
      //console.log(y);
    });

}

