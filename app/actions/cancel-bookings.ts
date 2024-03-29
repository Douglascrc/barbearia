"use server"

import { revalidatePath } from "next/cache";
import { db } from "../lib/prisma";

export const cancelBookings = async (bookingId: string) => {
    return await db.booking.delete({
        where:{
            id:bookingId,
        },
    })
}
revalidatePath("/")
revalidatePath("/bookings")