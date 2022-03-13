/*eslint-disable */
// @ts-nocheck
import React from 'react';
import { useRouter } from 'next/router';
// Form status mapping
export const FormStatusMap = {
  INITIALIZED: 'INITIALIZED',
  SUBMITTING: 'SUBMITTING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
export const Validation = {
  NAME: {
    empty: "Name can't be empty",
  },
  EMAIL: {
    empty: "Email can't be empty",
    re: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    invalid: 'Please provide valid Email',
  },
  MESSAGE: {
    empty: "Message can't be empty",
  },
};
function encode(data) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default ({ formName, FormFieldsMap, initialFormData, FormCopies }) => {
  const router = useRouter();
  const [formStatus, setFormStatus] = React.useState(FormStatusMap.INITIALIZED);
  const isFormSubmitted = [FormStatusMap.SUCCESS, FormStatusMap.ERROR].includes(formStatus);

  const [formData, setFormData] = React.useState({
    ...initialFormData,
    page: router?.asPath && router.asPath !== '/' ? router.asPath : 'Home',
    errors: {},
  });

  React.useEffect(() => {
    const updatedForm = { ...formData };
    setFormData(updatedForm);
  }, [setFormData]);

  const handleChange = React.useCallback(
    e => {
      const value = (target => {
        if (e.target.type !== 'checkbox' || e.target.name !== 'tech_stack') return target.value;
        if (e.target.checked) {
          return [...formData[target.name], target.value];
        }
        return formData[target.name].filter(i => i !== target.value);
      })(e.target);

      setFormData({ ...formData, [e.target.name]: value });
    },
    [formData]
  );
  // Form validation, support specific field / whole form validation
  const validateForm = React.useCallback(
    e => {
      const { name, value } = e?.target || {};
      const { errors } = formData;
      const fields = name ? [name] : Object.values(FormFieldsMap);

      fields.forEach(field => {
        const { re, empty, invalid } = FormCopies.errors[field] || {};
        // autofill browser events doesn't trigger onchange events for security reasons, so we must handle it onBlur
        const isFieldArray = Array.isArray(formData[field]);
        if (isFieldArray ? !formData[field].length : !formData[field] && !value && empty) {
          errors[field] = empty;
          // if incoming value valid skip error
        } else if (re && !re.test(formData[field]) && !re.test(value)) {
          errors[field] = invalid;
        } else {
          errors[field] = '';
        }
      });

      setFormData(value => ({ ...value, errors }));
      return Boolean(!Object.values(errors).filter(Boolean).length);
    },
    [formData]
  );

  // onFocus clear field validation
  const clearFieldValidation = React.useCallback(
    e => {
      const { name = '' } = e.target;
      if (!formData.errors[name]) return;
      const errors = { ...formData.errors, [e.target.name]: '' };
      setFormData({ ...formData, errors });
    },
    [formData]
  );

  const submitForm = e => {
    e.preventDefault();

    if (!validateForm()) return;

    if (formName === 'contact-form' && window.lintrk) {
      window.lintrk('track', { conversion_id: 0 /*TODO: Need set right id*/ });
    }

    setFormStatus(FormStatusMap.SUBMITTING);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': formName, ...formData }),
    })
      .then(() => setFormStatus(FormStatusMap.SUCCESS))
      .catch(error => {
        console.error(`${formName}: ${error}`);
        setFormStatus(FormStatusMap.ERROR);
      });
  };

  return {
    isFormSubmitted,
    formData,
    formStatus,
    handleChange,
    validateForm,
    clearFieldValidation,
    submitForm,
    setFormData,
  };
};
