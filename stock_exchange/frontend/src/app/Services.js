import axios from 'axios';

export default {

   isValidUser: (email, password) => {

    return axios.get('/api/user/is-valid/?email=' + email +'&password=' + password +'')
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    });

   },

   getStocks: () => {
    
        return axios.get('/api/stocks')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    
    },

    submitOrder: (order) => {

      axios.post('/api/order', order)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    
    getUserOrders: (email) => {

        return axios.get('/api/user/orders/?email=' + email)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    }
}