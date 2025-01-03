export const getReviews = async (productId: string) => {
  try {
    const response = await fetch(`http://localhost:8008/api/review/${productId}`);
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    throw error;
  }
};

export const createReview = async (review: {productId: string; rating: number, comment: string}, token: string) => {
  try {
    const response = await fetch(`http://localhost:8008/api/review`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};