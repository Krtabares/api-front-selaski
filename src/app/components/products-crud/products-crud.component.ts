import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Products } from 'src/app/entities/products';
import { Users } from 'src/app/entities/users';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-products-crud',
  templateUrl: './products-crud.component.html',
  styleUrls: ['./products-crud.component.css']
})
export class ProductsCrudComponent implements OnInit {

  @Input() product: Products = new Products() ;
  @Input() typeView:string  ;
  @Output() refreshList = new EventEmitter<any>();
  @ViewChild('closeBtn1') closeBtn: ElementRef ;
  @ViewChild('openBtn1') openBtn: ElementRef ;
  showform = false;
  // typeView = 'view'
  userList:Users[] = []
  display = "block"
  submitted = false;
  image:any = null;
  tabs = 2
  tabIndex = 1
 productForm = new FormGroup({
                      idOrder: new FormControl(this.product.idOrder),
                      ValueUnit: new FormControl(this.product.ValueUnit),
                      Unit: new FormControl(this.product.Unit, Validators.pattern("^[0-9]*$")),
                      Description: new FormControl(this.product.Description),
                      SKU: new FormControl(this.product.SKU),
                      Quantity: new FormControl(this.product.Quantity, Validators.pattern("^[0-9]*$")),
                      QtyBox: new FormControl(this.product.QtyBox, Validators.pattern("^[0-9]*$")),
                      Weight: new FormControl(this.product.Weight, Validators.pattern("/^\-?\d+((\.|\,)\d+)?$/")),
                      Volumen: new FormControl(this.product.Volumen, Validators.pattern("/^\-?\d+((\.|\,)\d+)?$/")),
                      Mark: new FormControl(this.product.Mark),
                      Status: new FormControl(this.product.Status),
               });
  title: string;
  productsList: any[]=[];
  @Input() idOrder: any;

  constructor(
    private _productServ:ProductsService) { }

  ngOnInit(): void {
    this.onReset()
  }

  /**
   * funcion utilizada para moverse entre los tabs
   * @param  {any} tab
   */
  goToTab(tab:any){
    this.tabIndex = tab
  }
  /**
   * submit se encarca de enviar la informacion al servidor si es editando o creando
   */
  submit(){

    var obj:any= this.productForm.value;
    this.submitted = true;

    if(this.typeView=="new"){

      this.addProd(obj);

    }

    if(this.typeView=="edit"){
      this.updateProducts()
    }


  }
  /**
   * permirte mostrar el formulario
   */
  onShow(){

    if(this.typeView=="view"){
      this.productForm.disable();
    }

    this.showform = true
  }



  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
  /**
   * Funcion para volver al estado inicial el formulario
   */
  onReset(): void {
    this.submitted = false;
    this.productForm.reset();
    this.product = new Products()
    this.typeViewRend()

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
    this.showform=false
  }
  /**
   * Cambia el tipo de vista
   */
  typeViewNew(){
    this.title = "Nueva Orden"
    this.typeView = "new"
    this.showform=true
  }
  /**
   * Cambia el tipo de vista
   */
  typeViewEdit(){
    this.title = "Editar Orden"
    this.typeView = "edit"
  }
  /**
   * muesrtra el formulario dependiendo de el tipo de vista que se solicita
   * @param  {any} product
   * @param  {any} type
   */
  open(product:any, type:any){

    this.product = product
    this.typeView = type

    if(this.typeView=="view"){
      this.productForm.disable();
      this.refreshList.emit()
      this.openBtn.nativeElement.click();
      this.typeViewRend()
    }

    if(this.typeView=="edit"){
      this.refreshList.emit()
      this.openBtn.nativeElement.click();
      this.typeViewEdit()
    }

  }
  /**
   * agrega los productos de la base de datos
   * @param  {any} ord
   */
  addProd(ord:any){
    this._productServ.addProduct(ord)
      .subscribe(resp => {
        this.refreshList.emit()
        this.onReset()
      });
  }
  /**
   *
   * elimina un productos en la base de datos
   * @param  {any} id
   * @returns any
   */
  deleteProducts(id:any){
    this._productServ.deleteProducts(id)
      .subscribe(resp => {
        let response:any = resp
        this.refreshList.emit()
        this.onReset()
      });
  }
  /**
   *
   * actualiza los productos en la base de datos
   */
  updateProducts(){
    this._productServ.updateProducts(this.product.idOrdersProducts, this.product)
      .subscribe(resp => {
        this.refreshList.emit()
        this.onReset()
      });

  }
}
