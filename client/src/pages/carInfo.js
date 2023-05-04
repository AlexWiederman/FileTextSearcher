import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  FormControl as Control,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchCarInformation } from '../utils/API';
import { useMutation } from '@apollo/client';
import {ADD_CAR} from '../utils/mutations';
import { saveCarIds, getSavedCarIds } from '../utils/localStorage';

const CarInfo = () => {
  // create state for holding returned car api data
  const [searchedCar, setSearchedCar] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved carId values
  const [savedCarIds, setSavedCarIds] = useState(getSavedCarIds());

  // defining the save car function
  const [saveCar] = useMutation(ADD_CAR);

  // set up useEffect hook to save `savedCarIds` list to localStorage on component unmount
  
  useEffect(() => {
    return () => saveCarIds(savedCarIds);
  });

  // create method to search for cars and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchCarInformation(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const carData = items.map((car) => ({
        carId: car.carId,
        carModel: car.model,
        make: car.make,
        fuel_type: car.fuel_type,
        image: car.imageLinks?.thumbnail || '',
        year: car.year,
      }));

      setSearchedCar(carData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a car to our database
  const handleSaveCar = async (carId) => {
    // find the car in `searchedCar` state by the matching id
    const carToSave = searchedCar.find((car) => car.carId === carId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveCar(carToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save car id to state
      setSavedCarIds([...savedCarIds, carToSave.carId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Cars!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a car'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedCar.length
            ? `Viewing ${searchedCar.length} results:`
            : 'Search for a car to begin'}
        </h2>
        <Row>
          {searchedCar.map((car) => {
            return (
              <Col md="4">
                <Card key={car.carId} border='dark'>
                  {car.image ? (
                    <Card.Img src={car.image} alt={`The image for ${car.make} ${car.model} ${car.year}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{car.make}</Card.Title>
                    <p className='small'>Model: {car.model}</p>
                    <Card.Text>{car.year}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedCarIds?.some((savedCarId) => savedCarId === car.carId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveCar(car.carId)}>
                        {savedCarIds?.some((savedCarId) => savedCarId === car.carId)
                          ? 'This car has already been saved!'
                          : 'Save this Car!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default CarInfo;
