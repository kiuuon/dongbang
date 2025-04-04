import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';

import Navigator from '@/components/club/navigator';
import JoinClubPrompt from '@/components/club/join-club-prompt';
import NotPost from '@/components/club/not-post';
import { fetchPostsByClubType } from '@/lib/apis/post';
import { logout } from '@/lib/apis/auth';

function Main() {
  const observerElement = useRef(null);
  const router = useRouter();
  const { clubType } = router.query;

  const { data, fetchNextPage, hasNextPage, isPending } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['posts', clubType],
    queryFn: ({ pageParam }) => fetchPostsByClubType(clubType as 'my' | 'campus' | 'union', pageParam),
    getNextPageParam: (lastPage, allPages) => (lastPage?.length ? allPages.length : undefined),
  });

  useEffect(() => {
    const target = observerElement.current;
    if (!target) return undefined;

    const observerInstance = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });
      },
      { threshold: 1 },
    );

    observerInstance.observe(target);

    return () => observerInstance.unobserve(target);
  }, [fetchNextPage, hasNextPage]);

  const getContent = () => {
    if (isPending) {
      return null;
    }

    if (!data?.pages[0]) {
      return <JoinClubPrompt />;
    }

    if (data?.pages[0].length === 0) {
      return (
        <div>
          <NotPost />
          <button
            type="button"
            className="mt-4 w-full rounded-lg bg-[#FFD600] py-4 text-[#000000]"
            onClick={() => {
              router.push('/club/create');
            }}
          >
            동아리 생성하기
          </button>
          <button
            type="button"
            className="mt-4 w-full rounded-lg bg-[#FFD600] py-4 text-[#000000]"
            onClick={async () => {
              await logout();
              router.push('/login');
            }}
          >
            로그아웃
          </button>
        </div>
      );
    }

    return data?.pages.map((page) =>
      page?.map((post) => (
        <div key={post.id} className="my-16">
          <h1>{post.author.name}</h1>
          <Image src={post.image_url} alt="post-image" width={500} height={500} />
          <p>{post.content}</p>
        </div>
      )),
    );
  };

  return (
    <div>
      <Navigator />
      {getContent()}

      {hasNextPage && (
        <div ref={observerElement} className="flex h-[40px] items-center justify-center text-[32px]">
          Loading...
        </div>
      )}
    </div>
  );
}

export default Main;
