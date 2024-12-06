export const getProductById = async (productId: string) => {
  try {
    const response = await fetch(
      `http://localhost:8008/api/product/${productId}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

export const purchaseProduct = async (
  productId: string,
  amount: number,
  token: string
) => {
  try {
    const response = await fetch(`http://localhost:8008/api/user/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, amount }), // Serialize body as JSON
    });
    return await response.json();
  } catch (error) {
    console.error("Error uploading course:", error);
    throw error;
  }
};

export const searchProducts = async (keyword: string) => {
  try {
    const response = await fetch(
      `http://localhost:8008/api/product/search?keyword=${encodeURIComponent(
        keyword
      )}`
    );

    return await response.json();
  } catch (error) {
    console.error("Error searching products:", error);
  }
};