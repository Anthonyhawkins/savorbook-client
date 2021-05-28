export const StorageBaseURL = "storage.googleapis.com"
export const StorageFolder = "/savorbook-dev/"

export function GenImageLink(src) {
  if (src) {
    return "https://" + StorageBaseURL + StorageFolder + src
  }
  return ""
}
