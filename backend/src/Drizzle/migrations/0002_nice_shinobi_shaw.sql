ALTER TABLE "users" ADD COLUMN "reset_code" varchar(6);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "reset_code_expires_at" timestamp;