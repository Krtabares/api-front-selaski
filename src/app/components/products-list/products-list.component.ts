import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() registres: any[] = [];
  @Input() typeView: string = "view";
  @Output() refreshList = new EventEmitter<any>();
   headers: string[] = [
    "idOrdersProducts",
    "idOrder",
    "ValueUnit",
    "Unit",
    "Description",
    "SKU",
    "Quantity",
    "QtyBox",
    "Weight",
    "Volumen",
    "Mark",
    "Status",
    ]
  @Output() selectedOpt = new EventEmitter<any>();
  columnOrder: any[]=[]
  filter: string=""
  valuesAux: any[]=[]

  selectedColumn:string =""
  constructor(private _productServ:ProductsService) { }

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
   * funcion para devolver evento de seleccion de un producto
   * @param  {any} val
   * @param  {any} tipo
   */
  selectValue(val:any, tipo:any){
    let evento = {
      "tipo": tipo,
      "data":val
    }

    this.selectedOpt.emit(evento);
  }
  /**
   * funcion para eliminar unproducto de la base de datos
   * @param  {any} id
   */
  deleteProducts(id:any){
    this._productServ.deleteProducts(id)
      .subscribe(resp => {
        let response:any = resp
        this.refreshList.emit()
      });
  }

}
