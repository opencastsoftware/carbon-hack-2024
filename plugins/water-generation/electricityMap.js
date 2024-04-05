const axios = require("axios");
const fs = require('fs');

async function fetchPowerConsumption(latitude, longitude) {

  const base_url = "https://api.electricitymap.org/v3/power-breakdown/history?lat=" + latitude + "&lon=" + longitude;

  try {
    const response = await axios.get(base_url);
    if (response.status === 200) {
      const total_consumption = getPowerConsumption(response.data);
      var country = getCountry(response.data.zone);
      return { totalConsumption: total_consumption, country: country };
    } else {
      console.log("Failed to retrieve data. Status code:", response.status);
      return null;
    }
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}

function getPowerConsumption(data) {
  const json_data = data;
  const zone = json_data.zone;
  const history = json_data.history[0];
  const created_at = history.createdAt;
  const breakdown = history.powerConsumptionBreakdown;
  const created_at_datetime = new Date(created_at);
  const created_at_readable = created_at_datetime
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  var total_consumption = Object.values(breakdown).reduce(
    (sum, value) => sum + value,
    0
  );
  const rows_to_add = [];
  for (const [source, value] of Object.entries(breakdown)) {
    const percentage = (value / total_consumption) * 100;
    rows_to_add.push({
      zone: zone,
      created: created_at_readable,
      energy_source: source,
      value: value,
    });
  }
  rows_to_add.forEach(function (dfs) {
    if (dfs.energy_source == "biomass") {
      dfs.energy_source = "biofuel";
    }
    if (dfs.energy_source == "geothermal") {
      dfs.energy_source = "other_renewable_exc_biofuel";
    }
  });

  var myArray = rows_to_add.filter(
    (x) =>
      x.energy_source != "hydro" &&
      x.energy_source != "hydro discharge" &&
      x.energy_source != "battery discharge" &&
      x.energy_source != "unknown"
  );

  total_consumption = myArray.reduce((sum, value) => sum + value.value, 0);

  return total_consumption;
}

function getCountry(zone) {

  const jsonData = fs.readFileSync('data/zone-country.json', 'utf8');
  const data = JSON.parse(jsonData);

  country = data[zone]["countryName"];
  return country;
}

module.exports = { fetchPowerConsumption };