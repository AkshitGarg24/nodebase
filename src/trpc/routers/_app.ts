import { email, z } from 'zod';
import { createTRPCRouter, premiumProcedure, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({
  testAI: premiumProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai"
    })
    return { success: true, message: "Job Done!" }
  }),
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
    });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;