import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const Field: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Field</h2>
    <p>
      Reusable form field component that contains the form handler reactivity.
    </p>
    <Code content={getRaw('FieldApi')} />
    <p>
      <b>Modes:</b>
    </p>
    <p>
      The <code>&lt;Field /&gt;</code> component provides different modes for
      handling distinct form field component types:
    </p>
    <div class="table-scrollable">
      <table class="table">
        <thead>
          <tr>
            <th style="width: 140px" scope="col">
              Mode
            </th>
            <th scope="col">Props</th>
            <th scope="col">Components to control</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>input</code>
            </td>
            <td>
              <code>InputFieldProps</code>
            </td>
            <td>
              Components that receive input as f.e. text, number, date, color,
              range. Input mode also can be used for select components.
            </td>
          </tr>
          <tr>
            <td>
              <code>checkbox</code>
            </td>
            <td>
              <code>CheckboxFieldProps</code>
            </td>
            <td>
              Components that act like a switch as a single checkbox or a
              toggable button. Values can be a boolean flag or a value pair when
              checked and unchecked.
            </td>
          </tr>
          <tr>
            <td>
              <code>checkbox-group</code>
            </td>
            <td>
              <code>CheckboxGroupFieldProps</code>
            </td>
            <td>
              Components that handle a group of checkable options as f.e.
              multiple checkboxes or button groups.
            </td>
          </tr>
          <tr>
            <td>
              <code>radio-group</code>
            </td>
            <td>
              <code>RadioGroupFieldProps</code>
            </td>
            <td>
              Components that show a group of options for checking a single one
              as f.e. multiple radio buttons.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);
