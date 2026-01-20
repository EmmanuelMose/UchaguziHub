ALTER TABLE "elections" DROP CONSTRAINT "elections_created_by_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "candidates" ALTER COLUMN "candidate_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "candidates" ALTER COLUMN "candidate_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "candidates" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "candidates" ALTER COLUMN "election_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "candidates" ALTER COLUMN "position_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "complaints" ALTER COLUMN "complaint_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "complaints" ALTER COLUMN "complaint_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "complaints" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "elections" ALTER COLUMN "election_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "elections" ALTER COLUMN "election_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "elections" ALTER COLUMN "created_by" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "positions" ALTER COLUMN "position_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "positions" ALTER COLUMN "position_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "positions" ALTER COLUMN "election_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "system_users" ALTER COLUMN "system_user_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "system_users" ALTER COLUMN "system_user_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "system_user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "vote_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "vote_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "voter_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "candidate_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "election_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "position_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "elections" ADD CONSTRAINT "elections_created_by_users_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;