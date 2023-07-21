import { CreateUsernameData, CreateUsernameVariables } from '@/utils/types';
import { useMutation } from '@apollo/client';
import { Button, Center, Image, Input, Text, VStack } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import React, { FC, Fragment, useState } from 'react';
import UserOperations from '../../graphql/operations/user';

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: FC<IAuthProps> = props => {
  const { session, reloadSession } = props;
  const [username, setUsername] = useState('');

  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  // console.log('Response =>', data, loading, error);
  console.log('session =>', session);

  const onSubmit = async () => {
    try {
      if (!username) return;
      await createUsername({ variables: { username } });
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
