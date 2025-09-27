-- CreateTable
CREATE TABLE "public"."waitlist_entries" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resendContactId" TEXT,
    "resendAudienceId" TEXT,
    "emailsSent" INTEGER NOT NULL DEFAULT 0,
    "lastEmailSent" TIMESTAMP(3),
    "opened" BOOLEAN NOT NULL DEFAULT false,
    "clicked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "waitlist_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_entries_email_key" ON "public"."waitlist_entries"("email");
