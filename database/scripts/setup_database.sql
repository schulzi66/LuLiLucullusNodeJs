CREATE DATABASE IF NOT EXISTS webdev;

CREATE TABLE IF NOT EXISTS USER (
  name VARCHAR(50) NOT NULL,
  vorname VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL PRIMARY KEY,
  telefon INTEGER,
  password VARCHAR(56) NOT NULL,
  lieferadresse_str VARCHAR(50),
  lieferadresse_ort VARCHAR(50),
  lieferadresse_plz INTEGER,
  rechnungsadresse_str VARCHAR(50),
  rechnungsadresse_ort VARCHAR(50),
  rechnungsadresse_plz INTEGER,
  internal boolean
);
