Common HTTP Status Codes & Usage
200 – OK

Meaning: Request succeeded.

Purpose: Use for successful read (GET), update (PUT/PATCH), or delete (DELETE) when no new resource is created.

Example:

return res.status(200).json({ message: "Admin updated successfully" });

201 – Created

Meaning: New resource created successfully.

Purpose: Use when creating/adding (POST) a new record.

Example:

return res.status(201).json({ message: "New admin created successfully", data: newAdmin });

400 – Bad Request

Meaning: Client sent invalid data (validation failed, missing fields, wrong format).

Purpose: Use when request body/query params are invalid.

Example:

return res.status(400).json({ message: "Password and Confirm Password do not match" });

500 – Internal Server Error

Meaning: Something unexpected went wrong on the server (not client’s fault).

Purpose: Use in catch blocks for server/database errors.

Example:

return res.status(500).json({ message: "Internal Server Error!" });

📌 Which one to use for each operation?

Create (POST / add new) → 201 Created

Read (GET) → 200 OK

Update (PUT/PATCH) → 200 OK

Delete (DELETE) → 200 OK
(or 204 No Content if you don’t want to return a message body)

Validation / User error → 400 Bad Request

Unexpected server/db crash → 500 Internal Server Error