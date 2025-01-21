import { Client, Account, Databases, Storage } from "appwrite";

// Initialize the Appwrite client
const client = new Client();
client
    .setEndpoint('APPWRITE_END_POINT')
    .setProject('APPWRITE_PROJECT_ID')

const BlogCOLLECTION_ID = import.meta.env.VITE_BLOG_COLLECTION_ID;

// Initialize the Account object
const account = new Account(client);
const databases =new Databases(client);
const storage =new Storage(client);
const blogCollection = BlogCOLLECTION_ID;

export { client, account,databases,storage,blogCollection };
