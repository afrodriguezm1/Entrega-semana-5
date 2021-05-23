// Este script obtiene datos desde mockaroo
// y los guarda en un archivo json dentro de la carpeta
// mocks/users.json
const fs = require("fs");
const path = require("path");
const axios = require("axios");

axios
  .get("https://api.mockaroo.com/api/b14ff220?count=10&key=fa39d710")
  .then((response) => {
    const json = JSON.stringify(response.data);

    fs.writeFileSync(path.join(".", "mocks", "users.json"), json);
    console.log("Data generada en el archivo: ", `./mocks/users.json`);
  });
