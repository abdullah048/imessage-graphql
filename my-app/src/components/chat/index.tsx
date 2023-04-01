import { Button } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import React, { FC } from 'react';

interface IChatProps {}

const Chat: FC<IChatProps> = props => {
  return (
    <div>
      <Button onClick={() => signOut()}>Sign Out</Button>
      Chat
    </div>
  );
};

export default Chat;
