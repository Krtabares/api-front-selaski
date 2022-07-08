import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderCrudComponent } from 'src/app/components/order-crud/order-crud.component';
import { Orders } from 'src/app/entities/orders';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild(OrderCrudComponent) ordCrud: OrderCrudComponent ;
  order:Orders
  ordersList = []
  columnsHeaders = [
    "idUser",
    "OrderNumber",
    "DateTime",
    "ProviderName",
    "Observation",
    "TotalValue",
    "Status",
    "DateCreated"]

  constructor(private _orderService :OrdersService, private _productServ:ProductsService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this._orderService.getOrders().subscribe(resp => {
        let response:any = resp
        this.ordersList = response.data
    });

  }
  /**
   * funcion para eliminar ordenes de la base de datosd
   * @param  {any} id
   */
  deleteOrd(id:any){
    this._orderService.deleteOrder(id).subscribe( resp =>{
      console.log(resp)
      this.getOrders()
    })
  }
  /**
   * funcion que captura evento de los conmponentes hijos crea o elimina Ordenes
   * @param  {any} order
   */
  eventoOrder(order:any){

    if(order.type=="delete"){
      this.deleteAllProducts(order.data.idOrder)
      this.deleteOrd(order.data.idOrder)

    }else{
      let myorder = new Orders(
        order.data.idOrder,
        order.data.idUser,
        order.data.OrderNumber,
        order.data. DateTime ,
        order.data.ProviderName ,
        order.data.Observation ,
        order.data.TotalValue ,
        order.data.Status,
        order.data.DateCreated )

      this.order = myorder
      this.ordCrud.open(myorder,order.type)
    }


  }
  /**
   * funcion para eliminar todos los productos asociados a una orden
   * @param  {any} id
   * @returns any
   */
  deleteAllProducts(id:any){
    this._productServ.deleteAllProducts(id)
      .subscribe(resp => {
        let response:any = resp
      });
  }

}
