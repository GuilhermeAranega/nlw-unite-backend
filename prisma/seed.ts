import { prisma } from "../src/lib/prisma";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

async function seed() {
	const eventId = "f04e7906-8d72-40ac-9c42-f7f176724bc6";

	await prisma.event.deleteMany();

	await prisma.event.create({
		data: {
			id: eventId,
			title: "Evento do Guilherme",
			slug: "evento-do-guilherme",
			details: "Aprender a fazer um evento de sucesso!",
			maximumAttendees: 100,
		},
	});

	const attendeesToInsert: Prisma.AttendeeUncheckedCreateInput[] = [];

	for (let i = 0; i <= 100; i++) {
		attendeesToInsert.push({
			id: 10000 + i,
			name: faker.person.fullName(),
			email: faker.internet.email().toLowerCase(),
			eventId,
			createdAt: faker.date.recent({
				days: 30,
				refDate: dayjs().subtract(8, "days").toDate(),
			}),
			checkIn: faker.helpers.arrayElement<
				Prisma.CheckInUncheckedCreateNestedOneWithoutAttendeeInput | undefined
			>([
				undefined,
				{
					create: {
						createdAt: faker.date.recent({ days: 7 }),
					},
				},
			]),
		});
	}

	await Promise.all(
		attendeesToInsert.map((data) => {
			return prisma.attendee.create({
				data,
			});
		}),
	);
}

seed().then(() => {
	console.log("Database seed complete");
	prisma.$disconnect();
});
