import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { PropertyListing, Response } from '../../dataType';
import { ThemeContext } from '../../ThemeContext';

type Props = {
    source: string,
    editDetails?: PropertyListing,
    setShowModal?: any,
    setResponseModal?: any,
    setResponseMessage?: any
}

const CreatePropertyListing = ({ source, editDetails, setShowModal, setResponseModal, setResponseMessage }: Props) => {

    const [theme, setTheme] = useContext(ThemeContext)
    const [bgClass, setBgClass] = useState('');
    const [textClass, setTextClass] = useState('');

    const [listingFormData, setListingFormData] = useState(source === 'create' ? {
        propertyType: 'Property Type...',
        propertyValue: '',
        propertyInfo: '',
        ownerContactNbr: '',
        propertyCity: 'Select City...',
        propertyAction: '',
        moveInFlag: false
    } : {
        propertyType: editDetails?.propertyType,
        propertyValue: editDetails?.propertyValue,
        propertyInfo: editDetails?.propertyInfo,
        ownerContactNbr: editDetails?.ownerContactNbr,
        propertyCity: editDetails?.propertyCity,
        propertyAction: editDetails?.propertyAction,
        moveInFlag: editDetails?.moveInFlag
    });

    const handleInputChange = (event: any) => {
        let { name, value } = event.target;
        if (name === "moveInFlag") {
            value = event.target.checked;
        }
        setListingFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const submitListingFormData = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (source === 'create') {
            const requestData: PropertyListing = {
                propertyType: listingFormData.propertyType ?? '',
                propertyValue: Number(listingFormData.propertyValue),
                propertyInfo: listingFormData.propertyInfo ?? '',
                ownerContactNbr: Number(listingFormData.ownerContactNbr),
                propertyCity: listingFormData.propertyCity ?? '',
                propertyAction: listingFormData.propertyAction ?? '',
                moveInFlag: listingFormData.moveInFlag ?? false
            };

            console.log(requestData);

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            };

            fetch('https://localhost:7011/api/PropertyListings', requestOptions) //http://localhost:5127/api/PropertyListings
                .then(response => response.json())
                .then(data => console.log(data));
        }
        else {
            const requestData: PropertyListing = {
                id: Number(editDetails?.id),
                propertyType: listingFormData.propertyType ?? '',
                propertyValue: Number(listingFormData.propertyValue),
                propertyInfo: listingFormData.propertyInfo ?? '',
                ownerContactNbr: Number(listingFormData.ownerContactNbr),
                propertyCity: listingFormData.propertyCity ?? '',
                propertyAction: listingFormData.propertyAction ?? '',
                moveInFlag: listingFormData.moveInFlag ?? false
            };

            console.log(requestData);

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            };

            fetch('https://localhost:7011/api/PropertyListings', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const response: Response = {
                        ResponseMessage: data.ResponseMessage
                    }

                    if (response.ResponseMessage === 'Details updated successfully') {
                        setShowModal(false);
                        setResponseMessage(response.ResponseMessage);
                            setResponseModal(true);
                    }
                    else {
                        setShowModal(false);
                        setResponseMessage('Some error occured while updating the record');
                        setResponseModal(true);
                    }
                });
        }
    }

    useEffect(() => {
        setBgClass(theme === 'dark' ? 'bg-dark' : 'bg-body-tertiary shadow');
        setTextClass(theme === 'dark' ? 'text-light' : 'text-dark');
    }, [theme]);

    return (
        <div className={source === 'create' ? 'mt-5 d-flex justify-content-center' : ''}>
            <Card className={source === 'create' ? textClass + ' ' + bgClass + ' w-50 border border-rounded shadow' : 'w-100 ' + textClass + ' ' + bgClass}>
                <h3 className={textClass + ' mx-3 my-1'}>Post your Property Details...</h3>
                <Form className='m-3' onSubmit={submitListingFormData}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Select name='propertyType' defaultValue={listingFormData.propertyType} onChange={handleInputChange}>
                                <option>Property Type...</option>
                                <option>Commercial Plot</option>
                                <option>Commercial Floor</option>
                                <option>Residential Floor</option>
                                <option>Residential Apartment</option>
                                <option>Studio Apartment</option>
                                <option>Villa</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Control placeholder="Value in INR" name='propertyValue' defaultValue={listingFormData.propertyValue} onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    <Row>

                        <Form.Group as={Col}>
                            <Form.Select name='propertyCity' defaultValue={listingFormData.propertyCity} onChange={handleInputChange}>
                                <option>Select City...</option>
                                <option>Bangalore</option>
                                <option>Chandigarh</option>
                                <option>Indore</option>
                                <option>Kolkata</option>
                                <option>Mumbai</option>
                                <option>New Delhi</option>
                                <option>Surat</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control placeholder="Contact No. +91" name='ownerContactNbr' defaultValue={listingFormData.ownerContactNbr} onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    <Form.Group as={Col} className='mt-3'>
                        <Form.Control as="textarea" placeholder="Enter details" name='propertyInfo' defaultValue={listingFormData.propertyInfo} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 mt-3" defaultValue={listingFormData.propertyAction}>
                        <Form.Label as="legend" column sm={3}>
                            Looking to
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Check
                                type="radio"
                                label="Sell"
                                name='propertyAction'
                                value='Sell'
                                checked={listingFormData.propertyAction === 'Sell'}
                                onChange={handleInputChange}
                                id="formHorizontalRadios1"
                            />
                            <Form.Check
                                type="radio"
                                label="Rent out/Lease"
                                name='propertyAction'
                                value='Rent out/Lease'
                                checked={listingFormData.propertyAction === 'Rent out/Lease'}
                                onChange={handleInputChange}
                                id="formHorizontalRadios2"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label="Ready to move in" checked={listingFormData.moveInFlag === true} name='moveInFlag' onChange={handleInputChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='w-100'>
                        {source === 'create' ? 'Submit' : 'Save Updates'}
                    </Button>
                </Form>
            </Card>
        </div>

    )
}

export default CreatePropertyListing