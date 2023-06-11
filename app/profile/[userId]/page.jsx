'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Profile from "@components/profile";

const UserProfilePage = ({ params }) => {
  const [userPosts, setUserPosts] = useState([]);

  const searchParams = useSearchParams();
  const userName = searchParams.get('username');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.userId}/posts`);
      if(response.ok) {
        const data = await response.json();

        setUserPosts(data);
      } else {
        router.push('/'); // no user found, move back to homepage
      }
    };

    if(params?.userId) fetchPosts();
  }, [params.userId]);

  useEffect(() => {
    if(!userName || !params.userId) {
      router.push('/');
    }
  }, [userName, params.userId]);
  
  return (
    <Profile 
        name={String(userName) + "'s"}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={userPosts}
    />
  );
}

export default UserProfilePage;