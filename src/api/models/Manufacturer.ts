export interface Manufacturer {
  name: string
  models: ReadonlyArray<{
    name: string
  }>
}
