class DataTable {
  constructor(columns = [], data = []) {
    this.columns = columns;
    this.data = data;
    this.newData=this.newData
  }

  createTable() {
    const $table = document.createElement('table');
    this.table = $table;
    const $dataTableContainer = document.querySelector('.data-table-container');
    $dataTableContainer.appendChild($table);

   
    this.createThead($table);
    const $tbody = this.createTbody();
    $table.appendChild($tbody);
    const $trs = this.renderData(this.data.slice(0,2));
    
    $trs.forEach(($tr) => {
      $tbody.appendChild($tr);
    });

    this.pagination(this.data);
  }

  createThead(parent) {
    const $thead = document.createElement('thead');
    const $tr = document.createElement('tr');
    this.columns.forEach((column) => {
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
      console.log($tr)
      return $tr;
    });
  }

 
 pagination(info) {
  let self = this;
  const notesPage = 2;
  const countItems = Math.ceil(info.length/notesPage);
  const $ul = document.getElementById('pagination');
  let items = [];
  let active  ; 

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
    item.addEventListener('click',function(){
      console.log({active});
      if(active){
        console.log(887);
        active.classList.remove('active')
      }
      active = this;
      this.classList.add('active');
      let pageNum = this.innerHTML;
      let start = (pageNum - 1) * notesPage;
      let end = start + notesPage;
      let newData =  info.slice(start,end);

      let newPageItem = self.renderData(newData);
      let newPageContainer = document.querySelector('tbody');
      newPageContainer.innerHTML = null;

      newPageContainer.append(...newPageItem);
     
      
    })
  }

  
}
}

export default DataTable;