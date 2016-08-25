DROP DATABASE IF EXISTS webdev;

CREATE DATABASE IF NOT EXISTS webdev;

USE webdev;
CREATE TABLE Ingredients
(
  ingredientID INT NOT NULL,
  ingredientName VARCHAR(50) NOT NULL,
  PRIMARY KEY (ingredientID),
  UNIQUE (ingredientName)
);

CREATE TABLE Styles
(
  styleID INT NOT NULL,
  styleName VARCHAR(50) NOT NULL,
  PRIMARY KEY (styleID),
  UNIQUE (styleName)
);

CREATE TABLE Courses
(
  courseID INT NOT NULL,
  courseName VARCHAR(50) NOT NULL,
  PRIMARY KEY (courseID),
  UNIQUE (courseName)
);

CREATE TABLE Users
(
  name VARCHAR(50),
  familyName VARCHAR(100),
  userID VARCHAR(100) NOT NULL,
  street VARCHAR(100),
  location VARCHAR(100),
  telefonNumber VARCHAR(50),
  password VARCHAR(250) NOT NULL,
  plz VARCHAR(50),
  billingAddressStreet VARCHAR(100),
  billingAddressLocation VARCHAR(100),
  billingAddressPlz VARCHAR(50),
  internal BOOLEAN NOT NULL,
  PRIMARY KEY (userID)
);

CREATE TABLE Allergenes
(
  allergenID INT NOT NULL,
  allergenName VARCHAR(50) NOT NULL,
  PRIMARY KEY (allergenID),
  UNIQUE (allergenName)
);

CREATE TABLE IngredientsAllergenes
(
  ingredientID INT NOT NULL,
  allergenID INT NOT NULL,
  PRIMARY KEY (ingredientID, allergenID),
  FOREIGN KEY (ingredientID) REFERENCES Ingredients(ingredientID),
  FOREIGN KEY (allergenID) REFERENCES Allergenes(allergenID)
);

CREATE TABLE Employees
(
  employeeID VARCHAR(100) NOT NULL,
  name VARCHAR(50) NOT NULL,
  familyName VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  street VARCHAR(100) NOT NULL,
  plz VARCHAR(10) NOT NULL,
  telefonNumber VARCHAR(50) NOT NULL,
  password VARCHAR(250) NOT NULL,
  isAdmin BOOLEAN NOT NULL,
  PRIMARY KEY (employeeID)
);

CREATE TABLE BookingTypes
(
  typeID INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  PRIMARY KEY (typeID)
);

CREATE TABLE Units
(
  unitID INT NOT NULL,
  unitName VARCHAR(50) NOT NULL,
  PRIMARY KEY (unitID),
  UNIQUE (unitName)
);

CREATE TABLE PasswordResets
(
  dateOfReset DATETIME NOT NULL,
  resetCode VARCHAR(50),
  closed BOOLEAN NOT NULL,
  userID VARCHAR(100) NOT NULL,
  PRIMARY KEY (dateOfReset, userID),
  FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE Recipes
(
  recipeID INT NOT NULL,
  recipeName VARCHAR(100) NOT NULL,
  instructions LONGTEXT NOT NULL,
  pictureRef VARCHAR(256) NOT NULL,
  shortDescription LONGTEXT NOT NULL,
  baseDescription LONGTEXT NOT NULL,
  styleID INT NOT NULL,
  courseID INT NOT NULL,
  PRIMARY KEY (recipeID),
  FOREIGN KEY (styleID) REFERENCES Styles(styleID),
  FOREIGN KEY (courseID) REFERENCES Courses(courseID),
  UNIQUE (recipeName)
);

CREATE TABLE RecipeIngredients
(
  amount FLOAT NOT NULL,
  recipeID INT NOT NULL,
  ingredientID INT NOT NULL,
  unitID INT NOT NULL,
  PRIMARY KEY (recipeID, ingredientID),
  FOREIGN KEY (recipeID) REFERENCES Recipes(recipeID),
  FOREIGN KEY (ingredientID) REFERENCES Ingredients(ingredientID),
  FOREIGN KEY (unitID) REFERENCES Units(unitID)
);

CREATE TABLE Ratings
(
  stars INT,
  comment LONGTEXT,
  userID VARCHAR(100) NOT NULL,
  recipeID INT NOT NULL,
  PRIMARY KEY (userID, recipeID),
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (recipeID) REFERENCES Recipes(recipeID)
);

CREATE TABLE Bookings
(
  bookingID INT NOT NULL,
  eventName VARCHAR(100) NOT NULL,
  dateBegin DATETIME NOT NULL,
  location VARCHAR(50) NOT NULL,
  dateEnd DATETIME NOT NULL,
  street VARCHAR(50) NOT NULL,
  plz VARCHAR(10) NOT NULL,
  userID VARCHAR(100) NOT NULL,
  typeID INT NOT NULL,
  isReleased BOOLEAN NOT NULL,
  PRIMARY KEY (bookingID),
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (typeID) REFERENCES BookingTypes(typeID)
);

CREATE TABLE BookingEmployees
(
  dateBegin DATETIME NOT NULL,
  dateEnd DATETIME NOT NULL,
  bookingID INT NOT NULL,
  employeeID VARCHAR(100) NOT NULL,
  PRIMARY KEY (bookingID, employeeID),
  FOREIGN KEY (bookingID) REFERENCES Bookings(bookingID),
  FOREIGN KEY (employeeID) REFERENCES Employees(employeeID)
);

CREATE TABLE BookingRecipes
(
  amountOfServings INT NOT NULL,
  bookingID INT NOT NULL,
  recipeID INT NOT NULL,
  PRIMARY KEY (bookingID, recipeID),
  FOREIGN KEY (bookingID) REFERENCES Bookings(bookingID),
  FOREIGN KEY (recipeID) REFERENCES Recipes(recipeID)
);

CREATE TABLE MyRecipes
(
  userID VARCHAR(100) NOT NULL,
  recipeID INT NOT NULL,
  PRIMARY KEY (userID, recipeID),
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (recipeID) REFERENCES Recipes(recipeID)
);
