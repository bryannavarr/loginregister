module.exports = validateDoc;

function validateDoc(doc, model) {
  let returnedResult = {};
  const result = model.validate(doc).error;
  if (!result) {
    returnedResult.answer = true;
    return returnedResult;
  } else {
    returnedResult.answer = false;
    returnedResult.err = result.message;
    return returnedResult;
  }
}
