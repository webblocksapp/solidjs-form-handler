import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { getRaw } from '@utils';
import { Code } from '@components';

export const FieldHasError: Component = () => (
  <DocsContentLayout prev="/api/is-field-invalid" next="/api/get-field-error">
    <h2 class="mb-4 border-bottom">fieldHasError</h2>
    <p>
      This method returns a boolean flag, <code>true</code> if the field has an
      error message. This method is different from <code>isFieldInvalid</code>,
      a field can be invalid but not contains an error message.
    </p>
    <Code content={getRaw('fieldHasErrorApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('fieldHasError1')} />
  </DocsContentLayout>
);
