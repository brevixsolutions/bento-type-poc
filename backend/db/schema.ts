import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  profilePic: text("profile_pic"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  title: varchar("title", { length: 255 }).notNull(),
  about: text("about"),
  themeId: integer("theme_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const portfolioSections = pgTable("portfolio_sections", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").references(() => portfolios.id, {
    onDelete: "cascade",
  }),
  sectionTitle: varchar("section_title", { length: 255 }).notNull(),
  sectionType: varchar("section_type", { length: 50 }).notNull(),
  position: integer("position").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  sectionId: integer("section_id").references(() => portfolioSections.id, {
    onDelete: "cascade",
  }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").default(""),
  mediaUrl: text("media_url").default(""),
  externalLink: text("external_link").default(""),
  position: integer("position").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  platform: varchar("platform", { length: 50 }).notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const themes = pgTable("themes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  backgroundColor: varchar("background_color", { length: 20 }), // Default should be handled in DB migration
  textColor: varchar("text_color", { length: 20 }), // Default should be handled in DB migration
  fontFamily: varchar("font_family", { length: 50 }), // Default should be handled in DB migration
  createdAt: timestamp("created_at").defaultNow(),
});
