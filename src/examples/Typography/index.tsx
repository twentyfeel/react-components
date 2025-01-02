import "./Typography.scss";

const Typography = () => {
  return (
    <article className="typography-test">
      <section className="typography-test__section">
        <h1>Typography Test Page</h1>
        <p>This page demonstrates all typography styles available in the system.</p>
      </section>

      <section className="typography-test__section">
        <h2>Headings</h2>
        <h1>Heading 1 - The Quick Brown Fox</h1>
        <h2>Heading 2 - The Quick Brown Fox</h2>
        <h3>Heading 3 - The Quick Brown Fox</h3>
        <h4>Heading 4 - The Quick Brown Fox</h4>
        <h5>Heading 5 - The Quick Brown Fox</h5>
        <h6>Heading 6 - The Quick Brown Fox</h6>
      </section>

      <section className="typography-test__section">
        <h2>Text Styles</h2>
        <p>
          Regular paragraph text with <strong>bold text</strong>, <em>italic text</em>, and{" "}
          <mark>highlighted text</mark>.
        </p>
        <p>
          Here's a <a href="#link">link example</a> within a paragraph.
        </p>
        <p>
          Here's some <code>inline code</code> within a paragraph.
        </p>
        <p>
          Example of <sub>subscript</sub> and <sup>superscript</sup> text.
        </p>
        <p>
          An abbreviation example: <abbr title="HyperText Markup Language">HTML</abbr>
        </p>
      </section>

      <section className="typography-test__section">
        <h2>Blockquotes</h2>
        <blockquote>
          This is a blockquote. It can contain multiple lines of text and is styled differently from
          regular paragraphs.
          <cite>- Author Name</cite>
        </blockquote>
      </section>

      <section className="typography-test__section">
        <h2>Lists</h2>
        <h3>Unordered List</h3>
        <ul>
          <li>First unordered list item</li>
          <li>Second unordered list item</li>
          <li>Third unordered list item</li>
        </ul>

        <h3>Ordered List</h3>
        <ol>
          <li>First ordered list item</li>
          <li>Second ordered list item</li>
          <li>Third ordered list item</li>
        </ol>

        <h3>Definition List</h3>
        <dl>
          <dt>Definition Term 1</dt>
          <dd>Definition description 1</dd>
          <dt>Definition Term 2</dt>
          <dd>Definition description 2</dd>
        </dl>
      </section>

      <section className="typography-test__section">
        <h2>Code Blocks</h2>
        <pre>
          {`function example() {
  return "This is a code block";
}`}
        </pre>

        <div className="typography-test__code-examples">
          <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy
          <samp>Program output example</samp>
          <var>Variable example</var>
        </div>
      </section>

      <section className="typography-test__section">
        <h2>Tables</h2>
        <table>
          <caption>Example Table Caption</caption>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
              <th>Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Cell 1</td>
              <td>Row 1, Cell 2</td>
              <td>Row 1, Cell 3</td>
            </tr>
            <tr>
              <td>Row 2, Cell 1</td>
              <td>Row 2, Cell 2</td>
              <td>Row 2, Cell 3</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="typography-test__section">
        <h2>Figures</h2>
        <figure>
          <img src="/api/placeholder/600/400" alt="Placeholder" />
          <figcaption>Example figure caption describing the image above.</figcaption>
        </figure>
      </section>

      <section className="typography-test__section">
        <h2>Form Elements</h2>
        <form className="typography-test__form">
          <div className="typography-test__form-group">
            <label htmlFor="text-input">Text Input:</label>
            <input type="text" id="text-input" placeholder="Enter text here" />
          </div>

          <div className="typography-test__form-group">
            <label htmlFor="textarea">Textarea:</label>
            <textarea id="textarea" rows={3} placeholder="Enter longer text here"></textarea>
          </div>

          <div className="typography-test__form-group">
            <label htmlFor="select">Select:</label>
            <select id="select">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </form>
      </section>

      <section className="typography-test__section">
        <h2>Interactive Elements</h2>
        <details>
          <summary>Click to expand details</summary>
          <p>This is the expanded content that appears when you click the summary.</p>
        </details>
      </section>

      <footer className="typography-test__footer">
        <small>This is a small text in the footer. &copy; 2025 Typography Test</small>
      </footer>
    </article>
  );
};

export default Typography;
