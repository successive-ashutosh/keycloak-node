const axios = require("axios");

const getAccessToken = async (
  clientId,
  clientSecret,
  grantType,
  username,
  password
) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/realms/testRealm/protocol/openid-connect/token`,
      "grant_type=" +
        grantType +
        "&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret +
        "&username=" +
        username +
        "&password=" +
        password,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const token = async () => {
  const grantType = "client_credentials";
  const clientId = "new-client";
  const clientSecret = "QClqbCgejqiYACAfhKds4zDdin57CT0t";
  const username = "yourName";
  const password = "Smile";

  const accessToken = await getAccessToken(
    clientId,
    clientSecret,
    grantType,
    username,
    password
  );
  console.log(accessToken);
};

token();
