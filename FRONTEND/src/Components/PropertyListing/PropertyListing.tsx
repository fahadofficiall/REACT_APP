import React, { useContext, useEffect, useState } from 'react'
import Tile from '../Tile/Tile';
import { PropertyListing } from '../../dataType';

import { Col, Row } from 'react-bootstrap';
import { ThemeContext } from '../../ThemeContext';

type Props = {}

const PropertyListings = (props: Props) => {

  const [propertyListingResult, setpropertyListingResult] = useState<PropertyListing[]>([])

  const [theme, setTheme] = useContext(ThemeContext)
  const [textClass, setTextClass] = useState('');
  const [bgClass, setBgClass] = useState('');

  useEffect(() => {
          setBgClass(theme === 'dark' ? 'bg-dark' : 'bg-body-tertiary shadow');
          setTextClass(theme === 'dark' ? 'text-light' : 'text-dark');
      }, [theme]);
  

  useEffect(() => {
    fetch('https://localhost:7011/api/PropertyListings')  //'https://localhost:7011/api/PropertyListings'
      .then(response => response.json())
      .then(data => {
        setpropertyListingResult(data);
      });
  }, []);

  useEffect(() => {
    console.log(propertyListingResult);
  }, [propertyListingResult]);

  return (
    <div><h3 className={textClass+' mx-4'}>Listings Available...</h3>
      <div className={'d-flex ' + bgClass}>
        <Row className='col'>
        {
          propertyListingResult.length > 0 ?
            (
              propertyListingResult.map((result) => {
                return <Col className='col-3' key={result.id}> <Tile type={result.propertyType} value={"INR " + result.propertyValue} info={result.propertyInfo} /> </Col>
              })
            ) :
            (
              <p>No results</p>
            )
        }
        </Row>
      </div>
    </div>
  )
}

export default PropertyListings