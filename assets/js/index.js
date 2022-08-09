import DataTable from './DataTable.js';

const columns = [
  {name: 'ID', index: 'id'},
  {name: 'NAME', index: 'name'},
  {name: 'AGE', index: 'age'},
];

const data = [
  {id: 1, name: 'Albert', age: 50,},
  {id: 2, name: 'Gevorg', age: 51,},
  {id: 3, name: 'Hayk', age: 25,},
  {id: 4, name: 'Ani', age: 22,},
  {id: 5, name: 'Anna', age: 18,},
  {id: 6, name: 'Karen', age: 23,},
  {id: 7, name: 'Karen', age: 23,},
  {id: 8, name: 'Arsen', age: 19,},
  {id: 9, name: 'Suren', age: 18,},
  {id: 10, name: 'Artur', age: 19,},
  {id: 11, name: 'Astxik', age: 15,},
  {id: 12, name: 'Hayk', age: 19,},
  {id: 13, name: 'Arsen', age: 17,},
  {id: 14, name: 'David', age: 19,},
  {id: 15, name: 'Harut', age: 12,},
  {id: 16, name: 'Artur', age: 42,},
  {id: 17, name: 'Astxik', age: 41,},
  {id: 18, name: 'Haykuhi', age: 38,},
  {id: 19, name: 'Arsen', age: 34,},
  {id: 20, name: 'David', age: 35,},
  {id: 21, name: 'Hamlet', age: 32,},
  {id: 22, name: 'Harut', age: 31,},
];
const options = {
  notesPage: 5,
   
}
const dataTable = new DataTable(columns, data, options);
const $dataTableContainer = document.querySelector('.data-table-container');
dataTable.createTable();



// Element.prototype.dataTable = function() {
  
// };



// const $table = document.querySelector('.data-table-container');