import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import {useMutation, useQuery} from '@apollo/client';
import { QUERY_GARAGE } from '../utils/queries';
import { REMOVE_CAR } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeCarId } from '../utils/localStorage';

const SavedBooks = () => {

  const { loading, data} = useQuery(QUERY_GARAGE);
  const [removeCar] = useMutation(REMOVE_CAR);

  const userData = data?.garage || [];

  if(!userData?.firstName) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }


  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteCar = async (carId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeCar({
        variables: { carId }
      });

      // upon success, remove book's id from localStorage
      removeCarId(carId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved cars!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.ownedCars.length
            ? `Viewing ${userData.ownedCars.length} saved ${userData.ownedCars.length === 1 ? 'car' : 'cars'}:`
            : 'You have no saved cars!'}
        </h2>
        <Row>
          {userData.ownedCars.map((car) => {
            return (
              <Col md="4">
                <Card key={car.carId} border='dark'>
                  {car.image ? <Card.Img src={car.image} alt={`The cover for ${car.make} ${car.model} ${car.year}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{car.make}</Card.Title>
                    <p className='small'>Model: {car.model}</p>
                    <Card.Text>{car.year}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteCar(car.carId)}>
                      Delete this Car!
                    </Button>
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

export default SavedBooks;
