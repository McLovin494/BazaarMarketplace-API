import {pgTable} from "drizzle-orm/pg-core/table";
import {integer} from "drizzle-orm/pg-core/columns/integer";
import {varchar} from "drizzle-orm/pg-core/columns/varchar";

export const usersTable=pgTable("users",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    name:varchar({length:255}).notNull(),
    email:varchar({length:255}).unique().notNull(),
    password:varchar({length:255}).unique().notNull(),
})