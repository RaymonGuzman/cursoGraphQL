--First Command to init npm
npm init

--When with init the project, first of all we install apollo-server
$ npm i apollo-server

--Then we install nodemon
$ npm i -D nodemon

--The whe create the index.js file
$ mkdir index.js

--Then we install mongoose and dotenv extension

$ npm i mongoose dotenv

--To Check After Saving Data
```mongo```
>show dbs           -- To see all the databases
>show collections   --to see the collections we created
>use CRMGraphQL     -- To connect to our database
>db.usuarios.find()  --to see the users added

--Install bcryptjs to hash the password
$ npm i bcryptjs

-- Install Jason Web Token
$ npm i jsonwebtoken


--Check port in use 
```sudo lsof -i -P -n | grep LISTEN```

--How to kill port in use
```sudo fuser -k 4000/tcp```