import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons'


import { Modal } from 'react-bootstrap'
import { size } from 'lodash'
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions'
import icon from './icono.png'

function App() {

  //Modal function
  const [show, setShow] = useState(false)
  const handleCloseRegisterModal = () => {
    setEditMode(false)
    cleanFields()
    setShow(false)
  } 
  const handleShowRegisterModal = () => setShow(true)

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const handleCloseConfirmDelete = () => setShowConfirmDelete(false)
  const handleShowConfirmDelete = (id) => {
    setId(id)
    setShowConfirmDelete(true)
  }

  //Variables
  const [petName, setPetName] = useState("")
  const [petType, setPetType] = useState("")
  const [petBreed, setPetBreed] = useState("")
  const [petDate, setPetDate] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [ownerPhone, setOwnerPhone] = useState("")
  const [ownerAddress, setOwnerAddress] = useState("")
  const [ownerEmail, setOwnerEmail] = useState("")

  
  const [pets, setPets] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")

  useEffect(() => {
    (async () => {
      const result = await getCollection("pets")
      if (result.statusResponse) {
        setPets(result.data)
      }
    })()
  }, [])

  //Add pet to database
  const addPet = async(e) => {
    e.preventDefault()
    setEditMode(false)
    const result = await addDocument("pets", { petName, petType, petBreed, petDate, ownerName, ownerPhone, ownerAddress, ownerEmail })
    if (!result.statusResponse) {
      console.log(result.error)
      return
    }
    setPets([ ...pets, { id: result.data.id, petName, petType, petBreed, petDate, ownerName, ownerPhone, ownerAddress, ownerEmail} ])
    cleanFields()
    handleCloseRegisterModal()
  }

  //Save pet to database
  const savePet = async(e) => {
    e.preventDefault()
    const result = await updateDocument("pets", id, { petName, petType, petBreed, petDate, ownerName, ownerPhone, ownerAddress, ownerEmail })
    if (!result.statusResponse) {
      console.log(result.error)
      return
    }
    const editedPets = pets.map(item => item.id === id ? { id, petName, petType, petBreed, petDate, ownerName, ownerPhone, ownerAddress, ownerEmail} : item)
    setPets(editedPets)
    setEditMode(false)
    cleanFields()
    handleCloseRegisterModal()
  }

  //Delete pet to database
  const deletePet = async(id) => {
    const result = await deleteDocument("pets", id)
    if (!result.statusResponse) {
      console.log(result.error)
      return
    }
    const filterdPets = pets.filter(pet => pet.id !== id)
    setPets(filterdPets)
    handleCloseConfirmDelete()
  }

  //Edit pet
  const editPet = (thePet) => {
    handleShowRegisterModal()
    setId(thePet.id)
    setPetName(thePet.petName)
    setPetType(thePet.petType)
    setPetBreed(thePet.petBreed)
    setPetDate(thePet.petDate)
    setOwnerName(thePet.ownerName)
    setOwnerPhone(thePet.ownerPhone)
    setOwnerAddress(thePet.ownerAddress)
    setOwnerEmail(thePet.ownerEmail)
    setEditMode(true)
  }

  //Clean fields
  const cleanFields = () => {
    setPetName("")
    setPetType("")
    setPetBreed("")
    setPetDate("")
    setOwnerName("")
    setOwnerPhone("")
    setOwnerAddress("")
    setOwnerEmail("")
  }

  return (
    <div className="container">
      <nav className="navbar navbar-light bg-light sticky-top">
        <a className="navbar-brand align-bottom mx-2">
          <img src={icon} width="50" height="50" className="d-inline-block"/>
          Veterinaria
        </a>
      </nav>
      <div className="container mt-4">
        <div className="row align-items-center">
          <div className="col">
            <h4><strong><em>Lista de Mascotas</em></strong></h4>
          </div>
          <div className="col">
            <button type="button" onClick={handleShowRegisterModal} className="btn btn-info btn-sm float-right ">Agregar mascota</button>
          </div>
        </div>
        <hr className="border-info shadow mt-1"/>
        <div className="row">
          <div className="col">
          {
            size(pets) === 0 ? (
              <ul className="list-group">
                <li className="list-group-item list-group-item-action" >
                    <h5 className="mb-1">No hay mascota</h5>
                    <small>Aplicación Desarrollada en React.</small>
                </li>
              </ul>  
            ) : (
              <div className="table-responsive">
              <table className="table table-hover table-sm shadow ">
                <thead className="thead-dark text-center font-italic">
                  <tr>
                    <th><small><strong>indice</strong></small></th>
                    <th><small><strong>Nombre Mascota</strong></small></th>
                    <th><small><strong>Tipo mascota</strong></small></th>
                    <th><small><strong>Raza mascota</strong></small></th>
                    <th><small><strong>Fecha nacimiento</strong></small></th>
                    <th><small><strong>Nombre propietario</strong></small></th>
                    <th><small><strong>Teléfono</strong></small></th>
                    <th><small><strong>Dirección</strong></small></th>
                    <th><small><strong>Email</strong></small></th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                  {
                    pets.map((pet, index) => (
                      <tbody className="text-center">
                        <tr>
                          <th scope="row">{index}</th>
                          <td>{pet.petName}</td>
                          <td>{pet.petType}</td>
                          <td>{pet.petBreed}</td>
                          <td>{pet.petDate}</td>
                          <td>{pet.ownerName}</td>
                          <td>{pet.ownerPhone}</td>
                          <td>{pet.ownerAddress}</td>
                          <td>{pet.ownerEmail}</td>
                          <td className="">
                            <FontAwesomeIcon 
                              icon={faPencilAlt} 
                              className="mx-2" 
                              onClick={() => editPet(pet)}
                              type="button"
                            />
                            <FontAwesomeIcon 
                              icon={faTrashAlt} 
                              className=" mx-2"
                              onClick={() => handleShowConfirmDelete(pet.id)}
                              type="button"
                            />
                          </td>
                        </tr>
                      </tbody>
                    ))
                  }
              </table>
              </div>
            )
          }
          </div>
        </div>

        {/* Start Modal Form */}
        <Modal 
          show={show}
          onHide={handleCloseRegisterModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              { editMode ? "Actualizar" : "Registro"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={ editMode ? savePet : addPet }>
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
                    onChange={(text) => setPetType(text.target.value)}
                    value={petType}
                    required
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
                    onChange={(text) => setPetBreed(text.target.value)}
                    value={petBreed}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <small  htmlFor="petDate" className="text-muted">Fecha de nacimiento de la mascota</small>
                  <input 
                    type="date" 
                    className="form-control form-control-sm" 
                    id="petDate"
                    onChange={(text) => setPetDate(text.target.value)}
                    value={petDate}
                    required
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
                    onChange={(text) => setOwnerName(text.target.value)}
                    value={ownerName}
                    required
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
                    onChange={(text) => setOwnerPhone(text.target.value)}
                    value={ownerPhone}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <small  htmlFor="ownerAddress" className="text-muted">Dirección del propietario</small>
                  <input 
                    type="ownerAddress" 
                    className="form-control form-control-sm" 
                    id="ownerAddress"
                    onChange={(text) => setOwnerAddress(text.target.value)}
                    value={ownerAddress}
                    required
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
                    onChange={(text) => setOwnerEmail(text.target.value)}
                    value={ownerEmail}
                    required
                  />
                </div>
              </div>
              <hr/>
              <button 
                className={ editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block" }
                type="submit"
              >
                { editMode ? "Guardar" : "Agregar mascota"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
        {/* End Modal Form */}

        {/* Start Modal Confirm Delete */}
        <Modal
          show={showConfirmDelete}
          onHide={handleCloseConfirmDelete}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Eliminar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Esta seguro que desea eliminar este registro?
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-sm" onClick={handleCloseConfirmDelete}>
              Cerrar
            </button>
            <button className="btn btn-sm btn btn-danger" onClick={() => deletePet(id)} >Eliminar</button>
          </Modal.Footer>
        </Modal>
        {/* End Modal Confilr Delete */}
      </div>
    </div>
  );
}

export default App;
