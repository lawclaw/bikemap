import { Client, Databases } from "appwrite";
var client = new Client();
client .setEndpoint('http://localhost/v1') // Set your endpoint
.setProject('636f8b7f58411246fbf8') // Your Appwrite Project UID
//.setKey('4d2823ddd505623965a2c937f56973b5f007d4b3e0de6f39513bfc1ec10a17004798e76308764ae4df875f55b07ce4904f8e3613f67cb44a0f6af869be69ff9cd36cacadec5f7c1012d9d308b2d7933897dc9f56dbff057b4c143555bfdc298acb60c7e8fa7d446862f9ce54a9543f65908a6f35fae1a2b7ef35e6322ea3f7c9');

const databases = new Databases(client);


export const api = {
	postData: async (user, longitude, latitude, title, description, timeuntil) => {
	let promise = await databases.createDocument('636f8ba30acc91d1c45f','636f8be705efa1e3529f', 'unique()', {'User':user, 'Longitude':longitude, 'Latitude':latitude, 'Title':title, 'Description':description, 'TimeUntil':timeuntil});
	promise.then(function (response) {
	            console.log(response); // Success
	        }, function (error) {
	            console.log(error); // Failure
	        });
	    },

	getData: async () => {
	let promise = await databases.listDocuments('636f8ba30acc91d1c45f', '636f8be705efa1e3529f');
	        return promise.then(function (response) {
	            //response.documents is a array
				console.log(response);
	            return response.documents;
	        }, function (error) {
	            console.log(error); // Failure
	        });
	    },
	}
