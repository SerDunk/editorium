import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  users: defineTable({
    userId: v.string(), //clerkId
    email: v.string(),
    name: v.string(),
    isPro: v.boolean(),
    proSince: v.optional(v.number()),
    lemonSqueezyCustomerId: v.optional(v.string()),
    lemonSqueezyOrderId: v.optional(v.string()),
  }).index("by_user_Id", ["userId"]),

  codeExecutions: defineTable({
    userId: v.string(),
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  }),

  snippets: defineTable({
    userId: v.string(),
    title: v.string(),
    language: v.string(),
    code: v.string(),
    userName: v.string(), //store user's name for easy access
  }).index("by_user_Id", ["userId"]),

  snippetComments: defineTable({
    userId: v.string(),
    snippetId: v.id("snippets"),
    userName: v.string(),
    content: v.string(),
  }).index("by_snippet_Id", ["snippetId"]),

  stars: defineTable({
    userId: v.id("users"),
    snippetId: v.id("snippets"),
  })
    .index("by_snippet_Id", ["snippetId"])
    .index("by_user_Id", ["userId"])
    .index("by_user_and_snippet_Id", ["userId", "snippetId"]),
});
