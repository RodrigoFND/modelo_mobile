import { Client, Account, ID, Databases, Avatars } from 'react-native-appwrite';

const client = new Client()
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6791690300267fb597d5')   // Your Project ID
  .setPlatform('com.rodrigo.standard');   // Your Platform


/* const client = new Client();
client.setProject(config.appwriteProjectId); */


const databaseId = "679169820015f0d414da";
const collectionId = "67917206003de06dfb74";

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async (email: string, password: string, username: string) => {
    try {
        const user = await account.create(
            ID.unique(),
            email,
            password,
            username,
   
        )
        if(!user) throw new Error('Failed to create user');
        const avatarUrl = avatars.getInitials(username)
        const newUser = await databases.createDocument(
            databaseId,
            collectionId,
            ID.unique(),
            {
                accountId: user.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;

    } catch (error) {
        console.log(error);
    }
}

export async function signIn(email: string, password: string) {
    try {
        const user = await account.createEmailPasswordSession(email, password);
        return user;
    } catch (error) {
        console.log(error);
    }
}

