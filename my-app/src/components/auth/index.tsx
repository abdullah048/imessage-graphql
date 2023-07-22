import { CreateUsernameData, CreateUsernameVariables } from '@/utils/types';
import { useMutation } from '@apollo/client';
import { Button, Center, Image, Input, Text, VStack } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import React, { FC, Fragment, useState } from 'react';
import UserOperations from '../../graphql/operations/user';
import { toast } from 'react-hot-toast';

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: FC<IAuthProps> = props => {
  const { session, reloadSession } = props;
  const [username, setUsername] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(false);

  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    try {
      if (!username) return setShowError(true);
      const { data } = await createUsername({ variables: { username } });
      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        throw new Error(error);
      }
      toast.success('Username successfully created! 🚀');
      // NOTE: reload session to obtain new username...
      reloadSession();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(`On submit Error: ${error.message}`);
      }
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
            {showError && (
              <Text
                width={'100%'}
                marginTop={'5px'}
                fontSize='medium'
                color='red'>
                This field is required
              </Text>
            )}
            <Button
              isLoading={loading}
              loadingText='Submitting'
              width='100%'
              onClick={onSubmit}>
              Save
            </Button>
          </VStack>
        ) : (
          <Fragment>
            <Text fontSize='3xl'>iMessageApp</Text>
            <Button
              isLoading={sessionLoading}
              loadingText='Loading...'
              onClick={() => {
                setSessionLoading(true);
                signIn('google');
              }}
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
