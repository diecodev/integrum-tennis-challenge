# Overview
This project is the solution to the integrum technical test.

## Statement: 
Develop a complete web application using Next.js for a tennis league.
tennis league. This application will focus primarily on functionality, with a secondary emphasis on design. secondary emphasis on design. The system will serve two types of users: Administrators and Regular Users.
Regular Users. Administrators will manage tournaments and users, while Regular Users will be able to view and register for tournaments. Regular Users will be able to view and register for tournaments.

## Requirements:
- User authentication. (✅)
- Administrative panel. (✅)
- User interface. (✅)
- DB integration. (✅)
- Deployment. (✅)

## Optional requirements (bonuses):
- Google Auth. (✅)
- Payment gateway.

-----------------

# Project Setup:
To setup you project, follow the next steps:

> Note: Before setup the project, you must install [xata cli](https://xata.io/docs/getting-started/cli), create an account in [xata.io](https://xata.io/) and [clerk](https://clerk.com/) and [imgBB](https://ibb.co/):

* Clone the repo.
* Run `npm install` command.
* Create a `.env.local` file in the root directory and copy/paste the existing env variables in the `.env.example` file.
* Follow the steps in [Database Setup](#database-setup), and [Clerk setup](#clerk-setup), and [imgBB Setup](#imgbb-setup).
* Happy coding! 👌

## Clerk Setup
1. Create a [clerk account](https://clerk.com/).
2. Create a [new applications](https://dashboard.clerk.com/apps/new).
3. Go to `Developers>API Keys` section and copy you API Keys.
4. Now, create a new user with the credentials explained below.

```jsx
const adminCredentials = {
  email: "admin@admin.com",
  password: "admin123",
};
```
`// you can change this credentials on you env file but you need to create a custom user with the same email in clerk dashboard`


## Database Setup
1. Create a [xata account](https://xata.io/).
2. Create a new DB.
3. Create 2 tables with the [schemas](#DB-tables-schemas) explained below.
4. Install the [xata cli](https://xata.io/docs/getting-started/cli).
5. run `xata init`
6. Select your db and follow the cli.

#### DB Tables Schemas:
```ts
const tables = [
  {
    tableName: 'tournaments',
    schema: {
      name: string,
      status: string, // not null - defaultvalue: OPEN
      pricing: int, //not null - defaultValue: 50
      description: text,
      enrollees: multiple,
      imageurl: string,
    }
  },
{
    tableName: 'users',
    schema: {
      firstName: string,
      lastName: string,
      primaryEmail: email, // unique: true
      role: string, //not null - defaultValue: USER
      enrollees: multiple,
      imageurl: string, // not null - defaultValue: https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yWThLQlVENVpQOG1DYWVVWGlvSzhBZEJxS3IiLCJyaWQiOiJ1c2VyXzJZOFBhbmdSY0s2clVwTk93WjJrN3FOR0ZiUiIsImluaXRpYWxzIjoiVEEifQ
    }
  },
]
```

## imgBB Setup
1. Create a [imgBB account](https://ibb.co/).
2. Go to [API docs](https://api.imgbb.com/).
3. generate a new API Key and paste it on `.env.local` file

-------------------------------

# Assumptions
- It was not necessary to create a home page.
- There will be no malicious users (although a small layer of security was added to the routes).

-----------------------

# Page Design
## Login Page:
![image](https://github.com/diecodev/integrum-tennis-challenge/assets/51871681/de3cc4c9-82ab-4a3e-96e3-5ca13f30f3e6)

## User routes
### Find tournament route:
![image](https://github.com/diecodev/integrum-tennis-challenge/assets/51871681/a9867abb-4fac-42b4-bbc9-183156890cce)

### My tournaments route
![image](https://github.com/diecodev/integrum-tennis-challenge/assets/51871681/338b10fe-2b84-4d77-be99-72ac78d572dc)

### Tournament info/registration:
- Tournament inifo
![image](https://github.com/diecodev/integrum-tennis-challenge/assets/51871681/496c8758-26a9-4ce0-973c-1ece72f8d9ac)

- Tournament registration:
![image](https://github.com/diecodev/integrum-tennis-challenge/assets/51871681/817550a5-3edf-43fe-89d8-cbca683f85c7)


## Admin routes:
### All tournaments route:
![image](https://github.com/diecodev/integrum-tennis-challenge/assets/51871681/fcf81cf8-0227-4d69-88d7-cc6dae0a946c)

### Create new tournament route:
![image](https://github.com/diecodev/integrum-tennis-challenge/assets/51871681/eab57469-07a2-4b42-b0db-543b03e3bfa9)

### Edit existing tournament:
![image](https://github.com/diecodev/integrum-tennis-challenge/assets/51871681/69b608d7-1c35-4e3e-b4b7-627a2d7fc666)

-----------------------------
# Links
```ts
const links = {
  repository: 'https://github.com/diecodev/integrum-tennis-challenge',
  webSite: 'https://diecodev-integrum-tennis-challenge.vercel.app/',
}
```
