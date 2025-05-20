import {Client, Account, Databases, ID, Query} from 'appwrite'

const client = new Client()

console.log(import.meta.env.VITE_APPWRITE_ENDPOINT);
console.log(import.meta.env.VITE_APPWRIIE_PROJECT_ID);

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRIIE_PROJECT_ID)

const account = new Account(client);
const databases = new Databases(client)


export {account, client, databases, ID, Query};