const axios = require("axios");

const getUsers = async (realm, accessToken) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/auth/admin/realms/${realm}/users`,
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
  const realm = "testRealm";
  const accessToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJDLUgtYUduVjRRMUFGa2prUHBJRjZGSWhrcEJ5NGxFY2RicUFOQThqbV84In0.eyJleHAiOjE2NzYwMTg0ODksImlhdCI6MTY3NjAxODE4OSwianRpIjoiMGUzOGE1Y2EtOWU0NS00NmMzLWJiYTktNmM2NGQ1NDBkNWQzIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy90ZXN0UmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODZiZjdhYWItMmRmZi00Yzk2LThmMDEtNTE4ZDk4NjdiMWY5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibmV3LWNsaWVudCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtdGVzdHJlYWxtIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiY2xpZW50SG9zdCI6IjEyNy4wLjAuMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SWQiOiJuZXctY2xpZW50IiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LW5ldy1jbGllbnQiLCJjbGllbnRBZGRyZXNzIjoiMTI3LjAuMC4xIn0.DXKiu2wzQh37oj60tcLVNUg8maSjcFySMDOSND0UGHO7u5h1gUZaUlvOOw33IZjSK6_ULoZOLN4PIjjqrKQ440b-puVeuE-qZpDE0CuoO5qko4owkwbGk20iaJu1VdOIHr7-dVJHQNaC7K5Da0e0aIIIerBPMtBiscVSab9ANgRUyKK4kPE-hDSQmfiVDbP-4NsRxcfED_S7QvNDTHNR-G6aJDxJgZNCTLrS6ONoGURj8QQnFoJ1dHJbdpmt8ujaGi9fsJtljjX5bhNvIEPwGT1mi2BkwwsJKjNzbJCbYeROwYldXF2HxnwEc84L1XT2Qo3gEOEb-MYxZNOCaetg2";

  const users = await getUsers(realm, accessToken);
  console.log(users);
};

usersDetails();
