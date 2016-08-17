-- Inserts into DB. Example data.
-- Feel free to extend sample data.
USE webdev;
-- Recipes
INSERT INTO Recipes (recipeID, recipeName, shortDescription, baseDescription, instructions, pictureRef, styleID, courseID)
VALUES
(1, 'Pfannkuchen', 'Einen einfachen Pfannkuchen machen', 'Ein einfaches Rezept um einen Pfannkuchen zu machen. Ohne viel Arbeit.', 'Alle Zutaten miteinander Verrühren. Dann in der Pfanne braten.', 'PictureRefPfannkuchen', 1, 2);
-- Users
INSERT INTO Users (name, familyName, userID, street, location, houseNumber, telephoneNumber, password, plz, billingAddressStreet, billingAddressLocation, billingAddressHouseNumber, billingAddressPlz, internal)
VALUES
('Max', 'Mustermann', 'mmuster@test.de', 'Teststraße', 'TestOrt', '123', '123456789', 'password1', '12345', 'Rechnungsstraße', 'Rechnungsort', '321', '54321', true);
-- Ingredients
INSERT INTO Ingredients (ingredientID, ingredientName)
VALUES
(1, 'Wasser')
,(2, 'Weizenmehl')
,(3, 'Ei')
,(4, 'Milch');
-- Employees
INSERT INTO Employees (name, familyName, employeeID, street, location, houseNumber, telephoneNumber, password, plz, isAdmin, emailAddress)
VALUES
('MAVorname', 'MANachname', 'testmitarbeiter@test.de', 'Mitarbeiterstraße', 'Mitarbeiterort', '123', '123654789', 'MApasswort', '98765', true, 'testmitarbeiter@test.de');
-- Ratings
INSERT INTO Ratings (stars, comment, userID, recipeID)
VALUES
(5, 'Super Rezept. Mein Favorit.', 'mmuster@test.de', 1);
-- Bookings

-- BookingEmployees

-- BookingTypes
INSERT INTO BookingTypes (typeID, type)
VALUES
(1, 'Kochen'),
(2, 'Gastroservice'),
(3, 'Messe');
-- BookingRecipes

-- Styles
INSERT INTO Styles (styleID, styleName)
VALUES
(1, 'Hausmannskost')
,(2, 'Asiatisch')
,(3, 'Indisch')
,(4, 'Mexikanisch');
-- Courses
INSERT INTO COURSES (courseID, courseName)
VALUES
(1, 'Vorspeise')
,(2, 'Hauptgang')
,(3, 'Dessert')
,(4, 'Salat');
-- Units
INSERT INTO Units (unitID, unitName)
VALUES
(1, 'Gramm')
,(2, 'Kilogramm')
,(3, 'Liter')
,(4, 'Milliliter')
,(5, 'Stück')
,(6, 'Prise');
-- RecipeIngredients
INSERT INTO RecipeIngredients (recipeID, ingredientID, amount, unitID)
VALUES
(1, 1, 100, 4)
,(1, 2, 500, 1)
,(1, 3, 2, 5)
,(1, 4, 300, 4);
-- IngredientsAllergenes
INSERT INTO IngredientsAllergenes (ingredientID, allergenID)
VALUES
(4,1);
-- Allergenes
INSERT INTO Allergenes (allergenID, allergenName)
VALUES
(1, 'Laktose')
,(2, 'Gluten')
,(3, 'Schalentiere')
,(4, 'Erdnüsse');