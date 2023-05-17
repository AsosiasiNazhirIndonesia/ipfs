const axios = require("axios");
const url = process.env.URL_BLOCKCHAIN
const urlToken = process.env.URL_BLOCKCHAIN_TOKEN


exports.newWallet = (body) => {
    // api/v1/portdata/newWallet
    return axios.get(url + "api/v1/portdata/newWallet")
        .then((result) => {
            if(!result.data.error){
                return result.data.message;
            }

            return null;
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getPortData = (id) => {
    // api/v1/portdata/get/20221026001*
    console.log(id);
    return axios.get(url + "api/v1/portdata/get/"+id)
        .then((result) => {
            return result.data.data;
        })
        .catch(error => {
            console.log(error);
        });
};



exports.insertPortData = (body) => {
    // api/v1/portdata/insert
    console.log(body);
    return axios.post(url + "api/v1/portdata/insert", body)
        .then((result) => {
            return result.data;
        })
        .catch(error => {
            console.log(error);
        });
};

exports.insertBatch = (body) => {
    // api/v1/portdata/batch
    console.log(body);
    return axios.post(url + "api/v1/portdata/batch", body)
        .then((result) => {
            return result.data;
        })
        .catch(error => {
            console.log(error);
        });
};


exports.getBalance = (id) => {
    // balanceOf/0x420A7e31d1177F4f7e0ae9d5e45101D5785F4d21
    return axios.get(urlToken + "balanceOf/"+id)
        .then((result) => {
            return result.data;
        })
        .catch(error => {
            console.log(error);
        });
};

exports.punishOrRedeem = (body) => {
    // punishOrRedeem
    console.log(body);
    return axios.post(urlToken + "punishOrRedeem", body)
        .then((result) => {
            return result.data;
        })
        .catch(error => {
            console.log(error);
        });
};

exports.reward = (body) => {
    // punishOrRedeem
    console.log(body);
    return axios.post(urlToken + "reward", body)
        .then((result) => {
            return result.data;
        })
        .catch(error => {
            console.log(error);
        });
};
