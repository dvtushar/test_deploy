import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useLocation, useParams } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  console.log(location);
  console.log(id);

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      console.log(response);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Enter name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4 mt-3 mb-3">
            <label htmlFor="rating">Select Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
              style={{ width: '100%', padding: '8px' }}
              required
            >
              <option value="" disabled>Select a Rating</option>
              {[1, 2, 3, 4, 5].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id="Review"
            className="form-control"
            placeholder="Write a review here..."
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmitReview}
          className="btn btn-primary mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;