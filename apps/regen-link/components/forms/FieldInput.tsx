'use client';

import { Input } from '@heroui/react';
import { type FieldProps, useField } from 'formik';

/**
 * A HeroUI Input element that binds itself to a Formik Field component.
 * E.g. <Field name="name" label="Name" as={TextInput} />.
 * Props like 'classname' and 'classnames' will override the default styling.
 * @param props The that were passed to the Field component.
 */
const FieldInput = (props: FieldProps['field']) => {
  const [field] = useField(props);
  return (
    <Input
      {...field}
      className="w-full"
      classNames={{ inputWrapper: '!min-h-14', errorMessage: 'text-left', input: 'base-text' }}
      {...props}
    />
  );
};

export default FieldInput;
