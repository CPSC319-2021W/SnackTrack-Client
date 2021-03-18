import { React, useEffect, useState } from 'react';

import InputField from '../InputField';
import { useField } from 'formik';

const TextInputLiveFeedback = ({ label, id, small, ...props }) => {
  const [field, meta] = useField(props);
  const [touched, setIsTouched] = useState(false);

  useEffect(() => {
    if (!touched && meta.value) {
      setIsTouched(true);
    }
  }, [meta]);

  return (
    <InputField
      id={id}
      label={label}
      error={touched ? meta.error : null}
      small={small}
      {...field}
    />
  );
};

export default TextInputLiveFeedback;
