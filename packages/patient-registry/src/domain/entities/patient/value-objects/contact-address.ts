import type { Address, Email, PhoneNumber } from "@cardio-tracker/shared-kernel";

export type ContactAddressProps = {
  email?: Email;
  phoneNumbers: readonly PhoneNumber[];
  address?: Address;
};

export class ContactAddress {
  private constructor(public readonly props: Readonly<ContactAddressProps>) {}

  static create(props: ContactAddressProps): ContactAddress {
    return new ContactAddress({
      ...props,
      phoneNumbers: [...props.phoneNumbers],
    });
  }

  get email(): Email | undefined {
    return this.props.email;
  }

  get phoneNumbers(): readonly PhoneNumber[] {
    return this.props.phoneNumbers;
  }

  get address(): Address | undefined {
    return this.props.address;
  }
}
