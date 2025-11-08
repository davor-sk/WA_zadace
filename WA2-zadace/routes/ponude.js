import express from "express";
const router = express.Router();
import { nekretnine } from "../podaci/popis_nekretnina.js";

let ponude = [
  {
    id: 1,
    id_nekretnine: 2,
    ime_kupca: "Marko",
    prezime_kupca: "Marković",
    ponudena_cijena: 100000,
    telefon: "09898959694",
  },
  {
    id: 2,
    id_nekretnine: 1,
    ime_kupca: "Maja",
    prezime_kupca: "Majić",
    ponudena_cijena: 180000,
    telefon: "09198959694",
  },
  {
    id: 3,
    id_nekretnine: 4,
    ime_kupca: "Pero",
    prezime_kupca: "Perić",
    ponudena_cijena: 85000,
    telefon: "09798959694",
  },
];

router.post("/ponuda", (req, res) => {
  const nova_ponuda = req.body;
  const kljucevi = Object.keys(nova_ponuda);
  const cijena_nova = nova_ponuda.cijena;
  const id_nekretnine = req.body.id;

  const index = nekretnine.findIndex(
    (nekretnina) => nekretnina.id == id_nekretnine
  );

  if (!index) {
    return res.status(400).json({ message: "Nekretnina ne postoji." });
  }

  if (cijena_nova < 0) {
    return res.status(400).json({ message: "Cijena ne smije biti negativna!" });
  }

  if (
    !(
      kljucevi.includes("id_nekretnine") &&
      kljucevi.includes("ime_kupca") &&
      kljucevi.includes("prezime_kupca") &&
      kljucevi.includes("ponudena_cijena") &&
      kljucevi.includes("telefon")
    )
  ) {
    return res.status(400).json({
      message: "Niste poslali sve potrebne podatke za napraviti ponudu!",
    });
  }
  return res.status(200).json({
    message: `Ponuda kupca ${nova_ponuda.ime_kupca} je uspješno kreirana!`,
  });
});

export default router;
