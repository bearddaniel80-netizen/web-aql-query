import { get_fastapi } from "../utils/fastapi.js";

export function forwardFastapi(endpoint) {
  return async (req, res, next) => {
    try {
      const path =
        typeof endpoint === "function"
          ? endpoint(req)
          : endpoint;

      const result = await get_fastapi(path);

      res
        .status(result.status)
        .json(result.data);

    } catch (error) {
      next(error);
    }
  };
}