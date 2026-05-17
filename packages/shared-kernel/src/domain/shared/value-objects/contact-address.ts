import { err, ok, type Result } from "neverthrow";
import type { Email } from "./email.ts";
import type { PhoneNumber } from "./phone-number.ts";

export type PhoneContactKind =
    | "phone_call"
    | "sms"
    | "telegram"
    | "signal";

export type PhoneContactPlatform = {
    kind: PhoneContactKind;
    phoneNumber: PhoneNumber;
    label?: string;
    isPrimary?: boolean;
};

export type EmailContactPlatform = {
    kind: "email";
    email: Email;
    label?: string;
    isPrimary?: boolean;
};

export type WhatsappContactPlatform = {
    kind: "whatsapp";
    phoneNumber: PhoneNumber;
    label?: string;
    isPrimary?: boolean;
};

export type ContactPlatform =
    | PhoneContactPlatform
    | EmailContactPlatform
    | WhatsappContactPlatform;

export type ContactAddressError =
    | { kind: "no_platforms" }
    | { kind: "duplicate_email" };

export class ContactAddress {
    readonly #platforms: readonly ContactPlatform[];

    private constructor(platforms: readonly ContactPlatform[]) {
        this.#platforms = [...platforms];
    }

    static create(platforms: ContactPlatform[]): Result<ContactAddress, ContactAddressError> {
        if (platforms.length === 0) return err({ kind: "no_platforms" });

        const emails = platforms.filter(p => p.kind === "email");
        if (emails.length > 1) return err({ kind: "duplicate_email" });

        return ok(new ContactAddress(platforms));
    }

    get platforms(): readonly ContactPlatform[] {
        return this.#platforms;
    }

    get email(): Email | undefined {
        return this.#findEmail()?.email;
    }

    get emailPlatform(): EmailContactPlatform | undefined {
        return this.#findEmail();
    }

    get whatsapp(): PhoneNumber | undefined {
        return this.#findWhatsapp()?.phoneNumber;
    }

    get whatsappPlatform(): WhatsappContactPlatform | undefined {
        return this.#findWhatsapp();
    }

    phonesByKind(kind: PhoneContactKind): readonly PhoneContactPlatform[] {
        return this.#platforms.filter(
            (p): p is PhoneContactPlatform => p.kind === kind
        );
    }

    get primary(): ContactPlatform | undefined {
        return this.#platforms.find(p => p.isPrimary);
    }

    #findEmail(): EmailContactPlatform | undefined {
        return this.#platforms.find(
            (p): p is EmailContactPlatform => p.kind === "email"
        );
    }

    #findWhatsapp(): WhatsappContactPlatform | undefined {
        return this.#platforms.find(
            (p): p is WhatsappContactPlatform => p.kind === "whatsapp"
        );
    }
}
