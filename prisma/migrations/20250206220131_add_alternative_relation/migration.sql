-- AlterTable
ALTER TABLE "Alternative" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
