# ReSoft - UI

ReSoft - UI is a React project for recruitment programs at Jala Foundation.

## Installation

Use the package manager [npm](https://docs.npmjs.com/cli/v6/commands/npm-install) to install ReSoft-UI.

```bash
npm install
```
 

## DEVELOPMENT TOOLS

This project’s front end will be developed in JavaScript using these following libraries, dependencies and an extracted webpack.

* __ReactJS__ is an open-source, front end, JavaScript library for building user interfaces or UI components.
* __Redux__ is an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces.
* __Axios__ is a promise-based HTTP client for the browser and node.js
* __redux-devtools-extension__ is an extension that allows for the track and movement of state change.
* __react-router-dom__ helps simplify and make the navigation of components easier to understand.
* __Jest__

The tools used to develop this project will be the following.

__Visual Studio Code__ is a free source-code editor made by Microsoft for Windows, Linux and macOS, with the following extensions.
* __ESLint__ is a static code analysis tool for identifying problematic patterns found in JavaScript code.
* __ReactJS Code Snippets__ is an extension that contains code snippets for Reactjs and is based on the awesome babel-sublime-snippets package.
* __Add jsdoc comments__ is an extension that adds simple jsdoc comments for the parameters of a selected function signature.

## SOFTWARE ARCHITECTURE FOR THE FRONTEND
__Flux__ is an architecture for the management and flow of data in a web application, particularly in the Front-End. It was devised by Facebook and would replace the MVC (or MVVM) pattern.

Flux proposes an architecture in which the flow of data is unidirectional. The data travels from the view through actions and reaches a “Store” from which the view will be updated again.
Having a single path, and a place where the application state is stored, it is easier to debug errors and know what is happening at all times.

As I say, Flux is a design pattern or way of "architecture" a web application, specifically the way in which the data or state of the application is handled (user data, data collected from a REST API or webservice, etc.) It is not a library or framework.
Just as an MVC pattern is made up of a Model, a View and a Controller, in Flux we have different actors:

__View:__ The view would be the web components, whether they are built natively, with Polymer, with Angular, React, etc.

__Store:__ The Store would be the closest thing to the application model. Save the application data / status and in Flux there may be several.  (There are no methods in the Store that allow modifying the data in it, this is done through dispatchers and actions.)
__Actions:__ An action is simply a JavaScript object that indicates an intention to do something and that carries data associated with it if necessary.
__Dispatcher:__ Actions like the one above are sent to a dispatcher that is responsible for triggering it or propagating it to the Store.
The view is the one in charge of sending the actions to the dispatcher.
A dispatcher is nothing more than a mediator between the Store or Stores and the actions. It is used to decouple the Store from the view, since this way it is not necessary to know that the Store handles a specific action.
In summary, the FLUX pattern follows the following path:


* The __view__, through an event, sends an action with the intention of making a change in the state
* The __action__ contains the type and data (if any) and is sent to the dispatcher.
* The __dispatcher__ propagates the action to the Store and it is processed in order of arrival.
* The __Store__ receives the action and depending on the type received, updates the status and notifies the views of this change.
* The view receives the notification and is updated with the changes.

All in one direction.


## FLUX IMPLEMENTATIONS
__REDUX:__ It is a very small library with very few methods that implements the Flux pattern with some modifications that make it easier to handle. It is agnostic to the framework or library you use for your development, since it is only JavaScript so you can use it together with Angular, with Polymer and with React.

## REACT REDUX
react-redux is a library that helps us connect the store with the component's properties. However, this library is not a requirement to use Redux with React.

## STRUCTURE PROJECTS

__Division by components__

Dividing the project based on the components is another way that can be structured. In this case, we are going to put all the files related to a component together in a folder with the name of the component.

As we can see in the file tree above, each component will be independent of each other and will function as a black box, at least in terms of related files. Then each of them will be encapsulated in a folder with all its files (css, test and js). Another change is that we eliminate the css folder that contained the styles of our application, in this case, each component will contain its style file.


This shape allows you to make modifications to components more quickly. For example, if we need to make a change in the css of the Comment component we go and look for the folder of this component, instead of having to look for the class / id in a global style file.



## JEST CONFIGURATIONS 

Previously and taking into account an initial configuration of the project, we will proceed to verify if the following configurations correspond to the jest. 

We open the project terminal and execute the following command: 

```bash 
npm run test 
``` 

the command will proceed to execute jest, if it presents the following error: 

``` 
● Validation Error: 
  Module D:\FundacionJala\FullStackTodo\fronted\node_modules\jest-circus\runner.js in the testRunner option was not found. 
         <rootDir> is: D:\prueba jest\ui 
  Configuration Documentation: 
  https://jestjs.io/docs/configuration.html 
npm ERR! code ELIFECYCLE 
npm ERR! errno 1 
npm ERR! fronted@0.1.0 test: `node scripts/test.js`    
npm ERR! Exit status 1 
npm ERR! 
npm ERR! Failed at the fronted@0.1.0 test script.      
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.e is likely additional logging output above. 
npm ERR! A complete log of this run can be found in: 
npm ERR!     C:\Users\familia\AppData\Roaming\npm-cache\_logs\2020-11-20T14_23_37_019Z-debug.log 
```` 

In the error it corrects us that the module we are looking for with the assigned route does not correspond, it is not found, given that situation we proceed to the configurations 

## “TestRunner” path configuration: 

Go to package.json and verify that indeed the address of the "testRunner" is incorrect, it does not correspond to our work environment. 

``` 
"testRunner": "D:\\FundacionJala\\FullStackTodo\\fronted\\node_modules\\jest-circus\\runner.js", 
``` 

In the general case we must change the part "D:\\FundacionJala\\FullStackTodo\\fronted”, by the folder address where you are working. 
As an example, it should look like this, or to a more generic <rootDir> path: 

``` 
"testRunner": "D:\\prueba jest\\ui\\node_modules\\jest-circus\\runner.js", 
``` 
``` 
"testRunner": "<rootDir>/node_modules/jest-circus/runner.js"
``` 

Where the address of the “D:\\FundacionJala\\FullStackTodo\\fronted” is changed to the address of the local “D:\\testjest\\ui” 
We run “npm run test “, again we must be able to correct the previous address error and jest will run correctly. 

Note: Do not forget that you must correct the tests that already came by default.

## Webpack and Jest configuration 

__webpack__  
Without any additional plugins, Webpack allows the import of alias modules through the “resolve.alias” property in its configuration. 

``` 
alias: { 
        'app':path.resolve(__dirname,'../src'), 
        'public': path.resolve(__dirname, '../public'), 
        'components':path.resolve(__dirname,'../src/components'), 
        'actions':path.resolve(__dirname,'../src/actions'), 
        'constants':path.resolve(__dirname,'../src/constants'), 
        'views':path.resolve(__dirname,'../src/views'), 
        'reducers':path.resolve(__dirname,'../src/reducers'), 
        'api':path.resolve(__dirname,'../src/api'), 
        'helpers':path.resolve(__dirname,'../src/helpers'), 
``` 

__Jest__  
Configure Jest in your “package.json” file using the “moduleNameMapper” property. 

``` 
"moduleNameMapper": { 
      "^app(.*)$": "<rootDir>/src/$1", 
      "^public(.*)$": "<rootDir>/public/$1", 
      "^components(.*)$": "<rootDir>/src/components/$1", 
      "^actions(.*)$": "<rootDir>/src/actions/$1", 
      "^constants(.*)$": "<rootDir>/src/constants/$1", 
      "^views(.*)$": "<rootDir>/src/views/$1", 
      "^reducers(.*)$": "<rootDir>/src/reducers/$1", 
      "^api(.*)$": "<rootDir>/src/api/$1", 
      "^helpers(.*)$": "<rootDir>/src/helpers/$1", 
``` 

Make sure to put parent paths (like <rootDir>/src) after child paths (<rootDir>/src/components) or you might get resolution errors. This applies to both configuration files. 

Note: As the project grows, we will include aliases that will need to be mapped in the "ModuleNameMapper" block. 
