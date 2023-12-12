import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ConverterContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Select = styled.select`
  padding: 8px;
  margin: 5px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 18px;
  cursor: pointer;
`;

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/exchange-rate')
      .then((response) => {
        const availableCurrencies = Object.keys(response.data.rates);
        setCurrencies(availableCurrencies);
        setFromCurrency(availableCurrencies[0]);
        setToCurrency(availableCurrencies[1]);
      })
      .catch((error) => {
        setError(`Error fetching currencies: ${error.message}`);
        console.error('Error fetching currencies:', error);
      });
  }, []);

  const handleConvert = () => {
    axios.post('/convert', { amount, fromCurrency, toCurrency })
      .then((response) => {
        setConvertedAmount(response.data.convertedAmount);
      })
      .catch((error) => {
        setError(`Error converting currency: ${error.message}`);
        console.error('Error converting currency:', error);
      });
  };

  return (
    <ConverterContainer>
      <h2>Currency Converter</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <br/>
      <label>
        From:
        <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </Select>
      </label>
      <label>
        To:
        <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </Select>
      </label>
      <br/>
      <Button onClick={handleConvert}>Convert</Button>
      {convertedAmount !== null && (
        <div>
          <h3>Converted Amount:</h3>
          <p>{convertedAmount.toFixed(2)} {toCurrency}</p>
        </div>
      )}
    </ConverterContainer>
  );
};

export default CurrencyConverter;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// const ConverterContainer = styled.div`
//   max-width: 400px;
//   margin: 50px auto;
//   padding: 20px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   text-align: center;
// `;

// const FormContainer = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
// `;

// const InputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
// `;

// const RowContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
// `;

// const Select = styled.select`
//   padding: 8px;
//   margin: 5px;
// `;

// const Button = styled.button`
//   padding: 12px;
//   background-color: #4caf50;
//   color: #fff;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
// `;

// const CurrencyConverter = () => {
//   const [currencies, setCurrencies] = useState([]);
//   const [fromCurrency, setFromCurrency] = useState('');
//   const [toCurrency, setToCurrency] = useState('');
//   const [amount, setAmount] = useState(1);
//   const [convertedAmount, setConvertedAmount] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('/exchange-rate')
//       .then((response) => {
//         const availableCurrencies = Object.keys(response.data.rates);
//         setCurrencies(availableCurrencies);
//         setFromCurrency(availableCurrencies[0]);
//         setToCurrency(availableCurrencies[1]);
//       })
//       .catch((error) => {
//         setError(`Error fetching currencies: ${error.message}`);
//         console.error('Error fetching currencies:', error);
//       });
//   }, []);

//   const handleConvert = () => {
//     axios.post('/convert', { amount, fromCurrency, toCurrency })
//       .then((response) => {
//         setConvertedAmount(response.data.convertedAmount);
//       })
//       .catch((error) => {
//         setError(`Error converting currency: ${error.message}`);
//         console.error('Error converting currency:', error);
//       });
//   };

//   return (
//     <ConverterContainer>
//       <h2>Currency Converter</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <FormContainer>
//         <InputContainer>
//           <label>
//             Amount:
//             <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
//           </label>
//         </InputContainer>
//         <RowContainer>
//           <label>
//             From:
//             <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
//               {currencies.map((currency) => (
//                 <option key={currency} value={currency}>
//                   {currency}
//                 </option>
//               ))}
//             </Select>
//           </label>
//           <label>
//             To:
//             <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
//               {currencies.map((currency) => (
//                 <option key={currency} value={currency}>
//                   {currency}
//                 </option>
//               ))}
//             </Select>
//           </label>
//         </RowContainer>
//         <Button onClick={handleConvert}>Convert</Button>
//       </FormContainer>
//       {convertedAmount !== null && (
//         <div>
//           <h3>Converted Amount:</h3>
//           <p>{convertedAmount.toFixed(2)} {toCurrency}</p>
//         </div>
//       )}
//     </ConverterContainer>
//   );
// };

// export default CurrencyConverter;
