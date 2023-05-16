const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: (_: any, args: { username: string }, context: any) => {
      const { username } = args;
      console.log('Username Resolver', username, context);
    }, // TODO: update context type to GraphqlContext
  },
  // Subscription: {},
};

export default resolvers;
