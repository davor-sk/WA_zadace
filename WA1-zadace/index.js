const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});

app.get("/users", (req, res) => {
  res.json([
    { id: "1", ime: "Ivan", prezime: "Ivic" },
    { id: "2", ime: "Marko", prezime: "Marković" },
    { id: "3", ime: "Petra", prezime: "Petrović" },
  ]);
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});
