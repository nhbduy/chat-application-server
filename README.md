### Real-time chat application (server)

>**Tech Stack**
>* [Node JS](https://nodejs.org)
>* [Express JS](https://expressjs.com) (HTTP server with RESTfull API)
>* [Socket.io](https://socket.io) (socket implementation)
>* [Knex JS](http://knexjs.org/) (query builder database)


After cloning the repository to your local machine, run this commande to install all dependencies needed
```cmd
npm install
```


Install database in your local machine with attached scripts:
* [MySQL](https://raw.githubusercontent.com/nhbduy/chat-application-server/master/scriptDB-mysql.sql)
* [PostgreSQL](https://raw.githubusercontent.com/nhbduy/chat-application-server/master/scriptDB-postgresql.sql)
> NOTE: Do not forget to configure your setting environment at [config.js](https://raw.githubusercontent.com/nhbduy/chat-application-server/master/config.js) file


Runs the app in the development mode with `nodemon`.
```cmd
npm start-dev
```

Open [http://localhost:5000](http://localhost:5000) (port 5000 by default) to view it in the browser.

>#### NOTE: need to be run with [client-side](https://github.com/nhbduy/chat-application) part that you can explore.