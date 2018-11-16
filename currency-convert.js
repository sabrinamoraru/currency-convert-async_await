const axios = require("axios");

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(
      "http://data.fixer.io/api/latest?access_key=0e9d74174df80bd5cedd086d74f8d293"
    );
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }

    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

const getCountries = async currencyCode => {
  try {
    const response = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${currencyCode}`
    );
    return response.data.map(country => country.name);
  } catch (e) {
    throw new Error("Unable to get countries that use ${currencyCode}.");
  }
};

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const convertedAmount = (amount * rate).toFixed(2);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(
    ", "
  )}`;
};

convertCurrency("EUR", "RON", 20)
  .then(message => {
    console.log(message);
  })
  .catch(e => {
    console.log(e.message);
  });

// const add = async (a, b) => a + b;

// const doWork = async () => {
//   try {
//     const result = await add(12, 13);
//     return result;
//   } catch (e) {
//     return 10;
//   }
// };

// doWork()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(e => {
//     console.log("Something went wrong");
//   });
