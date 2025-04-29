import { useState } from 'react';
// import { useEffect } from 'react';

import { useFetech } from './hooks/useFetch';

import './App.css';

const url = 'http://localhost:3000/products';

function App() {
  // const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const { data: items, httpConfig, loading, error } = useFetch(url);

  // useEffect(() => {
  //   async function getData() {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setProducts(data);
  //   }
  //   getData();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
    };
    httpConfig(product, 'POST');

    // const res = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(product),
    // });

    // const addedProduct = await res.json();

    // setProducts((prevProducts) => [...prevProducts, addedProduct]);
  };

  return (
    <div>
      <h1>HTTP React</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <ul>
        {items &&
          items.map((product) => (
            <li key={product.id}>
              {product.name} - R${product.price}
            </li>
          ))}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <span>Preço</span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {!loading && <button type="submit">Enviar</button>}
          {loading && (
            <button type="submit" disabled>
              Aguarde
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
