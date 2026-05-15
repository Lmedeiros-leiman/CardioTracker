interface PatientNameProps {
    fullName: string;
    preferredName?: string;
}

export class PatientName {

    private constructor(
        public readonly fullName: string,
        public readonly preferredName?: string,
    ) { }

    static create(input: {
        fullName: string;
        preferredName?: string;
    }): PatientNameProps {
        const fullName = input.fullName.trim();
        const preferredName = input.preferredName?.trim();

        if (fullName.length < 2) {
            throw new Error("Patient full name is required");
        }

        return {
            fullName,
            preferredName,
        };
    }

    equals(other: PatientNameProps): boolean {
        return (
            this.fullName === other.fullName &&
            this.preferredName === other.preferredName
        );
    }
}