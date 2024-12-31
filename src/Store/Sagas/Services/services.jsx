//Single Term Methode
//API Ka Path sahi se de varna Error aati hai
export async function createRecord(collection, payload) {
  
  let response = await fetch(`/api/${collection}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization":localStorage.getItem("token")
      },
      body: JSON.stringify(payload),
    }
  );
  return await response.json();
}

export async function createRecordFormData(collection, payload) {
  let response = await fetch(`/api/${collection}`,
    {
      method: "POST",
      headers: {
        "authorization":localStorage.getItem("token")

      },
      body: payload,
    }
  );
  return await response.json();
}

export async function getRecord(collection) {
  let response = await fetch(`/api/${collection}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization":localStorage.getItem("token")

      },
    }
  );
  return await response.json();
}

export async function updateRecord(collection, payload) {
  let response = await fetch(`/api/${collection}/${payload._id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "authorization":localStorage.getItem("token")

      },
      body: JSON.stringify(payload),
    }
  );
  return await response.json();
}

export async function updateRecordFormData(collection, payload) {
  let response = await fetch(`/api/${collection}/${payload.get("_id")}`,
    {
      method: "PUT",
      headers: {
        "authorization":localStorage.getItem("token")

      },
      body: payload,
    }
  );
  return await response.json();
}

export async function deleteRecord(collection, payload) {
  let response = await fetch(`/api/${collection}/${payload._id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "authorization":localStorage.getItem("token")

      },
    }
  );
  return await response.json();
}
