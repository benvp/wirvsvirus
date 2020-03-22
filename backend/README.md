# Trimm Dich Zuhause!  - Backend

## Description

Backend service for the Trimm Dich Zuhause Portal powered by [Nest](https://github.com/nestjs/nest).

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Configuration
Configuration files are stored in folder `/config`.  
  

`default.yml`: Contains configuration valid for all environments.
`development.yml`: Contains configuration used in development mode, including credentials to development database  
`production.yml`: Contains configuration used in production mode. Secret information (like db credentials and jwt secret) should not be stored here.

## Running on production

To run the application safely, you need to set up several environment variables.  

#### Overview of configurable environment variables in production with example values:
```
DB_HOSTNAME='localhost'
DB_PORT='5432'
DB_NAME='trimmdich'
DB_USERNAME='your db username'
DB_PASSWORD='your db password'
DB_TYPE='postgresql'
JWT_SECRET='X68XaHGzgWHckriXig4BrfDoecj2Cn'
ADMIN_PASSWORD='admin1234'
```

### Compile and run the app
Compile the app once, then set environment variables and run the app in one command.  
**Please use a secure JWT token. You can get one from random password generators online!**

First compile the app
```bash 
npm run build
```
### Linux (Bash)
```bash
$ DB_USERNAME=postgres DB_PASSWORD=postgres JWT_SECRET=X68XaHGzgWHckriXi npm run start:prod
```
_This is just an example. Please provide all required environment variables (see above)!_

### Windows (PowerShell)
```bash 
 $env:DB_USERNAME="postgres"; $env:DB_PASSWORD="postgres"; $env:JWT_SECRET="X68XaHGzgWHckriXi"; npm run start:prod
```
_This is just an example. Please provide all required environment variables (see above)!_

