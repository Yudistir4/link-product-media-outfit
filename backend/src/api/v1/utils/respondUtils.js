const customRespond = {
  RecordCreated: { message: "Record created", code: 201 },
  AccountCreated: { message: "Create account success", code: 201 },
  ConvertSuccess: { message: "Convert success", code: 200 },
  ConvertFailed: { message: "Convert failed", code: 500 },
  LinkInvalid: { message: "Link Invalid", code: 400 },
  UpdateSuccess: { message: "Update success", code: 200 },
  LinkCreated: { message: "Create link success", code: 201 },
  RecordNotFound: { message: "Record not found", code: 404 },
  RecordDuplicated: { message: "record duplicated, must be unique", code: 409 },
  InternalServerError: { message: "internal server error", code: 500 },
  BadRequest: { message: "Bad request", code: 400 },
  Success: { message: "Request success", code: 200 },
  DeleteSuccess: { message: "Delete Success", code: 200 },
};

// const errors =

const successRespond = (res, custom, data) => {
  return res.status(custom.code).json({ message: custom.message, data });
};
const errorRespond = (res, custom, error) => {
  return res.status(custom.code).json({ message: custom.message, error });
};

module.exports = { successRespond, errorRespond, customRespond };
