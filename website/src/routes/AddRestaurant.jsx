import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AddRestaurant = () => {
  const navigate = useNavigate();
  const { addRestaurants} = useContext(RestaurantsContext);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleDescriptionChange = (event) => {  
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !location || !priceRange || !image || !description) {
      alert('Please fill in all the form fields');
      return;
    }
    try {
      const response = await RestaurantFinder.post('/',{
        name : name,
        location: location,
        price_range: priceRange,
        image: image,
        description: description,
      });
      console.log(response.data.data);
      addRestaurants(response.data.data.restaurant);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Navbar/>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="form.Name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleNameChange} />
        </Form.Group>
        <Form.Group controlId="form.Location" className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Mumbai, Maharashtra" value={location} onChange={handleLocationChange} />
        </Form.Group>
        <Form.Group controlId="form.Price_range" className="mb-3">
          <Form.Label>Price Range</Form.Label>
          <Form.Control type="text" placeholder="Enter price range" value={priceRange} onChange={handlePriceRangeChange} />
        </Form.Group>
        <Form.Group controlId="form.Image" className="mb-3">
          <Form.Label>Image Link</Form.Label>
          <Form.Control type="text" placeholder="Enter image link" value={image} onChange={handleImageChange} />
        </Form.Group>
        <Form.Group controlId="form.Textarea" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" placeholder='Enter Description' rows={3} value={description} onChange={handleDescriptionChange} />
        </Form.Group>
        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </Form>
    </Container>
  );
};

export default AddRestaurant;
