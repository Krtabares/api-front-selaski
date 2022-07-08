import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  @Input() registres: any[] = [];
  @Input() headers: string[] = []
  @Output() selectedOpt = new EventEmitter<any>();
  columnOrder: any[]=[]
  filter: string=""
  valuesAux: any[]=[]

  selectedColumn:string =""
  constructor() { }

  ngOnInit(): void {
    this.columnOrder =  this.prepareColumOrder(this.headers)
    this.valuesAux = this.registres

  }
  ngOnChanges() {
    this.valuesAux = this.registres
  }

  getValue(row: any, column:string) {

    return row[column];
  }


  /**
   * funcion para ordenar columnas de tabla
   * @param  {any} columnHeader
   */
  orderBy(columnHeader: any) {

    this.ordASC(columnHeader);

  }


  /**
   * funcion que ordena los registros de forma acendente
   * @param  {string} propertyName
   */
  ordASC(propertyName:string) {
    this.valuesAux.sort(function (a, b) {
      if (a[propertyName] === null) {
        return -1;
      } else if (b[propertyName] === null) {
        return 1;
      }

      if (a[propertyName] > b[propertyName]) {
        return 1;
      }
      if (a[propertyName] < b[propertyName]) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

  }


  /**
   * convierte un array con los nombres de la columnas en array de objetos
   * @param  {any[]} columns
   */
  prepareColumOrder(columns: any[]){
    var list:any[] = []
    var myOb: any= {}
    columns.forEach(element => {
      myOb={value:element, icon:""}
      list.push(myOb)
    });
    return list
  }

  /**
   * funcion para devolver evento de seleccion de una orden
   * @param  {any} val
   * @param  {any} tipo
   */
  selectValue(val:any, tipo:any){
    let evento = {
      "type": tipo,
      "data":val
    }

    this.selectedOpt.emit(evento);
  }

}
