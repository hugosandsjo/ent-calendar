ALTER TABLE "entries" ALTER COLUMN "month" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "user_id" SET DATA TYPE uuid USING user_id::uuid;