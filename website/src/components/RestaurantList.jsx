import 'bootstrap/dist/css/bootstrap.min.css';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useContext, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function RestaurantList() {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder();
        console.log("response", response);
        console.log("data", response.data.data);
        console.log("restaurants", response.data.data.restaurants);
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [setRestaurants]);

  const cardVariants = [
    'Primary',
    'Secondary',
    'Success',
    'Danger',
    'Info',
    'Light',
    'Dark',
  ];

  return (
    <div className="App">
      <Container className='p-4'>
        <Row>
          {restaurants.map((restaurant, idx) => (
            <Col key={restaurant.id} xs={12} sm={6} md={4} lg={4}>
              <Card
                bg={cardVariants[idx % cardVariants.length].toLowerCase()}
                text={cardVariants[idx % cardVariants.length].toLowerCase() === 'light' ? 'dark' : 'white'}
                className="m-2"
              >
                <Link to={`/restaurants/${restaurant.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card.Header>{restaurant.name} - {restaurant.location}</Card.Header>
                </Link>
                <Card.Body>
                  <StarRating rating={restaurant.average_rating} />
                  <Card.Text>
                    {restaurant.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default RestaurantList;
