import { prisma } from "../src/lib/prisma";

async function seed() {
	await prisma.event.create({
		data: {
			id: "3a5a9755-3f2a-48d4-a090-413eab9f2daf",
			title: "Evento do Guilherme",
			slug: "evento-do-guilherme",
			details: "Um evento para unir a comunidade de tecnologia",
			maximumAttendees: 100,
		},
	});
}

seed().then(() => {
	console.log("Seed complete");
	prisma.$disconnect();
});
