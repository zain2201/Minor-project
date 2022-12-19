

import React, { useState, useEffect } from "react";
import "../css/Editor.css";
import Select from "react-select";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

const axios = require("axios");
// var code = `print('hi')`;
const Editor = () => {
  // const [state, setState] = { input: "" };'
  let outputContainer;
  const [selectedOption, setSelectedOption] = useState("none");

  const [output, setOutput] = useState("OUTPUT:");
  let codeEditor;
  let lineCounter;
  // console.log(codeEditor);
  const scrollfunction = () => {
    codeEditor.addEventListener("scroll", () => {
      lineCounter.scrollTop = codeEditor.scrollTop;
      lineCounter.scrollLeft = codeEditor.scrollLeft;
    });
    codeEditor.addEventListener("keydown", (e) => {
      let { keyCode } = e;
      let { value, selectionStart, selectionEnd } = codeEditor;
      if (keyCode === 9) {
        // TAB = 9
        e.preventDefault();
        codeEditor.value =
          value.slice(0, selectionStart) + "\t" + value.slice(selectionEnd);
        codeEditor.setSelectionRange(selectionStart + 2, selectionStart + 2);
      }
    });

    let lineCountCache = 0;
    function line_counter() {
      var lineCount = codeEditor.value.split("\n").length;
      var outarr = new Array();
      if (lineCountCache != lineCount) {
        for (var x = 0; x < lineCount; x++) {
          outarr[x] = x + 1 + ".";
        }
        lineCounter.value = outarr.join("\n");
      }
      lineCountCache = lineCount;
    }
    codeEditor.addEventListener("input", () => {
      line_counter();
    });
  };

  function getRequest(token) {
    let URL = `https://judge0-ce.p.rapidapi.com/submissions/${token}`;
    console.log(URL);
    const output = {
      method: "GET",
      url: URL,
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "X-RapidAPI-Key": "840dd45dd1msh5a16f401927ae02p1c1287jsn1104b88c0f95",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-Auth-Token": "840dd45dd1msh5a16f401927ae02p1c1287jsn1104b88c0f95",
      },
    };

    axios
      .request(output)
      .then(function (response) {
        let res = `OUTPUT:${response.data.stdout}`;
        setOutput(res);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  function submitbtn() {
    var source_code = document.getElementById("input").value;

    console.log(source_code);

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "840dd45dd1msh5a16f401927ae02p1c1287jsn1104b88c0f95",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-Auth-Token": "840dd45dd1msh5a16f401927ae02p1c1287jsn1104b88c0f95",
      },
      data: {
        source_code: source_code,
        language_id: selectedOption,
        stdin: "",
      },
    };

    axios
      .request(options)
      .then((response) => {
        var token = response.data;

        // token = JSON.parse(token);
        console.log(token.token);
        getRequest(token.token);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    outputContainer = document.getElementById("output");
    codeEditor = document.getElementById("input");
    lineCounter = document.querySelector(".line-number");
    scrollfunction();
  }, []);
  const options = [
    {
      label: "Python",
      value: 71,
    },
    {
      label: "JavaScript",
      value: 63,
    },
    {
      label: "C",
      value: 75,
    },
    {
      label: "C++",
      value: 76,
    },
    {
      label: "java",
      value: 62,
    },
  ];

  const handleTypeSelect = (e) => {
    setSelectedOption(e.value);
  };
  return (
    <div>
      {/* <textarea type="text" className="code"></textarea>
      <button onClick={submitbtn}>Submit</button> */}
      <div className="input_container">
        <div className="input_head">
          {/* <p>Type Your Code</p> */}
          <Select
            options={options}
            onChange={handleTypeSelect}
            value={options.filter(function (option) {
              return option.value === selectedOption;
            })}
            label="Single select"
            placeholder="Choose a language"
          />
        </div>
      </div>
      <div className="dis_container">
        <textarea
          className="line-number"
          readOnly
          defaultValue={"1"}
        ></textarea>
        <textarea
          id="input"
          rows="20"
          placeholder="Type your code here"
        ></textarea>
      </div>
      <div id="output_container">
      <div>
        <button className="button-2" id="submit_btn" onClick={submitbtn}>
          Compile
        </button>
      </div>
        <textarea
          disabled={true}
          id="output"
          rows="10"
          cols="70"
          value={output}
        ></textarea>
      </div>
    </div>
  );
};

export default Editor;
