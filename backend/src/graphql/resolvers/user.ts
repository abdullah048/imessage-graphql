import { GraphQlContext } from '../../utils/types';

const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: (
      _: any,
      args: { username: string },
      context: GraphQlContext
    ) => {
      const { username } = args;
      const { session, prisma } = context;
      console.log('Username Resolver', username, context);
    },
  },
  // Subscription: {},
};

export default resolvers;
