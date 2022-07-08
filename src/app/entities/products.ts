export class Products {
  idOrdersProducts = null
  idOrder = null
  ValueUnit = null
  Unit = null
  Description = null
  SKU = null
  Quantity = null
  QtyBox = null
  Weight = null
  Volumen = null
  Mark = null
  Status = null

  constructor(
    idOrdersProducts = null,
    idOrder = null,
    ValueUnit = null,
    Unit = null,
    Description = null,
    SKU = null,
    Quantity = null,
    QtyBox = null,
    Weight = null,
    Volumen = null,
    Mark = null,
    Status = null,
  ){
    this.idOrdersProducts = idOrdersProducts
    this.idOrder = idOrder
    this.ValueUnit = ValueUnit
    this.Unit = Unit
    this.Description = Description
    this.SKU = SKU
    this.Quantity = Quantity
    this.QtyBox = QtyBox
    this.Weight = Weight
    this.Volumen = Volumen
    this.Mark = Mark
    this.Status = Status
  }
}
