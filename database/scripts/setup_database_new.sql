CREATE TABLE Ingredients
(
  IngredientID INT NOT NULL,
  IngredientName VARCHAR(50) NOT NULL,
  PRIMARY KEY (IngredientID),
  UNIQUE (IngredientName)
);

CREATE TABLE Styles
(
  StyleID INT NOT NULL,
  StyleName VARCHAR(50) NOT NULL,
  PRIMARY KEY (StyleID),
  UNIQUE (StyleName)
);

CREATE TABLE Courses
(
  CourseID INT NOT NULL,
  CourseName VARCHAR(50) NOT NULL,
  PRIMARY KEY (CourseID),
  UNIQUE (CourseName)
);

CREATE TABLE Users
(
  Name VARCHAR(50),
  FamilyName VARCHAR(100),
  UserID INT NOT NULL,
  Street VARCHAR(50),
  AccountName VARCHAR(50) NOT NULL,
  Location VARCHAR(50),
  HouseNumber VARCHAR(10),
  ContactNumber VARCHAR(10),
  EmailAdress VARCHAR(50),
  Password INT NOT NULL,
  PRIMARY KEY (UserID)
);

CREATE TABLE Allergenes
(
  AllergenID INT NOT NULL,
  AllergenName VARCHAR(50) NOT NULL,
  PRIMARY KEY (AllergenID),
  UNIQUE (AllergenName)
);

CREATE TABLE IngredientsAllergenes
(
  IngredientID INT NOT NULL,
  AllergenID INT NOT NULL,
  PRIMARY KEY (IngredientID, AllergenID),
  FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID),
  FOREIGN KEY (AllergenID) REFERENCES Allergenes(AllergenID)
);

CREATE TABLE Employees
(
  EmployeeID INT NOT NULL,
  Name VARCHAR(50) NOT NULL,
  FamilyName VARCHAR(50) NOT NULL,
  Location VARCHAR(50) NOT NULL,
  Street VARCHAR(50) NOT NULL,
  HouseNumber VARCHAR(10) NOT NULL,
  ContactNumber VARCHAR(10) NOT NULL,
  EmailAdress VARCHAR(50) NOT NULL,
  PRIMARY KEY (EmployeeID)
);

CREATE TABLE BookingTypes
(
  TypeID INT NOT NULL,
  Type VARCHAR(50) NOT NULL,
  PRIMARY KEY (TypeID)
);

CREATE TABLE Units
(
  UnitID INT NOT NULL,
  UnitName VARCHAR(10) NOT NULL,
  PRIMARY KEY (UnitID),
  UNIQUE (UnitName)
);

CREATE TABLE Recipes
(
  RecipeID INT NOT NULL,
  RecipeName VARCHAR(100) NOT NULL,
  Description VARCHAR(100) NOT NULL,
  Instructions LONGTEXT NOT NULL,
  PictureRef VARCHAR(256) NOT NULL,
  StyleID INT NOT NULL,
  CourseID INT NOT NULL,
  PRIMARY KEY (RecipeID),
  FOREIGN KEY (StyleID) REFERENCES Styles(StyleID),
  FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
  UNIQUE (RecipeName)
);

CREATE TABLE RecipeIngredients
(
  Amount FLOAT NOT NULL,
  RecipeID INT NOT NULL,
  IngredientID INT NOT NULL,
  UnitID INT NOT NULL,
  PRIMARY KEY (RecipeID, IngredientID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
  FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID),
  FOREIGN KEY (UnitID) REFERENCES Units(UnitID)
);

CREATE TABLE Ratings
(
  Stars INT,
  Comment TEXT,
  UserID INT NOT NULL,
  RecipeID INT NOT NULL,
  PRIMARY KEY (UserID, RecipeID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
);

CREATE TABLE Bookings
(
  BookingID INT NOT NULL,
  EventName VARCHAR(100) NOT NULL,
  DateBegin DATE NOT NULL,
  Location VARCHAR(50) NOT NULL,
  DateEnd DATE NOT NULL,
  Street VARCHAR(50) NOT NULL,
  HouseNumber VARCHAR(10) NOT NULL,
  UserID INT NOT NULL,
  TypeID INT NOT NULL,
  PRIMARY KEY (BookingID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (TypeID) REFERENCES BookingTypes(TypeID)
);

CREATE TABLE BookingEmployees
(
  DateBegin DATE NOT NULL,
  DateEnd DATE NOT NULL,
  BookingID INT NOT NULL,
  EmployeeID INT NOT NULL,
  PRIMARY KEY (BookingID, EmployeeID),
  FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID),
  FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

CREATE TABLE BookingRecipes
(
  AmountOfServings INT NOT NULL,
  BookingID INT NOT NULL,
  RecipeID INT NOT NULL,
  PRIMARY KEY (BookingID, RecipeID),
  FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
);
