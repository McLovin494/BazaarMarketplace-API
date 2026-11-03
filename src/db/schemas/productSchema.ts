import {pgTable} from "drizzle-orm/pg-core/table";
import {integer} from "drizzle-orm/pg-core/columns/integer";
import {varchar} from "drizzle-orm/pg-core/columns/varchar";
import {decimal} from "drizzle-orm/pg-core/columns/numeric";
import {categoryEnum} from "../enums/categoryEnum.js";
import {storeTable} from "./storeSchema.js";


export const productsTable=pgTable("products",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    storeId:integer().references(()=>storeTable.id).notNull(),
    productName:varchar().notNull(),
    price:decimal({
        precision:10,
        scale:2
    }).notNull(),
    category: categoryEnum("category").notNull(),
    description:varchar(),
    shipping:varchar(),
    delivery:varchar(),
    returnPolicy:varchar(),

})