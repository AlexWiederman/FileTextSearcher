import axios from "axios";

export const searchCarInformation = async (query) => {
   return await axios({
    method: "get",
    // eslint-disable-next-line
    url: 'https://api.api-ninjas.com/v1/cars?model=' + `${query}`,
    headers: {
      "X-Api-Key": 'uelPqaOOEq8QrCSFhCOtFc9vrxrobFxP4ELN0Leo',
    },
  }).then(function (error, response, body) {
    // if (error) return console.error("Request failed:", error);
    // else if (response.statusCode !== 200)
    //   return console.error(
    //     "Error:",
    //     response.statusCode,
    //     body.toString("utf8")
    //   );
    // else console.log(body);
    // console.log(response);
    // return response.
    console.log("Status:", response.statusCode);
    console.log("Headers:", JSON.stringify(response.headers));
    console.log("Response:", body);
  });
};
// fetch(`https://api.api-ninjas.com/v1/cars?api_key=${process.env.API_KEY}&model=${query}`);
