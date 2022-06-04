import React, { useState } from 'react'
import { convertToHtml } from "mammoth/mammoth.browser";

import Head from './head'
import './styles/FormComponent.css'

const FormComponent = () => {
  const [fileData, setFileData] = useState();

  const regExp = /<p>([^<]*)<\/p>/gm

  const options = {
    styleMap: [
      "p[style-name='Section Title'] => input:fresh",
      "p[style-name='Subsection Title'] => input:fresh"
    ]
  };

  function loadFile(event) {
    const file = event.target.files[0]
    convertToHtml({ arrayBuffer: file }, options)
      .then((result) => {
        const html = result.value
        const newStr = html.replaceAll(regExp, '<input type="text" value="$1" />')
        console.log(html)
        setFileData(newStr)
      })
      .done();
  }

  // console.log(fileData)

  return (
    <>
      <Head title="Hello" />
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <div className="mb-3 w-96">
            <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">Upload file</label>
            <input
              onChange={loadFile}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              type="file"
              id="formFile" />
          </div>
        </div>

        {fileData && (
          <>
            <div id="file-data" dangerouslySetInnerHTML={{ __html: fileData }} />
            <input type="text" />
          </>
        )}
      </div >
    </>
  );
}

export default FormComponent

