# fullStack-mevn-app

Fullstack JavaScript Application (MEVN-MongoDB-Express-Vuejs-Nodejs)


# Requirements
  1. Nodejs >= v10.19
  2. npm >= 6.14.11
  3. yarn >= 1.22.5
  4. @vue/cli >= 4.4.6
  5. internet access

#How to run application <br />
clone repository <br />
      ``` git clone https://github.com/Surajmendy/fullStack-mevn-app.git ``` <br />
      
 change directory to fullStack-mevn-app folder <br />
   ``` cd fullStack-mevn-app ```

-checkout to master branch <br />
``` git checkout master``` <br />

# Configure Database
I have created a mongodb Atlas database and have whitelisted all ip addresses in order to make it easy to run the application.
To change the database, navigate to the backend directory and open config.js
change url to your mongodb database url.<br />
Note** <br />
If you start the backend and you see the message "Connected to the database!" on the console, it means, the application was able to establish connection to the mongodb atlas database, Hence you are good to start testing.<br />

Incase you see the message "Cannot connect to the database!", kindly make sure you are connected to the internet.
Sometimes, atlas reject some IP address, although I have whitelisted all IPs, In this case, kindly email me on surajabdul88@gmail.com to whitelist your IP address or connect to a local monogodb database by changing the url in the config.js


# start backend <br />
- navigate to backend directory <br />
 ```cd backend```  <br />
 install packages <br />
 ``` npm install ``` <br />
-start backend application <br />
      ``` npm start ```
Backend runs on port 3001, <br />
open http://127.0.0.1:3001 in your browser to test if backend started sucessfully <br />
if you see {"message":"Works."} it means the backend application started successfully <br />  
open http://127.0.0.1:3001/api/docs to read API documentation <br />
       
# start frontend <br />
- navigate to  frontend directory <br />
  open new terminal in cloned repo directory<br />
  change directory to frontend directory <br />
 ```cd frontend ```<br />
  install packages <br />
 ``` yarn install ``` <br />
-start frontend application <br />
      ``` yarn serve ```
      
 Frontend runs on port 8080, open frontend in your browser with  http://127.0.0.1:8080
      
# confirm base url for backend 
  open config.js file in fullStack-mevn-app/frontend/public
  change ```apiUrl``` to your backend url <br />
       if the backend url is http://127.0.0.1:3001 <br />
       then apiUrl  = "http://127.0.0.1:3001/api"
      
