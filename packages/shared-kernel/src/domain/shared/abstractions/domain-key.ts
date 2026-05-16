export type DomainKey<TBrand extends string> = string & {
  readonly __domainKeyBrand: TBrand;
};

export function domainKey<TBrand extends string>(value: string): DomainKey<TBrand> {
  const normalized = value.trim();

  if (!normalized) {
    throw new Error("Domain key cannot be empty");
  }

  return normalized as DomainKey<TBrand>;
}
