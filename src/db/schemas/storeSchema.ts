import {pgTable} from "drizzle-orm/pg-core/table";
import {integer} from "drizzle-orm/pg-core/columns/integer";
import {usersTable} from "./userSchema.js";
import {varchar} from "drizzle-orm/pg-core/columns/varchar";
import {boolean} from "drizzle-orm/pg-core/columns/boolean";

export const storeTable=pgTable("storeTable",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    sellerId:integer().notNull().references(()=>usersTable.id),
    storeName:varchar(),
    description:varchar(),
    location:varchar(),
    deleted:boolean().default(false)
})