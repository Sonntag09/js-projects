class GridView {
  /**
   * properties
   * @param {array} _tableClass   - css table classes
   * @param {array} data          - initial data
   * @param {array} attribute     - output configuration
   * @param {string} _element      - output element
   * @param {string} _header       - table header
   * @param {array} _headerClass  - css header classes
  */

  constructor() {
    this._header = '';
    this._headerClass = [];
    this._tableClass = [];
    this._element = '';
    this.attribute = [];
  }

  /**
   *  Method setting header
  */

  setHeader(header) {
    if (typeof header === 'string' && header.trim() != '') {
      this._header = header.trim();
      return true;
    }
    return false;
  }

  /**
   *  Method setting headerClass
  */

  setHeaderClass(headerClass) {
    if (typeof headerClass === 'object') {
      this._headerClass = headerClass;
      return true;
    }
    return false;
  }

  /**
   *  Method setting element
  */

  setElement(element) {
    let elem = document.querySelector(element);
    if (elem) {
      this._element = elem;
      return true;
    }
    return false;
  }




  /**
   *  Method displaying GridViewTable
  */

  render(params) {
    // SPLIT ON 3 METHODS, CHECKS, TRY/CATCH...
    this.setHeader(params.header);
    this.setHeaderClass(params.headerClass);
    this.setElement(params.element);
    this.attribute = params.attribute;
    this.data = params.data;
    //show header
    if (this._header && this._element) {
      const header = document.createElement('h1');
      header.textContent = this._header;
      this._headerClass.forEach(cssClass => {
        header.classList.add(cssClass);
      });
      this._element.append(header);
    }
    //show table
    const table = document.createElement('table');
    this._tableClass.forEach(cssClass => {
      table.classList.add(cssClass);
    });
    //create table header
    let trHeader = document.createElement('tr');
    for (let key in this.attribute) {
      let th = document.createElement('th');      
      if (this.attribute[key].label) {
        th.textContent = this.attribute[key].label;
      } else {
        th.textContent = key;
      }
      trHeader.append(th);
    }
    table.append(trHeader);
    //create table
    for (let i = 0; i < this.data.length; i++) {
      let dataArr = this.data[i]; //data row
      let tr = document.createElement('tr');
      for (let key in this.attribute) {
        let td = document.createElement('td');
        let value = dataArr[key];
        // attribute value
        if (this.attribute[key].value) {
          value = this.attribute[key].value(dataArr);
        }
        //attribute src
        if (this.attribute[key].src) {
          td.innerHTML = value;
        } else {
          td.textContent = value;
        }
        tr.append(td);
      }
      table.append(tr);
    }
    this._element.append(table);
  }
}