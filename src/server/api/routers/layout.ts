import { layouts } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const layoutRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        i: z.string(),
        w: z.number(),
        h: z.number(),
        x: z.number(),
        y: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const layout = await ctx.db
        .insert(layouts)
        .values({
          createdById: ctx.session.user.id,
          i: input.i,
          w: input.w,
          h: input.h,
          x: input.x,
          y: input.y,
        })
        .returning();
      return {
        id: layout?.[0]?.id,
      };
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(layouts).where(eq(layouts.id, input.id));
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const list = await ctx.db
      .select()
      .from(layouts)
      .where(eq(layouts.createdById, ctx.session.user.id));
    return list;
  }),
});
