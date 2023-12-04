import RelatedType from '../related-type.type';

export default class MetaScalar {
  min: number | null;

  max: number | null;

  multiline: boolean;

  mask: string | null;

  placeholder: string | null;

  related_types: RelatedType[] | null;
}
