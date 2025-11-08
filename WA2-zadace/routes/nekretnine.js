import express from "express";
const router = express.Router();
import { nekretnine } from "../podaci/popis_nekretnina.js";

router.get("/", (req, res) => {
  res.json(nekretnine);
});

router.get("/:id", (req, res) => {
  const id_nekretnina = req.params.id;

  if (isNaN(id_nekretnina)) {
    return res.status(400).json({ message: "ID nekretnine mora biti broj." });
  }

  const index = nekretnine.findIndex(
    (nekretnina) => nekretnina.id == id_nekretnina
  );

  if (index === -1) {
    return res.status(404).json({ message: "Nekretnina nije pronađena." });
  } else {
    return res.status(200).json(nekretnine[index]);
  }
});

router.put("/:id", (req, res) => {
  const id_nekretnina = req.params.id;
  const nova_nekretnina = req.body;

  nova_nekretnina.id = id_nekretnina;

  if (isNaN(id_nekretnina)) {
    return res.status(400).json({ message: "ID nekretnine mora biti broj." });
  }

  const index = nekretnine.findIndex(
    (nekretnina) => nekretnina.id == id_nekretnina
  );

  if (index !== -1) {
    nekretnine[index] = nova_nekretnina;
    return res.status(200).json(nekretnine[index]);
  } else {
    return res.status(404).json({ message: "Nekretnina nije pronađena." });
  }
});

router.patch("/:id", (req, res) => {
  const id_nekretnina = req.params.id;
  const nova_nekretnina = req.body;

  if (isNaN(id_nekretnina)) {
    return res.status(400).json({ message: "ID nekretnine mora biti broj." });
  }

  const index = nekretnine.findIndex(
    (nekretnina) => nekretnina.id == id_nekretnina
  );

  if (index !== -1) {
    for (const key in nova_nekretnina) {
      nekretnine[index][key] = nova_nekretnina[key];
    }
    return res.status(200).json(nekretnine[index]);
  } else {
    return res.status(404).json({ message: "Nekretnina nije pronađena." });
  }
});

router.delete("/:id", (req, res) => {
  const id_nekretnina = req.params.id;

  if (isNaN(id_nekretnina)) {
    return res.status(400).json({ message: "ID nekretnine mora biti broj." });
  }

  const index = nekretnine.findIndex(
    (nekretnina) => nekretnina.id == id_nekretnina
  );

  if (index !== -1) {
    nekretnine.splice(index, 1);
    return res.status(200).json({ message: "Nekretnina uspješno obrisana." });
  } else {
    return res.status(404).json({ message: "Nekretnina nije pronađena." });
  }
});

router.post("/dodaj", (req, res) => {
  const nova_nekretnina = req.body;
  const kljucevi = Object.keys(nova_nekretnina);
  const cijena_nova = nova_nekretnina.cijena;
  const broj_soba_nova = nova_nekretnina.broj_soba;

  if (cijena_nova < 0) {
    return res.status(400).json({ message: "Cijena ne smije biti negativna!" });
  }

  if (broj_soba_nova < 0) {
    return res
      .status(400)
      .json({ message: "Broj soba ne može biti manji od 0!" });
  }

  if (
    !(
      kljucevi.includes("naziv") &&
      kljucevi.includes("opis") &&
      kljucevi.includes("cijena") &&
      kljucevi.includes("lokacija") &&
      kljucevi.includes("broj_soba") &&
      kljucevi.includes("povrsina")
    )
  ) {
    return res
      .status(400)
      .json({ message: "Niste poslali sve potrebne podatke za nekretninu!" });
  }
  return res.status(200).json({
    message: `Nekretnina ${nova_nekretnina.naziv} je uspješno dodana!`,
  });
});

export default router;
