import AlertMessagesConstants from "../constants/alert-messages.constants.ts";

export class AlertsUtils {
    static resolveMessage(message: string): string {
        if (message in AlertMessagesConstants) return AlertMessagesConstants[message as keyof typeof AlertMessagesConstants];
        else return AlertMessagesConstants.TRY_AGAIN_LATER;
    }
}