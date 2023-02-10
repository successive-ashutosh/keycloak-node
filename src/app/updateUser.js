const axios = require("axios");

const updateUser = async (
  realm,
  accessToken,
  userId,
  email,
  firstName,
  lastName
) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/auth/admin/realms/${realm}/users/${userId}`,
      {
        email,
        firstName,
        lastName,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const userResponse = async () => {
  const realm = "{realm-name}";
  const accessToken = "{access-token}";
  const userId = "{user-id}";
  const email = "{email}";
  const firstName = "{first-name}";
  const lastName = "{last-name}";

  const user = await updateUser(
    realm,
    accessToken,
    userId,
    email,
    firstName,
    lastName
  );
  console.log(user);
};

userResponse();
