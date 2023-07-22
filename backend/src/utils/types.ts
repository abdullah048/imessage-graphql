import { PrismaClient } from '@prisma/client';
import { ISODateString } from 'next-auth';
export interface GraphQlContext {
  session: Session | null;
  prisma: PrismaClient;
  // pubsub
}

// NOTE: Users
export interface UsernameResponse {
  success?: boolean;
  error?: string;
}

export interface Session {
  user: User;
  expires: ISODateString;
}
export interface User {
  id: string;
  image: string;
  username: string;
  email: string;
  emailVerified: boolean;
  name: string;
}
