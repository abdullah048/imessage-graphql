import { Session } from 'next-auth';
export interface GraphQlContext {
  session: Session;
  // prisma,
  // pubsub
}
