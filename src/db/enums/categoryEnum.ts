import {pgEnum} from "drizzle-orm/pg-core";

export const categoryEnum=pgEnum("category",["Beauty","Health","Electronics","Apparel","Home","Others"])