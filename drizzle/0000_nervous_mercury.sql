DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('admin', 'bronze', 'silver', 'gold');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "theia_user" (
	"id" varchar(255) PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" "user_role" DEFAULT 'bronze' NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"password" text NOT NULL,
	"second_factor_secret" text,
	"image" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "theia_user_name_unique" UNIQUE("name"),
	CONSTRAINT "theia_user_email_unique" UNIQUE("email")
);
