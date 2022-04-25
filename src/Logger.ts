import { bold, gray, green, red, reset } from "colors";

export default class Logger {

    static success(message: string) : void {
        console.log(green("√ ") + bold("Success ") + gray("» ") + reset(message));
    }

    static error(message: string) : void {
        console.log(red("x ") + bold("Error ") + gray("» ") + reset(message));
    }
}