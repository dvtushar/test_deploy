import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import Navbar from "../components/Navbar";
import { Card, Col, Container, Row } from 'react-bootstrap';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const styles = {
  popupContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  popupCard: {
    width: '300px', 
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
  popupContent: {
    textAlign: 'center',
  },
};

const RestaurantDetailPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  useEffect(() => {
    console.log('useEffect called');
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log("response", response);
        const newData = response.data.data;
        setSelectedRestaurant(newData);
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    };

 
    fetchData();

  }, [id, setSelectedRestaurant]);

  const handleUpdate = () => {
    navigate(`/restaurants/${id}/update`);
  };

  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeletePopupOpen(true);
  };

  const handleCancelClick = () => {
    setDeletePopupOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      navigate('/');
      await RestaurantFinder.delete(`/${id}`);
    } catch (error) {
      console.error('Delete request failed:', error);
    }
  };

  const reducedImgStyle = {
    width: '700px',
    height: '400px',
    borderRadius: '10px', 
  };

  return (
    <div>
      <Navbar />
      {selectedRestaurant && (
        <Container>
        <Row>
          <Col>
            <img
              src={selectedRestaurant.restaurant.image}
              alt={selectedRestaurant.restaurant.name}
              style={reducedImgStyle}
            />
          </Col>
          <Col>
            <h2>{selectedRestaurant.restaurant.name}</h2>
            <p>Location: {selectedRestaurant.restaurant.location}</p>
            <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
            <p>Price Range: {selectedRestaurant.restaurant.price_range}</p>
            <p>Description: {selectedRestaurant.restaurant.description}</p>
            <Row>
              <div className="mb-3">
                <button type="submit" onClick={handleUpdate} className="btn btn-primary mx-2">Update</button>
                <button type="submit" onClick={handleDeleteClick} className="btn btn-primary mx-2">Delete</button>
              </div>
            </Row>
          </Col>
        </Row>
        <div className='mt-5'>
          <Reviews reviews={selectedRestaurant.reviews}/>
          <AddReview/>
        </div>
      </Container>
      )}

      {/* Delete confirmation popup */}
      {isDeletePopupOpen && (
        <div style={styles.popupContainer}>
          <Card style={styles.popupCard}>
            <div style={styles.popupContent}>
              <p>Are you sure you want to delete this restaurant?</p>
              <button onClick={handleConfirmDelete} className="btn btn-danger mx-2">
                Delete
              </button>
              <button onClick={handleCancelClick} className="btn btn-secondary mx-2">
                Cancel
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default RestaurantDetailPage