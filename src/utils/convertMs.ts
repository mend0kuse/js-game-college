export function msToHMS(ms?: number) {
    if (!ms) {
        return "00:00:00"
    }
    
    let seconds = ms / 1000;
    const hours = seconds / 3600;
    seconds = seconds % 3600;
    const minutes = seconds / 60;
    seconds = seconds % 60;
    return ("00" + hours.toFixed(0)).slice(-2) + ":" + ("00" + minutes.toFixed(0)).slice(-2) + ":" + ("00" + seconds.toFixed(0)).slice(-2)
}