import { axiosInstance } from ".";

export const makePayment = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/make-payment",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const bookShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/book-show",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const getAllBookings = async () => {
  try {
    const response = await axiosInstance.get("/api/bookings/get-all-bookings");
    return response.data;
  } catch (err) {
    return err.response;
  }
};
