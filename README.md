<h1>Discord-clone </h1>

<p>
Welcome to the Discord-clone project! This project is a recreation of the popular communication platform designed for creating communities. The goal of this project is to provide users with a similar experience to the original Discord website, including the ability to create servers, channels, and messaging.
</p>

<h1>Screenshots</h1>
<p>Please see the screenshots folder for examples of the project in action.</p>

![splashpage](./splashpage.png)
![login](login.png)
![server_channel_message](server_channel_message.png)
![dms](dm.png)
![explore](explore.png)


<p></p>
<h1>CRUD Features</h1>
The Discord-Clone project includes full CRUD (Create, Read, Update, Delete) features for both the servers and and channels sections of the website. There are partial curds for reading and sending messages for channels and private dms. Additionally, users can join and leave servers of their choosing.

<h2 align=center>Technologies</h2>
<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style=width:50px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style=width:50px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style=width:50px /> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" style=width:50px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" style=width:50px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" style=width:75px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"" style=width:50px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" style=width:50px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style=width:50px /> 
  <div align=center>
</div>
 

<h1>how to get started </h1>

<p>Clone the repository and navigate to the project directory
Run npm install to install all necessary dependencies within the react-app folder.
Create a .env file and add the following variables:
SECRET_KEY=lkasjdf09ajsdkfljalsiorj12n3490re9485309irefvn,u90818734902139489230
DATABASE_URL=sqlite:///dev.db
SCHEMA=flask_schema</p>

<p>To build or reset the database and run seeders, run the following comands in the root folder.  1. pipenv shell 2. flask db upgrade 3. flask seed all. once you've run those three commands, start up the back end server in ther root directory by running flask run (make sure you're in your pipenv shell) head to the react-app folder and run npm start.
The application should now be running on the port specified in your .env file.
Please note that the above instructions assume that you have the necessary dependencies installed on your machine. If you are missing any dependencies, please refer to their respective documentation to learn how to install them. </p>
