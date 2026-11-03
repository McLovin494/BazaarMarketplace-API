import {pgTable} from "drizzle-orm/pg-core/table";
import {text} from "drizzle-orm/pg-core/columns/text";
import {pgEnum} from "drizzle-orm/pg-core/columns/enum";
import {integer} from "drizzle-orm/pg-core/columns/integer";
import {usersTable} from "./userSchema.js";
import {varchar} from "drizzle-orm/pg-core/columns/varchar";

export const roleEnum = pgEnum("user_role", ["customer", "seller"])
export const customersTable = pgTable("customers", {
    userId: integer().primaryKey().references(() => usersTable.id),
    phone: integer(),
    profilePic: text(),
    address: varchar()
})