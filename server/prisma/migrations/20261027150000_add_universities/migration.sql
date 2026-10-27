-- Add optional university data so existing users remain valid.
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "UniversityDomain" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    CONSTRAINT "UniversityDomain_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "User" ADD COLUMN "universityId" TEXT;
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");
CREATE UNIQUE INDEX "UniversityDomain_domain_key" ON "UniversityDomain"("domain");
CREATE INDEX "UniversityDomain_universityId_idx" ON "UniversityDomain"("universityId");
ALTER TABLE "User" ADD CONSTRAINT "User_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "UniversityDomain" ADD CONSTRAINT "UniversityDomain_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;
