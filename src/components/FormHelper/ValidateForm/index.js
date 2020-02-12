const validate = values => {
  const errors = {};
  const { title, description } = values;
  if (!title) errors.title = 'Please fill in the field';
  else if (title.trim() && title.length < 5)
    errors.title = 'At least 5 letters';
  return errors;
};

export default validate;
