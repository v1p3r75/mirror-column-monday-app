export default function getColumnsQuery(mondaySdk, boardId) {

  return mondaySdk.api(
    `query {
      boards (ids: ${boardId}) {
        columns {
          id
          title
          type
          settings_str
        }
      }
    }`,
  );
}