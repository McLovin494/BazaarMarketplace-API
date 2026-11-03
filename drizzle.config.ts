import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: ['./src/db/schemas/userSchema.ts',"./src/db/schemas/customerSchema.ts","./src/db/schemas/sellerSchema.ts"],
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
