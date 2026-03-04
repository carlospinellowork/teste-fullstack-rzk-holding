import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

const CATEGORIES = [
  'Infraestrutura',
  'Salários',
  'Software',
  'Vendas',
  'Consultoria',
  'Marketing',
  'Aluguel',
];

async function main() {
  await prisma.payable.deleteMany();
  await prisma.receivable.deleteMany();

  for (let i = 0; i < 50; i++) {
    await prisma.payable.create({
      data: {
        provider: faker.company.name(),
        description: faker.commerce.productDescription(),
        amount: parseFloat(faker.commerce.price({ min: 100, max: 5000 })),
        due_date: faker.date.between({
          from: '2025-01-01',
          to: '2025-06-01',
        }),
        category: faker.helpers.arrayElement(CATEGORIES),
        status: faker.helpers.arrayElement(['PENDING', 'PAID']),
      },
    });
  }

  for (let i = 0; i < 50; i++) {
    await prisma.receivable.create({
      data: {
        client: faker.company.name(),
        description: faker.commerce.productDescription(),
        amount: parseFloat(faker.commerce.price({ min: 500, max: 10000 })),
        due_date: faker.date.between({
          from: '2025-01-01',
          to: '2025-06-01',
        }),
        category: faker.helpers.arrayElement(CATEGORIES),
        status: faker.helpers.arrayElement(['PENDING', 'RECEIVED']),
      },
    });
  }

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
