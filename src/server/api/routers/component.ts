import { components, layouts } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import Parser from "rss-parser";
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
      if (input.type === "rss") {
        const res = await new Parser().parseURL(input.data.url);
        if (!res.title) {
          throw new Error("Invalid RSS feed");
        }
        input.data = {
          ...input.data,
          ...res,
        };
      }
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
      z
        .object({
          filterNoLayout: z.boolean().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      let list = await ctx.db.query.components.findMany({
        where: eq(components.createdById, ctx.session.user.id),
        orderBy: desc(components.createdAt),
      });
      if (input?.filterNoLayout) {
        const layoutList = await ctx.db.query.layouts.findMany({
          where: eq(layouts.createdById, ctx.session.user.id),
        });
        list = list.filter((component) => {
          return !layoutList.some((layout) => layout.i === component.id);
        });
      }
      return list;
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
