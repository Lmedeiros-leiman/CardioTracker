export class BirthDate {

    private constructor(
        public readonly Date: Date,
    ) { }

    equals(other: BirthDate): boolean {
        throw new Error("Not implemented");
        return true;
    }
}