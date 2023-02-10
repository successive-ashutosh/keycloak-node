const axios = require("axios");

const deleteUser = async (userId) => {
  try {
    await axios.delete(
      `http://localhost:8080/auth/admin/realms/{realm-name}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer {access-token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`User with ID ${userId} deleted`);
  } catch (error) {
    console.error(error);
  }
};

deleteUser("{user-id}");
