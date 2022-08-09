  class DataTable {
  constructor(columns = [], data = [], { notesPage }) {
    this.columns = columns;
    this.data = data;
    this.originalData = data;
    this.notesPage = notesPage;
    this.start = 0;
    this.end = this.start + this.notesPage;
  }

  createTable() {
    this.createSearchForm();
    const $table = document.createElement('table');
    this.table = $table;
    const $dataTableContainer = document.querySelector('.data-table-container');
    $dataTableContainer.appendChild($table);
    this.createThead();
    this.createTbody();
    this.renderData();
    this.createPerPage();
    this.pagination();
  }


  createThead() {
    const $thead = document.createElement('thead');
    const $tr = document.createElement('tr');
    this.columns.forEach((column) => {
      const $th = document.createElement('th');
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
    const $trDelete = document.createElement('th');
    $trDelete.innerHTML='Delete'
    $thead.appendChild($tr);
    $tr.appendChild($trDelete);
    this.table.appendChild($thead);
    
  }

  createTbody() {
    const $tbody = document.createElement('tbody');
    this.table.appendChild($tbody);
  }
  createSearchForm(){
    const $ul = document.querySelector('ul');
    const $input = document.createElement('input');
    const $dataTableContainer = document.querySelector('.data-table-container');
    $dataTableContainer.appendChild( $input);
    $input.addEventListener('input',(e)=>{
      let $value = e.target.value;

      if($value == ''){
       this.data = this.originalData;
    }

      this.data = this.data.filter((elem)=>{
        for(let key in elem) {

          if(elem[key].toString().includes($value)) {
           return elem;
          }

        }
      })
      this.renderData();
      this.pagination();
      const $ul = document.querySelector('ul');
      $dataTableContainer.removeChild($ul);   
     })

  }

  renderData() {
    const $dataTableContainer = document.querySelector('.data-table-container');
    const $tbody = this.table.querySelector('tbody');
    $tbody.innerHTML = null;
    this.data.slice(this.start, this.end).map((item) => {
      const $tr = document.createElement('tr');

      for (const key in item) {
        const $td = document.createElement('td');
        $td.innerHTML = item[key];
        $tr.appendChild($td);
      };
      
      const $tdDelete = document.createElement('td');
      $tdDelete.setAttribute('data-id', item.id);
      $tdDelete.className = 'remove';
      $tdDelete.innerHTML = 'REMOVE'
      $tdDelete.addEventListener('click',(e)=>{
        this.data.filter((elem,index)=> {

          if(elem.id == e.target.dataset.id) {
           this.data.splice(index,1);
           this.renderData();
           this.pagination();
           const $ul = document.querySelector('ul');
           $dataTableContainer.removeChild($ul);
          } 
        })
      })
      $tr.appendChild($tdDelete);
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