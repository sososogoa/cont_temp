import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.roomReview.deleteMany();
  await prisma.roomReserve.deleteMany();
  await prisma.optionItem.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();
  await prisma.fileStorage.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "테스트 유저1",
      phone_number: "010-1234-5678",
      role: "user",
      social_provider: "naver",
      social_id: "123456",
      authorization_code: "auth-code-123",
      access_token: "access-token-123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "테스트 관리자1",
      phone_number: "010-9876-5432",
      role: "admin",
      social_provider: "naver",
      social_id: "654321",
      authorization_code: "auth-code-654",
      access_token: "access-token-654",
    },
  });

  const projector = await prisma.optionItem.create({
    data: {
      name: "빔 프로젝터 이름",
      description: "빔 프로젝터 설명",
      price: 100000,
      is_required: false,
    },
  });

  const microphone = await prisma.optionItem.create({
    data: {
      name: "마이크 이름",
      description: "무선 마이크 설명",
      price: 10000,
      is_required: false,
    },
  });

  const laptop = await prisma.optionItem.create({
    data: {
      name: "노트북 이름",
      description: "노트북 설명",
      price: 50000,
      is_required: false,
    },
  });

  const table1 = await prisma.optionItem.create({
    data: {
      name: "테이블 배치 1 이름",
      description: "테이블 1 배치 설명",
      is_required: true,
    },
  });

  const table2 = await prisma.optionItem.create({
    data: {
      name: "테이블 배치 2 이름",
      description: "테이블 2 배치 설명",
      is_required: true,
    },
  });

  const table3 = await prisma.optionItem.create({
    data: {
      name: "테이블 배치 3 이름",
      description: "테이블 3 배치 설명",
      is_required: true,
    },
  });

  const room1 = await prisma.room.create({
    data: {
      name: "A 회의실 이름",
      description: "A 회의실 설명",
      capacity: 15,
      min_time: 2,
      max_time: 8,
      price: 70000,
      image_url: "https://placehold.co/600x400",
      RoomOption: {
        create: [
          {
            optionItem: {
              connect: { id: projector.id },
            },
          },
          {
            optionItem: {
              connect: { id: table1.id },
            },
          },
        ],
      },
    },
  });

  const room2 = await prisma.room.create({
    data: {
      name: "B 회의실 이름",
      description: "B 회의실 설명",
      capacity: 30,
      min_time: 4,
      max_time: 9,
      price: 150000,
      image_url: "https://placehold.co/600x400",
      RoomOption: {
        create: [
          {
            optionItem: {
              connect: { id: laptop.id },
            },
          },
          {
            optionItem: {
              connect: { id: table2.id },
            },
          },
        ],
      },
    },
  });

  const room3 = await prisma.room.create({
    data: {
      name: "C 회의실 이름",
      description: "C 회의실 설명",
      capacity: 100,
      min_time: 12,
      max_time: 24,
      price: 1500000,
      image_url: "https://placehold.co/600x400",
      RoomOption: {
        create: [
          {
            optionItem: {
              connect: { id: microphone.id },
            },
          },
          {
            optionItem: {
              connect: { id: laptop.id },
            },
          },
          {
            optionItem: {
              connect: { id: table1.id },
            },
          },
        ],
      },
    },
  });

  const reservation1 = await prisma.roomReserve.create({
    data: {
      user_id: user1.user_id,
      room_id: room1.room_id,
      temp_password: 1234,
      start_time: new Date("2024-10-25T10:00:00"),
      end_time: new Date("2024-10-25T12:00:00"),
      purpose: "팀 회의",
      status: "pending",
    },
  });

  await prisma.roomReview.create({
    data: {
      user_id: user1.user_id,
      room_id: room1.room_id,
      rating: 3,
      comment: "보통이에요 3점",
      image_url: "https://placehold.co/600x400",
    },
  });

  await prisma.roomReview.create({
    data: {
      user_id: user1.user_id,
      room_id: room2.room_id,
      rating: 1,
      comment: "별로에요 1점",
      image_url: "https://placehold.co/600x400",
    },
  });

  await prisma.roomReview.create({
    data: {
      user_id: user1.user_id,
      room_id: room3.room_id,
      rating: 5,
      comment: "아주 좋아요 5점",
      image_url: "https://placehold.co/600x400",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
