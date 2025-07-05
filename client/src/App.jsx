import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Row,
  Col,
  Form,
  Card,
} from "react-bootstrap";
import BASE_URL from "./env";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  // ดึงข้อมูล
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products/product`);
      const data = Array.isArray(res.data) ? res.data : res.data.products || [];
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // จัดการฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // เพิ่ม
  const handleAdd = async () => {
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
      };
      await axios.post(`${BASE_URL}/products/product`, payload);
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // แก้ไข
  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
    });
    setIsEdit(true);
  };

  // อัปเดต
  const handleUpdate = async () => {
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
      };
      await axios.put(`${BASE_URL}/products/product/${form.id}`, payload);
      fetchProducts();
      resetForm();
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // ลบ
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/products/product/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      description: "",
      price: "",
      stock: "",
    });
    setIsEdit(false);
  };

  return (
    <div>
      <Container>
        <Row
          className="row-container justify-content-center align-content-around"
          style={{ minHeight: "500px" }}
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Product Management
          </h1>

          <Card className="mb-5 shadow w-full max-w-4xl">
            <Card.Body>
              <h2 className="text-xl font-semibold mb-4">
                {isEdit ? "Edit Product" : "Add New Product"}
              </h2>
              <Form>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Product Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={form.description}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={form.price}
                      onChange={handleChange}
                      min="0"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="number"
                      name="stock"
                      placeholder="Stock"
                      value={form.stock}
                      onChange={handleChange}
                      min="0"
                    />
                  </Col>
                </Row>

                <div className="mt-4 flex gap-3">
                  {isEdit ? (
                    <>
                      <Button variant="primary" onClick={handleUpdate}>
                        Update
                      </Button>
                      <Button variant="secondary" onClick={resetForm}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="success" onClick={handleAdd}>
                      Add Product
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow w-full max-w-4xl">
            <Card.Body>
              <Table
                striped
                bordered
                hover
                responsive
                className="align-middle text-center"
              >
                <thead className="bg-gray-100">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price (฿)</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td className="font-medium">{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                          <div className="flex justify-center gap-2">
                            <Button
                              size="sm"
                              variant="warning"
                              onClick={() => handleEdit(product)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-gray-500 text-center">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default App;
