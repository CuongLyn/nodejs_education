const express = require('express')
const app = express()
const port = 3000
//route: tuyến đường
app.get('/tin-tuc', (req, res) => {
  var a = 1;
  var b = 3;
  var c = a + b;
  res.send('Xin chào mình là Cường')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})