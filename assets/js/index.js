import DataTable from './DataTable.js';

const columns = ['id', 'name', 'age'];

const data = [
  {id: 1, name: 'Albert', age: 50,},
  {id: 2, name: 'Gevorg', age: 51,},
  {id: 3, name: 'Hayk', age: 25,},
  {id: 4, name: 'Ani', age: 22,},
  {id: 5, name: 'Anna', age: 18,},
  {id: 6,name: 'Aram',age: 23,},
  {id: 8,name: 'Arsen',age: 19,},
  {id: 9,name: 'Aren',age: 18,},
  {id: 10,name: 'Artur',age: 19,},
  {id: 11,name: 'Astxik',age: 15,},
  {id: 12,name: 'Arsen',age: 19,},
  {id: 13,name: 'Arsen',age: 17,},
  {id: 14,name: 'Arsen',age: 19,},
  {id: 15 ,name: 'Arsen',age: 20,},
];

const dataTable = new DataTable(columns, data);

dataTable.createTable();
//dataTable.createPagination();


// Element.prototype.dataTable = function() {
  
// };



// const $table = document.querySelector('.data-table-container');