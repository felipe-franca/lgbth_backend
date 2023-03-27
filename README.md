# Backend Server
This project was generated in [NodeJS](https://nodejs.org/en) in version 16.18.0 and uses firestore as data repository.
> The project uses [TypeScript](https://www.typescriptlang.org/) !

## Starting Project
After install [NPM](https://docs.npmjs.com/) package manager run:
```bash
npm install
```
```bash
yarn install
```

<br>

### Create dotenv file
Create dotenv(.env) file that contains the *secrets* and *environment variables* in the root of the project:
```
touch .env
```

After creating the .env file, configure it with the following keys:
```bash
PORT="<port>" # (optional)
FIREBASE_APIKEY="<apiKey>" # (mandatory) firestore configuration apiKey
FIREBASE_AUTH_DOMAIN="<authDomain>" # (mandatory) firestore configuration authDomain
FIREBASE_PROJECTID="<projectId>" # (mandatory) firestore configuration projectId
FIREBASE_STORAGE_BUCKET="<storageBucket>" # (mandatory) firestore configuration storageBucket
FIREBASE_STORAGE_MESSAGINGSENDERID="<messagingSenderId>" # (mandatory) firestore configuration messagingSenderId
FIREBASE_APPID="<appId>" # (mandatory) firestore configuration appId
```
> The default port is: 3333
>
> All settings can be found in "**firestore console**" under "**Project Settings**"

<br>

## Starting Dev
To start the project in development mode run:
```bash
npm run start:dev
```
```bash
yarn start:dev
```

<br>

## Building
The build directory is called dist. To build the project run:

```bash
npm run build
```
```bash
yarn build
```

## Project Structure
```bash
root-dir
├── .env # Secrets file
├── src
│   ├── App.ts # The application controller
│   ├── controllers
│   ├── models
│   ├── routes
│   │   └── api # The mobile aplication api routes
│   ├── server.ts # Application server
│   └── services
└── __tests__
    ├── integration
    └── unit
```