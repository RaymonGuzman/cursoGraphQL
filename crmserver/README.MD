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


-- (Inside our next app project) --
--FrontEnd
--In Desktop path or another path different from the current project
--npx create-next-app crmcliente

--To validate Form, install Formik and Yup
--Install this inside our next.js app (crmcliente folder in this case)
$ npm i formik yup

--To install apollo client and node fetch
$ npm i @apollo/client node-fetch

--Install graphql dependency
$ npm i graphql

--Install apollo link context
--This allow us to pass the token from client to the server
$ npm i apollo-link-context

--Install Tailwind
https://medium.com/better-programming/how-to-set-up-next-js-with-tailwind-css-b93ccd2d4164