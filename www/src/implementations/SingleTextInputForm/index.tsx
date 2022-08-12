import { Component } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import * as yup from 'yup';

type SingleTextInputSchema = {
  email: string;
};

const singleTextInputSchema: yup.SchemaOf<SingleTextInputSchema> = yup.object({
  email: yup.string().email().required(),
});

export const SingleTextInputForm: Component = () => {
  const formHandler = useFormHandler(singleTextInputSchema);
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();

    if (await formHandler.validateForm()) {
      alert('Data sent with success: ' + JSON.stringify(formData()));
      formHandler.resetForm();
    }
  };

  const reset = () => {
    formHandler.resetForm();
  };

  const fill = () => {
    formHandler.fillForm({ email: 'test@mail.com' });
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          class="form-control"
          classList={{ 'is-invalid': formHandler.fieldHasError('email') }}
          name="email"
          value={formHandler.getFieldValue('email')}
          onInput={({ currentTarget: { name, value } }) =>
            formHandler.setFieldValue(name, value)
          }
          onBlur={({ currentTarget: { name } }) => {
            formHandler.validateField(name);
            formHandler.touchField(name);
          }}
        />
        {formHandler.fieldHasError('email') && (
          <div class="invalid-feedback">
            {formHandler.getFieldError('email')}
          </div>
        )}
      </div>
      <div class="mb-3">
        <button class="btn btn-primary me-2">Submit</button>
        <button class="btn btn-primary me-2" onClick={reset} type="button">
          Reset
        </button>
        <button class="btn btn-primary me-2" onClick={fill} type="button">
          Fill
        </button>
      </div>
      <p>
        <b>Form data:</b>
      </p>
      <pre class="mt-3 border bg-light p-3">
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
      <p>
        <b>Form state:</b>
      </p>
      <pre class="mt-3 border bg-light p-3">
        <code>{JSON.stringify(formHandler.getFormState(), null, 2)}</code>
      </pre>
    </form>
  );
};
