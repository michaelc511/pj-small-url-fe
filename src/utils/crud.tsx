// crud.tsx

export function postData(full: string) {
  fetch('http://localhost:5001/api/url/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      full: full,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle successful response
      console.log(data);
      return data.short;
    })
    .catch(error => {
      // Handle error
      console.error('There was a problem with the fetch operation:', error);
    });
}

export async function postUsingAsyncAwait(full: string) {
  try {
    const response = await fetch('http://localhost:5001/api/url/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full: full,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // Handle successful response
    console.log(data);
    return data.short;

  } catch (error) {
    // Handle error
    console.error('There was a problem with the fetch operation:', error);
  }
}
