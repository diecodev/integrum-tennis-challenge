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
3. Create 2 tables with the schemas explained below.
4. Install the [xata cli](https://xata.io/docs/getting-started/cli).
5. run `xata init`
6. Select your db and follow the cli.

## DB Tables Schemas
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
