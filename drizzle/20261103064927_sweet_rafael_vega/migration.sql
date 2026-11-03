CREATE TABLE "storeTable" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "storeTable_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sellerId" integer NOT NULL,
	"storeName" varchar,
	"description" varchar,
	"location" varchar
);
--> statement-breakpoint
ALTER TABLE "storeTable" ADD CONSTRAINT "storeTable_sellerId_users_id_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id");