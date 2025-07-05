import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "./env";

const App = () => {
  const [data, setData] = useState([]);

const getData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products/product`);
    console.log(res.data);
    setData(res.data.products || []);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


  useEffect(() => {
    getData();
  }, []);

return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Product List</h1>

      {data.length > 0 ? (
        <ul className="space-y-2">
          {data.map((product) => (
            <li
              key={product.id}
              className="border border-gray-300 p-3 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{product.price} บาท</p>
                <p className="text-xs text-gray-400">สต็อก: {product.stock}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">ไม่มีข้อมูลสินค้า</p>
      )}
    </div>
  );
};

export default App;
