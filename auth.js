const axios = require("axios");

const keycloakBaseUrl = "http://localhost:8080";
const realmName = "devRealm";
const clientId = "dev_client";
const clientSecret = "zOIFTZZkf1Rgvwjxaa6Zg1FpDkIKVoxL";

async function getUsers() {
  // Get an access token
  const tokenUrl = `${keycloakBaseUrl}/realms/${realmName}/protocol/openid-connect/token`;
  const tokenParams = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });
  const tokenResponse = await axios.post(tokenUrl, tokenParams);
  const accessToken = tokenResponse.data.access_token;

  // Get all users
  const usersUrl = `${keycloakBaseUrl}/admin/realms/${realmName}/users`;
  const usersConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const usersResponse = await axios.get(usersUrl, usersConfig);
  const users = usersResponse.data;

  // Filter users as admin or non-admin
  const adminUserIds = new Set();
  for (const user of users) {
    const roleMappingUrl = `${keycloakBaseUrl}/admin/realms/${realmName}/users/${user.id}/role-mappings/realm`;
    const roleMappingConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const roleMappingResponse = await axios.get(
      roleMappingUrl,
      roleMappingConfig
    );
    const roles = roleMappingResponse.data;
    for (const role of roles) {
      if (role.name === "admin") {
        adminUserIds.add(user.id);
      }
    }
  }

  const adminUsers = users.filter((user) => adminUserIds.has(user.id));
  const nonAdminUsers = users.filter((user) => !adminUserIds.has(user.id));

  console.log("adminUsers", adminUsers);
  console.log("nonadminusers", nonAdminUsers);
}

getUsers();
