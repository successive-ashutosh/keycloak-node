const axios = require("axios");

const createUser = async (
  realm,
  accessToken,
  username,
  email,
  firstName,
  lastName,
  password
) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/auth/admin/realms/${realm}/users`,
      {
        username,
        email,
        firstName,
        lastName,
        enabled: true,
        credentials: [
          {
            type: "password",
            value: password,
            temporary: false,
          },
        ],
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

const userCreated = async () => {
  const realm = "testRealm";
  const accessToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJDLUgtYUduVjRRMUFGa2prUHBJRjZGSWhrcEJ5NGxFY2RicUFOQThqbV84In0.eyJleHAiOjE2NzYwMTMyNDIsImlhdCI6MTY3NjAxMjk0MiwianRpIjoiZWVkZDVjODktOGVkZC00YTI0LTliN2UtZWIxNGNmNWEyNjQ0IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy90ZXN0UmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODZiZjdhYWItMmRmZi00Yzk2LThmMDEtNTE4ZDk4NjdiMWY5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibmV3LWNsaWVudCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtdGVzdHJlYWxtIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiY2xpZW50SG9zdCI6IjEyNy4wLjAuMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SWQiOiJuZXctY2xpZW50IiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LW5ldy1jbGllbnQiLCJjbGllbnRBZGRyZXNzIjoiMTI3LjAuMC4xIn0.WtpYZsMyQ3f59oMxgeSynLdX1yCRUr0rod-_6Nbhnpdo8xrxU0Z7yD_mDPgde_ivgNdyMy2zlqSzxpWWTDN0hNRl6QhgSIBQFEfR6lvUYRY6rr25qZejODt2nJAMxSJUezipZ-Cr_i49wPIsFoinyM8dZ97b3Y5yakYtw__Qz0c4cyvRSjDXfqtiUNHgNJPxK6HYmrJxX0xqzCNKO6PznpbXrOb9mLKN0s3pvukLUqiKuAKi3PXDt7pXzYv19dKtmsN1sRQHTRsdd4tOISGiuChWF--2lqO40zF1KTrmqRbkjeRPNIX1vyDmisApL14wn7_1ECvkQE-Ovxs2LlbjgA";
  const username = "testing";
  const email = "abc@gmail.com";
  const firstName = "first";
  const lastName = "last";
  const password = "Smile";

  const user = await createUser(
    realm,
    accessToken,
    username,
    email,
    firstName,
    lastName,
    password
  );
  console.log(user);
};

userCreated();
