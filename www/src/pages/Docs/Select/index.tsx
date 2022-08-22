import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { SelectCompForm } from '@implementations';

export const Select: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Select</h2>
    <p>
      You can take a look at the component definition <code>Select.tsx</code>{' '}
      which is inside the code tab. Here will inherit the{' '}
      <code>SelectProps</code> from the <code>HTMLSelectElement</code> to avoid
      redefining all the props of a vanilla HTML select (open closed principle).
      If you will use a <i>SolidJS</i> UI library that provides a predefined{' '}
      <code>Select</code> component, the same approach can be done by extending
      the <code>SelectProps</code> from the <code>UILibrarySelectProps</code>{' '}
      interface.
    </p>
    <p>
      At <code>SelectProps</code> the <code>formHandler</code> is defined as an
      optional prop to preserve the original nature of a select (open closed
      principle) which is not dependent on a <code>formHandler</code> prop. The{' '}
      <code>onInput</code> and <code>onBlur</code> events were extended by the
      methods <code>onInput</code> and <code>onBlur</code> which are defined
      inside the component. Those methods implement the <code>formHandler</code>{' '}
      and also preserve the <code>onInput</code> and <code>onBlur</code> props
      execution when they are defined.
    </p>
    <p>
      As a result, we will have a shorter implementation at{' '}
      <code>Form.tsx</code> by only passing the <code>name</code>,{' '}
      <code>options</code> and the <code>formHandler</code> object to the{' '}
      <code>&lt;Select /&gt;</code> component for handling form data
      validations.
    </p>
    <Implementation
      codeTabs={[
        { name: 'Form.tsx', code: getRaw('SelectCompForm') },
        { name: 'Select.tsx', code: getRaw('components/Select') },
      ]}
    >
      <SelectCompForm />
    </Implementation>
  </DocsContentLayout>
);
