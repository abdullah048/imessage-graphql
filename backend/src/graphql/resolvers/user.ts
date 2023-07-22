import { GraphQlContext, UsernameResponse } from '../../utils/types';

const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQlContext
    ): Promise<UsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;
      if (!session?.user) {
        return {
          error: 'not authorized',
        };
      }

      const { id } = session.user;

      try {
        // NOTE: Check if the username is not taken...
        const isExist = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (isExist) {
          return {
            error: `${username} already taken. try again.`,
          };
        }
        // NOTE: Update user...
        await prisma.user.update({
          where: {
            id,
          },
          data: {
            username,
          },
        });
        return {
          success: true,
        };
      } catch (error: any) {
        let message = '';
        if (error instanceof Error) message = error.message;
        else message = String(error);
        console.log('CreateUsername Error: ', message);
        return {
          error: error?.message,
        };
      }
    },
  },
  // Subscription: {},
};

export default resolvers;
