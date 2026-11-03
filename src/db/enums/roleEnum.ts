import {pgEnum} from "drizzle-orm/pg-core/columns/enum";

export const rolesEnum = pgEnum('roles', ['guest', 'user', 'admin']);