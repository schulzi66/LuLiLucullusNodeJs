-- Inserts into DB. Example data.
-- Feel free to extend sample data.
USE webdev;

-- Ignore foreign keys for insert.
SET FOREIGN_KEY_CHECKS = 0;

-- Ingredients
INSERT INTO Ingredients (ingredientName)
VALUES
('Wasser')
,('Weizenmehl')
,('Ei')
,('Milch')
,('Hackfleisch vom Rind')
,('Zwiebel')
,('Worcestershiresauce')
,('Salz')
,('Pfeffer')
,('Bier')
,('Butter')
,('Trockenhefe')
,('Zucker')
,('Knoblauchzehe')
,('Backpulver')
,('Karotten')
,('Lauch')
,('Schalotten')
,('Olivenöl')
,('Weißwein')
,('Fischfond')
,('Fleischtomaten, reif')
,('Fischfilet')
,('Garnelen')
,('Cayennepfeffer')
,('Safran')
,('Rinderfilet')
,('Rucola')
,('Parmesan')
,('Zitronen')
,('Pinienkerne')
,('Balsamico')
,('Meersalz');

-- Styles
INSERT INTO Styles (styleID, styleName)
VALUES
(0, 'Hausmannskost')
,(1, 'Asiatisch')
,(2, 'Indisch')
,(3, 'Mexikanisch')
,(4, 'Amerikanisch')
,(5, 'Französisch')
,(6, 'Italienisch');

-- Courses
INSERT INTO Courses (courseID, courseName)
VALUES
	(0, 'Vorspeise'),
	(1, 'Zwischengang'),
	(2, 'Hauptgang'),
	(3, 'Dessert'),
	(4, 'Beilage');

-- Users
INSERT INTO Users (name, familyName, userID, street, location, telefonNumber, plz, password, billingAddressStreet, billingAddressLocation, billingAddressPlz, internal)
VALUES
('Max', 'Mustermann', 'mmuster@test.de', 'Teststraße 123', 'TestOrt', '123456789', '12345', 'password1', 'Rechnungsstraße 321', 'Rechnungsort', '54321', true);

-- Allergenes
INSERT INTO Allergenes (allergenID, allergenName)
VALUES
(0, 'Laktose')
,(1, 'Gluten')
,(2, 'Schalentiere')
,(3, 'Erdnüsse');

-- IngredientsAllergenes
INSERT INTO IngredientsAllergenes (ingredientID, allergenID)
VALUES
(3,0);

-- Employees
INSERT INTO Employees (employeeID, name, familyName, location, street, plz, telefonNumber, isAdmin, password)
VALUES
('employee@id.com', 'MAVorname', 'MANachname', 'Mitarbeiterort', 'Mitarbeiterstraße', '12345', '123654789', true, '$10$jLtT3WKE48lvdeGXo7Be7e388OCn2NPce895bUmpOg/k46LjpCZ5m');

-- BookingTypes
INSERT INTO BookingTypes (typeID, type)
VALUES
(0, 'Kochen'),
(1, 'Gastroservice'),
(2, 'Messe'),
(3, 'Bestellung'),
(4, 'Kochkurs');

-- Units
INSERT INTO Units (unitName)
VALUES
('Gramm')
,('Kilogramm')
,('Liter')
,('Milliliter')
,('Stück')
,('Prise')
,('Esslöffel')
,('Teelöffel')
,('Packung')
,(' ')
,('Messerspitze(n)')
,('Stange(n)');

-- Recipes
INSERT INTO Recipes (recipeID, recipeName, pictureRef , shortDescription, timeNeeded, baseDescription, styleID, courseID, recipePrice)
VALUES
(0, 'Pfannkuchen','pfannkuchen.jpg', 'Ein genialer Pfannkuchen. Schmeckt immer besonders gut', 'Arbeitszeit: ca. 45 Min. Ruhezeit: ca. 15 Min. / Schwierigkeitsgrad: normal / Kalorien p. P.: keine Angabe' ,'Die Eier mit dem Zucker cremig aufschlagen, dann mit der Milch verrühren. Nun Salz, Mehl und Backpulver dazugeben und alles zu einem glatten Teig rühren. Danach den Teig für ca. 15 Minuten ruhen lassen, da das Mehl noch ausquillt. Dann 1-2 große Schöpfkellen Teig in eine auf mittlere Hitze erhitzte, beschichtete Pfanne geben. Nach ca. 2 Minuten bilden sich kleine Bläschen, dann den Pfannkuchen einmal wenden und von der anderen Seite schön goldbraun ausbacken.', 0, 1, '2,50 &euro;')
, (1, 'Amerikanische Bier-Hamburger im Hamburgerbrötchen','hamburger.jpg', 'Ein super leckerer original amerikanischer Bier-Hamburger', 'Arbeitszeit: ca. 45 Min. / Koch-/Backzeit: ca. 32 Min. Ruhezeit: ca. 35 Min. / Schwierigkeitsgrad: simpel / Kalorien p. P.: keine Angabe',
'Es sollten zuerst die Hamburger Buns zubereitet werden, danach dann die Burger. Milch, Wasser und Butter zusammen auf ca. 35 – 40°C erhitzen. In einer großen Schüssel die Hälfte des Mehls, Hefe, Zucker und Salz verrühren, die Milchmischung hinzufügen und danach das Ei. Dann das restliche Mehl unterrühren.
Wenn sich alle Zutaten gut verbunden haben, den Teig aus der Schüssel heben und auf einem bemehlten Brett gut durchkneten, bis der Teig schön elastisch ist, das dauert ca. 8 Minuten.
Nun den Teig in 12 gleichgroße Stücke teilen, zu Bällen formen und auf ein gefettetes Backblech legen. Etwas flach drücken. Zudecken und 30 - 35 Minuten gehen lassen.
Den Ofen auf 200°C (Ober-/Unterhitze) vorheizen. Die Buns für 12 Minuten backen, bis sie goldbraun sind. Aus dem Ofen nehmen und auskühlen lassen, bis sie lauwarm sind.
Währenddessen die Burger zubereiten. Den Grill vorbereiten und den Grillrost etwas einölen. Die Burger können jedoch auch in einer Pfanne gebraten werden.
Rinderhack, Zwiebel, Knoblauch, Worcestershiresauce, Salz und Pfeffer in einer Schüssel gut vermischen. Das Bier hinzufügen und nochmals gut durchmischen. Zu Patties formen.
Auf den Grill legen und pro Seite ca. 5 Minuten grillen. Oder eine Pfanne auf mittlerer Hitze mit etwas Öl erhitzen und die Patties 5 Minuten von jeder Seite braten. Jeweils 1 Burger in ein Brötchen legen.', 4,1,'7,50 &euro;')
,(2, 'Fischsuppe Sèteois', 'fischsuppe.jpg', 'Schnell und einfach zuzubereitende sehr leckere und raffinierte Fischsuppe', 'Arbeitszeit: ca. 45 Min. / Schwierigkeitsgrad: normal / Kalorien p. P.: keine Angabe', 'Das Gemüse putzen, die Schalotten in Streifen (nicht in Ringe), die Karotten in dünne Scheiben und die hellgrünen Teile des Lauchs in breite Streifen schneiden. Schalotten und Karotten im Olivenöl etwa 10 Minuten langsam andünsten, salzen und den Zucker hinzugeben. Die Schalotten sollten keine Farbe bekommen. Nach 5 Minuten den Lauch hinzugeben. Ab und zu umrühren. \n\nNach 10 Minuten mit dem Weißwein ablöschen, aufkochen lassen und den Fischfond angießen. In der Zwischenzeit die Tomaten häuten (muss nicht sein), entkernen, die Stielansätze und Kerne entfernen, Fruchtfleisch in kleine Würfel schneiden. \n\nDie Fischfilets in mundgerechte Stücke schneiden, von den Shrimps die Schale entfernen und den Rückendarm herausziehen. Alles in den Gemüse-Fischfond gleiten lassen und 10 Minuten gar ziehen lassen. Die Knoblauchzehen in dünne Scheiben schneiden und zur Suppe geben. Mit Cayennepfeffer und Safranpulver würzen.\n\nKurz vor dem Servieren die Tomatenwürfel hinzugeben, sie sollten nicht mehr kochen. Optional einen guten Schuss Anisette (z. B. Pernod).\n\nMit Baguettescheiben servieren. \nKleine Abwandlung: Die Brotscheiben im Backofen rösten, mit aufgeschnittenen Knoblauchzehen einreiben. In die Teller das Röstbrot geben und die Suppe darauf verteilen.', 0, 0, '4,50 &euro;')
,(3, 'Carpaccio vom Rind mit Pinienkernen, Rucola und Parmesan', 'carpaccio.jpg', 'Ein italienischer Klassiker. Immer wieder lecker!', 'Arbeitszeit: ca. 15 Min. / Schwierigkeitsgrad: pfiffig / Kalorien p. P.: keine Angabe', '4 Teller mit Balsamico beträufeln und mit einem Pinsel verteilen, so dass der gesamte Teller dünn bedeckt ist. \n\nDie Pinienkerne anrösten und den Rucola waschen.\n\nDie dünnen Rinderfilet-Scheiben, den Rucola und die Pinienkerne auf die Teller geben, und den Parmesan hauchdünn darüber hobeln. Jetzt mit Salz, Zitronensaft und Pfeffer würzen, das Olivenöl darüber träufeln. Ich nehme auch noch etwas Balsamico dazu.\n\nDann in sofort mit dem Baguette servieren.\n\nDamit das Rinderfilet leichter in hauchdünne Scheiben geschnitten werden kann, friert man das Filet vorher etwas an. Dazu braucht man aber noch entweder ein sehr scharfes Messer, oder eine Aufschnittmaschine. Ansonsten kann man sich auch in der Art helfen, dass man die etwas dickeren Scheiben zwischen 2 Gefrierbeutel legt und mit einem Fleischklopfer oder einer Kasserolle vorsichtig flach klopft, oder das Filet beim Metzger aufschneiden lässt.', 6, 0, '6,50 &euro;');

-- RecipeIngredients
INSERT INTO RecipeIngredients (recipeID, ingredientID, amount, unitID)
VALUES
(0, 2, 3, 9)
,(0, 12, 2, 6)
,(0, 3, 400, 3)
,(0, 7, 1, 5)
,(0, 1, 200, 0)
,(0, 14, 1, 10)

,(1, 4, 1350, 0)
,(1, 5, 2, 9)
,(1, 13, 9, 9)
,(1, 6, 3, 6)
,(1, 7, 1, 6)
,(1, 8, 1, 7)
,(1, 9, 180, 3)
,(1, 3, 235, 3)
,(1, 0, 120, 3)
,(1, 10, 55, 0)
,(1, 1, 560, 0)
,(1, 11, 1, 8)
,(1, 12, 2, 6)
,(1, 2, 1, 9)

,(2, 15, 2, 9)
,(2, 16, 1, 11)
,(2, 17, 2, 9)
,(2, 12, 1, 7)
,(2, 18, 2, 6)
,(2, 19, 200, 3)
,(2, 20, 600, 3)
,(2, 21, 2, 9)
,(2, 22, 450, 0)
,(2, 23, 4, 9)
,(2, 24, 1, 5)
,(2, 25, 1, 5)
,(2, 13, 2, 9)

,(3, 26, 400, 0)
,(3, 27, 1, 8)
,(3, 28, 1, 4)
,(3, 29, 2, 9)
,(3, 30, 100, 0)
,(3, 31, 30, 3)
,(3, 32, 1, 5)
,(3, 8, 1, 5)
,(3, 18, 5, 6);

-- Ratings
INSERT INTO Ratings (stars, comment, userID, recipeID)
VALUES (5, 'Super Rezept. Mein Favorit.', 'mmuster@test.de', 0);

-- Bookings
INSERT INTO Bookings (bookingID, eventName, dateBegin, dateEnd, street, plz, location, userId, typeID, isReleased)
VALUES
('_cakfaq1wk', 'Bestellung Hochzeit', '2016-08-22 12:00:00', '2016-08-30 12:00:00', 'Musterstraße 2', '12345', 'Musterort', 'mmuster@test.de', 3, false)
,('_ueygd0qvi', 'Bestellung Geburtstag', '2016-08-27 12:00:00', '2016-09-10 12:00:00', 'Musterstraße 3', '22345', 'Musterort', 'mmuster@test.de', 3, false)
,('_1so2t4g9p', 'Bestellung Geburtstag', '2016-08-27 12:00:00', '2016-10-22 12:00:00', 'Musterstraße 23', '99821', 'Musterort', 'mmuster@test.de', 3, false)
,('_bixf10gv5', 'Bestellung Goldhochzeit', '2016-08-29 12:00:00', '2016-11-27 12:00:00', 'Musterstraße 12', '53881', 'Musterort', 'mmuster@test.de', 3, false)
,('_58xj543wc', 'Kochkurs \"Vegetarisch\"', '2016-08-31 18:00:00', '2016-12-22 22:00:00', 'Musterstraße 89', '50999', 'Köln', 'mmuster@test.de', 0, false);

-- BookingEmployees

-- BookingRecipes
INSERT INTO BookingRecipes (amountOfServings, bookingID, recipeID)
VALUES
(2,'_cakfaq1wk',2)
,(1,'_ueygd0qvi',1)
,(1,'_1so2t4g9p',3)
,(20, '_bixf10gv5', 0)
,(1, '_58xj543wc', 0);


INSERT INTO Users (name, familyName, userID, street, location, telefonNumber, password, plz, billingAddressStreet, billingAddressLocation, billingAddressPlz, internal)
VALUES
	('Julian', 'Ulonska', 'ulonska.julian@gmail.com', 'Im Reiherflug 6', 'Euskirchen', '0123456789', '$2a$10$GXWBOcTA73qPangwc.A5B.lAqEBiNmQKfBgdufYcs/2IX5PKRB1.C', '53881', 'Im Reiherflug 6', 'Euskirchen', '53881', 1);

-- Reenable foreihn key checks
SET FOREIGN_KEY_CHECKS = 1;

