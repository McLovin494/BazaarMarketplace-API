import {pgTable} from "drizzle-orm/pg-core/table";
import {integer} from "drizzle-orm/pg-core/columns/integer";
import {productsTable} from "./productSchema.js";

export const inventoryTable=pgTable("inventory",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    productId:integer().references(()=>productsTable.id).notNull(),
    quantity:integer().notNull()
})