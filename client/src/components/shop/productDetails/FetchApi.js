import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getSingleProduct = async (pId) => {
  console.log("Hi");
  try {
    let res = await axios.get(`${apiURL}/v1/products/${pId}`);
    console.log("res =" + res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postAddReview = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/add-review`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteReview = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/delete-review`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
