'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import Loading from './Loading';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt) => (
        <PromptCard 
          key={prompt._id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    filterPosts(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    filterPosts(tag);
  };

  const filterPosts = (value) => {
    if(value !== ''){
      setFilteredPosts(
        posts.filter((post) =>
          post.creator.email.toLowerCase().includes(value.toLowerCase()) ||
          post.creator.username.toLowerCase().includes(value.toLowerCase()) ||
          post.prompt.toLowerCase().includes(value.toLowerCase()) ||
          post.tag.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredPosts(posts);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      data.reverse();

      // await new Promise(resolve => setTimeout(resolve, 5000));

      setPosts(data);
      setFilteredPosts(data);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);
  
  if(isLoading) return <Loading />;
  
  return (
    <section className='feed'>
      <form
        className='relative w-full flex-center'
      >
        <input 
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList 
        data = {filteredPosts}
        handleTagClick = {handleTagClick}
      />
    </section>
  );
}

export default Feed;