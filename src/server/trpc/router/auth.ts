import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import bcrypt from "bcrypt";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  register: publicProcedure
    .input(z.object({email: z.string(), password: z.string(), name: z.string()}))
    .mutation(async ({ input, ctx }) => {

    if(!prisma){
      return {user: null, account: null, error: "Prisma not loaded"};
    }

    const hashedPassword = await bcrypt.hash(input.password, 10)

    const newUser = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
      }
    })  

    const newAccount = await prisma.account.create({
      data: {
        userId: newUser?.id ?? 'Error in creating new User',
        type: 'credentials',
        provider: 'credentials',
        providerAccountId: '1',
        scope: hashedPassword //scope does get miss used here to store the hashed password
      }
    })
  }),
});
