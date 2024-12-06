function fetchTrains() {
    fetch('https://rata.digitraffic.fi/api/v1/live-trains/station/tpe?departing_trains=50&include_nonstopping=false')
    .then(function(response) {
   return response.json();
    })
    .then(function(data) {
   junat(data);
    })
    .catch(function(error) {
   document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan junien aikatauluista</p>";
    });
   }
   
   function junat(data) {
   var teksti = "";
   var now = new Date();
   var departingTrainsCount = 0;
   // Ulompi for-lause käy koko data-taulukon läpi
   for (var i = 0; i < data.length; i++) {
   if (data[i].trainCategory == "Long-distance") {
   // Sisempi for-lause käy timeTableRows-taulukon läpi
   for (var j = 0; j < data[i].timeTableRows.length; j++) {
   // Tarkistetaan, että asema on TPE ja tyyppi on DEPARTURE
   if (data[i].timeTableRows[j].stationShortCode == "TPE" && data[i].timeTableRows[j].type == "DEPARTURE") {
   // Lähtö- ja saapumispaikat
   var lahtoasema = data[i].timeTableRows[0].stationShortCode;
   var vika = data[i].timeTableRows.length - 1;
   var maaranpaa = data[i].timeTableRows[vika].stationShortCode;
   // Lähtö- ja saapumisajat
   var departureTime = new Date(data[i].timeTableRows[0].scheduledTime);
   var arrivalTime = new Date(data[i].timeTableRows[j].scheduledTime);
   
   // Seuraavat junat
   if (departureTime <= now) continue;
   
   teksti = teksti + "<h3>Juna nro " + data[i].trainNumber + "</h3>";
   teksti = teksti + "<p>Junan tyyppi: " + data[i].trainType + "</p>";
   teksti = teksti + "<p>Lähtee Helsingistä " + departureTime.toLocaleDateString('fi-FI') + " kello: " +
   departureTime.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' }) + "</p>";
   teksti = teksti + "<p>Saapuu Tampereelle " + arrivalTime.toLocaleDateString('fi-FI') + " kello: " +
   arrivalTime.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' }) + "</p><br>";
   

   // 10 junaa
   departingTrainsCount++;
   if (departingTrainsCount >= 10) break;
    }
    }
    }
    if (departingTrainsCount >= 10) break;
    }
   document.getElementById("vastaus").innerHTML = teksti;
   }
   
   // Päivittää
   fetchTrains();
   setInterval(fetchTrains, 120000);