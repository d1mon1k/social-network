import React from 'react';
import Skeleton from 'react-loading-skeleton';
import cl from './PostsPreloader.module.scss';

/* ------------- Types ------------- */
interface PostsPreloaderProps {
  count: number;
}

/* ------------- Container ------------- */
const PostsPreloader: React.FC<PostsPreloaderProps> = ({ count }) => {
  const posts = new Array(count).fill(0);

  const PostPreloader = () => (
    <div className={cl.post}>
      <div className={cl.postTopRow}>
        <Skeleton circle width={50} height={50} />
        <div className={cl.columnBlock}>
          <Skeleton count={2} width={150} />
        </div>
        <div className={cl.dotsContainer}>
          <Skeleton width={4} height={4} circle />
          <Skeleton width={4} height={4} circle />
          <Skeleton width={4} height={4} circle />
        </div>
      </div>
      <div className={cl.postBody}>
        <Skeleton className={cl.header} />
        <Skeleton height={280} />
      </div>
      <div className={cl.postBottom}>
        <Skeleton width={50} height={32} borderRadius={30} />
        <Skeleton width={50} height={32} borderRadius={30} />
        <Skeleton width={50} height={32} borderRadius={30} />
      </div>
    </div>
  );

  return (
    <>
      {posts.map((post, i) => (
        <PostPreloader key={i} />
      ))}
    </>
  );
};

export default PostsPreloader;
