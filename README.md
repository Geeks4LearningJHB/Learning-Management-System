  <p align="center">
	<img src="G4L.UserManagement.UI/src/assets/download.png" alt="Logo"/>
  </p>

<p align="center">	
  <a href="https://github.com/Geeks4LearningJHB/Learning-Management-System/actions/workflows/dotnet.yml">
    <img src="https://github.com/Geeks4LearningJHB/Learning-Management-System/actions/workflows/dotnet.yml/badge.svg" alt="Build Status"/>
  </a>
</p>

User management web app made with .NET core and Angular (Typescript).

# Getting started locally

Prerequisites:

## Backend setup

Windows Setup, Download and install the following:

- Microsoft SQL server
  - [MS SQL SERVER](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
  - Microsoft SQL Server Management Studio [SSMS](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)
- Microsoft Visual Studio
  - [Visual Studio](https://visualstudio.microsoft.com/downloads/)

## Frontend setup

Windows Setup, Download and install the following:

- [Visual Studio Code](https://code.visualstudio.com/download), you can use IDE of your choice.
- [NodeJs](https://nodejs.org/en), you install the most recent LTS version of NodeJs.
- [Angular](https://angular.io/guide/setup-local), follow the instructions on how to install Angular locally on your machine if you have not already.

## Repository

1. Clone the repository (if you're contributing, you'll need to first fork the repository and then clone your fork)
1. Checkout SIT_branch
1. Installing frontend packages:
   `cd  G4L.UserManagement.UI` then `npm install`
1. When finished, `npm start`
1. Updating backend, open Microsoft Visual Studio and run `Update-database` from `Visual Studio PMC`
1. When finished, run the project

## Log in with our test user

When running the frontend and backend, or only the backend, you can use the following test user:

- Ask for `data-migration.sql` script
- Password: `P@ssword1`
### Super admin
- Email address: `super.admin@geeks4learning.com`

### Admin
- Email address: `admin@geeks4learning.com`

### Trainee
- Email address: `trainee@geeks4learning.com`

### Trainer
- Email address: `trainer@geeks4learning.com`

Note: If you're running the backend using postman or third party application, you will need a JWT token for subsequent requests after logging in see our [connecting to the backend](todo) wiki page.

# Contributing

If you wish to contribute (thanks!), please first see the [contributing document]().

We work hard to make our project approachable to everyone -- from those new to project simulation (Geeks) looking to make their first contribution to seasoned developers.

## Backend: fixing errors

You may find lots of errors for things like ASP.NET Core Runtime.
Read the error and follow the link provided to download ASP.NET Core Runtime 5.0\*.

## Help

If you need help with anything, we'll be happy to help you over an email : lms@geeks4learning.com, Alternatively, feel free to chat with us on the [#Developer]() channel on our [Teams workplace]().

When asking for help on Teams, we always recommend asking on our [#Developer]() channel, rather than [#General or any other channels]() directly. This is so that others can offer help and the answer may help someone else.

# Further information

For more information, such as a roadmap and the project's underlying principles, see our [Wiki](https://github.com/Geeks4LearningJHB/Learning-Management-System/wiki).
