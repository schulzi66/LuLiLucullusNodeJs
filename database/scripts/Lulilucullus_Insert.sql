-- Inserts into DB. Example data.
-- Feel free to extend sample data.
USE webdev;

-- Ingredients
INSERT INTO Ingredients (ingredientID, ingredientName)
VALUES
(0, 'Wasser')
,(1, 'Weizenmehl')
,(2, 'Ei')
,(3, 'Milch')
,(4, 'Hackfleisch vom Rind')
,(5, 'Zwiebeln')
,(6, 'Worcestershiresauce')
,(7, 'Salz')
,(8, 'Pfeffer')
,(9, 'Bier')
,(10, 'Butter')
,(11, 'Trockenhefe')
,(12, 'Zucker')
,(13, 'Knoblauchzehen');
-- Styles
INSERT INTO Styles (styleID, styleName)
VALUES
(0, 'Hausmannskost')
,(1, 'Asiatisch')
,(2, 'Indisch')
,(3, 'Mexikanisch')
,(4, 'Amerikanisch')
,(5, 'Französisch');

-- Courses
INSERT INTO COURSES (courseID, courseName)
VALUES
(0, 'Vorspeise')
,(1, 'Hauptgang')
,(2, 'Dessert')
,(3, 'Salat')
,(4, 'Beilage');

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
('employee@id.com', 'MAVorname', 'MANachname', 'Mitarbeiterort', 'Mitarbeiterstraße', '12345', '123654789', true, '98765');

-- BookingTypes
INSERT INTO BookingTypes (typeID, type)
VALUES
(0, 'Kochen'),
(1, 'Gastroservice'),
(2, 'Messe'),
(3, 'Bestellung');

-- Units
INSERT INTO Units (unitID, unitName)
VALUES
(0, 'Gramm')
,(1, 'Kilogramm')
,(2, 'Liter')
,(3, 'Milliliter')
,(4, 'Stück')
,(5, 'Prise')
,(6, 'Esslöffel')
,(7, 'Teelöffel')
,(8, 'Packung')
,(9, ' ');

-- Recipes
INSERT INTO Recipes (recipeID, recipeName, instructions, pictureRef, shortDescription, baseDescription, styleID, courseID)
VALUES
(0, 'Pfannkuchen', 'Alle Zutaten miteinander Verrühren. Dann in der Pfanne braten.', 'pictureRefPfannkuchen', 'Ein genialer Pfannkuchen. Schmeckt immer besonders gut', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 0, 1)
, (1, 'Amerikanische Bier-Hamburger im Hamburgerbrötchen','Leckerer Hamburger der total toll schmeckt und auch so toll ist', 'pictureRefHamburger', 'Ein super leckerer original amerikanischer Bier-Hamburger', 'Zubereitung
Arbeitszeit: ca. 45 Min. / Koch-/Backzeit: ca. 32 Min. Ruhezeit: ca. 35 Min. / Schwierigkeitsgrad: simpel / Kalorien p. P.: keine Angabe
Es sollten zuerst die Hamburger Buns zubereitet werden, danach dann die Burger. Milch, Wasser und Butter zusammen auf ca. 35 – 40°C erhitzen. In einer großen Schüssel die Hälfte des Mehls, Hefe, Zucker und Salz verrühren, die Milchmischung hinzufügen und danach das Ei. Dann das restliche Mehl unterrühren.
Wenn sich alle Zutaten gut verbunden haben, den Teig aus der Schüssel heben und auf einem bemehlten Brett gut durchkneten, bis der Teig schön elastisch ist, das dauert ca. 8 Minuten.
Nun den Teig in 12 gleichgroße Stücke teilen, zu Bällen formen und auf ein gefettetes Backblech legen. Etwas flach drücken. Zudecken und 30 - 35 Minuten gehen lassen.
Den Ofen auf 200°C (Ober-/Unterhitze) vorheizen. Die Buns für 12 Minuten backen, bis sie goldbraun sind. Aus dem Ofen nehmen und auskühlen lassen, bis sie lauwarm sind.
Währenddessen die Burger zubereiten. Den Grill vorbereiten und den Grillrost etwas einölen. Die Burger können jedoch auch in einer Pfanne gebraten werden.
Rinderhack, Zwiebel, Knoblauch, Worcestershiresauce, Salz und Pfeffer in einer Schüssel gut vermischen. Das Bier hinzufügen und nochmals gut durchmischen. Zu Patties formen.
Auf den Grill legen und pro Seite ca. 5 Minuten grillen. Oder eine Pfanne auf mittlerer Hitze mit etwas Öl erhitzen und die Patties 5 Minuten von jeder Seite braten. Jeweils 1 Burger in ein Brötchen legen.', 4,1 )
, (2, 'Fischsuppe', 'Eine Schmackhafte Fischsuppe zum Frühstück', 'pictureRefFischsuppe', 'Eine typische Fischsuppe wie sie jeder kennt und liebt', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 1, 0)
, (3, 'Baguette', 'Eine französisches Baguette zum Frühstück', 'pictureRefBaguette', 'Ein typisch französisches Baguette nach dem Rezept der Oma', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 5, 4);

-- RecipeIngredients
INSERT INTO RecipeIngredients (recipeID, ingredientID, amount, unitID)
VALUES
(0, 0, 100, 3)
,(0, 1, 500, 0)
,(0, 2, 2, 4)
,(0, 3, 300, 3)

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
,(1, 2, 1, 9);
-- Ratings
INSERT INTO Ratings (stars, comment, userID, recipeID)
VALUES
(5, 'Super Rezept. Mein Favorit.', 'mmuster@test.de', 0);

-- Bookings
INSERT INTO Bookings (bookingID, eventName, dateBegin, dateEnd, street, plz, location, userId, typeID, isReleased)
VALUES
(1, 'Bestellung Hochzeit', '2016-08-22 12:00:00', '2016-08-30 12:00:00', 'Musterstraße 2', '12345', 'Musterort', 'mmuster@test.de', 3, false)
,(2, 'Bestellung Geburtstag', '2016-08-27 12:00:00', '2016-09-10 12:00:00', 'Musterstraße 3', '22345', 'Musterort', 'mmuster@test.de', 3, false)
,(3, 'Bestellung Geburtstag', '2016-08-27 12:00:00', '2016-10-22 12:00:00', 'Musterstraße 23', '99821', 'Musterort', 'mmuster@test.de', 3, false);
-- BookingEmployees

-- BookingRecipes
INSERT INTO BookingRecipes (amountOfServings, bookingID, recipeID)
VALUES
(2,2,2)
,(1,1,1)
,(1,3,3);
