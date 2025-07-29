import React from "react";
import { useState, useEffect, useMemo } from "react";
import mondaySdk from "monday-sdk-js";
import "@vibe/core/tokens";
import { Heading, Loader } from "@vibe/core";
import SelectColumns from "./components/SelectColumns";
import getColumnsQuery from "./api/get-columns.query";
import createColumnWebhook from "./api/create-columns-webhook";
import { saveColumnMapping } from "./helpers/helpers";

const monday = mondaySdk();
const WEBHOOKS_URL = "https://5f6237f425ff.ngrok-free.app"

const App = () => {
  const [context, setContext] = useState();
  const [columns, setColumns] = useState([]);

  const parseColumns = (columns) => {
    return columns.map(item => ({
      value: item.id,
      label: item.title,
      type: item.type,
      settings: item.settings_str ? JSON.parse(item.settings_str) : {}
    }));
  }

  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    monday.listen("context", async (res) => {
      setContext(res.data);
      console.log("Context received:", res.data);
      const columnsData = await getColumnsQuery(monday, res.data.boardId);
      const parsedColumns = parseColumns(columnsData.data.boards[0].columns);
      setColumns(parsedColumns);
    });

  }, []);


  const onSubmit = (from, to) => {
    const savedUrl = `${WEBHOOKS_URL}/save-column-mapping`;
    saveColumnMapping(savedUrl, from, to);

    createColumnWebhook(monday, context.boardId, from.value, WEBHOOKS_URL)
      .then(webhookId => {
        console.log("Webhook created with ID:", webhookId);
        // Here you can add logic to handle the webhook creation success
      })

    console.log("Submit changed:", from, to);
    
  }

  return (
    <div className="App">
      <Heading color="onInverted">Mirror Column</Heading><hr />
      <div>
        {
          context && columns.length > 0 ?
            <SelectColumns columns={columns} defaultFromColumn={context?.columnId} onSubmit={onSubmit} /> :
            <Loader size="medium"/>
        }
      </div>
    </div>
  );
};

export default App;
