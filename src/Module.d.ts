interface Module<E=object> {
  require: <T extends Module = Module>(name: string | URL) => Promise<T>,
  filename: URL,
  exports: E,
  parent: Module | null
}