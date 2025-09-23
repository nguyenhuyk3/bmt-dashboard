export function timeToMinutes(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 60 + minutes + Math.floor(seconds / 60) + " phút";
}

export const formatToHHmm = (datetime) => {
    if (!datetime) return null;

    const date = new Date(datetime);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
};

export const formatShowtimeAdd20Minutes = (lastestShowtime) => {
    if (!lastestShowtime || lastestShowtime === "9:00") return "9:00"; // nếu null hoặc undefined thì mặc định 9:00

    const [hours, minutes] = lastestShowtime.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes + 20; // cộng thêm 20 phút

    // chuẩn hoá lại giờ và phút
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;

    return `${newHours.toString().padStart(2, "0")}:${newMinutes
        .toString()
        .padStart(2, "0")}`;
};

export const durationToMinutes = (duration) => {
    if (!duration) return 0;

    const [h, m, s] = duration.split(":").map(Number);
    
    return h * 60 + m + Math.floor(s / 60); // bỏ giây hoặc làm tròn
};


export const addMinutesToTime = (timeString, minutesToAdd) => {
    if (!timeString) return null;

    const [hours, minutes] = timeString.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes + minutesToAdd;

    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;

    return `${newHours.toString().padStart(2, "0")}:${newMinutes
        .toString()
        .padStart(2, "0")}`;
};
