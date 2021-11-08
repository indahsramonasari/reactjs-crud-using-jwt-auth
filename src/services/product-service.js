import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/auth/';

class ProductService {
  addNewProduct(data) {
    return axios.post(API_URL + 'addproduct', data, { headers: authHeader() });
  }

  getAllProducts() {
    return axios.get(API_URL + 'getproducts', { headers: authHeader() });
  }

  getOneProduct(data) {
    return axios.post(API_URL + 'getproductbyid', data, { headers: authHeader() });
  }

  updateProduct(data) {
    return axios.post(API_URL + 'update', data, { headers: authHeader() });
  }

  deleteProduct(data) {
    return axios.post(API_URL + 'delete', data, { headers: authHeader() });
  }
}

export default new ProductService();
