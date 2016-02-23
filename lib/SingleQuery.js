function composeQuery(keywords, field, size, index, type) {
  return {
    "query_body": [
      {
        "index": index,
        "type": type
      },
      {
        "size": 0,
        "query": {
          "query_string": {
            "query": keywords,
            "analyze_wildcard": true
          }
        },
        "aggs": {
          "2": {
            "terms": {
              "field": field,
              "size": size,
              "order": {
                "_count": "desc"
              }
            }
          }
        }
      }
    ]
  };
}

