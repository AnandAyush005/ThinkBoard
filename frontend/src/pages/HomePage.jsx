import React from 'react'
import NavBar from '../Components/NavBar'
import { useState } from 'react'
import RateLimitedUI from '../Components/RateLimitedUI';
import { useEffect } from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import NoteCard from '../Components/NoteCard';
import NotesNotFound from './NoteNotFound';


const HomePage = () => {

  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setRateLimited(false);

      }catch(err){
        
        console.log("Error fetching notes");
        console.log(err);
        if(err.response?.status === 429){
          setRateLimited(true);
        }
        else{
          toast.error("Failed to load notes");
        }
      }finally{
        setLoading(false);
      }
    };

    fetchNotes();
  }, [])


  return (
    <div className='min-h-screen'>
    <NavBar />

    {isRateLimited && <RateLimitedUI />}


    <div className="max-w-7xl mx-auto p-4 mt-6">

      {loading && <div className='text-center text-primary py-10'>Loading Notes....</div>}

      {notes.length === 0 && !isRateLimited && <NotesNotFound />}

      {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
        </div>
      )}
    </div>
    
    </div>
    
  )
}

export default HomePage