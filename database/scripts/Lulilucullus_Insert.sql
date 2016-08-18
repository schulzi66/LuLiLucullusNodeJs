-- Inserts into DB. Example data.
-- Feel free to extend sample data.
USE webdev;

-- Ingredients
INSERT INTO Ingredients (ingredientID, ingredientName)
VALUES
(0, 'Wasser')
,(1, 'Weizenmehl')
,(2, 'Ei')
,(3, 'Milch');

-- Styles
INSERT INTO Styles (styleID, styleName)
VALUES
(0, 'Hausmannskost')
,(1, 'Asiatisch')
,(2, 'Indisch')
,(3, 'Mexikanisch');

-- Courses
INSERT INTO COURSES (courseID, courseName)
VALUES
(0, 'Vorspeise')
,(1, 'Hauptgang')
,(2, 'Dessert')
,(3, 'Salat');

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
(2, 'Messe');

-- Units
INSERT INTO Units (unitID, unitName)
VALUES
(0, 'Gramm')
,(1, 'Kilogramm')
,(2, 'Liter')
,(3, 'Milliliter')
,(4, 'Stück')
,(5, 'Prise');

-- Recipes
INSERT INTO Recipes (recipeID, recipeName, instructions, pictureRef, shortDescription, baseDescription, styleID, courseID)
VALUES
(0, 'Pfannkuchen', 'Alle Zutaten miteinander Verrühren. Dann in der Pfanne braten.', 'PictureRefPfannkuchen', 'Einen einfachen Pfannkuchen machen', 'Ein einfaches Rezept um einen Pfannkuchen zu machen. Ohne viel Arbeit.', 0, 1);

-- RecipeIngredients
INSERT INTO RecipeIngredients (recipeID, ingredientID, amount, unitID)
VALUES
(0, 0, 100, 3)
,(0, 1, 500, 0)
,(0, 2, 2, 4)
,(0, 3, 300, 3);

-- Ratings
INSERT INTO Ratings (stars, comment, userID, recipeID)
VALUES
(5, 'Super Rezept. Mein Favorit.', 'mmuster@test.de', 0);

-- Bookings

-- BookingEmployees

-- BookingRecipes