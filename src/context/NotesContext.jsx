import { useContext, createContext, useEffect, useState, Children } from "react";
import { account, databases, ID, Query } from "../lib/appwriteconfig";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    
    const DB_ID = import.meta.env.VITE_DB_ID;
    const COLLECTION_NOTES_ID = import.meta.env.VITE_NOTES_COLLECTION_ID;

    useEffect(() => {
        fetchNotes();
    }, [])

    const getUserId = async() =>{
        try{
            const user = await account.get();
            return user;
        } catch(err){
            console.log("user have not logged in", err);
            return null;
        }
    }

    const fetchNotes = async() =>{
        try{
            const user = await getUserId(); 
            const userId = user?.$id;

            if(userId){
                const res = await databases.listDocuments(DB_ID, COLLECTION_NOTES_ID, [
                    Query.equal("userId", userId),
                ])
                setNotes(res.documents);
            }else{
                console.log("user not logged in")
            }
        }catch(err){
            console.log("fetch failed", err);
        }
    };

    const addNote = async(title, body) => {
        try{
            const user = await getUserId();
            const userId = user?.$id;
            
            const res = await databases.createDocument(DB_ID, COLLECTION_NOTES_ID, ID.unique(), {
                title,
                body,
                isFavorite: false,
                userId: userId,
            })
  

            setNotes((prev) => [...prev, res]);
        } catch(err){
            console.log("failed to add", err);
        }
    };

    const deleteNote = async(noteId) =>{
        try{
            await databases.deleteDocument(DB_ID, COLLECTION_NOTES_ID, noteId);
            setNotes((prev) => prev.filter((note) => note.$id !== noteId));
            console.log("deleted !!");   
        }catch(err){
            console.log("deletion failed ", err);
        }
    };

    const ToggleFavorite = async(noteId, currentStatus) => {
        try{
            const res = await databases.updateDocument(DB_ID, COLLECTION_NOTES_ID, noteId, {
                isFavorite: !currentStatus,
            })
            setNotes((prev) => prev.map((note) => note.$id === noteId? {...note, isFavorite: !currentStatus} : note));
        }catch(err){
            console.log("bookmarked failed ", err);
        }
    };

    return (
        <NotesContext.Provider value={{notes, addNote, deleteNote, ToggleFavorite}}>
            {children}
        </NotesContext.Provider>
    )
};

export const useNotes = () => useContext(NotesContext);