const express = require("express");
const axios = require('axios');
const xls = require('excel4node');
const app = express();

let url = "https://api.openml.org/api/v1/json/data/1216";

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    next();
});

const wb = new xls.Workbook();
const ws = wb.addWorksheet('dataset');

let getResults = () => {
    axios({
      method: "get",
      url: url
    }).then((res) => {
      if (res) {
        let idx = 1;
        var data = res.data.data_set_description;
        Object.keys(data).forEach(function(key) {
            console.log('Key : ' + key + ', Value : ' + data[key]);
            ws.cell(1, idx).string(key);
            ws.cell(2, idx).string(data[key]);
            idx ++;
        });

        wb.write('dataset.xlsx');
        
      } else {

      }
    }).catch((err) => {
      // handle err
      console.log(err)
    })
}

getResults()

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));