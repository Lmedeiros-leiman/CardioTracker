export type AddressProps = {
  street: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export class Address {
  private constructor(public readonly props: Readonly<AddressProps>) {}

  static create(props: AddressProps): Address {
    return new Address({
      street: props.street.trim(),
      number: props.number?.trim(),
      complement: props.complement?.trim(),
      neighborhood: props.neighborhood?.trim(),
      city: props.city.trim(),
      state: props.state.trim(),
      postalCode: props.postalCode.trim(),
      country: props.country.trim(),
    });
  }

  equals(other: Address): boolean {
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}
