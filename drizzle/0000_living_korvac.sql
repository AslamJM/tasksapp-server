CREATE TYPE "public"."role" AS ENUM('ADMIN', 'EMPLOYEE');--> statement-breakpoint
CREATE TABLE "sessions" (
	"cuid" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"expired_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"cuid" text PRIMARY KEY NOT NULL,
	"name" varchar(200),
	"email" varchar(200),
	"password" varchar(255),
	"role" "role",
	"created_at" timestamp DEFAULT now(),
	"is_deleted" boolean DEFAULT false
);
