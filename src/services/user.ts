export const getTransactions = async (token: string) => {
  try {
    const response = await fetch(
      "http://localhost:8008/api/user/transactions",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

export const getVouchers = async (token: string) => {
  try {
    const response = await fetch("http://localhost:8008/api/user/vouchers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching vouchers:", error);
  }
};

export const getAddresses = async (token: string) => {
  try {
    const response = await fetch("http://localhost:8008/api/user/addresses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching vouchers:", error);
  }
};

export const deleteAddress = async (token: string, addressId: string) => {
  try {
    const response = await fetch(
      `http://localhost:8008/api/user/deleteAddress/${addressId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error deleting address:", error);
  }
};

export const addAddress = async (
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  },
  token: string
) => {
  try {
    const response = await fetch(`http://localhost:8008/api/user/addAddress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    });
    return await response;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};
