CREATE TYPE "category" AS ENUM(
    'Beauty',
    'Health',
    'Electronics',
    'Apparel',
    'Home',
    'Others'
);
--> statement-breakpoint

CREATE TABLE "products" (
                            "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                            "storeId" integer NOT NULL,
                            "productName" varchar NOT NULL,
                            "price" numeric(10,2) NOT NULL,
                            "category" "category" NOT NULL,
                            "description" varchar,
                            "shipping" varchar,
                            "delivery" varchar,
                            "returnPolicy" varchar
);
--> statement-breakpoint

ALTER TABLE "products"
    ADD CONSTRAINT "products_storeId_storeTable_id_fkey"
        FOREIGN KEY ("storeId") REFERENCES "storeTable"("id");