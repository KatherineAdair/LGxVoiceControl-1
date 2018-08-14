# LGxVoiceControl
## Overview
Create a DialogFlow Agent which accepts end-user's queries. It extracts keywords (for example, the country name) from those queries and populates those keywords into a Firebase database. Next on Linux, it extracts those keywords from Firebase and displays it on Google Earth. 
## Installation
### Set-Up Dialog Flow
1. **Go to the [Dialog Flow Website](https://console.dialogflow.com/api-client/#/login).** Click Sign in wih Google, and sign in. 
2. In the Left Panel, click on **Create Agent**. 
4. A new window would have appeared in the middle of the page, at the top click on **Agent name**, and give your agent a **name**.
5. Click on **CREATE**.
6. After it creates, click on **Intents** on the left side of the page.
7. Then click on **CREATE INTENT**.
8. Give your Intent a name by clicking on **Intent Name**, I named my intent *AskLocation*. 
9. Click on **Contexts**, followed by **ADD CONTEXT**. Now, type in an **Input Context**, I named mine *ask_for_location*.
10. Click on **Actions and parameters**, followed by **ADD PARAMETERS AND ACTION**.
11. Under **PARAMETER NAME**, give it a name, I named mine *location*.
12. Under **ENTITY**, type in `@sys.geo-country`.
13. Under **VALUE**, type in your **Parameter Name**, so I typed in *location*.
14. Click **SAVE**.
15. Under **Training Phrases**, followed by **ADD TRAINING PHRASES**, type in some Phrases your end users will say. For example *I want to look at america* (Make sure there is a country in each training phrase). Keep adding new training phrases, as your phrases get populated, DialogFlow will highlight the country names in **yellow**, if it doesnt double click that country name, next click on location. 
16. Scroll down to **Fulfillment**, followed by **ADD FULFILLMENT**, then check the **Enable webhook call for this intent**.
17. Click on **SAVE**.
18. Your Intent should look like **[this](https://github.com/MyWorldRules/LGxVoiceControl/blob/master/README%20Assets/Dialogflow%20Intent%20Settings.PNG?raw=true).**
19. Click back on **Intents**, then **Default Welcome Intent**.
20. Under **Contexts**, leave the input context blank, for the output context type in the Input Context you set for your previous intent. For me it was *ask_for_location*. (If you forgot the name of your input context, then click back on Intents, then your other Intent. You should see your input context there)
21. Still in the **Default Welcome Intent**, scroll down to **Responses**. Type in `Hi! What do you want to see?`
22. Click on **Save**.
23. Your Default Welcome Intent should look like **[this](https://github.com/MyWorldRules/LGxVoiceControl/blob/master/README%20Assets/Default%20Welcome%20Intent%20Dialogflow.PNG?raw=true).**. 

### Set-Up Firebase Database
1. **Go to the [Firebase Website](https://firebase.google.com/).** Click on **Get Started** and sign in to your Google Account.
2. Under **Your projects using Firebase**, click on the project with the name of your Dialog Flow Agent.
3. Under **Discover Firebase**, click on Get Started for the **Database** box. 
4. Click on **Create Database**.
5. Click on **Enable**.
6. On the top of the page, next to **Database**, make sure it says **Realtime Databse**, if it doesn't, click on the small downward facing triangle, and select **Realtime Database**.
7. Make sure, you are under the **data** section, if not just click on data.
8. You should see `null`, hover over that then click on the small **plus icon**.
9. For **Name**, type in a broad name, like location. Don't type in specific names like Country/State etc. I named mine *Location*.
10. Leave the **value** blank, then click on the **plus icon** next to the value box.
11. For **Name**, type in Country. (Remember `@sys.geo-country`, that extracts countries)
12. Set the **Value** to anything, I named mine *Empty*. 
13. Lastly, click on the **Add** button. 
14. Copy your **database URL**, it should end with *.firebaseio.com/*.
15. Your Firebase Database should look like **[this](https://github.com/MyWorldRules/LGxVoiceControl/blob/master/README%20Assets/Firebase%20Database.png?raw=true).**

### DialogFlow and Firebase Fulfillment
1. **Head back over to [Dialog Flow](https://console.dialogflow.com/api-client).**
2. On the left panel, click on **Fulfillment**
3. Enable the **Inline Editor**, by clicking the Enabled button.
4. Make sure you are under **index.js**.
5. **Delete** all the code currently in the Inline Editor, and replace it with **[this](https://github.com/MyWorldRules/LGxVoiceControl/blob/master/index.js).**
6. In the code, replace *DATABASEURL* with your database URL. When you copy your Database URL, remove the HTTPS://. It should look something like this: `ws://NAME.firebaseio.com/`.
7. In the code, replace *BROADNAME* with the broad name from your database. Mine looks like this: `return admin.database().ref('location').transaction((location) => {`.
8. In the code, replace *NAMEOFINTENT* to what your intent name is. Mine looks like this: `intentMap.set('AskLocation', handleLocation);`
9. Click on **DEPLOY**.
10. After it deployes, you can test it out. On the **Try it now** field, type in a greeting (like hi, hello etc). It will respond `Hi! What do you want to see?`, now type in a country name. It will finally respond `Thank You... Viewing (name of your country) on Liquid Galaxy`!

### Linux Installation
Use the termial for the installation
#### Set-Up Firebase CLI
1. Install all updates <br/>
`sudo apt-get update`<br/>
`sudo apt-get upgrade`
2. Install curl: <br/>
`sudo apt-get install curl`
3. Install node.js: <br/>
`curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -` <br/>
`sudo apt-get install -y nodejs`
4. Install Firebase CLI: <br/>
`npm install -g firebase-tools`
5. Log in to Firebase: <br/>
`firebase login`<br/>
When you run this command, it will ask if Firebase can collect ULI usage and error, just type `Y`<br/>
Then it will open a window, there you log into your Google Account
4. Initialize your Firebase CLI: <br/>
`firebase init`<br/>
When you run this command, it will ask you which features to select, select all of them. To select click on space, and to go down click on the down key. Click enter when you finish selecting them all.<br/>

Next, it will ask you to set up a default Firebase project. Select the project which contains your database, from the *Set Up Firebase Section.*<br/>

After that, just keep clicking enter. Until it asks for what language to use. <br/>

Chose `JavaScript` when it askes for what language to use for Cloud Function. <br/>
Then, type `y` for when it askes if you want to use ESLint <br/>
Next, type `Y` when it askes to install dependencies. <br/>
After that, click enter when it askes to use your public directory. <br/>
Then, type `y` for when it askes to configure it as a single-page app. <br/>
Finally, click enter for when it asks about Storage Rules. 

#### Download Google Earth
1. On Linux, open the browser and go to the Google Earth [download page](https://www.google.com/earth/download/gep/agree.html).
2. Download and install it, by using the default software install (or any other way to install it).

#### Editing Google Earth
1. Navigate to Google Earth folder:
`cd /opt/google/earth/pro`
2. Edit drivers.ini file with Root privileges:
`sudo nano drivers.ini`
Between `SETTINGS{` and `CPUVertexBlendEfficiency = 1.2`, type in the following:
`;ViewSync settings`<br/>
`ViewSync/queryFile = /tmp/query.txt`<br/>
`ViewSync/send = true`<br/>
Click Ctrl-X<br/>
Then `Y` to Save
3. drivers.ini should look like [this](https://github.com/MyWorldRules/LGxVoiceControl/blob/master/README%20Assets/drivers.ini.PNG?raw=true). 

#### Controlling Google Earth
1. Download Script:
`wget https://raw.githubusercontent.com/MyWorldRules/LGxVoiceControl/master/LGScript.sh`
2. Edit Script
`nano LGScript.sh`<br/>
Use the arrow keys to go down to `firebase database:get /BROADNAME/country > messages.txt`. Replace *BROADNAME* with the Broad Name from the Firebase database.<br/>
Click Ctrl-X<br/>
Then `Y` to Save
3. Give execute permission to the script:
`chmod +x LGScript.sh`
5. Open Google Earth
6. Run the script:
`./LGScript.sh`
Note: The first time you run the file, you will get a error. From the second time onward there will be no error. 
7. To stop the script, simply click Ctrl-C
