import React from 'react';
import { SwitchTransition } from 'react-transition-group';
import { ComponentProps } from '@uniformdev/canvas-react';

import useForm, { FormStatusMap, Validation } from '@/hooks/useForm';
import AnimatedTransition from '@/components/atoms/AnimatedTransition/AnimatedTransition';
import HiddenInput from '@/components/atoms/HiddenInput/HiddenInput';
import Input from '@/components/atoms/Input';
import ActionButton from '@/components/atoms/ActionButton';

export type ContactFormProps = ComponentProps<{
  successfulSubmitText?: string;
  errorSubmitText?: string;
  submitButtonText?: string;
}>;

const ContactForm = ({ successfulSubmitText, errorSubmitText, submitButtonText }: ContactFormProps) => {
  const formName = 'contact-form';
  // Form fields mapping
  const FormFieldsMap = React.useMemo(
    () => ({
      NAME: 'name',
      EMAIL: 'email',
      MESSAGE: 'message',
    }),
    []
  );

  const FormCopies = React.useMemo(
    () => ({
      [FormStatusMap.SUCCESS]: {
        title: successfulSubmitText,
      },
      [FormStatusMap.ERROR]: {
        title: errorSubmitText,
      },
      errors: {
        [FormFieldsMap.EMAIL]: Validation.EMAIL,
        [FormFieldsMap.MESSAGE]: Validation.MESSAGE,
      },
    }),
    []
  );

  const initialFormData = {
    [FormFieldsMap.EMAIL]: '',
    [FormFieldsMap.MESSAGE]: '',
  };

  const { isFormSubmitted, formData, formStatus, handleChange, validateForm, clearFieldValidation, submitForm } =
    useForm({
      formName,
      FormFieldsMap,
      initialFormData,
      FormCopies,
    });
  return (
    <div className="w-full pt-10 md:pt-0 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
      <SwitchTransition mode="out-in">
        <AnimatedTransition
          key={isFormSubmitted ? 'message' : 'form'}
          timeout={500}
          animation={
            isFormSubmitted ? { enter: 'bounceInRight', exit: 'bounceOutRight' } : { enter: '', exit: 'bounceOutRight' }
          }
          unmountOnExit
          mountOnEnter
        >
          {isFormSubmitted ? (
            <FormTitle {...FormCopies[formStatus]} />
          ) : (
            <>
              <FormTitle {...FormCopies[FormStatusMap.INITIALIZED]} />
              <form
                id={formName}
                name={formName}
                netlify-honeypot="bot-field"
                data-netlify="true"
                method="POST"
                className="mt-6 grid grid-cols-1 row-gap-6 sm:row-gap-3 col-gap-8"
              >
                <HiddenInput formName={formName} />
                <Input
                  id="name"
                  name={FormFieldsMap.NAME}
                  label="Your name"
                  onChange={handleChange}
                  inputClassName="text-base"
                />
                <Input
                  id="email"
                  name={FormFieldsMap.EMAIL}
                  type="email"
                  label="Email Address"
                  onChange={handleChange}
                  onBlur={validateForm}
                  onFocus={clearFieldValidation}
                  errorMessage={formData.errors[FormFieldsMap.EMAIL]}
                  inputClassName="text-base"
                  className="mt-6"
                />
                <Input
                  id="message"
                  name={FormFieldsMap.MESSAGE}
                  label="Message"
                  onChange={handleChange}
                  onBlur={validateForm}
                  onFocus={clearFieldValidation}
                  errorMessage={formData.errors[FormFieldsMap.MESSAGE]}
                  inputClassName="text-base h-48"
                  rows={1}
                  className="mt-6"
                />
                <ActionButton
                  type="submit"
                  className="border-4 border-orange_border mt-5 h-12 w-40 lg:mb-32"
                  onClick={submitForm}
                >
                  <span className="dark:text-white text-black font-bold text-lg">
                    {formStatus === FormStatusMap.SUBMITTING ? 'Submitting' : submitButtonText}
                  </span>
                </ActionButton>
              </form>
            </>
          )}
        </AnimatedTransition>
      </SwitchTransition>
    </div>
  );
};

const FormTitle = ({ title }: { title?: string }) =>
  title ? (
    <p
      dangerouslySetInnerHTML={{ __html: title }}
      className="dark:text-white text-base font-medium text-black text-center md:text-left"
    />
  ) : null;

export default ContactForm;
