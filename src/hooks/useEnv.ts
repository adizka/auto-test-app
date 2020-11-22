export function useEnv() {
  const publicUrl = process.env.PUBLIC_URL

  return { publicUrl }
}
