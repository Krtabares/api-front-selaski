import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Orders } from 'src/app/entities/orders';
import { Products } from 'src/app/entities/products';
import { Users } from 'src/app/entities/users';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { ProductsCrudComponent } from '../products-crud/products-crud.component';

@Component({
  selector: 'app-order-crud',
  templateUrl: './order-crud.component.html',
  styleUrls: ['./order-crud.component.css']
})
export class OrderCrudComponent implements OnInit {
  @Input() order: Orders = new Orders() ;
  @Output() refreshList = new EventEmitter<any>();
  @ViewChild('closeBtn') closeBtn: ElementRef ;
  @ViewChild('openBtn') openBtn: ElementRef ;
  @ViewChild(ProductsCrudComponent) prodElemt:ProductsCrudComponent
  selectProduct:Products
  typeView = "view"
  userList:Users[] = []
  display = "block"
  submitted = false;
  image:any = null;
  tabs = 2
  tabIndex = 1
 orderForm = new FormGroup({
                  idUser:  new FormControl(this.order.idUser, Validators.required),
                  OrderNumber : new FormControl(this.order.OrderNumber,Validators.minLength(10)),
                  DateTime : new FormControl(this.order.DateTime),
                  ProviderName : new FormControl(this.order.ProviderName,  Validators.minLength(3)),
                  Observation : new FormControl(this.order.Observation,  Validators.minLength(3)),
                  TotalValue : new FormControl(this.order.TotalValue),
                  Status : new FormControl(this.order.Status),
               });
  title: string;
  productsList: any[]=[];
  idOrder: Orders;
  msg:any
  constructor(
    private _userService:UsersService,
    private _productServ:ProductsService,
    private _ordersServ: OrdersService) { }

  ngOnInit(): void {
    this.getUsers()
    this.onReset()
  }

  goToTab(tab:any){
    this.tabIndex = tab
  }
  /**
   * submit se encarca de enviar la informacion al servidor si es editando o creando
   */
  submit(){
    this.submitted = true;
    var obj:any= this.orderForm.value;
    if (this.orderForm.invalid) {
      if(this.orderForm.value.idUser){
        this.msg = true
      }
      return;
    }
    if(this.typeView=="new"){
      this.addOrd(obj);

    }

    if(this.typeView=="edit"){
      this.updateOrder(obj)
    }

  }



  get f(): { [key: string]: AbstractControl } {
    return this.orderForm.controls;
  }
  /**
   * Funcion para volver al estado inicial el formulario
   */
  onReset(): void {
    this.submitted = false;
    this.orderForm.reset();
    this.orderForm.enable();
    this.order = new Orders()
    this.tabIndex = 1
    this.msg = null
  }

   /**
    * funcion que reinicia formulario al cerrar
    */
   closeModal(): void {
     this.onReset()
  }


  /**
   * Cambia el tipo de vista
   */
  typeViewRend(){
    this.title = "Ver Orden"
    this.typeView = "view"
  }
  /**
   * Cambia el tipo de vista
   */
  typeViewNew(){
    this.title = "Nueva Orden"
    this.typeView = "new"
  }
  /**
   * Cambia el tipo de vista
   */
  typeViewEdit(){
    this.title = "Editar Orden"
    this.typeView = "edit"
  }
  /**
   * Abre el modal dependiendo de el tipo de vista que se solicita
   * @param  {any} order
   * @param  {any} type
   */
  open(order:any, type:any){

    this.onReset()

    this.order = order
    this.typeView = type

    if(this.typeView=="view"){
      this.orderForm.disable();
      this.getProducts()
      this.openBtn.nativeElement.click();
      this.typeViewRend()
    }

    if(this.typeView=="edit"){
      this.orderForm.enable();
      this.getProducts()
      this.openBtn.nativeElement.click();
      this.typeViewEdit()
    }

    if(this.typeView=="new"){
      this.onReset()

    }

  }

  /**
   * obtiene los uusuarios de la base de datos
   */
  getUsers(){
    this._userService.getUsers().subscribe(resp => {
      let response:any = resp
      this.userList = response.data
  });
  }
  /**
   * captura evento de componentes hijos para procesar productos
   * @param  {any} evento
   */
  selected(evento:any){

    this.selectProduct = evento.data

    this.prodElemt.onShow()
    console.log(evento)
  }


  /**
   * obtiene los productos de la base de datos
   */
  getProducts(){

    this._productServ.getProducts(this.order.idOrder).subscribe(resp => {
      let response:any = resp
      this.productsList = response.data
  });
  }

    /**
   * agrega las ordenes de la base de datos
   */
  addOrd(ord:any){
    this._ordersServ.addOrder(ord)
      .subscribe(resp => {
        this.refreshList.emit()
        this.closeBtn.nativeElement.click();
      });
  }
/**
   * actualiza las ordenes en la base de datos
   */
  updateOrder(ord:Orders){
    this._ordersServ.updateOrder(this.order.idOrder, ord)
      .subscribe(resp => {
        this.refreshList.emit()
        this.closeBtn.nativeElement.click();
      });

  }


}
