const Utils = {
    getFormattedNow() {
        const date = new Date();
        return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())} ${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}:${this.padZero(date.getSeconds())}`;
    },
    padZero(str) {
        return str.toString().padStart(2, '0');
    },
}

export default Utils