CREATE TYPE "user_role" AS ENUM('customer', 'seller');--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"userId" integer PRIMARY KEY,
	"phone" integer,
	"profilePic" text,
	"address" varchar
);
--> statement-breakpoint
CREATE TABLE "sellers" (
	"userId" integer PRIMARY KEY,
	"storeName" varchar,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "sellers" ADD CONSTRAINT "sellers_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id");