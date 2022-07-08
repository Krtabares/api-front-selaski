export class Users {
  idUser = null
  name =null
  email =null
  estatus =false

  constructor(
    idUser = null,
    name =null,
    email =null,
    estatus =false, ){

      this.idUser = idUser
      this.name =name
      this.email =email
      this.estatus =estatus

  }
}
