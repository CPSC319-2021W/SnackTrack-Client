import React from 'react';

import InputField from '../InputField';
import { useField } from 'formik';

const TextInputLiveFeedback = ({ label, id, small, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <InputField
      id={id}
      label={label}
      error={meta.error}
      small={small}
      {...field}
    />
  );
};

export default TextInputLiveFeedback;