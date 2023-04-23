export default function truncateString(str: string, maxLength = 50): string {
    if (str.length > maxLength) {
        str = str.slice(0, maxLength - 3) + "...";
    }
    return str;
}
