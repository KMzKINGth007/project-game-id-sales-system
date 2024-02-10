const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  await prisma.$executeRawUnsafe('DROP Database project-sell-id-game')
  await prisma.$executeRawUnsafe('CREATE Database project-sell-id-game')
}
console.log('Reset DB')
run()