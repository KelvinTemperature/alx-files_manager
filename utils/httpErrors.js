/**
 * HTTPError class to handle common HTTP errors.
 */
class HTTPError {
  /**
   * Respond with a 401 Unauthorized error.
   * @param {Object} res - The response object.
   * @param {string} [msg='Unauthorized'] - The error message.
   * @returns {Object} JSON response with the error message.
   */
  static unauthorized(res, msg = 'Unauthorized') {
    return res.status(401).json({ error: msg });
  }

  /**
   * Respond with a 400 Bad Request error.
   * @param {Object} res - The response object.
   * @param {string} [msg='Bad Request'] - The error message.
   * @returns {Object} JSON response with the error message.
   */
  static badRequest(res, msg = 'Bad Request') {
    return res.status(400).json({ error: msg });
  }

  /**
   * Respond with a 500 Internal Server Error.
   * @param {Object} res - The response object.
   * @param {string} [msg='Internal Server Error'] - The error message.
   * @returns {Object} JSON response with the error message.
   */
  static internalServerError(res, msg = 'Internal Server Error') {
    return res.status(500).json({ error: msg });
  }

  /**
   * Respond with a 404 Not Found error.
   * @param {Object} res - The response object.
   * @param {string} [msg='Not found'] - The error message.
   * @returns {Object} JSON response with the error message.
   */
  static notFound(res, msg = 'Not found') {
    return res.status(404).json({ error: msg });
  }

  /**
   * Respond with a 403 Forbidden error.
   * @param {Object} res - The response object.
   * @param {string} [msg='Forbidden'] - The error message.
   * @returns {Object} JSON response with the error message.
   */
  static forbidden(res, msg = 'Forbidden') {
    return res.status(403).json({ error: msg });
  }
}

export default HTTPError;
