import {pgTable} from "drizzle-orm/pg-core/table";
import {integer} from "drizzle-orm/pg-core/columns/integer";
import {varchar} from "drizzle-orm/pg-core/columns/varchar";
import {usersTable} from "./userSchema.js";
import {text} from "drizzle-orm/pg-core/columns/text";

export const sellersTable=pgTable("sellers",{
   userId:integer().primaryKey().references(()=>usersTable.id),
    storeName:varchar(),
    description:text()
})