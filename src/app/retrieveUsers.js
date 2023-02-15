const axios = require("axios");

const getUsers = async (realm, accessToken) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/admin/realms/${realm}/users`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const usersDetails = async () => {
  const realm = "devRealm";
  const accessToken = "";

  const users = await getUsers(realm, accessToken);
  console.log(users);
};

usersDetails();
