class DataTable {
  constructor(columns = [], data = []) {
    this.columns = columns;
    this.data = data;
    this.notesPage = 2;
  }

  createTable() {
    const $table = document.createElement('table');
    this.table = $table;
    const $dataTableContainer = document.querySelector('.data-table-container');
    $dataTableContainer.appendChild($table);
    this.createThead($table);
    const $tbody = this.createTbody();
    $table.appendChild($tbody);
    const $trs = this.renderData(this.data.slice(0,this.notesPage));
    $trs.forEach(($tr) => {
      $tbody.appendChild($tr);
    });
    this.pagination(this.data,this.notesPage);
  }

  createThead(parent) {
    const $thead = document.createElement('thead');
    const $tr = document.createElement('tr');
    this.columns.forEach((column)=> {
      const $th = document.createElement('th');
      $th.innerHTML = column;
      $tr.appendChild($th);
    });

    $thead.appendChild($tr);
    parent.appendChild($thead);
  }

  createTbody() {
    const $tbody = document.createElement('tbody');
    return $tbody;
  }

  renderData(dat  = []) {
    return dat.map((item) => {
      const $tr = document.createElement('tr');

      for(const key in item) {
        const $td = document.createElement('td');
        $td.innerHTML = item[key];
        $tr.appendChild($td);
      }

      return $tr;
    });
  }

 
  pagination(info, itemCount) {
  let self = this; 
  const countItems = Math.ceil(info.length / itemCount);
  const $ul = document.createElement('ul');
  $ul.setAttribute('id', 'pagination');
  const $dataTableContainer = document.querySelector('.data-table-container');
  $dataTableContainer.appendChild($ul)
  let items = [];
  let active; 

  for(let i = 1; i <= countItems; i++){
    let $li = document.createElement('li');
    $li.innerHTML = i;

    if(i === 1 ) {
      $li.className = 'active';
      active = $li;
    }

    $ul.appendChild($li);
    items.push($li);   
  
  };

  for (let item of items){
    item.addEventListener('click', function(){

      if(active){
        active.classList.remove('active')
      }

      active = this;
      this.classList.add('active');
      let pageNum = this.innerHTML;
      let start = (pageNum - 1) *  itemCount;
      let end = start + itemCount;
      let newData =  info.slice(start,end);
      let newPageItem = self.renderData(newData);
      let newPageContainer = document.querySelector('tbody');
      newPageContainer.innerHTML = null;
      newPageContainer.append(...newPageItem); 
    })
  }
  this.createPerPage();
  } 

  createPerPage() {
  const $dataTableContainer = document.querySelector('.data-table-container');
  const $select = document.createElement('select');
  const $table = document.querySelector('.data-table-container>table');
  const $ul = document.querySelector('.data-table-container>ul');;

  for(let i = 2; i < 7; i = i+2){
    let $option = document.createElement('option');
    $option.innerHTML = i;
    $select.appendChild($option);
  }

  $dataTableContainer.appendChild($select);
  $select.addEventListener('change', (e)=>{
    this.notesPage = + e.target.value;
    $dataTableContainer.removeChild($table); 
    $dataTableContainer.removeChild($ul); 
    $dataTableContainer.removeChild($select); 
    this.createTable(this.data);
   })
  }
}

export default DataTable;