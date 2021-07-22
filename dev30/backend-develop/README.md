# Spring Boot Application ReSoft

##Background

Fundación Jala constantly carries out recruitment campaigns looking for talented people for different areas of software development.
For this, different activities are being developed such as: meetings, evaluations, interviews, etc. to find potential candidates for the different programs on offer.

## Purpose

A recruitment management system is developed that manages programs, stages, activities, it also manages the information of the numbers with management of roles and user access.

## Table of Contents

- [Technology stack & other Open-source libraries](#technology-stack---other-open-source-libraries)
  * [Data](#data)
  * [Server - Backend](#server---backend)
  * [Libraries and Plugins](#libraries-and-plugins)
  * [Others](#others)
  * [External Tools & Services](#external-tools---services)
- [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [EER Diagram](#eer-diagram)
- [Installing](#installing)
    + [Running the application with IDE](#running-the-application-with-ide)
    + [Running the application with Maven](#running-the-application-with-maven)
    + [Accessing Data SQL](#accessing-data-in-Mysql-database)
        * [SQL](#sql)
- [Testing API](#testing-api)
  * [Testing with Postman Runner](#testing-with-postman-runner)
  * [Testing with Maven](#testing-with-maven)
  * [Basic Load Testing](#basic-load-testing)
- [Security](#security)
  * [Sample Valid JSON Request Bodys](#sample-valid-json-request-bodys)
    + [<a id="signup">Signup -> /api/auth/signup</a>](#-a-id--signup--signup-----api-auth-signup--a-)
    + [<a id="login">Login -> /api/auth/login</a>](#-a-id--login--login-----api-auth-login--a-)
    + [<a id="token">Refresh Token -> /api/auth/login</a>](#-a-id--login--login-----api-auth-login--a-)
  * [Session Timeout](#session-timeout)
- [Explore Rest APIs](#explore-rest-apis)
  * [URLs](#urls)
  * [Other URLs](#other-urls)
    + [Accessible to **test** user only](#accessible-to---test---user-only)
  * [Person Management URLs](#person-management-urls)
    + [Role and Permission based secure access to **AdminUser** and **AdminTrainee** users](#role-and-permission-based-secure-access-to---adminuser---and---admintrainee---users)
    + [Sample Valid JSON Request Bodys](#sample-valid-json-request-bodys-1)
- [Files and Directories Structure](#files-and-directories-structure)
  * [Packages](#packages)
- [Reporting Issues/Suggest Improvements](#reporting-issues-suggest-improvements)
- [License compliance and vulnerabilities](#license-compliance-and-vulnerabilities)

## Technology stack & other Open-source libraries

### Data

* 	[MySQL](https://www.mysql.com/) - Open-Source Relational Database Management System

### Server - Backend

* 	[OpenJDK](https://openjdk.java.net/projects/jdk/11/) - Java11™ Platform, Standard Edition Development Kit
* 	[Spring Boot](https://spring.io/projects/spring-boot) - Framework to ease the bootstrapping and development of new Spring Applications
* 	[Maven](https://maven.apache.org/) - Dependency Management
* 	[JSON Web Token](https://www.jsonwebtoken.io/) - Encode or Decode JWTs


###  Libraries and Plugins

* 	[Mapstruct-1.4.1.Final](https://mapstruct.org/) - MapStruct is a code generator that greatly simplifies the implementation of mappings between Java bean types based on a convention over configuration approach.
* 	[Lombok-1.18.12](https://projectlombok.org/) - Never write another getter or equals method again, with one annotation your class has a fully featured builder, Automate your logging variables, and much more.

### Others 

* 	[git](https://git-scm.com/) - Free and Open-Source distributed version control system

### External Tools & Services

* 	[Postman](https://www.getpostman.com/) - API Development Environment (Testing Docmentation)
* 	[Postman Echo](https://docs.postman-echo.com/?version=latest) - A service that can be used to test your REST clients and make sample API calls. It provides endpoints for GET, POST, PUT, various auth mechanisms and other utility endpoints.
* 	[Insomnia](https://insomnia.rest/) - The Desktop API client for REST.
* 	[gitignore.io](https://www.toptal.com/developers/gitignore) - Create useful .gitignore files for your project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

For development follow the next steps:
    - create database `resoftdb`
    - run scripts inside database directory

### Prerequisites

*	You need to have **MySQL** installed on your machine to run the application in **`dev`** profile. Using the `MySQL Workbench` or on any other MySQL client/console, create a database/schema named `resoftdb`. 

~~~sql
-- create schema
CREATE SCHEMA resoftdb;

-- use schema
USE resoftdb;

-- Create user 
create user 'resoftdb'@'localhost' identified by 'resoftdb';

-- Grant privileges to user
grant all privileges on *.* to 'resoftdb'@'localhost' with grant option;
~~~

After creating the database/schema, you need to add your **MySQL** `username` and `password` in the `application-dev.properties` file on `src/main/resource`. The lines that must be modified are as follows:

```properties

jwt.secret=resoftdb
spring.datasource.url=jdbc:mysql://localhost:3306/resoftdb?serverTimezone=UTC
spring.datasource.username=resoftdb
spring.datasource.password=resoftdb
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
server.port=9000
```

### EER Diagram



## Installing

*	Default active profile is **`dev`**. When the application is running, **Flyway** will create the necessary tables and system data along with sample data. In the **`test`** profile, the application uses **Mysql** database (data in local).

* 	URL to access application UI: **http://localhost:9000/**.

#### Running the application with IDE

There are several ways to run a Spring Boot application on your local machine. One way is to execute the `main` method in the `org.fjala.resoft.ReSoftApplication` class from your IDE.

* 	Download the zip or clone the Git repository.
* 	Unzip the zip file (if you downloaded one)
* 	Open Command Prompt and Change directory (cd) to folder containing pom.xml
* 	Open IntelliJ IDEA Community Version: 2020.2.3
	* File -> Import -> Existing Project -> Navigate to the folder where you unzipped the zip
	* Select the project
* 	Choose the Spring Boot Application file (search for @SpringBootApplication)
* 	Right Click on the file and Run as Java Application

#### Running the application with Maven

Alternatively you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
$ git clone https://gitlab.fundacion-jala.org/dev-30/team-project/backend.git
$ cd backend
$ mvn spring-boot:run
```
##### Accessing Data in Mysql Database

###### Mysql Console

Fill the login form as follows and click on Connect:

* 	shell> mysql -u root -p
* 	mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password'
* 	mysql> QUIT

More information [mysql getting started](https://dev.mysql.com/doc/mysql-getting-started/en/)


##### Basic MySQL commands for reference

|                Commands            |                   Description                  |
|------------------------------------|------------------------------------------------| 
|`show databases;`					 | lists the databases on the MySQL server host	  |
|`show schemas;`					 | a synonym for **show databases;**		      |
|`use [database_name];`				 | select any existing database in the SQL schema |
|`show tables;`						 | list tables in a Database	         		  |

##### Basic MySQL use programan MySQL Workbench

MySQL Workbench is a unified visual tool for database architects, developers, and DBAs. MySQL Workbench provides data modeling, SQL development, and comprehensive administration tools for server configuration, user administration, backup, and much more. MySQL Workbench is available on Windows, Linux and Mac OS X.

Reference: https://www.mysql.com/products/workbench/

## Testing API

### Testing with Maven

*	Run only unit tests:

```shell
$ mvn clean test
```


## Security

Refer to the `ApplicationSecurityConfig` class in `io.github.anantharajuc.sbat.backend.security`.


|     Username     | Password |     Role     |                      Permission                       |         Resource          |
|------------------|----------|--------------|-------------------------------------------------------|---------------------------|
|`johndoe`         |`password`|`PERSON`      |                                                       |`/api/v1/person`           |
|`AdminUser`       |`password`|`ADMIN`       |`PERSON_CREATE,PERSON_READ,PERSON_UPDATE,PERSON_DELETE`|`/api/v1/management/person`|
|`AdminTraineeUser`|`password`|`ADMINTRAINEE`|`PERSON_READ`                                          |`/api/v1/management/person`|

|                                          URL                        | Method |                    Remarks                    | Sample Valid Request Body |
|---------------------------------------------------------------------|--------|-----------------------------------------------|---------------------------|
|`http://localhost:9000/api/v1/auth/signup`                           | POST   |                                               | [JSON](#signup)           |
|`http://localhost:9000/api/v1/auth/verification/{verification-token}`| GET    |                                               |                           |
|`http://localhost:9000/api/v1/auth/login`                            | POST   |Bearer Token, Refresh Token is generated       | [JSON](#login)            |
|`http://localhost:9000/api/v1/subreddit`                             | POST   |Bearer Token should be passed for authorization| [JSON](#subreddit)        |
|`http://localhost:9000/api/v1/auth/refresh/token`                    | POST   |Refresh Token from login should be passed      | [JSON](#refresh-token)    |

#### Sample Valid JSON Request Bodys

##### <a id="signup">Signup -> /api/auth/signup</a>
```json
{
    "username":"Name FirstName",
    "email":"name.firstname@fundacion-jala.org",
    "password":"abcd1234"
}
```

##### <a id="login">Login -> /api/auth/login</a>
```json
{
    "email":"name.firstname@fundacion-jala.org",
    "password":"abcd1234"
}
```

##### <a id="autentication">Refresh Token -> /api/auth/login</a>
```json
{
    "token":"1178cd43-21d2-45b4-8b5f-c79aa1d5b76e"
}
```
### Session Timeout

If the application remains inactive for a specified period of time, the session will expire. The session after this period of time is considered invalid and the user has to login to the application again.

This value **server.servlet.session.timeout** can be configured in **application.properties** file

## Explore Rest APIs

The app defines following CRUD APIs. **Test you can use the localhost**

To enable SSL, toggle **server.ssl.enabled** to **true** and use the **https://** protocol in the URL instead of **http://**

Since the SSL certificate is self signed, turn off the **SSL certificate verification** option while interacting with the URLs via **Postman**


### URLs

|                   URL                  | Method |          Remarks       |
|----------------------------------------|--------|------------------------|
|`http://localhost:9000/api/v1/index`           | GET    | Home Page              |


### Other URLs
|                           URL                                  | Method |
|----------------------------------------------------------------|--------|
|`http://localhost:9000/api/v1/report/`                       |   GET  |  

### Person Management URLs

#### Role and Permission based secure access to **AdminUser** and **AdminTrainee** users

|                          URL                             |  Method |                                       Remarks                                       | Sample Valid Request Body |
|----------------------------------------------------------|---------|-------------------------------------------------------------------------------------|---------------------------|
|`http://localhost:9000/api/v1/management/user`          | GET     | Header `Accept:application/json` or `Accept:application/xml` for content negotiation|                           |
|`http://localhost:9000/api/v1/management/user`          | POST    | Add a user                                                                        |   [JSON](#personcreate)   |

### Packages

*   `api` - API utilities;
*   `configs` - app configurations;
*   `exceptions` - manager to exceptions;
* 	`controllers` - to listen to the client;
* 	`exception` - to hold custom exception handling;
* 	`datatypes` - to hold our entities;
* 	`repository` - to communicate with the database;
* 	`security` - security configuration;
* 	`jwt` - json web token for authentication;
* 	`service` - to hold business logic;
* 	`commons` - Generic classes;
* 	`util` - to hold our utility classes;
*   `database` - data populating scripts
* 	`resources/` - Contains all the static resources, templates and property files.
* 	`resources/static` - contains static resources such as css, js and images.
* 	`resources/application.properties` - It contains application-wide properties. Spring reads the properties defined in this file to configure your application. You can define server’s default port, server’s context path, database URLs etc, in this file.

* 	`test/` - contains unit and integration tests

* 	`pom.xml` - contains all the project dependencies

## license compliance and vulnerabilities

