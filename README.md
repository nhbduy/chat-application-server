### Real-time chat application (server)

> **Tech Stack**
>
> - [Node JS](https://nodejs.org)
> - [Express JS](https://expressjs.com) (HTTP server with RESTfull API)
> - [Socket.io](https://socket.io) (socket implementation)
> - [Knex JS](http://knexjs.org/) (query builder database)

After cloning the repository to your local machine, run this commande to install all dependencies needed

```cmd
npm install
```

Install database in your local machine with attached scripts:

- [MySQL](https://raw.githubusercontent.com/nhbduy/chat-application-server/master/scriptDB-mysql.sql)
- [PostgreSQL](https://raw.githubusercontent.com/nhbduy/chat-application-server/master/scriptDB-postgresql.sql)
  > NOTE: Do not forget to configure your setting environment at [config.js](https://raw.githubusercontent.com/nhbduy/chat-application-server/master/config.js) file

Runs the app in the development mode with `nodemon`.

```cmd
npm run start-dev
```

Open [http://localhost:5000](http://localhost:5000) (port 5000 by default) to view it in the browser.

> #### NOTE: need to be run with [client-side](https://github.com/nhbduy/chat-application) part that you can explore.


___

#### OVERVIEW

1. Tech Stack: React JS, Node JS, Socket.io (socket for real-time chat), Knex.js (query builder for database) 
2. Features:
    - Case A. The application need to fill in the name before to start any conversation ✅
    - Case B. The application is able to chat either in a group ✅or peer to peer ❎(to be implemented)
    - Case C. The application is able to join the conversation by entering specific link ✅
3. The chat need to be shown the following information:
   - Message ✅
   - Date Time ✅
   - Username Bonus ✅

4. Chat Performance: response time
5. Notification: (Read or unread Message)
   - Individual notification ✅
   - Multiple notifications ❎(to be implemented)

6. Deployment Procedure:
   - Client: Heroku ✅/ GitHub Pages ❎ (to be fixed, currently do not work with 'react-router-dom')
   - Server: Heroku ✅
   - Database: PostgreSQL on Heroku ✅

___