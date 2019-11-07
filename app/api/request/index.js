import axios from 'axios';

/** Petición POST estandar con axios */
export const post = async (urlRequest, dataRequest) => {
  const response = await axios({
    url: urlRequest,
    method: 'POST',
    data: dataRequest,
    headers: { 'Content-Type': 'application/json' }
  });
  return response;
};

/** Petición PATCH estandar con axios */
export const patch = async (urlRequest, dataRequest) => {
  const response = await axios({
    url: urlRequest,
    method: 'PATCH',
    data: dataRequest,
  });
  return response;
};

/** Petición DELETE estandar con axios */
export const remove = async (urlRequest) => {
  const response = await axios({
    url: urlRequest,
    method: 'DELETE',
  });
  return response;
};

/** Petición GET estandar con axios */
export const get = async (urlRequest, params) => {
  const sendParams = Object.assign({}, params);
  const response = await axios({
    url: urlRequest,
    method: 'GET',
    params: sendParams
  });
  return response;
};

/** Petición PUT estandar con axios */
export const put = async (urlRequest, dataRequest) => {
  const response = await axios({
    url: urlRequest,
    method: 'PUT',
    data: dataRequest,
  });
  return response;
};

/** Gets and forces download of a xls file from server */
export const getExcelFile = async (urlRequest, params) => {
  const sendParams = Object.assign({}, params);
  const response = await axios({
    url: urlRequest,
    method: 'GET',
    params: sendParams,
    headers: {
      Accept: 'application/xls'
    }
  }).then((httpResponse) => {
    const url = window.URL.createObjectURL(new Blob([httpResponse.data], { type: 'application/xls' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.xls');
    document.body.appendChild(link);
    link.click();
  });
  return response;
};

export const webUrlBase = 'https://criptographyapi.azurewebsites.net/api/';
