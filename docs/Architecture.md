# LulilucullusNodeJs
- bin
- controllers
- docs
- public
  - css
  - images
  - js
  - thirdparty
    - css
    - js
- routes
- views
  - partials
- app.js
- packages.json

# bin
server startup

# controllers
voraussichtlich alle controller für server/db schnittstellen

# docs
beinhaltet alle zusätzliche Dokumente

# public
client verzeichnis
css sind eigene css styles
images sind alle bildern
js sind eigene client js datein
thirdparty (aufgeteilt nach css und js) sind alle externe frameworks

# routes
dienen der verknüpfung/weiterleitung/rendern unserer einzelnen seiten in form von ejs templates (sehr nah an html dran nur das mit mit injection machen kann)
jede .js in routes muss für den aufruf der html/ejs seite get schnittstelle bereitstellen

# views
ejs templates, kann auch reines html sein. jedes ejs muss ein routes.js gegepart haben

# views # partials
ejs templates die über den include befehl im ejs in mehreren ejs templates wiederverwendet werden
