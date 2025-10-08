import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config/config";
import { Container, PostCards } from "../components/index.js";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.rows);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  if (posts.length === 0) {
    return (
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-3xl font-bold hover:text-gray-500 text-center">
              Login to read Posts
            </h1>
          </div>
        </div>
      </Container>
    );
  } else {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCards {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
};

export default Home;
