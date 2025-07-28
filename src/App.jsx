import React from "react";
import { useState, useEffect, useMemo } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "@vibe/core/tokens";
import { AttentionBox, Button, Dropdown } from "@vibe/core";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const [searchValue, setSearchValue] = useState("");
  const allOptions = useMemo(() => [{
    value: "Red",
    label: "Red"
  }, {
    value: "Orange",
    label: "Orange"
  }, {
    value: "Yellow",
    label: "Yellow"
  }, {
    value: "Green",
    label: "Green"
  }, {
    value: "Blue",
    label: "Blue"
  }, {
    value: "Indigo",
    label: "Indigo"
  }, {
    value: "Violet",
    label: "Violet"
  }], []);
  const options = useMemo(() => {
    if (!searchValue) return allOptions;
    return allOptions.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase()));
  }, [allOptions, searchValue]);

  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    monday.listen("context", (res) => {
      setContext(res.data);
      console.log("Context received:", res.data);
    });

    monday.get("itemIds").then((res) => {
      console.log("Item IDs:", res);
    });
    
  }, []);


  const onInputChange = value => setSearchValue(value);
  return (
    <div className="App">
      <h3>Mirror Column</h3><hr />
      <div>
        <div className="menu-container">
            <Dropdown options={options} placeholder="From" className="dropdown-stories-styles_with-chips" onInputChange={onInputChange} />
            <Dropdown options={options} placeholder="To" className="dropdown-stories-styles_with-chips" onInputChange={onInputChange} />
        </div>
        <Button>Make Copy</Button>
      </div>
    </div>
  );
};

export default App;
