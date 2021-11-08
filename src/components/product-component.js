import React, { Component } from "react";
import productService from "../services/product-service";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.getProducts = this.getProducts.bind(this);
    this.refreshProducts = this.refreshProducts.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.addNew = this.addNew.bind(this);
    this.newProduct = this.newProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getProduct = this.getProduct.bind(this);

    this.state = {
        products: [],
        id: "",
        name: "",
        price: "", 
        isDeleted: false,
        submitted: false,
        isUpdate: false
      };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    productService.getAllProducts()
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshProducts() {
    this.getProducts();
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  addNew() {
    var data = {
      id: this.state.id,
      name: this.state.name,
      price: this.state.price
    };

    if (this.state.isUpdate === false){
      productService.addNewProduct(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          price: response.data.price,
          isDeleted: response.data.isDeleted,
          submitted: true
        });
        console.log(response.data);
        this.refreshProducts();
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      productService.updateProduct(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          price: response.data.price,
          isDeleted: response.data.isDeleted,
          submitted: true, 
          isUpdate: true
        });
        console.log(response.data);
        this.refreshProducts();
      })
      .catch(e => {
        console.log(e);
      });
    }
  }

  newProduct() {
    this.setState({
      id: "",
      name: "",
      price: "",
      isDeleted: false,
      submitted: false
    });
    this.refreshProducts();
  }

  deleteProduct(id){
    var data = {
      id: id
    };
    console.log("Data product : ", data);

    productService.deleteProduct(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          price: response.data.price,
          isDeleted: true
        });
        this.refreshProducts();
      })
      .catch(exception => {
        console.log(exception);
      });
  }

  getProduct(id){
    var data = {
      id: id
    };
    console.log("Data product : ", data);

    productService.getOneProduct(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          price: response.data.price,
          isDeleted: response.data.isDeleted,
          submitted : false,
          isUpdate: true
        });
        this.refreshProducts();
      })
      .catch(exception => {
        console.log(exception);
      });
  }

  render() {
    const { products } = this.state;
    return (
      <><div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Successfully submitted!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>Add New One</button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" required value={this.state.name} onChange={this.onChangeName} name="name" />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="text" className="form-control" id="price" required value={this.state.price} onChange={this.onChangePrice}name="price" />
            </div>
            <br></br>
            <button onClick={this.addNew} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
      <br></br>
      <br></br>
      <div className="list row">
          <div className="col-md-6">
            <h4>Available Products</h4>
            <br></br>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products && products.map(product => <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td><button className="btn btn-success" onClick={() => this.getProduct(product.id)}>Update</button></td>
                  <td><button className="btn btn-danger" onClick={() => this.deleteProduct(product.id)}>Delete</button></td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
        </div></>
    );
  }
}
