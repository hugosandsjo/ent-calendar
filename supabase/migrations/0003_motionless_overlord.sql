ALTER TABLE "entries" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "month" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "rating" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "author" text;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "director" text;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "writer" text;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "publisher" text;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "developer" text;