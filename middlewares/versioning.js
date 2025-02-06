const versionMiddleware = (version) => {
    return (req, res, next) => {
      // Extract version from header (e.g., "v1" or "v2")
      const acceptHeader = req.get('Accept');
      const requestedVersion = acceptHeader?.split('.')[1]?.replace('+json', '');
      req.version = requestedVersion || version; // Fallback to default
      next();
    };
  };
  
module.exports = versionMiddleware;