'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if(!hasConfirmed) return;

    try {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });
      //console.log(response);
      
      const filteredPosts = posts.filter((p) => p._id !== post._id);
      setPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      // console.log(response);
      const data = await response.json();

      setPosts(data);
    };

    if(session?.user.id) fetchPosts();
  }, [session?.user.id]);

  // If session status is loading, don't do anything
  // Once the session status is no longer 'loading', if there is no session, redirect to home page
  useEffect(() => {
    if(status !== 'loading' && !session) {
      router.push('/');
    }
  }, [session, status]);

  return (
    <Profile 
      name="My"
      desc="Welcome to your personal profile page."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default ProfilePage;