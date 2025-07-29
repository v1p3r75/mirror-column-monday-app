const createColumnWebhook = async (monday, boardId, columnId, url) => {
    try {
        const request = `
            mutation {
                create_webhook (
                    board_id: ${boardId},
                    url: "${url}",
                    event: change_status_column_value,
                    config: "{\\"columnId\\":\\"${columnId}\\", \\"columnValue\\":{\\"$any$\\":true}}"
                ){
                    id
                    board_id
                }
            }
        `;
        console.log("Creating webhook with request:", request);
        const response = await monday.api(request);
        console.log("Webhook created successfully:", response);
        return response.data.create_webhook.id;
    } catch (error) {
        console.error("Error creating webhook:", error?.errors || error);
        throw new Error("Failed to create webhook");
    }
};

export default createColumnWebhook;