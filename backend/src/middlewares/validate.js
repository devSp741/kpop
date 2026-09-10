export const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const dataToValidate = source === 'query' ? req.query : source === 'params' ? req.params : req.body;
      const validatedData = schema.parse(dataToValidate);
      
      if (source === 'query') req.query = validatedData;
      else if (source === 'params') req.params = validatedData;
      else req.body = validatedData;

      next();
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};
