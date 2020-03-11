# Dynamic Spreadsheet

This README file aims to explain the development of the take home test given by the GovPredic. Thus, all the information needed will be shown bellow. 

## Tecnologies

 - [Angular CLI](https://github.com/angular/angular-cli) as Framework
 - [NgRx](https://ngrx.io/) as State and Local Storage

## Solution

### Models

For first steps I had to think about how would I create dynamically the columns, thinking the table would become a dynamic form. Thus, a class was created based on the specification, and a form control.

So a generic class BaseType was created to store the information of a column, and after become a form control. Besides, four more classes (extended to BaseType) were created according to the field types on the specification (text, number, date, select).

### Service

The TypeControlService was created to generate the form group based in a list of column types, and after it will be possible to comunicate with de API (for a new version in the future).

### Homepage

A basic homepage was implemented with a form that receives the column name, type, if it is required, and if it is a dropdown, which it would add the options. So, this information becomes a BaseType Object (text, select, number, or date), and add in a type list.

### Localstorage

The list of types is locally stored, as other information. The framework used is Redux, because it allows the storage, the state control of the local information, and later, to control the server information and its state.

Other information stored on localstorage are the table data. Thus, data is a list of any Object. That way, it would be possible to store any kind of Object, specially when a new column is added, or even the column name is updated. The minimun of rows is also stored on localstorage and updated everytime 10 new rows are added. So it permits to reload the page and does not loose any information.

### Table component

The goal of the table component is to set up the table based on the information given by the homepage (list of types, table data, and minimum of rows). For that, the list of types is observed, any change, it loads all information again. The data is set up in the table, the rows added, and etc. The rows are added using form array, working as an array that adds to its list the form group generated according to types list (by the TypeControlService).

The table data is updated everytime a cell is updated. Table component emits the date to homepage, and the data is stored. For validation, I used the simplest method, seting the input to allow only number when the column type is a number, allow text when it is a text input, and applying a mask when it is the date type. When the column is required, if the cell is touched, the cell's border it turns red.

The edition of a column name was only possible, cloning the table data first, for each position add a new field with the new column name, with the same data of the old name. That permits not to loose the column data after updating it, and next time the data is updated the old column is removed automatically. Last and not least, the rows are added updating the minimum of rows, and adding it the 10 new rows to the form array.

## Running the project

For running, go to the main folder of the project, install all the dependencies, and run the running command, as it is shown bellow:

```sh
$ cd dynamic-spreadsheet
$ npm install
$ ng serve
```

## Running the tests

For running the tests:

```sh
$ ng test
```

## Considerations

Implementing this take-home test was a chalenge. Even working with angular for more than a year, it was the first time implementing a dynamic form (changing the columns), and  the first time implementing tests in Angular. Therefore, this was also a great improvement of my skills.

I alredy thank the GovPredict for the opportunity.