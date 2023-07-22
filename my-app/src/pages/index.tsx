import Auth from '@/components/auth';
import Chat from '@/components/chat';
import { Box } from '@chakra-ui/react';
import { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const reloadSession = () => {
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
  };
  return (
    <div>
      <Box>
        {session?.user.username ? (
          <Chat />
        ) : (
          <Auth session={session} reloadSession={reloadSession} />
        )}
      </Box>
    </div>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};

export default Home;
