export class Orders {

  idOrder = null
  idUser = null
  OrderNumber = ""
  DateTime =""
  ProviderName = ""
  Observation = ""
  TotalValue = ""
  Status = false
  DateCreated = ""
  constructor(idOrder=null,idUser=null,OrderNumber = "", DateTime ="",ProviderName = "",
  Observation = "", TotalValue = "", Status = false, DateCreated = ""){
   this.idOrder = idOrder
   this.idUser = idUser
   this.OrderNumber = OrderNumber
   this.DateTime =DateTime
   this.ProviderName = ProviderName
   this.Observation = Observation
   this.TotalValue = TotalValue
   this.Status = Status
   this.DateCreated = DateCreated
  }


}


