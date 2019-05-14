import React from 'react';
import Button from 'src/components/_buttons/Button/Button';

/**
 * Home
 * @author Kevin Reynolds <kevin.reynolds@somoglobal.com>
 * @return {JSXElement} - Style guide
 */

const StyleGuide = () => {
  return (
    <div data-test="container-home" style={{ width: 600 }}>
      <h1>Buttons</h1>
      <table width="100%" cellSpacing="20">
        <tbody>
          <tr>
            <td>&lt;Button /&gt;</td>
            <td><Button /></td>
          </tr>
          <tr>
            <td>&lt;Button opaque /&gt;</td>
            <td><Button opaque /></td>
          </tr>
          <tr>
            <td>&lt;Button opaque small /&gt;</td>
            <td><Button opaque small /></td>
          </tr>
          <tr>
            <td>&lt;Button classes=&quot;primary&quot; fullWidth /&gt;</td>
            <td><Button classes="primary" fullWidth /></td>
          </tr>
          <tr>
            <td>&lt;Button classes=&quot;primary&quot; small /&gt;</td>
            <td><Button classes="primary" small /></td>
          </tr>
          <tr>
            <td>&lt;Button classes=&quot;secondary&quot; fullWidth /&gt;</td>
            <td><Button classes="secondary" fullWidth /></td>
          </tr>
          <tr>
            <td>&lt;Button classes=&quot;secondary&quot; small /&gt;</td>
            <td><Button classes="secondary" small /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StyleGuide;
