CREATE TABLE "candidates" (
	"candidate_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"election_id" uuid NOT NULL,
	"position_id" uuid NOT NULL,
	"faculty" varchar(100),
	"manifesto" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "elections" (
	"election_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"status" varchar(30) DEFAULT 'Upcoming' NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "positions" (
	"position_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"election_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "system_users" (
	"system_user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(150) NOT NULL,
	"email" varchar(150) NOT NULL,
	"registration_number" varchar(50),
	"role" varchar(30) NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "system_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"system_user_id" uuid NOT NULL,
	"email" varchar(150) NOT NULL,
	"role" varchar(30) NOT NULL,
	"password_hash" text NOT NULL,
	"verification_code" varchar(10),
	"is_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"vote_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"voter_id" uuid NOT NULL,
	"candidate_id" uuid NOT NULL,
	"election_id" uuid NOT NULL,
	"position_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_election_id_elections_election_id_fk" FOREIGN KEY ("election_id") REFERENCES "public"."elections"("election_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_position_id_positions_position_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("position_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "elections" ADD CONSTRAINT "elections_created_by_users_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "positions" ADD CONSTRAINT "positions_election_id_elections_election_id_fk" FOREIGN KEY ("election_id") REFERENCES "public"."elections"("election_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_system_user_id_system_users_system_user_id_fk" FOREIGN KEY ("system_user_id") REFERENCES "public"."system_users"("system_user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_voter_id_users_user_id_fk" FOREIGN KEY ("voter_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_candidate_id_candidates_candidate_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("candidate_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_election_id_elections_election_id_fk" FOREIGN KEY ("election_id") REFERENCES "public"."elections"("election_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_position_id_positions_position_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("position_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_vote_per_position" ON "votes" USING btree ("voter_id","election_id","position_id");--> statement-breakpoint
CREATE INDEX "idx_votes_voter" ON "votes" USING btree ("voter_id");--> statement-breakpoint
CREATE INDEX "idx_votes_candidate" ON "votes" USING btree ("candidate_id");