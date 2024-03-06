-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "phoneNumber" TEXT,
    "displayName" TEXT,
    "photoURL" TEXT,
    "providerId" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL,
    "tenantId" TEXT,
    "refreshToken" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_uid_key" ON "Users"("uid");
