import { Button, Center, Image, Input, Text, VStack } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import React, { FC, Fragment, useState } from 'react';

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: FC<IAuthProps> = props => {
  const { session, reloadSession } = props;
  const [username, setUsername] = useState('');

  const onSubmit = async () => {
    try {
      // create username mutation
    } catch (error) {
      if (error instanceof Error)
        console.log(`On submit Error: ${error.message}`);
    }
  };

  return (
    <Center height='100vh'>
      <VStack spacing={3}>
        {session ? (
          <VStack spacing={4}>
            <Text fontSize='3xl'>Create a Username</Text>
            <Input
              placeholder='Enter a username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Button width='100%' onClick={onSubmit}>
              Save
            </Button>
          </VStack>
        ) : (
          <Fragment>
            <Text fontSize='3xl'>iMessageApp</Text>
            <Button
              onClick={() => signIn('google')}
              leftIcon={
                <Image
                  borderRadius='full'
                  boxSize='20px'
                  src='/images/google-logo.png'
                  alt='google-logo'
                />
              }>
              Continue with Google
            </Button>
          </Fragment>
        )}
      </VStack>
    </Center>
  );
};

export default Auth;
