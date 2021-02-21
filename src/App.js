import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { isEmpty } from 'lodash'
import shortid from 'shortid'



function App() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [petName, setPetName] = useState("")
  /*const [petType, setPetType] = useState("")
  const [petBreed, setPetBreed] = useState("")
  const [petDate, setPetDate] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [ownerPhone, setOwnerPhone] = useState("")
  const [ownerAddress, setOwnerAddress] = useState("")
  const [ownerEmail, setOwnerEmail] = useState("")*/

  const [pets, setPets] = useState([])

  const addPet = (e) => {
    e.preventDefault()

    if (isEmpty(petName)) {
      console.log("registro vacio")
      return
    }

    const newPet = {
      id: shortid.generate(),
      petName: petName
    }

    setPets([ ...pets, newPet ])

    
    setPetName("")
    /*setPetType("")
    setPetBreed("")
    setPetDate("")
    setOwnerName("")
    setOwnerPhone("")
    setOwnerAddress("")
    setOwnerEmail("")*/

  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h2><strong><em>Lista de Mascotas</em></strong></h2>
        </div>
        <div className="col">
          <button type="button" onClick={handleShow} className="btn btn-info btn-sm float-right">Agregar mascota</button>
        </div>
      </div>
      <hr/>
      <div className="row">
        <div className="col">
          <ul className="list-group">
            {
              pets.map((pet) => (
                <li className="list-group-item list-group-item-action" key={pet.id}>
                    <button className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>
                    <button className="btn btn-warning btn-sm float-right">Editar</button>
                    <h5 className="mb-1">{pet.petName}</h5>
                    <p className="mb-1">Some placeholder content in a paragraph.</p>
                    <small>And some small print.</small>
                </li>
              ))
            }
          </ul>  
        </div>
      </div>

      //Start Modal
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addPet}>
            <p><strong>Datos de la mascota</strong></p>
            <div className="form-row">
              <div className="form-group col-md-6">
                <small htmlFor="petName" className="text-muted">Nombre de la mascota</small>
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  id="petName"
                  onChange={(text) => setPetName(text.target.value)}
                  value={petName}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <small  htmlFor="petType" className="text-muted">Tipo de mascota</small>
                <input 
                  type="text"  
                  className="form-control form-control-sm" 
                  id="petType" 
                  placeholder="Ej: perro, gato, loro, etc"
                  //onChange={(text) => setPetType(text.target.value)}
                  //value={petType}
                  //required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <small  htmlFor="petBreed" className="text-muted">Raza de mascota</small>
                <input 
                  type="petBreed" 
                  className="form-control form-control-sm" 
                  id="petBreed"
                 // onChange={(text) => setPetBreed(text.target.value)}
                  //value={petBreed}
                  //required
                />
              </div>
              <div className="form-group col-md-6">
                <small  htmlFor="petDate" className="text-muted">Fecha de nacimiento de la mascota</small>
                <input 
                  type="date" 
                  className="form-control form-control-sm" 
                  id="petDate"
                  //onChange={(text) => setPetDate(text.target.value)}
                  //value={petDate}
                  //required
                />
              </div>
            </div>
            <p><strong>Datos propietario</strong></p>
            <div className="form-row">
              <div className="form-group col-md-12">
                <small  htmlFor="ownerName" className="text-muted">Nombres y apellidos del propietario</small>
                <input 
                  type="ownerName" 
                  className="form-control form-control-sm" 
                  id="ownerName"
                  //onChange={(text) => setOwnerName(text.target.value)}
                  //value={ownerName}
                  //required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <small  htmlFor="ownerPhone" className="text-muted">Teléfono del propietario</small>
                <input 
                  type="ownerPhone" 
                  className="form-control form-control-sm" 
                  id="ownerPhone"
                  //onChange={(text) => setOwnerPhone(text.target.value)}
                  //value={ownerPhone}
                  //required
                />
              </div>
              <div className="form-group col-md-6">
                <small  htmlFor="ownerAddress" className="text-muted">Dirección del propietario</small>
                <input 
                  type="ownerAddress" 
                  className="form-control form-control-sm" 
                  id="ownerAddress"
                  //onChange={(text) => setOwnerAddress(text.target.value)}
                  //value={ownerAddress}
                  //required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <small  htmlFor="ownerEmail" className="text-muted">Email del propietario</small>
                <input 
                  type="email" 
                  className="form-control form-control-sm" 
                  id="ownerEmail"
                  //onChange={(text) => setOwnerEmail(text.target.value)}
                  //value={ownerEmail}
                  //required
                />
              </div>
            </div>
            <hr/>
            <button 
              className="btn btn-dark btn-block" 
              type="submit"
            >
              Agregar mascota
            </button>
          </form>
        </Modal.Body>
      </Modal>
      //End Modal

    </div>
  );
}

export default App;
