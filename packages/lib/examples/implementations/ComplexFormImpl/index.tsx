import { useFormHandler } from '@hooks';
import { yupSchema, FormErrorsException } from '@utils';
import { Component, createSignal } from 'solid-js';
import * as yup from 'yup';

type Schema = {
  name: string;
  age: number;
  contact: {
    email: string;
    phone: string;
  };
  hasHouse: boolean;
  houseAddress: string | undefined;
};

const schema: yup.SchemaOf<Schema> = yup.object({
  name: yup.string().required(),
  age: yup.number().required().typeError('Age is required'),
  contact: yup.object().shape({
    email: yup.string().required().email(),
    phone: yup.string().required(),
  }),
  hasHouse: yup
    .boolean()
    .required()
    .transform((value) => Boolean(value))
    .default(false),
  houseAddress: yup.string().optional().when('hasHouse', { is: true, then: yup.string().required() }),
});

export const ComplexFormImpl: Component = () => {
  const formHandler = useFormHandler<Schema>(yupSchema(schema));
  const [error, setError] = createSignal('');
  const { formData } = formHandler;

  const onInput = (event: Event) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    formHandler.setFieldValue(name, value);
  };

  const fillForm = () => {
    formHandler.fillForm({
      name: 'John',
      age: 22,
      hasHouse: true,
      houseAddress: 'Street 123 #45',
      contact: { email: 'test@mail.com', phone: '311 454 43 23' },
    });
  };

  const resetForm = () => {
    formHandler.resetForm();
  };

  const submit = async () => {
    try {
      setError('');
      await formHandler.validateForm();
      alert(`Data submitted \n ${JSON.stringify(formData())}`);
      formHandler.resetForm();
    } catch (error) {
      if (error instanceof FormErrorsException) {
        setError(
          JSON.stringify(
            error.validationResult.map((item) => item.errorMessage),
            null,
            2
          )
        );
      }
    }
  };

  return (
    <form>
      <h3>Complex Form Implementation</h3>
      <div>
        <label>Name</label>
        <br />
        <input name="name" onInput={onInput} value={formData().name}></input>
        <br />
        <small style="color: red;">{formHandler.getFieldError('name')}</small>
      </div>
      <div>
        <label>Age</label>
        <br />
        <input name="age" onInput={onInput} value={formData().age}></input>
        <br />
        <small style="color: red;">{formHandler.getFieldError('age')}</small>
      </div>
      <br />
      <fieldset>
        <legend>Contact</legend>
        <div>
          <label>Email</label>
          <br />
          <input
            data-testid="contact.email"
            name="contact.email"
            onInput={onInput}
            value={formData().contact.email}
          ></input>
          <br />
          <small style="color: red;">{formHandler.getFieldError('contact.email')}</small>
        </div>
        <div>
          <label>Phone</label>
          <br />
          <input
            data-testid="contact.phone"
            name="contact.phone"
            onInput={onInput}
            value={formData().contact.phone}
          ></input>
          <br />
          <small style="color: red;">{formHandler.getFieldError('contact.phone')}</small>
        </div>
        <br />
        <small style="color: red">{formHandler.getFieldError('contact')}</small>
        <br />
        <small data-testId="contact-status">{formHandler.isFieldInvalid('contact') ? 'Invalid' : 'Valid'}</small>
      </fieldset>
      <div style="display: flex; align-items: center; margin-top: 17px;">
        <label>Has house</label>
        <input
          data-testid="hasHouse"
          type="checkbox"
          name="hasHouse"
          checked={formData().hasHouse}
          onInput={(event) => {
            formHandler.setFieldValue('hasHouse', event.currentTarget.checked);
            formHandler.refreshFormField('houseAddress');
          }}
        ></input>
        <br />
        <small style="color: red;">{formHandler.getFieldError('hasHouse')}</small>
      </div>
      {formData().hasHouse && (
        <div>
          <label>House Address</label>
          <br />
          <input
            data-testid="houseAddress"
            name="houseAddress"
            value={formData().houseAddress}
            onInput={onInput}
          ></input>
          <br />
          <small style="color: red;" data-testid="houseAddress-error">
            {formHandler.getFieldError('houseAddress')}
          </small>
        </div>
      )}
      <br />
      <button data-testid="submit" type="button" onClick={submit} disabled={formHandler.isFormInvalid()}>
        Submit
      </button>
      <br />
      <button data-testid="fill" type="button" onClick={fillForm}>
        Fill default form data
      </button>
      <br />
      <button data-testid="reset" type="button" onClick={resetForm}>
        Reset form
      </button>
      <br />
      <small data-testId="form-status">{formHandler.isFormInvalid() ? 'Invalid' : 'Valid'}</small>
      <pre style="color: red">
        <code>{error()}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(formHandler.getFormState(), null, 2)}</code>
      </pre>
    </form>
  );
};
