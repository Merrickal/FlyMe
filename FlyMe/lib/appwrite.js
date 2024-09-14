import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.merrickal.aora',
    projectId: '6685248600052a74b719',
    databaseId: '66852680000104f77576',
    userCollectionId: '668526ab00207b27213f',
    videoCollectionId: '6685270e0038d089edb0',
    storageId: '66852899003a473e0f23',
}

const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 
    ;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username)
        
        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                password,
                avatar: avatarUrl

            }
        )
        return newUser; 
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
    
}
export const signIn = async (email, password) => {
    try {
         const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        const result = await account.deleteSessions();
        throw new Error(error);
     }
}
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}
 export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
export const  getAllHotels = async () =>{
  try {
    const response = await fetch('https://raw.githubusercontent.com/Merrickal/RunTests/main/response.json');
    const responseJson = await response.json();
    return responseJson.movies.results
  } catch (error) {
    log.Error(error)
  }
 }

