import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, Row, Table } from 'react-bootstrap'
import uuid from 'react-uuid'
import { PropertyListing, Response } from '../../dataType'
import CreatePropertyListing from './CreatePropertyListing'
import { ThemeContext } from '../../ThemeContext'


type Props = {}

const SellerDashboard = (props: Props) => {

    const [propertyListingResult, setpropertyListingResult] = useState<PropertyListing[]>([])

    const [showModal, setShowModal] = useState(false)

    const [selectedRow, setSelectedRow] = useState<PropertyListing>()

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [idToDelete, setidToDelete] = useState(0)

    const [responseModal, setResponseModal] = useState(false)

    const [responseMessage, setResponseMessage] = useState('')

    const [theme, setTheme] = useContext(ThemeContext)

    const [bgClass, setBgClass] = useState('');

    const [textClass, setTextClass] = useState('');

    const [tableClass, setTableClass] = useState('');



    const openEditModal = (id: any) => {
        setShowModal(true);


        const row = propertyListingResult.find(row => row.id === parseInt(id))

        setSelectedRow(row);
    }

    const closeEditModal = () => {
        setShowModal(false);
    }

    const openDeleteModal = (id: any) => {
        setShowDeleteModal(true);

        setidToDelete(id);
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const deleteRecord = () => {
        const id = idToDelete;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('https://localhost:7011/api/PropertyListings?id=' + id.toString(), requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)

                const response: Response = {
                    ResponseMessage: data.ResponseMessage
                }

                if (response.ResponseMessage === 'Record deleted successfully') {
                    setShowDeleteModal(false);
                    setResponseMessage(response.ResponseMessage);
                    setResponseModal(true);
                }
                else {
                    setShowDeleteModal(false);
                    setResponseMessage('Some error occured while deleting the record');
                    setResponseModal(true);
                }

            });
    }

    const closeResponseModal = () => {
        setResponseModal(false);
    }


    useEffect(() => {
        fetch('https://localhost:7011/api/PropertyListings')  //http://localhost:5127/api/PropertyListings
            .then(response => response.json())
            .then(data => {
                setpropertyListingResult(data);
            });
    }, []);

    useEffect(() => {
        setBgClass(theme === 'dark' ? 'bg-dark' : 'bg-body-tertiary shadow');
        setTextClass(theme === 'dark' ? 'text-light' : 'text-dark');
        setTableClass(theme === 'dark' ? 'table-dark' : 'table-light');
    }, [theme]);



    return (
        <div className={bgClass + ' ' + textClass + ' m-3'}><h2>Your Property Listings...</h2>
            <Table striped bordered hover className={tableClass}>
                <thead>
                    <tr>
                        <th className='col-1'>#</th>
                        <th className='col-1'>Property Type</th>
                        <th className='col-1'>Property Value</th>
                        <th className='col-2'>Property Info</th>
                        <th className='col-1'>City</th>
                        <th className='col-1'>Contact #</th>
                        <th className='col-1'>Sell/Rent out</th>
                        <th className='col-1'>Ready to move in</th>
                        <th className='col-1'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {propertyListingResult.map((row) => {
                        return <tr key={uuid()}>
                            <td>{row.id}</td>
                            <td>{row.propertyType}</td>
                            <td>{row.propertyValue}</td>
                            <td>{row.propertyInfo}</td>
                            <td>{row.propertyCity}</td>
                            <td>{row.ownerContactNbr}</td>
                            <td>{row.propertyAction}</td>
                            <td>{row.moveInFlag === true ? 'Yes' : 'No'}</td>
                            <td><Button variant='primary' onClick={() => { openEditModal(row.id) }}>Edit</Button>&nbsp;
                                <Button variant='danger' onClick={() => openDeleteModal(row.id)}>Delete</Button></td>
                        </tr>
                    })}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={closeEditModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className={bgClass}><CreatePropertyListing source='edit' editDetails={selectedRow}></CreatePropertyListing></Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Listing</Modal.Title>
                </Modal.Header>
                <Modal.Body className={bgClass+' '+textClass}><p>Are you sure you want to delete this listing?</p></Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDeleteModal}>Cancel</Button>
                    <Button variant='danger' onClick={deleteRecord}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={responseModal} onHide={closeResponseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body className={bgClass + ' ' + textClass}><p>{responseMessage}</p></Modal.Body>
            </Modal>

        </div>
    )
}

export default SellerDashboard