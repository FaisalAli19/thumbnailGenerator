const url = 'https://project-opinion.herokuapp.com/api/v1';

export async function getAllVideos(token, page) {
  const result = await fetch(`${url}/videos/all?page=${page}`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      'X-Api-Key': token,
    },
  }).then((res) => res.json());

  return result;
}

export async function getVideos(token, id) {
  const result = await fetch(`${url}/videos/get_details?id=${id}`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      'X-Api-Key': token,
    },
  }).then((res) => res.json());

  return result;
}

export async function updateThumbnailApi(token, data) {
  const { thumbnail, povId } = data;
  const formData = new FormData();
  formData.append('thumbnail', thumbnail);
  formData.append('id', povId);

  const result = await fetch(`${url}/videos/update_thumbnail`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'X-Api-Key': token,
    },
    body: formData,
  }).then((res) => res.json());

  return result;
}
