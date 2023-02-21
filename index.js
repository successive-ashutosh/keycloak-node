const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const { BASE_URL, CLIENT_ID, CLIENT_SECRET,REALM_NAME } = process.env;


async function getAdminToken(){

    const url = `${BASE_URL}/realms/master/protocol/openid-connect/token`;

    const data = {
        grant_type : "client_credentials",
        client_secret: CLIENT_SECRET,
        client_id : CLIENT_ID
    }

    try {
        const response = await axios.post(url, new URLSearchParams(data),{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    }
    catch(e){
        console.log(e);
    }

}

 //getAdminToken();

 async function createUser(email, firstName, lastName){
    const access_token = await getAdminToken();
    const url = `${BASE_URL}/admin/realms/${REALM_NAME}/users`

    const headers = {
        'Content-Type':'application/json',
        'Authorization':`bearer ${access_token}`
    };

    const data = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        enabled:true
    };
    try{
        const response = await axios.post(url, data,{
            headers: headers
        });
        return response.data;
    }
    catch(e){
        console.log(e.response.data);
    }
 }

//createUser('kar@gmail.com', 'kartikae', 'mishra', 'AuctionRealm');

async function findUser(email){
  const access_token = await getAdminToken();
  const url = `${BASE_URL}/admin/realms/${REALM_NAME}/users?username=${email}`;

  const headers = {
      'Authorization': `Bearer ${access_token}`
  };
  try {
      const response = await axios.get(url,{
          headers: headers
      });
      return response.data;
  } catch (error) {
   console.log(error);   
  }

}

async function userList(){
    const access_token = await getAdminToken()
    const url = `${BASE_URL}/admin/realms/${REALM_NAME}/users`
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };

    try{
        const response = await axios.get(url,{
            headers:headers
        });
        console.log(response.data);
    }catch(error){
        console.log(error);
    }
}

//userList();

async function updateUser(email, firstName, lastName, enabled){
    let user = await findUser(email);
    const access_token = await getAdminToken();
    if(user.length > 0){
        const url = `${BASE_URL}/admin/realms/${REALM_NAME}/users/${user[0].id}`;
        const headers = {
            'Authorization':`Bearer ${access_token}`
        };
        const data = {
            firstName:firstName,
            lastName:lastName,
            enabled:(enabled === undefined)?true:enabled
        }
        try {
            const response = await axios.put(url, data, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    } 
    else{
        console.log("user does not exists!");
    }
}

//updateUser("abh123@gmail.com", "abhi", "pratap");

async function disableUser(email){
    let user = await findUser(email);
    let firstName = user[0].firstName;
    let lastName = user[0].lastName;
    await updateUser(email, firstName, lastName, false);

}

//deleteUser("abh123@gmail.com");

async function resetPassword(email, newPassword){
    let user = await findUser(email);
    const access_token = await getAdminToken();
    const url = `${BASE_URL}/admin/realms/${REALM_NAME}/users/${user[0].id}/reset-password`;

    const headers = {
        'Authorization':`Bearer ${access_token}`
    };
    const data = {
        temporary:false,
        type:"password",
        value:newPassword
    }
    try {
        const response = await axios.put(url, data, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//resetPassword("abh123@gmail.com", "abhi");
module.exports = {
  getAdminToken,
  createUser,
  findUser,
  userList,
  updateUser,
  disableUser,
  resetPassword
};