export default class GeneralHelper {

    public static calculateAge(birthday: Date): number {
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    public static convertToBoolean(input: string): boolean | undefined {
        try {
            return JSON.parse(input);
        } catch (e) {
            return undefined;
        }
    }

    public static convertToNumber(input: string): number | undefined {
        try {
            return JSON.parse(input);
        } catch (e) {
            return undefined;
        }
    }


}
