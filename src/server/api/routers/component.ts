import { components } from "@/server/db/schema";
import { count, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const componentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        type: z.string(),
        data: z.record(z.string(), z.any()),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const component = await ctx.db
        .insert(components)
        .values({
          type: input.type,
          data: input.data,
          createdById: ctx.session.user.id,
          name: input.name,
        })
        .returning();
      return {
        id: component?.[0]?.id,
      };
    }),
  list: protectedProcedure
    .input(
      z.object({
        page: z.number().optional(),
        pageSize: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const list = await ctx.db.query.components.findMany({
        where: eq(components.createdById, ctx.session.user.id),
        orderBy: desc(components.createdAt),
        limit: input.pageSize,
        offset: ((input.page || 1) - 1) * (input.pageSize || 10),
      });

      const total = await ctx.db
        .select({ count: count() })
        .from(components)
        .where(eq(components.createdById, ctx.session.user.id));

      return { list: list, totalCount: total };
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(components).where(eq(components.id, input.id));
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.record(z.string(), z.any()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(components)
        .set(input.data)
        .where(eq(components.id, input.id));
    }),
});
