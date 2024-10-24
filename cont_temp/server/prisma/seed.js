import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function formatToISO(dateString) {
  const date = new Date(dateString);
  return date.toISOString();
}

async function main() {
  // await prisma.roomReview.deleteMany();
  // await prisma.roomReserve.deleteMany();
  // await prisma.roomOption.deleteMany();
  // await prisma.optionItem.deleteMany();
  // await prisma.room.deleteMany();
  // await prisma.user.deleteMany();

  const purposes = ["회의", "연회", "전시"];
  const statuses = ["pending", "approved", "rejected", "cancelled"];

  const users = [];
  for (let i = 1; i <= 30; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        name: `사용자${i}`,
        mobile: `010-${Math.floor(Math.random() * 9000) + 1000}-${
          Math.floor(Math.random() * 9000) + 1000
        }`,
        role: "user",
        social_provider: "naver",
        social_id: `social-id-${i}`,
        authorization_code: `auth-code-${i}`,
        access_token: `access-token-${i}`,
      },
    });
    users.push(user);
  }

  const projector = await prisma.optionItem.create({
    data: {
      name: "빔 프로젝터",
      description: "좋은 빔 프로젝터입니다.",
      price: 100000,
      is_required: false,
    },
  });

  const microphone = await prisma.optionItem.create({
    data: {
      name: "마이크",
      description: "좋은 마이크입니다.",
      price: 10000,
      is_required: false,
    },
  });

  const laptop = await prisma.optionItem.create({
    data: {
      name: "노트북",
      description: "좋은 노트북입니다.",
      price: 50000,
      is_required: false,
    },
  });

  const table1 = await prisma.optionItem.create({
    data: {
      name: "테이블 배치",
      description: "회의형",
      is_required: true,
    },
  });

  const table2 = await prisma.optionItem.create({
    data: {
      name: "테이블 배치",
      description: "U자형",
      is_required: true,
    },
  });

  const table3 = await prisma.optionItem.create({
    data: {
      name: "테이블 배치",
      description: "원형",
      is_required: true,
    },
  });

  const rooms = [];
  for (let i = 1; i <= 10; i++) {
    const room = await prisma.room.create({
      data: {
        name: `호실 ${i}`,
        description: `${i}번 호실`,
        capacity: Math.floor(Math.random() * 50) + 10,
        min_time: 1,
        max_time: Math.floor(Math.random() * 10) + 2,
        price: Math.floor(Math.random() * 100000) + 50000,
        image_url: `https://placehold.co/600x400?text=Room ${i}`,
        RoomOption: {
          create: [
            { optionItem: { connect: { id: projector.id } } },
            { optionItem: { connect: { id: table1.id } } },
            { optionItem: { connect: { id: microphone.id } } },
          ],
        },
      },
    });
    rooms.push(room);
  }

  for (let i = 1; i <= 30; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const room = rooms[Math.floor(Math.random() * rooms.length)];

    const randomDay = Math.floor(Math.random() * 30) + 1;
    const randomStartHour = 9 + Math.floor(Math.random() * 9);
    const randomDuration =
      Math.floor(Math.random() * (18 - randomStartHour)) + 1;

    const startDate = `2024-10-${String(randomDay).padStart(2, "0")} ${String(
      randomStartHour
    ).padStart(2, "0")}:00`;
    const endDate = `2024-10-${String(randomDay).padStart(2, "0")} ${String(
      randomStartHour + randomDuration
    ).padStart(2, "0")}:00`;

    const formattedStartDate = formatToISO(startDate);
    const formattedEndDate = formatToISO(endDate);

    await prisma.roomReserve.create({
      data: {
        user_id: user.user_id,
        room_id: room.room_id,
        temp_password: Math.floor(Math.random() * 9000) + 1000,
        reserve_number: Math.floor(Math.random() * 25) + 3,
        start_time: formattedStartDate,
        end_time: formattedEndDate,
        purpose: purposes[Math.floor(Math.random() * purposes.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
      },
    });
  }

  for (let i = 1; i <= 50; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const room = rooms[Math.floor(Math.random() * rooms.length)];
    const rating = Math.floor(Math.random() * 5) + 1;
    await prisma.roomReview.create({
      data: {
        user_id: user.user_id,
        room_id: room.room_id,
        rating: rating,
        comment: `${rating}점 짜리 리뷰`,
        image_url: `https://placehold.co/600x400?text=Review ${i}`,
      },
    });
  }
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
