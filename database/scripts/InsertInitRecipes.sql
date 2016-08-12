
Insert into styles set
   StyleID = 0
  ,StyleName = "Amerikanisch";

Insert into courses set
   CourseID = 0
  ,CourseName = "CourseName";

Insert into styles set
   StyleID = 1
  ,StyleName = "Asiatisch";

Insert into courses set
   CourseID = 1
  ,CourseName = "Blao";

  Insert into recipes set
   RecipeID = 0
  ,RecipeName = "Hamburger"
  ,Description = "Leckerer Hamburger"
  ,Instructions = "Mach erst das dann dies"
  ,PictureRef = "pictureRefHamburger"
  ,StyleID = 0
  ,CourseID = 0;

Insert into recipes set
   RecipeID = 1
  ,RecipeName = "Fischsuppe"
  ,Description = "Eine Schmackhafte Fischsuppe zum Frühstück"
  ,Instructions = "Einen Fisch längs halbieren und dann in den Topf damit"
  ,PictureRef = "pictureRefFischsuppe"
  ,StyleID = 1
  ,CourseID = 1;
