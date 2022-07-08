import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AppComponent } from './app.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderCrudComponent } from './components/order-crud/order-crud.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarmenuComponent } from './shared/sidebarmenu/sidebarmenu.component';
import { ModTituloComponent } from './shared/mod-titulo/mod-titulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsCrudComponent } from './components/products-crud/products-crud.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderListComponent,
    OrderCrudComponent,
    HeaderComponent,
    SidebarmenuComponent,
    ModTituloComponent,
    ProductsListComponent,
    ProductsCrudComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    CurrencyMaskModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
