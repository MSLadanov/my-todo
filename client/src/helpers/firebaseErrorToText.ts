import { FirebaseError } from "firebase/app";
function firebaseErrorToText(err: FirebaseError | null): string {
    if (!err || !err.message) {
        return "Unknown error";
    }
    const match = err.message.match(/\(([^)]+)\)/);
    if (!match || match.length < 2) {
        return "Unknown error";
    }
    const errorCode = match[1];
    const formattedMessage = errorCode.replace('auth/', '').replace('-', ' ');
    const finalMessage = formattedMessage.charAt(0).toUpperCase() + formattedMessage.slice(1);
    return finalMessage;
}
export default firebaseErrorToText;
