import DataFrame from 'dataframe-js';

export function _DataFromServerToDF(fromServer) {
    // pola fromServer -> split. output(column, data, index)
    // https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_json.html
    // pola create data -> from table. input(array data, array column) 
    // https://gmousse.gitbooks.io/dataframe-js/content/doc/BASIC_USAGE.html#create-a-dataframe
    const df = new DataFrame(fromServer.data, fromServer.columns);
    return df;
}