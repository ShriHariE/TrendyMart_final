import React, { useEffect, useState } from "react";
import "../styles/ReviewList.css";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7024/api/Review/GetAll")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  if (reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <div className="review-container">
      <h3>All Reviews</h3>
      <table className="review-table">
        <thead>
          <tr>
            <th>Review Id</th>
            <th>User</th>
            <th>Product</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((rev) => (
            <tr key={rev.reviewId}>
              <td>{rev.reviewId}</td>
              <td>{rev.user?.fullName || "N/A"}</td>
              <td>{rev.product?.productName || "N/A"}</td>
              <td>{rev.rating}</td>
              <td>{rev.comment}</td>
              <td>{new Date(rev.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewList;
