insert into ingredients set
   ingredientID = 0
  ,ingredientName = "Butter";

insert into ingredients set
   ingredientID = 1
  ,ingredientName = "Mehl";

  insert into ingredients set
   ingredientID = 2
  ,ingredientName = "Milch";

  insert into ingredients set
   ingredientID = 3
  ,ingredientName = "Eier";

  INSERT INTO RecipeIngredients SET
    amount = '10',
    recipeID = '0',
    ingredientID = '0',
    unitID = '0';


INSERT INTO RecipeIngredients SET
  amount = '10',
  recipeID = '1',
  ingredientID = '0',
  unitID = '0';

INSERT INTO RecipeIngredients SET
  amount = '100',
  recipeID = '1',
  ingredientID = '1',
  unitID = '2';

INSERT INTO RecipeIngredients SET
  amount = '500',
  recipeID = '1',
  ingredientID = '2',
  unitID = '3';


INSERT INTO RecipeIngredients SET
  amount = '1',
  recipeID = '2',
  ingredientID = '1',
  unitID = '1';

INSERT INTO RecipeIngredients SET
  amount = '1',
  recipeID = '2',
  ingredientID = '3',
  unitID = '3';

INSERT INTO RecipeIngredients SET
  amount = '150',
  recipeID = '2',
  ingredientID = '2',
  unitID = '2';

INSERT INTO RecipeIngredients SET
  amount = '40',
  recipeID = '2',
  ingredientID = '4',
  unitID = '1';
