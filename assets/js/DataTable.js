  class DataTable {
  constructor(columns = [], data = [], { notesPage,rowClassName,cellClassName,tableClassName }) {
    this.columns = columns;
    this.data = data;
    this.originalData = data;
    this.notesPage = notesPage;
    this.start = 0;
    this.end = this.start + this.notesPage;
    this.selectedId = [];
    this.rowClassName = `datatable__row ${rowClassName}`;
    this.cellClassName = `datatable__cell  ${cellClassName}`;
    this.tableClassName = `datatable ${tableClassName}`;
    
  }

  createTable() {
    this.createSearchForm();
    const $table = document.createElement('table');
    $table.setAttribute('class', this.tableClassName )
    this.table = $table;
    const $dataTableContainer = document.querySelector('.data-table-container');
    $dataTableContainer.appendChild($table);
    this.createThead();
    this.createTbody();
    this.renderData();
    this.createDelleteInput();
    this.createAddForm();
    this.createPerPage();
    this.pagination();
  }

  createDelleteInput() {
    const $dataTableContainer = document.querySelector('.data-table-container');
    const $inputForDelete = document.createElement('button');
    const $checkALL = document.querySelector('#checkAll');
    $inputForDelete.innerHTML = 'DELETE SELECTED';
    $inputForDelete.setAttribute('id', "input-for-delete");
    $dataTableContainer.appendChild($inputForDelete);
    $inputForDelete.addEventListener('click', () => {
          this.data = this.data.filter((elem) => !this.selectedId.includes(elem.id.toString()));
          this.selectedId = [];
          this.renderData();
          this.pagination();
          const $ul = document.querySelector('ul');
          $dataTableContainer.removeChild($ul);
          $checkALL.checked = true ? false : false;
    })

  }

  createAddForm() {
    const $dataTableContainer = document.querySelector('.data-table-container');
    const $form = document.createElement('form');
    const $inputName = document.createElement('input');
    const $inputAge = document.createElement('input');
    const $buttonAdd = document.createElement('button');
    $buttonAdd.innerHTML ='ADD';
    $inputAge.type ='number';
    $inputAge.placeholder = 'AGE';
    $form.appendChild($inputName);
    $inputName.placeholder = 'NAME';
    $form.appendChild($inputAge);
    $form.appendChild($buttonAdd);
    $dataTableContainer.appendChild($form);
    $form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.data.push({
        id: this.data.length+1,
        name: $inputName.value,
        age: $inputAge.value,
        
      })
    })
  }

  createThead() {
    const $thead = document.createElement('thead');
    const $tr = document.createElement('tr');
    this.columns.forEach((column) => {
      const $th = document.createElement('th');
      $th.setAttribute('class', this.cellClassName)
      let isreverse;
      $th.innerHTML = column.name;
      $th.setAttribute('data-sort', column.index)
      $tr.appendChild($th);
      $th.addEventListener('click', (e) => {
       const field = e.target.dataset.sort;

        if (!isreverse) {

          if (isNaN(+this.data[0][field])) {
            this.data.sort((a, b) => a[field].localeCompare(b[field]))
          }
          this.data.sort((a, b) => a[field] - b[field]);
          this.renderData();
          isreverse = true;
        }

        if (isreverse) {
          this.data.reverse();
          this.renderData();
        }

      })
    });
    const $thDelete = document.createElement('th');
    const $thDeleteChechbox = document.createElement('th');
    const $checkbox = document.createElement('input');
    $checkbox.type = 'checkbox';
    $checkbox.id = 'checkAll';
    $thDeleteChechbox.appendChild($checkbox);
    $thead.appendChild($tr);
    $tr.appendChild($thDelete);
    $tr.appendChild($thDeleteChechbox);
    this.table.appendChild($thead);
    $checkbox.addEventListener('change', (e) => {
    const $dataTableContainer = document.querySelector('.data-table-container');
    const $checkboxes = $dataTableContainer.querySelectorAll('.checkboxes');

     if ( e.target.checked) {
      $checkboxes.forEach(elem => {
        elem.checked = true;
        if (!this.selectedId.includes(elem.dataset.check)) {
          this.selectedId.push(elem.dataset.check);
        }
      })
     } else {
      $checkboxes.forEach( elem => {
        elem.checked = false;
      });
      this.selectedId = [];
     }
   
    })
    
  }

  createTbody() {
    const $tbody = document.createElement('tbody');
    this.table.appendChild($tbody);
  }

  createSearchForm() {
    const $ul = document.querySelector('ul');
    const $input = document.createElement('input');
    $input.className = 'search';
    const $dataTableContainer = document.querySelector('.data-table-container');
    $dataTableContainer.appendChild($input);
    $input.addEventListener('input', (e) => {
      let $value = e.target.value;
      this.data = this.originalData;

      if ($value == '') {
       this.data = this.originalData;
    }

      this.data = this.data.filter((elem) => {
        for (let key in elem) {

          if (elem[key].toString().includes($value)) {
           return elem;
          }

        }   
      })
      this.renderData();
      this.pagination();
      const $ul = document.querySelector('ul');
      $dataTableContainer.removeChild($ul);  
      this.data = this.originalData;
     })
  }

  renderData() {
    const $dataTableContainer = document.querySelector('.data-table-container');
    const $tbody = this.table.querySelector('tbody');
    $tbody.innerHTML = null;
    this.data.slice(this.start, this.end).map((item) => {
      const $tr = document.createElement('tr');
      $tr.setAttribute('class',  this.rowClassName);

      for (const key in item) {
        const $td = document.createElement('td');
        $td.setAttribute('class',  this.rowClassName);
        $td.innerHTML = item[key];
        $tr.appendChild($td);
      };
      
      const $tdDelete = document.createElement('td');
      const $checkboxTd = document.createElement('td');
      const $checkbox = document.createElement('input');
      $checkbox.setAttribute('class', 'checkboxes')
      $checkbox.type = "checkbox";
      $checkboxTd.appendChild($checkbox);
      $tdDelete.setAttribute('data-id', item.id);
      $checkbox.setAttribute('data-check', item.id);
      $tdDelete.className = 'remove';
      $tdDelete.innerHTML = 'REMOVE';
      $tdDelete.addEventListener('click', (e) => {
        this.data = this.data.filter((elem) => elem.id !== +e.target.dataset.id);
        console.log(this.data);
        this.renderData();
        this.pagination();
        const $ul = document.querySelector('ul');
        $dataTableContainer.removeChild($ul);
      })
      $checkbox.addEventListener('change', (e) => {

        if (e.target.checked) {
          this.selectedId.push(e.target.dataset.check);
        } else {
          this.selectedId = this.selectedId.filter((id) => id !== e.target.dataset.check);
        }
        console.log(this.selectedId);

        if (this.notesPage == this.selectedId.length) {
          document.querySelector('#checkAll').checked = true;
        } else {
          document.querySelector('#checkAll').checked = false;
        }

      })
   
      $tr.appendChild($tdDelete);
      $tr.appendChild( $checkboxTd);
      $tbody.appendChild($tr);

    });
  }


  pagination() {
    let self = this;
    const $dataTableContainer = document.querySelector('.data-table-container');
    const $ul = document.createElement('ul');
    const countItems = Math.ceil(this.data.length / this.notesPage);
    $ul.setAttribute('id', 'pagination');
    $dataTableContainer.appendChild($ul);
    let items = [];

    for (let i = 1; i <= countItems; i++) {
      let $li = document.createElement('li');
      $li.innerHTML = i;
      $ul.appendChild($li);
      items.push($li);
    };

    for (let item of items) {
      item.addEventListener('click', function() {
        let pageNum = this.innerHTML;
        self.start = (pageNum - 1) * self.notesPage;
        self.end = self.start + self.notesPage;
        let newPageContainer = document.querySelector('tbody');
        newPageContainer.innerHTML = null;
        $dataTableContainer.removeChild($ul);
        self.renderData();
        self.pagination();
      })
    }
  }

  createPerPage() {
    const $dataTableContainer = document.querySelector('.data-table-container');
    const $select = document.createElement('select');
    const $ul = document.getElementById('pagination');

    for (let i = 5; i < 16; i = i + 5) {
      let $option = document.createElement('option');
      $option.innerHTML = i;
      $select.appendChild($option);
    }

    $dataTableContainer.appendChild($select);
    $select.addEventListener('change', (e) => {
      const $pagination = document.querySelector('#pagination');
      this.notesPage = +e.target.value;
      this.end = this.start + this.notesPage;
      $pagination.remove();
      this.renderData();
      this.pagination();
    })
  }
}

export default DataTable;