
## Backend:
Hello, while writing the project, I chose to write a complex structure that is suitable for a slightly larger structure instead of adding a classic structure, controllers and routers.
The reason of this; While completing the challenge, I thought that I would create the basis of my own project.
For this reason, it may make you think that there is too much unnecessary code for this challenge. But all so that it is better and more easily expandable.

The reason for using plugins instead of writing a lot of functions under the 'Services' or 'Controllers' folder:

To have 'inheritence',
Split as logic,
Making it more suitable for tests,
More suitable for future additions. Even if a great new feature comes in the future, it will only have 1 folder space and will be independent from the others.
When separating plugins, they can be quickly extracted and included in another project or it can be used in multiple projects simultaneously ( with future updates ).
When there are classes with common logic, one should be extended from the other, there should be no method repetition. (DRY principle)

Extra I added to Backend ( maybe can be perceived as nice to have )

Husky, Eslint, prettier,
CORS,Logger system,  Error system, plugins system and tests.

Kafka, log and redis in 'components' folder are not fully active yet. 
I putted them for future additions 
I tried to write a comment line as much as possible
I hope you like.

### Folder structure : 
If it's necessary, each folder must have an index.js for easier accessibility. 
Api: here, you can add routes and the controllers you want.
Plugins : If you want to add a feature to project; create a folder and write your service class extending $Service ofc.
Services : It's where functions are stored for services. For example : membership's functions : getCurrentUser() ..
Errors :  A special place to catch error.
Config/security :  will be used as middleware folder

## Frontend: 

your pdf file says "Do not use ReactJS, VueJS etc." but I used Vue + Vuex because you allowed it when we talked in Google Meet.
Therefore, I can easily express say that; it was easier than writing vanillajs of course. 


It is much simpler to understand structurally than Backend.
I divided the router part nicely and made it quite understandable.
Store : Part I reserved for Vuex events. If you haven't used Vuex, in short, React's Redux equals Vue's Vuex. Instead of defining them all one by one I introduced it by directly scanning a folder for modules.


What did I do for responsive? 

- For Responsive, I was going to use the Dimitry technique + breakpoint technique, which is a similar technique I have used before, but I realized and used that a library was created on it (structurally the same) 


I have literally not been using css and vuejs for almost 3 months.
This is all I can do for Frontend for now, 
I could spare 1 day for all of them (css and vue) except Login. I hope you like it.

Thanks for reading. 

- Emre Kaşgür


the time I spent coding this project : 3 days ( 5 hour per day) 


You can install backend and frontend : npm install & npm start

 
