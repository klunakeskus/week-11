import React, { useState, Component } from 'react'
import { convertToHtml } from "mammoth/mammoth.browser";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import Head from './head'
import './styles/FormComponent.css'

class TableToExcel extends Component {
  render() {
    return (
      <div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS" />
        <table id="table-to-xls" dangerouslySetInnerHTML={{ __html: this.props.table }} />
      </div>
    );
  }
}

const FormComponent = () => {
  const [fileData, setFileData] = useState();

  function loadFile(event) {
    const file = event.target.files[0]
    convertToHtml({ arrayBuffer: file })
      .then((result) => {
        const html = result.value
        setFileData(html)
      })
      .done();
  }


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
            <TableToExcel table={fileData} />
          </>
        )}
      </div >
    </>
  );
}

export default FormComponent

