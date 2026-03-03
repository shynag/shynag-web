import { createReader } from "@keystatic/core/reader";
import config from "@config";

/**
 * Small wrapper to centralize Keystatic reader creation.
 * Use this instead of calling createReader(process.cwd(), config) everywhere.
 */
export function getKeystaticReader() {
  return createReader(process.cwd(), config);
}

export default getKeystaticReader;
