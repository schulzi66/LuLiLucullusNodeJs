CREATE DATABASE IF NOT EXISTS webdev;

CREATE TABLE IF NOT EXISTS USER (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  vorname VARCHAR(50) NOT NULL,
  lieferadresse_str VARCHAR(50),
  lieferadresse_ort VARCHAR(50),
  lieferadresse_plz INTEGER,
  rechnungsadresse_str VARCHAR(50),
  rechnungsadresse_ort VARCHAR(50),
  rechnungsadresse_plz INTEGER
);